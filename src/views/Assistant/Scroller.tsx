import React from "react";
import styled from "styled-components";
import FullPageWindow from "../../components/FullPageWindow/FullPageWindow";
import { NavbarHeight } from "../../components/NavBar/NavBar";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import { elementScrollTo } from "../../lib/seamless-scroll-polyfill/scroll";
import scrollIntoView from "smooth-scroll-into-view-if-needed";
import {
  FullHeightCard,
  ScrollableCard,
  CollapsibleCard,
  SearchCard,
  ShortCard,
  CardTypes,
} from "./Card";

import { StepComponent } from "./Step";

export type AddStepHandler = (card: CardTypes) => void;

const FlowSteps = styled(FullPageWindow)`
  overflow: hidden;
`;
// https://easings.net/#easeInOutQuart
function easeInOutQuart(x: number): number {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}

const scrollCardIntoView = (
  target: HTMLElement,
  block: ScrollLogicalPosition
) =>
  scrollIntoView(target, {
    duration: 500,
    scrollMode: "always",
    block,
    ease: easeInOutQuart,
  });
// elementScrollIntoView(
//   target,
//   {
//     behavior: "smooth",
//     block,
//   },
//   {
//     duration: 500,
//     timingFunc: easeInOutQuart,
//   }
// );

// used for aligning steps before transitioning to another step
const scrollCardTo = (target: HTMLElement, distance: number) =>
  elementScrollTo(
    target,
    {
      behavior: "smooth",
      top: distance,
    },
    {
      duration: 350,
      timingFunc: easeInOutQuart,
    }
  );

// !!!! scrollIntoView({ block: 'nearest' }) seems to work the best !!!!

/**
 * - Scroller takes care of programmatic scrolling between flow steps
 * - Scrolling from one step to another can only be done programmatically (user clicking 'next' or 'back' button, but never by user scrolling)
 * - When user proceeds to the next or previous step, force current steps scroll position to the top or to the bottom, to keep continuous surface between steps
 * - Before proceeding to the next step, the next step has to be fully rendered with all its assets
 *   (Otherwise layout shifts might cause wrong scroll position after .scrollIntoView is called)
 * // TODO: use `requestAnimationFrame` to animate between steps?
 * - during transitions, all interactions should be blocked (on all cards) until the transition is
 * @returns
 */
const Scroller = () => {
  useLockBodyScroll();
  const [stepIndex, setStepIndex] = React.useState(0);
  const [steps, setSteps] = React.useState<StepComponent[]>([SearchCard]);
  const scrollerRef = React.useRef<null | HTMLDivElement>(null);
  const transitioning = React.useRef(false);

  // !!! this breaks when user starts a transition and tries to touch scroll
  const toggleInteractivity = React.useCallback((interactive: boolean) => {
    const scroller = scrollerRef.current;
    if (scroller) {
      scroller.style.pointerEvents = interactive ? "" : "none";
    }
  }, []);

  const alignCurrentStep = React.useCallback(
    async (stepIndex, top: boolean) => {
      try {
        // when user clicks go-back, align current step (reset scroll position)
        const currentElement = document.querySelector(
          `[data-step-id='${stepIndex}']`
        ) as HTMLElement;
        if (currentElement) {
          console.log("STES");
          // currentElement.scrollTop = top ? 0 : currentElement.scrollHeight;
          return await scrollCardTo(
            currentElement,
            top ? 0 : currentElement.scrollHeight
          );
        }
      } catch (err) {
        console.log("Something went wrong when aligning current step", err);
      }
    },
    []
  );

  const goBack = async () => {
    toggleInteractivity(false);
    transitioning.current = true;
    try {
      await alignCurrentStep(stepIndex, true);

      const updatedSteps = [...steps].slice(0, -1);

      const previousElement = document.querySelector(
        `[data-step-id='${updatedSteps.length - 1}']`
      ) as HTMLElement;
      if (previousElement) {
        // reset transforms applied to previous step by current step elastic scroll up
        previousElement.style.bottom = "";

        setStepIndex(updatedSteps.length - 1);
        await scrollCardIntoView(previousElement, "end");
        toggleInteractivity(true);
        transitioning.current = false;
        // remove step from the stack only after transition finished
        setSteps(updatedSteps);
      }
    } catch (err) {
      console.log("Something went wrong when going to previous card", err);
      toggleInteractivity(true);
      transitioning.current = false;
    }
  };

  const handleStepAdded: AddStepHandler = async (card) => {
    // align curent card to the bottom before starting transition to another step
    // when user is scrolled to the bottom of the card and triggers "next step"
    toggleInteractivity(false);
    transitioning.current = true;
    try {
      // when step is added, we first want to align current card to the bottom, before we start the transition
      await alignCurrentStep(stepIndex, false);
      const updatedSteps = [...steps];
      switch (card) {
        case "full-height":
          updatedSteps.push(FullHeightCard);
          break;
        case "short":
          updatedSteps.push(ShortCard);
          break;
        case "scrollable":
          updatedSteps.push(ScrollableCard);
          break;
        case "collapsible":
          updatedSteps.push(CollapsibleCard);
          break;
      }
      toggleInteractivity(true);
      transitioning.current = false;
      setSteps(updatedSteps);
      // flush?
      setStepIndex(updatedSteps.length - 1);
    } catch (err) {
      toggleInteractivity(true);
      transitioning.current = false;
    }
  };

  // when steps are added or removed
  React.useLayoutEffect(() => {
    async function moveToNextCard() {
      // Timeout to let the card render fully before scrolling programmatically
      // otherwise element might not be scrolled properly (when assets are loading or elements inside are resizing)
      toggleInteractivity(false);
      transitioning.current = true;
      try {
        // previously used 'stepIndex' instead of 'steps' dependency
        const lastStepElement = document.querySelector(
          `[data-step-id='${steps.length - 1}']`
        ) as HTMLElement;
        if (lastStepElement) {
          await scrollCardIntoView(lastStepElement, "nearest");

          transitioning.current = false;

          toggleInteractivity(true);
        }
      } catch (err) {
        transitioning.current = false;
        toggleInteractivity(true);
      }
    }
    moveToNextCard();
  }, [steps, toggleInteractivity]);

  // aligning elements that expanded and became longer.
  // its hacky. other way would be to force steps to be 100vh MINIMUM
  // Do NOT align automatically during transition.
  React.useLayoutEffect(() => {
    const alignInterval = setInterval(async () => {
      if (!transitioning.current) {
        const lastStepElement = document.querySelector(
          `[data-step-id='${stepIndex}']`
        ) as HTMLElement;
        if (lastStepElement) {
          transitioning.current = true;
          await scrollCardIntoView(lastStepElement, "nearest");
          transitioning.current = false;
        }
      }
    }, 1000);

    return () => {
      clearInterval(alignInterval);
    };
  }, [stepIndex]);

  const onCurrentStepScroll = (e: React.UIEvent<HTMLElement>) => {
    const currentStepElement = e.currentTarget;

    if (currentStepElement) {
      // disable scroll if step is not sticking to the top of the screen (see collapsible / expandable example)

      const previousStepElement =
        currentStepElement.previousElementSibling as HTMLDivElement | null;

      if (previousStepElement) {
        e.preventDefault();
        // when using translateY instead of 'bottom' the element is not clickable when 'go back overlay'
        // previousStepElement.style.transform = `translateY(${-currentStepElement.scrollTop}px)`;
        previousStepElement.style.bottom = `${currentStepElement.scrollTop}px`;
        //   if (distance <= 0) {
        //     previousStepElement.style.bottom = "auto";
        //   } else {
        //   }
      }
    }
  };
  console.log({ steps });

  return (
    <FlowSteps id="FlowSteps" ref={scrollerRef}>
      {steps.map((Step, index) => (
        <Step
          key={index}
          onAddStep={handleStepAdded}
          // Clicking any of the previous steps takes user one step back
          goBack={index < stepIndex ? goBack : undefined}
          onScroll={index === stepIndex ? onCurrentStepScroll : undefined}
          data-step-id={index}
          // first element has to stick to the bottom edge of the screen.
          // Makes the bottom of previous card is always visible (to click go back)
          style={{
            marginTop: index === 0 ? 0 : -NavbarHeight,
            // disable scroll on previous cards
            overflow: index < stepIndex ? "hidden" : "",
          }}
        />
      ))}
    </FlowSteps>
  );
};
export default Scroller;

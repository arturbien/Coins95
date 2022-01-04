import React from "react";
import { Button, TextField, Toolbar, Window, WindowContent } from "react95";
import styled from "styled-components";
import SearchIcon from "../../assets/img/system-search.png";
import { NavbarHeight } from "../../components/NavBar/NavBar";
import WindowHeader from "../../components/WindowHeader/WindowHeader";
// iOS Safari doesn't support native .scrollIntoView({ behavior: 'smooth'})
import Step, { StepComponent } from "./Step";

const AddCardButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  & > button:not(:first-child) {
    margin-top: 0.5rem;
  }
`;

type AddStepHandler = (card: CardTypes) => void;

export type CardTypes = "full-height" | "short" | "scrollable" | "collapsible";

const AddStepButtons = ({ onAddStep }: { onAddStep?: AddStepHandler }) => {
  return (
    <div style={{ width: "100%" }}>
      {onAddStep && (
        <AddCardButtonsWrapper>
          <Button fullWidth onClick={() => onAddStep("short")}>
            Short
          </Button>
          <Button fullWidth onClick={() => onAddStep("full-height")}>
            Full
          </Button>
          <Button fullWidth onClick={() => onAddStep("scrollable")}>
            Long
          </Button>
          <Button fullWidth onClick={() => onAddStep("collapsible")}>
            Collapsible
          </Button>
        </AddCardButtonsWrapper>
      )}
    </div>
  );
};

// TODO: this 'top' property hack is nasty to make up for Card padding-top
// const GoBackOverlay = styled.div`
//   // z-index to make up for negative margin on next card
//   z-index: 999;
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;

//   background: rgba(0, 0, 0, 0.4);
//   opacity: 0;
//   // transition of the same duration as step transition!!
//   transition: opacity ease-in-out 500ms;
//   &:not([aria-disabled="true"]) {
//     opacity: 1;
//     -webkit-backdrop-filter: blur(2px);
//     backdrop-filter: blur(2px);
//   }
// `;

const SWindow = styled(Window)`
  box-sizing: border-box;

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SWindowContent = styled(WindowContent)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: nowrap;
`;

const Card = ({
  children,
  goBack,
  ...othetProps
}: React.ComponentProps<typeof SWindow> & {
  goBack?: () => void;
}) => {
  return (
    <SWindow {...othetProps}>
      {children}
      {/* <GoBackOverlay role="button" onClick={goBack} aria-disabled={!goBack} /> */}
    </SWindow>
  );
};

const SearchWrapper = styled(Toolbar)`
  margin: 0 -4px;
`;

export const SearchCard: StepComponent = ({
  onAddStep,
  goBack,
  ...otherProps
}) => {
  const [searchPhrase, setSearchPhrase] = React.useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPhrase(e.target.value);
  };

  return (
    <Step fullHeight {...otherProps}>
      {/* for desktops limit size of the search card so that it sticks to the bottom of the screen */}
      {/* note the justify-content: flex-end on <Step fullHeight /> */}
      <Card goBack={goBack} style={{ maxHeight: "500px" }}>
        <WindowHeader>
          <img
            alt="Search icon"
            src={SearchIcon}
            style={{
              height: 27,
              marginTop: 2,
              marginRight: "0.5rem",
              imageRendering: "pixelated",
            }}
          />
          How can we help?
        </WindowHeader>
        <SWindowContent>
          <SearchWrapper>
            <TextField
              placeholder="I want to know about..."
              value={searchPhrase}
              onChange={handleSearch}
              width="100%"
              style={{ marginRight: "4px", width: "100%" }}
            />
            <Button
              disabled={searchPhrase === ""}
              onClick={() => setSearchPhrase("")}
            >
              Clear
            </Button>
          </SearchWrapper>
          {onAddStep && <AddStepButtons onAddStep={onAddStep} />}
        </SWindowContent>
      </Card>
    </Step>
  );
};

const loremIpsum = (
  <p>
    t is a long established fact that a reader will be distracted by the
    readable content of a page when looking at its layout. The point of using
    Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
    opposed to using 'Content here, content here', making it look like readable
    English. Many desktop publishing packages and web page editors now use Lorem
    Ipsum as their default model text, and a search for 'lorem ipsum' will
    uncover many web sites still in their infancy. Various versions have evolved
    over the years, sometimes by accident, sometimes on purpose (injected humour
    and the like).
  </p>
);

export const ScrollableCard: StepComponent = ({
  onAddStep,
  goBack,
  ...otherProps
}) => {
  return (
    <Step {...otherProps}>
      <Card goBack={goBack}>
        <WindowHeader>Long card</WindowHeader>
        <SWindowContent>
          {[loremIpsum, loremIpsum, loremIpsum, loremIpsum, loremIpsum]}
          {onAddStep && <AddStepButtons onAddStep={onAddStep} />}
        </SWindowContent>
      </Card>
    </Step>
  );
};

export const CollapsibleCard: StepComponent = ({
  onAddStep,
  goBack,
  ...otherProps
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <Step {...otherProps}>
      <Card goBack={goBack}>
        <WindowHeader>Collapsible card</WindowHeader>
        <SWindowContent>
          <Button fullWidth onClick={() => setIsExpanded((state) => !state)}>
            Expand
          </Button>
          <div
            style={{
              maxHeight: isExpanded ? "1500px" : 0,
              transition: "max-height ease-in-out 500ms",
              overflow: "hidden",
            }}
          >
            {[loremIpsum, loremIpsum, loremIpsum, loremIpsum, loremIpsum]}
          </div>

          {onAddStep && <AddStepButtons onAddStep={onAddStep} />}
        </SWindowContent>
      </Card>
    </Step>
  );
};

export const FullHeightCard: StepComponent = ({
  onAddStep,
  goBack,
  ...otherProps
}) => (
  <Step {...otherProps}>
    <Card goBack={goBack} style={{ height: `calc(100vh - ${NavbarHeight}px` }}>
      <WindowHeader>Full height card</WindowHeader>
      <SWindowContent>
        {onAddStep && <AddStepButtons onAddStep={onAddStep} />}
      </SWindowContent>
    </Card>
  </Step>
);

export const ShortCard: StepComponent = ({
  onAddStep,
  goBack,
  ...otherProps
}) => (
  <Step {...otherProps}>
    <Card goBack={goBack}>
      <WindowHeader>Short card</WindowHeader>
      <SWindowContent>
        {onAddStep && <AddStepButtons onAddStep={onAddStep} />}
      </SWindowContent>
    </Card>
  </Step>
);

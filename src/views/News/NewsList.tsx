import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";

import { connect, ConnectedProps } from "react-redux";
import { fetchNews } from "../../store/actions/news";

import { timeSince, createMaterialStyles, copyToClipboard } from "../../utils";

import { Divider, Button, Hourglass } from "react95";

import Dropdown from "../../components/Dropdown/Dropdown";
import MenuIcon from "../../components/MenuIcon/MenuIcon";
import { AppDispatch, AppState } from "../../store";

type NewType = ConnectedProps<typeof connector>;

type PropsFromRedux = NewType;

const NewsList = ({ news, fetchNews }: PropsFromRedux) => {
  useLayoutEffect(() => {
    const lazyImages = Array.from(document.querySelectorAll("[data-src]"));
    const options = {
      root: null,
      rootMargin: "400px 0px 1600px 0px",
      threshold: 0,
    };
    const callback: IntersectionObserverCallback = function (
      entries,
      observer
    ) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let lazyImage = entry.target as HTMLImageElement;

          lazyImage.src = lazyImage.dataset.src as string;
          lazyImage.removeAttribute("data-src");
          observer.unobserve(lazyImage);
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    lazyImages.forEach((lazyImage) => {
      observer.observe(lazyImage);
    });
    return () => {
      observer.disconnect();
    };
  }, [news]);

  if (!news) {
    return (
      <Ul>
        <LastItem onVisible={() => fetchNews()} />
      </Ul>
    );
  }
  news = news.sort((a, b) => b.published_on - a.published_on);
  const lastNewsTimestamp = news[news.length - 1].published_on;
  // why sorting here works but not when sorted in API file or in reducer?
  const newsItems = news.map((n) => {
    const date = timeSince(n.published_on);
    const hashtags = n.categories
      .split("|")
      .map((h, i) => <Hashtag key={i}>{` #${h.toLowerCase()} `}</Hashtag>);
    return (
      <Li key={n.id}>
        <article>
          <ArticleSource>
            <SDivider />
            <Row>
              <div>
                <Row>
                  <SourceIMG data-src={n.source_info.img} />
                  <SourceInfo>
                    <SourceName>{n.source}</SourceName>
                    <Time
                      dateTime={new Date(
                        n.published_on * 1000
                      ).toLocaleString()}
                    >
                      {date} ago
                    </Time>
                  </SourceInfo>
                </Row>
              </div>
              <div>
                <ArticleMenu text={n.title} url={n.url} />
              </div>
            </Row>
          </ArticleSource>
          <Square>
            <ArticleIMG data-src={n.imageurl} />
          </Square>
          <ArticleHeader>
            <Title>
              <SourceName as="span">{n.source}</SourceName>
              {n.title}
              <span>{hashtags}</span>
            </Title>
          </ArticleHeader>
        </article>
      </Li>
    );
  });
  return (
    <Ul>
      {newsItems}
      <LastItem onVisible={() => fetchNews(lastNewsTimestamp - 1)} />
    </Ul>
  );
};
const mapStateToProps = (state: AppState) => ({
  news: state.news,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchNews: (timestamp?: number) => dispatch(fetchNews(timestamp)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(NewsList);

const LastItem = ({ onVisible }: { onVisible: () => void }) => {
  const loader = useRef(null);
  useLayoutEffect(() => {
    if (!loader.current) return;
    var options = {
      root: null,
      rootMargin: "400px 0px 3200px 0px",
      threshold: 0,
    };
    var callback: IntersectionObserverCallback = function (entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onVisible();
        }
      });
    };
    var observer = new IntersectionObserver(callback, options);
    observer.observe(loader.current);
    return () => {
      observer.disconnect();
    };
  }, [onVisible]);

  return (
    <Li ref={loader}>
      <article>
        <ArticleSource>
          <SDivider />
          <Row>
            <div>
              <Row>
                {/* <SourceIMG data-src={""} style={{ background: "teal" }} /> */}
                <Hourglass style={{ marginRight: "0.5rem" }} />
                <SourceInfo>
                  <SourceName>Placeholder</SourceName>
                  <Time>loading...</Time>
                </SourceInfo>
              </Row>
            </div>
            <div>
              <ArticleMenu />
            </div>
          </Row>
        </ArticleSource>
        <Square />
        <ArticleHeader>
          <Title>
            <SourceName as="span">Placeholder</SourceName>
            Please be patient. If data won't load in the next few minutes, check
            your modem and internet connection.
          </Title>
        </ArticleHeader>
      </article>
    </Li>
  );
};
let ArticleMenu = ({ url, text }: { url?: string; text?: string }) => (
  <Dropdown
    trigger={({ ...props }) => (
      <Button
        disabled={url === null}
        style={{ fontWeight: "bold" }}
        {...props}
        square
      >
        <MenuIcon horizontal />
      </Button>
    )}
    items={[
      ...(navigator.share
        ? [
            {
              label: "Share",
              onClick: () => {
                navigator
                  .share({
                    url,
                    text,
                    title: document.title,
                  })
                  .then(() => console.log("Successful share"))
                  .catch((error) => console.log("Error sharing", error));
              },
            },
          ]
        : []),
      {
        label: "Copy link",
        onClick: () => {
          url && copyToClipboard(url);
        },
      },
    ].filter((option) => option !== null)}
  />
);

let Ul = styled.ul`
  display: block;
`;
let Li = styled.li`
  display: block;
`;

let ArticleIMG = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  flex-shrink: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
  object-position: center;
`;
let Title = styled.h2`
  font-size: 0.9rem;
  line-height: 1.3;
  padding: 0 0.25rem;
`;
let Hashtag = styled.a`
  color: blue;
  text-decoration: none;
`;
let Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;
let SDivider = styled(Divider)`
  position: absolute;
  top: -0.35rem;
  width: calc(100% - 1rem);
  left: 0.5rem;
`;
let SourceInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.9rem;
`;
let SourceName = styled.h4`
  font-weight: bold;
  font-size: inherit;
  margin-right: 0.5rem;
`;
let Time = styled.time`
  font-size: inherit;
`;
let SourceIMG = styled.img`
  display: inline-block;
  position: relative;
  top: 50%;
  width: 30px;
  height: 30px;
  margin-right: 0.5rem;
  border-radius: 50%;
`;

let ArticleSource = styled.header`
  ${createMaterialStyles("bottom")}
  line-height: 1;
  padding: 0.5rem;
`;
let ArticleHeader = styled.header`
  ${createMaterialStyles("top")}

  padding: 0.5rem 0.5rem 1rem;
`;
let Square = styled.div`
  width: 100%;
  position: relative;
  background: ${({ theme }) => theme.material};
  &:before {
    content: "";
    left: 0;
    top: 0;
    display: block;
    width: 100%;
    padding-top: 75%;
  }
`;

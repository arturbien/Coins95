import React, { useEffect } from "react";
import styled, { css } from "styled-components";

import Dropdown from "../../../components/Dropdown/Dropdown";
import { Divider, Button } from "react95";

import { timeSince } from "../../../utils";

const NewsList = ({ news }) => {
  useEffect(() => {
    const lazyImages = Array.from(document.querySelectorAll("[data-src]"));
    console.log("MOUNTED 🔥", lazyImages);
    var options = {
      root: document.querySelector("#scrollArea"),
      rootMargin: "400px",
      threshold: 0
    };
    var callback = function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          console.log("swag");

          lazyImage.src = lazyImage.dataset.src;
          observer.unobserve(lazyImage);
        }
      });
    };
    var observer = new IntersectionObserver(callback, options);
    lazyImages.forEach(lazyImage => observer.observe(lazyImage));
    return () => {
      observer.disconnect();
    };
  }, []);

  const newsItems = news.map(n => {
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
                <ArticleMenu link={n.url} />
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
  console.log("😂", news);
  return <Ul>{newsItems}</Ul>;
};

export default NewsList;

let ArticleMenu = ({ link }) => (
  <Dropdown
    verticalAlign="bottom"
    horizontalAlign="right"
    trigger={({ ...props }) => (
      <Button style={{ fontWeight: "bold" }} {...props}>
        ...
      </Button>
    )}
    items={[
      {
        label: "Share",
        onClick: () => {
          if (navigator.share) {
            navigator
              .share({
                title: "Web Fundamentals",
                text: "Check out Web Fundamentals — it rocks!",
                url: "https://developers.google.com/web"
              })
              .then(() => console.log("Successful share"))
              .catch(error => console.log("Error sharing", error));
          }
        }
      },
      {
        label: "Copy link",
        onClick: () => {
          navigator.clipboard.writeText(link).then(
            function() {
              alert(`you just copied link: ${link}`);
            },
            function() {
              alert(`cant copy :(`);
            }
          );
        }
      },
      { label: "Swag", onClick: () => undefined }
    ]}
  >
    asdasd
  </Dropdown>
);

let Ul = styled.ul`
  /* padding: 0.5rem; */
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
  height: auto;
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
  top: -0.25rem;
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
  object-fit: contain;
`;

let createMaterialStyles = (top = true) => css`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem;
  background: ${({ theme }) => theme.material};
  border-top: ${({ theme }) =>
    top ? `2px solid ${theme.borderLightest}` : "none"};
  border-bottom: ${({ theme }) =>
    top ? "none" : `2px solid ${theme.borderDarkest}`};
  border-left: 2px solid ${({ theme }) => theme.borderLightest};
  border-right: 2px solid ${({ theme }) => theme.borderDarkest};
  box-shadow: ${({ theme }) => (top ? "none" : "0 4px 10px rgba(0,0,0,0.35)")};
  &:before {
    content: "";
    display: block;
    position: absolute;
    width: calc(100% - 4px);
    height: calc(100% - 2px);
    ${!top ? "bottom: 0px" : "top: 0px"};
    left: 0;
    pointer-events: none;
    border-left: 2px solid ${({ theme }) => theme.borderLight};
    border-right: 2px solid ${({ theme }) => theme.borderDark};
    border-top: ${({ theme }) =>
      top ? `2px solid ${theme.borderLight}` : "none"};
    border-bottom: ${({ theme }) =>
      top ? "none" : `2px solid ${theme.borderDark}`};
  }
`;
let ArticleSource = styled.header`
  ${createMaterialStyles(false)}
`;
let ArticleHeader = styled.header`
  ${createMaterialStyles(true)}
  padding-bottom: 1rem;
`;
let Square = styled.div`
  width: 100%;
  position: relative;

  &:before {
    content: "";
    left: 0;
    top: 0;
    display: block;
    width: 100%;
    padding-top: 100%;
  }
`;

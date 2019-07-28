import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { connect } from "react-redux";

import { fetchNews } from "../../store/actions/news";

import Dropdown from "../../components/Dropdown/Dropdown";
import { Divider, Button, Hourglass } from "react95";

import { timeSince, createMaterialStyles } from "../../utils";

const NewsList = ({ news, fetchNews }) => {
  // useEffect(() => {
  //   fetchNews();
  // }, []);
  useEffect(() => {
    const lazyImages = Array.from(document.querySelectorAll("[data-src]"));
    console.log("MOUNTED 🔥", lazyImages);
    const options = {
      root: null,
      rootMargin: "400px 0px 1600px 0px",
      threshold: 0
    };
    const callback = function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;

          lazyImage.src = lazyImage.dataset.src;
          lazyImage.removeAttribute("data-src");
          observer.unobserve(lazyImage);
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    lazyImages.forEach(lazyImage => {
      lazyImage.style.opacity = 0;
      lazyImage.style.transition = "0.25s all ease-in-out";
      lazyImage.onload = function() {
        lazyImage.style.opacity = 1;
      };
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
  return (
    <Ul>
      {newsItems}
      <LastItem onVisible={() => fetchNews(lastNewsTimestamp - 1)} />
    </Ul>
  );
};
const mapStateToProps = state => ({
  news: state.news
});

const mapDispatchToProps = dispatch => ({
  fetchNews: timestamp => dispatch(fetchNews(timestamp))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsList);

const LastItem = ({ onVisible }) => {
  const loader = useRef(null);
  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "400px 0px 3200px 0px",
      threshold: 0
    };
    var callback = function(entries, observer) {
      entries.forEach(entry => {
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
              <ArticleMenu link={null} />
            </div>
          </Row>
        </ArticleSource>
        <Square style={{ background: "teal" }} />
        <ArticleHeader>
          <Title />
        </ArticleHeader>
      </article>
    </Li>
  );
};
let ArticleMenu = ({ link }) => (
  <Dropdown
    verticalAlign="bottom"
    horizontalAlign="right"
    trigger={({ ...props }) => (
      <Button
        disabled={link === null}
        style={{ fontWeight: "bold" }}
        {...props}
        square
      >
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
  background: teal;
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
  object-fit: contain;
`;

let ArticleSource = styled.header`
  ${createMaterialStyles("bottom")}
`;
let ArticleHeader = styled.header`
  ${createMaterialStyles("top")}
  padding-bottom: 1rem;
`;
let Square = styled.div`
  width: 100%;
  position: relative;
  background: teal;
  &:before {
    content: "";
    left: 0;
    top: 0;
    display: block;
    width: 100%;
    padding-top: 100%;
  }
`;

import React from "react";
import styled, { css } from "styled-components";
import {
  Anchor,
  Divider,
  Cutout,
  Toolbar,
  Window,
  WindowContent,
  WindowHeader
} from "react95";

const Ul = styled.ul`
  /* padding: 0.5rem; */
  display: block;
`;
const Li = styled.li`
  display: block;
`;

const ArticleIMG = styled.img`
  display: block;
  flex-shrink: 0;
  width: 90px;
  height: 90px;
  object-fit: cover;
  width: 100%;
  height: auto;
`;
const Title = styled(Anchor)`
  color: black;
  text-decoration: none;
  padding-right: 0.5rem;
  padding-left: 0.25rem;
`;
const NewsList = ({ news }) => {
  const newsItems = news
    .map(n => (
      <Li>
        <article>
          <ArticleSource>
            <SDivider />
            <Toolbar>
              <SourceIMG src={n.source_info.img} />
              <h4>{n.source}</h4>
            </Toolbar>
          </ArticleSource>

          <ArticleIMG src={n.imageurl} />
          <ArticleHeader>
            <Title>{n.title}</Title>
          </ArticleHeader>
        </article>
      </Li>
    ))
    .splice(0, 10);
  console.log("😂", news);
  return <Ul>{newsItems}</Ul>;
};

export default NewsList;

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
`;

let SDivider = styled(Divider)`
  position: absolute;
  top: -0.25rem;
  width: calc(100% - 1rem);
  left: 0.5rem;
`;
let SourceIMG = styled.img`
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: contain;
`;

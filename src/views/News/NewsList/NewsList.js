import React from "react";
import styled from "styled-components";
import { Divider, Cutout } from "react95";

const Li = styled.li`
  padding: 0.5em 0;
`;

const Square = styled.div`
  position: relative;
  width: 100%;
  &:before {
    content: "";
    display: block;
    padding-top: 55%;
  }
`;
const ArticleIMG = styled.img`
  position: absolute;
  top: 0;
  left: 0
  object-fit: cover;
  display: inline-block;
  width: 100%;
  height: 100%;
`;
const NewsList = ({ news }) => {
  const newsItems = news
    .map(n => (
      <Li>
        <Cutout>
          <Square>
            <ArticleIMG src={n.imageurl} />
          </Square>
        </Cutout>
        <div>{n.title}</div>
        <Divider />
      </Li>
    ))
    .splice(0, 10);
  console.log("😂", news);
  return <ul>{newsItems}</ul>;
};

export default NewsList;

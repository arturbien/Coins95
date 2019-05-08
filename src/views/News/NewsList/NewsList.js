import React from "react";
import styled from "styled-components";
import { Divider, Cutout, Window, WindowContent } from "react95";

const Li = styled.li`
  padding: 0.25rem 0;
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
const SWindow = styled(Window)`
  width: 100%;
`;
const NewsList = ({ news }) => {
  const newsItems = news
    .map(n => (
      <Li>
      <SWindow>

      <WindowContent>
          <Square>
            <ArticleIMG src={n.imageurl} />
          </Square>
        <div>{n.title}</div>
        {/* <Divider /> */}
      </WindowContent>
      </SWindow>
      </Li>
    ))
    .splice(0, 10);
  console.log("😂", news);
  return <ul>{newsItems}</ul>;
};

export default NewsList;

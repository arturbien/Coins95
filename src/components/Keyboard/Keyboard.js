import React, { useState } from "react";
import styled from "styled-components";
import { createMaterialStyles } from "../../utils";
import { Button, Divider } from "react95";
import CryingEmoji from "../../assets/img/emojis/32/face-crying.png";
import emojisList from "./emojis";

const Emoji = styled.img`
  display: inline-block;
  height: 28px;
  width: 28px;
  image-rendering: pixelated;
`;

const Row = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Key = styled(Button)`
  flex-basis: ${({ wider }) => (wider ? `${70 / 5}%` : "10%")};
  padding: 0;

  border-left: 2px solid ${({ theme }) => theme.material};
  border-right: 2px solid ${({ theme }) => theme.material};
  border-top: 4px solid ${({ theme }) => theme.material};
  border-bottom: 4px solid ${({ theme }) => theme.material};

  height: 53px;
  font-size: 1.2rem;
  margin: 0;
  touch-action: manipulation;
`;

const WithTooltip = styled.span`
  position: relative;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 999;
  *:active > &:before {
    content: "";
    display: inline-block;
    position: absolute;
    z-index: 99999;
    top: 0;
    left: 50%;
    transform: translate(-75%, -14px);
    width: 18px;
    height: 12px;
    clip-path: polygon(0.5rem 0, 100% 0, 100% 100%);
    border-right: 2px solid ${({ theme }) => theme.borderDarkest};
    background: ${({ theme }) => theme.tooltip};
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.55);
  }

  *:active > &:after {
    display: flex;
align-items: center;
justify-content: space-around;
content: attr(data-value);
position: absolute;
z-index: 999;
top: -12px;
left: 50%;
transform: translate(-50%, -100%);
background: ${({ theme }) => theme.tooltip};
border: 2px solid ${({ theme }) => theme.borderDarkest};
border-radius: 8px;
width: 120%;
font-size: 2rem;
color: ${({theme}) => theme.borderDarkest};
padding: 0.5rem 0;
    box-shadow: 0 4px 5px 2px rgba(0,0,0,0.55);
  }
`;
const Wrapper = styled.div`
  ${createMaterialStyles("full")}
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 999;
  bottom: var(--safe-area-inset-bottom);
  left: 0;
  right: 0;
  padding: 8px 4px;

  will-change: transform;
  transition: transform 0.25s ease-out;
  ${({ open }) => `transform: translateY(${open ? "30px" : "100"}%);`}
`;
const Space = styled(Key)`
  flex-basis: 50%;
  font-size: 1rem;
`;
const ActionKey = styled(Key)`
  filter: brightness(0.75);
  height: 45px;
  border: none;
  margin: 4px 2px;
  font-size: 1rem;
  flex: 1;
`;

const Backspace = styled(ActionKey)`
  position: absolute;
  right: 0;
  bottom: 100%;
  width: 13%;
`;
const Modifier = styled(ActionKey)`
  position: absolute;
  left: 0;
  bottom: 100%;
  width: 13%;
`;
const Toolbar = styled.div`
  margin-top: 4px;
  padding-left: 2px;
  display: flex;
  align-items: space-between;
`;
const EmojiWrapper = styled.div`
  position: relative;
  &:after, &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 8px;
    z-index: 9999;
  }
  &:before {
    left: 0;
    background: linear-gradient(
      to left,
      ${({ theme }) => theme.material}01,
      ${({ theme }) => theme.material}
    );
  }
  &:after {
    right: 0;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.material}01,
      ${({ theme }) => theme.material},
      ${({ theme }) => theme.material}
    );
  }
`;
const EmojiGroups = styled.div`
width: 100%;
overflow-x: scroll;
display: inline-flex;
padding-bottom: 10px;
`;
const emojiWidth = 41;
const EmojiGroup = styled.div`
  position: relative;
  width: auto;
  float: left;
  padding-right: 16px
`;
const EmojiGroupName = styled.h4`
  color: ${({ theme }) => theme.materialText};
  margin-bottom: 0.5rem;
  margin-top: 0.25rem;
  display: inline-block;
  position: sticky;
  padding-left: 0.5rem;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.8rem;
  left: 0;
`;
const EmojiList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  overflow: auto;
  height: auto;
  width: ${({ itemsCount }) => Math.ceil(itemsCount / 5) * emojiWidth}px;
`;
const EmojiButton = styled.li`
  touch-action: manipulation;
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: ${emojiWidth}px;
  height: ${emojiWidth}px;

`;
const EmojiContent = styled.span`
  display: inline-block;
  font-size: 30px;
  pointer-events: none;
`;
function getLetterRows(modifier = false) {
  const characters = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  return modifier ? characters.map((c) => c.toUpperCase()) : characters;
}
function getNumericalRows(modifier = false) {
  const symbols = [
    ...(modifier ? ["[]{}#%^*+=", "_/|~<>$£¥•"] : ["1234567890", '-/:;()€&@"']),
    ".,?!'",
  ];
  return symbols;
}
function emojiStringToArray(str) {
  let split = str.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/);
  let arr = [];
  for (var i = 0; i < split.length; i++) {
    let char = split[i];
    if (char !== "") {
      arr.push(char);
    }
  }
  return arr;
}
const formattedEmojis = emojisList.map((emojisGroup) => ({
  ...emojisGroup,
  emojis: emojiStringToArray(emojisGroup.emojis),
}));

const Keyboard = React.forwardRef(function Keyboard(props, ref) {
  const { open, value: valueProp, setValue } = props;
  const [numerical, setNumerical] = useState(false);
  // Starting with big letter
  const [modifier, setModifier] = useState(false);
  const [emojis, setEmojis] = useState(false);

  const toggleNumerical = () => setNumerical(!numerical);
  const toggleModifier = () => setModifier(!modifier);
  const toggleEmojis = () => {
    if (emojis) {
      setModifier(false);
      setNumerical(false);
    }
    setEmojis(!emojis);
  };
  const chars = numerical
    ? getNumericalRows(modifier)
    : getLetterRows(modifier);

  const keys = chars.map((row) =>
    row.split("").map((c) => ({
      value: c,
      onClick: () => console.log(c),
    }))
  );
  const handleKeyClick = (e) => {
    const value = e.target.dataset.value;
    if (value) {
      if (!numerical && modifier) {
        setModifier(false);
      }
      if (value === "backspace") {
        setValue(valueProp.slice(0, -1));
      } else {
        setValue(valueProp + value);
      }
      console.log(value);
    }
  };
  return (
    <Wrapper onClick={handleKeyClick} ref={ref} open={open}>
      {emojis ? (
        <EmojiWrapper>
          <EmojiGroups>
          {formattedEmojis.map((emojiGroup) => (
            <EmojiGroup>
              <EmojiGroupName>{emojiGroup.title}</EmojiGroupName>
              <EmojiList itemsCount={emojiGroup.emojis.length}>
                {emojiGroup.emojis.map((emoji) => (
                  <EmojiButton role="button" data-value={emoji} key={emoji}>
                    <WithTooltip data-value={emoji}><EmojiContent aria-label={emoji}>{emoji}</EmojiContent></WithTooltip>
                  </EmojiButton>
                ))}
              </EmojiList>
            </EmojiGroup>
          ))}
          </EmojiGroups>
        </EmojiWrapper>
        
      ) : (
        // <Divider />
        <>
          {keys.map((row, i) => (
            <Row key={i}>
              {row.map((c) => (
                <Key wider={numerical && i === 2} data-value={c.value}>
                  <WithTooltip data-value={c.value}>{c.value}</WithTooltip>
                </Key>
              ))}
            </Row>
          ))}

          <Row>
            {numerical ? (
              <Modifier onClick={toggleModifier}>
                {modifier ? "123" : "#+="}
              </Modifier>
            ) : (
              <Modifier onClick={toggleModifier} active={modifier}>
                {modifier ? "Lo" : "Up"}
              </Modifier>
            )}
            <ActionKey onClick={toggleNumerical}>
              {numerical ? "ABC" : "123"}
            </ActionKey>
            <Space data-value=" ">Space</Space>
            <ActionKey>Enter</ActionKey>
            <Backspace data-value="backspace">-</Backspace>
          </Row>
        </>
      )}
      <Divider />

      <Toolbar>
        <Button square variant="menu" size="lg" onClick={toggleEmojis}>
          {emojis ? "ABC" : <Emoji src={CryingEmoji} />}
        </Button>
      </Toolbar>
    </Wrapper>
  );
});

export default Keyboard;

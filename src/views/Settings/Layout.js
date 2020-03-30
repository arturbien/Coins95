import React, { useState } from "react";
import styled from "styled-components";

import {
  Tab,
  Tabs,
  TabBody,
  Fieldset,
  Radio,
  Button,
  Checkbox,
  Slider,
  Select
} from "react95";

import { backgrounds } from "../../store/reducers/user";

import Fullpage from "../../components/Fullpage/Fullpage";
import Monitor from "./Monitor";

import useLockBodyScroll from "../../hooks/useLockBodyScroll";

const SField = styled.div`
  margin-bottom: 20px;
`;

const Pad = styled.div`
  padding: 16px;
`

const Layout = ({
  theme,
  setTheme,
  background,
  setBackground,
  vintageFont,
  toggleVintageFont,
  fontSize,
  setFontSize,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  useLockBodyScroll();
  return (
    <Fullpage style={{ paddingTop: "0.5rem" }}>
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tab value={0}>Background</Tab>
        <Tab value={1}>Appearance</Tab>
        <Tab value={2}>Text</Tab>
        {/* <Tab value={2}>About</Tab> */}
      </Tabs>
      <TabBody style={{ height: 490 }}>
      {activeTab === 0 && (
          <>
            <Monitor backgroundColor={backgrounds[background].value} />
            <Fieldset label="Wallpaper:">
              <Select
                height={145}
                onChange={value =>
                  setBackground(
                    backgrounds.findIndex(item => item.value === value)
                  )
                }
                items={backgrounds}
                selectedIndex={background}
              />
              <Button
                style={{
                  padding: "0 40px",
                  float: "right",
                  marginTop: "0.5rem"
                }}
                disabled
              >
                Browse...
              </Button>
              {/* <input type="color" /> */}
            </Fieldset>
          </>
        )}
        {activeTab === 1 && (
          <SField>
            <Fieldset label="Theme:">
              <Radio
                value="default"
                onChange={() => setTheme("default")}
                checked={theme === "default"}
                label="default"
              />
              <br />
              <Radio
                value="rose"
                onChange={() => setTheme("rose")}
                checked={theme === "rose"}
                label="🌹 Rose"
              />
              <br />
              <Radio
                value="rainyDay"
                onChange={() => setTheme("rainyDay")}
                checked={theme === "rainyDay"}
                label="☔️ Rainy Day"
              />
              <br />
              <Radio
                value="plum"
                onChange={() => setTheme("plum")}
                checked={theme === "plum"}
                label="🌸 Plum"
              />
              <br />
              <Radio
                value="marine"
                onChange={() => setTheme("marine")}
                checked={theme === "marine"}
                label="🛳 Marine"
              />
              <br />
              <Radio
                value="eggplant"
                onChange={() => setTheme("eggplant")}
                checked={theme === "eggplant"}
                label="🍆 Eggplant"
              />
              <br />
              <Radio
                value="storm"
                onChange={() => setTheme("storm")}
                checked={theme === "storm"}
                label="⛈ Storm"
              />
              <br />
              <Radio
                value="candy"
                onChange={() => setTheme("candy")}
                checked={theme === "candy"}
                label="🍭 Candy"
              />
              <br />
              <Radio
                value="modernDark"
                onChange={() => setTheme("modernDark")}
                checked={theme === "modernDark"}
                label="📟 Modern Dark"
              />
              <br />
              <Radio
                value="lilac"
                onChange={() => setTheme("lilac")}
                checked={theme === "lilac"}
                label="🍇 Lilac"
              />
            </Fieldset>
          </SField>
        )}
        {activeTab === 2 && (
          <>
            <SField>
              <Fieldset label="Font:">
                <Checkbox
                  style={{}}
                  name="vintageFont"
                  value="vintageFont"
                  label="Vintage font"
                  onChange={() => toggleVintageFont(!vintageFont)}
                  checked={vintageFont}
                />
              </Fieldset>
            </SField>
            <SField>
              <Fieldset label="Size:">
                <Pad>

                  <Slider
                  min={0.8}
                  max={1.2}
                  step={null}
                  value={fontSize}
                  onChange={val => setFontSize(val)}
                  marks={[
                    { value: 0.8, label: '0.8' },
                    { value: 0.9, label: '0.9' },
                    { value: 1, label: '1' },
                    { value: 1.1, label: '1.1' },
                    { value: 1.2, label: '1.2' },
                  ]}
                  />
                  </Pad>
              </Fieldset>
            </SField>
          </>
        )}
      </TabBody>
    </Fullpage>
  );
};

export default Layout;

// const Text = styled.div`
//   line-height: 1.5;
// `;

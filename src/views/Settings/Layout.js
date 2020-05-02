import React, { useState } from "react";
import styled, { css } from "styled-components";
import { createDisabledTextStyles } from "../../utils";

import {
  Tab,
  Tabs,
  TabBody,
  Fieldset,
  Radio,
  Checkbox,
  Slider,
  Select,
  ColorInput,
} from "react95";

import Fullpage from "../../components/Fullpage/Fullpage";
import Monitor from "./Monitor";

import useLockBodyScroll from "../../hooks/useLockBodyScroll";

const Layout = ({
  theme,
  setTheme,
  scanLines,
  toggleScanLines,
  scanLinesIntensity,
  setScanLinesIntensity,
  background,
  backgrounds,
  setBackground,
  setCustomBackground,
  vintageFont,
  toggleVintageFont,
  fontSize,
  setFontSize,
}) => {
  console.log("Settings: ", backgrounds);
  const [activeTab, setActiveTab] = useState(0);
  const handleChange = (e, value) => setActiveTab(value);
  useLockBodyScroll();
  return (
    <Fullpage style={{ paddingTop: "0.5rem" }}>
      <Tabs value={activeTab} onChange={handleChange}>
        <Tab value={0}>Background</Tab>
        <Tab value={1}>Appearance</Tab>
        <Tab value={2}>System</Tab>
        {/* <Tab value={2}>About</Tab> */}
      </Tabs>
      <TabBody style={{ height: 510 }}>
        {activeTab === 0 && (
          <>
            <Monitor backgroundColor={background.value} />
            <Fieldset label="Wallpaper:" style={{ marginTop: 20 }}>
              <Select
                width="100%"
                onChange={(e) =>
                  setBackground(
                    backgrounds.find((b) => b.value === e.target.value)
                  )
                }
                menuMaxHeight={300}
                options={backgrounds}
                value={background.value}
              />
              <CustomColorField
                isDisabled={backgrounds[0].value !== background.value}
              >
                <label>Custom color:</label>
                <ColorInput
                  value={backgrounds[0].value}
                  onChange={(e) => setCustomBackground(e.target.value)}
                  disabled={backgrounds[0].value !== background.value}
                />
              </CustomColorField>
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
                value="travel"
                onChange={() => setTheme("travel")}
                checked={theme === "travel"}
                label="🧳 Travel"
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
                value="spruce"
                onChange={() => setTheme("spruce")}
                checked={theme === "spruce"}
                label="🥬 Spruce"
              />
              <br />
              <Radio
                value="molecule"
                onChange={() => setTheme("molecule")}
                checked={theme === "molecule"}
                label="🧪 Molecule"
              />
              <br />
              <Radio
                value="theSixtiesUSA"
                onChange={() => setTheme("theSixtiesUSA")}
                checked={theme === "theSixtiesUSA"}
                label="🌷 The 60's USA"
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
                value="tokyoDark"
                onChange={() => setTheme("tokyoDark")}
                checked={theme === "tokyoDark"}
                label="📟 Tokyo Dark"
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
                  name="vintageFont"
                  value="vintageFont"
                  label="Vintage font"
                  onChange={() => toggleVintageFont(!vintageFont)}
                  checked={vintageFont}
                />
                <Pad>
                  <SliderLabel>Size:</SliderLabel>
                  <Slider
                    min={0.8}
                    max={1.2}
                    step={null}
                    value={fontSize}
                    onChange={(e, val) => setFontSize(val)}
                    marks={[
                      { value: 0.8, label: "0.8" },
                      { value: 0.9, label: "0.9" },
                      { value: 1, label: "1" },
                      { value: 1.1, label: "1.1" },
                      { value: 1.2, label: "1.2" },
                    ]}
                  />
                </Pad>
              </Fieldset>
            </SField>
            <SField></SField>
            <SField>
              <Fieldset
                label={
                  <Checkbox
                    style={{}}
                    name="scanLines"
                    value="scanLines"
                    label="Scan lines"
                    onChange={() => toggleScanLines(!scanLines)}
                    checked={scanLines}
                  />
                }
              >
                <Pad>
                  <SliderLabel isDisabled={!scanLines}>Intensity:</SliderLabel>
                  <Slider
                    disabled={!scanLines}
                    step={10}
                    min={0}
                    max={100}
                    marks={[
                      { value: 0, label: "min" },
                      { value: 100, label: "max" },
                    ]}
                    value={scanLinesIntensity}
                    onChange={(e, val) => setScanLinesIntensity(val)}
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

const CustomColorField = styled.div`
  float: right;
  margin-right: 0px;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  label {
    font-size: 1rem;
    padding-right: 1rem;
    ${({ isDisabled }) =>
      isDisabled &&
      css`
        ${createDisabledTextStyles()}
      `}
  }
`;

const SField = styled.div`
  margin-bottom: 30px;
`;

const SliderLabel = styled.label`
  display: inline-block
  margin-bottom: 0.5rem;
  margin-left: -1rem;
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      ${createDisabledTextStyles()}
    `}
`;
const Pad = styled.div`
  padding: 8px 16px;
`;

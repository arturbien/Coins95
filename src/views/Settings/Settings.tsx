import React, { useState } from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";

import { AppDispatch, AppState } from "../../store";
import { Background, Color } from "../../store/reducers/user";
import { ThemeName } from "../../themes";

import { createDisabledTextStyles } from "../../utils";

import {
  Checkbox,
  ColorInput,
  Desktop,
  Fieldset,
  Radio,
  Select,
  Slider,
  Tab,
  TabBody,
  Tabs,
} from "react95";

import Fullpage from "../../components/Fullpage/Fullpage";

import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import {
  setBackground,
  setCustomBackground,
  setFontSize,
  setScanLinesIntensity,
  setTheme,
  toggleScanLines,
  toggleVintageFont,
} from "../../store/actions/user";
import { SelectOption } from "react95/dist/Select/Select.types";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const Settings = ({
  theme,
  setTheme,
  background,
  backgrounds,
  setBackground,
  setCustomBackground,
  scanLines,
  toggleScanLines,
  setScanLinesIntensity,
  scanLinesIntensity,
  vintageFont,
  toggleVintageFont,
  fontSize,
  setFontSize,
}: Props) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (
    e: React.MouseEvent | React.TouchEvent,
    value: number
  ) => setActiveTab(value);

  const onBackgroundChange = (e: SelectOption<string>) => {
    const newBackground = backgrounds.find(
      (b) => b.value === e.value
      // TODO: is this a good approach?
    );
    newBackground && setBackground(newBackground);
  };
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
            <CenteredDesktop
              backgroundStyles={{ background: background.value }}
            />
            <select onChange={(e) => {}}></select>
            <Fieldset label="Wallpaper:" style={{ marginTop: 20 }}>
              <Select
                width="100%"
                onChange={onBackgroundChange}
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
              {/* {Object.keys(themesLabels).map((themeName) => (
                <>
                  <Radio
                    value={themeName}
                    onChange={() => setTheme(themeName)}
                    checked={theme === themeName}
                    label={themesLabels[themeName]}
                  />
                  <br />
                </>
              ))} */}
              <Radio
                value="original"
                onChange={() => setTheme("original")}
                checked={theme === "original"}
                label="original"
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
                value="olive"
                onChange={() => setTheme("olive")}
                checked={theme === "olive"}
                label="🍸 Olive"
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
                value="vaporTeal"
                onChange={() => setTheme("vaporTeal")}
                checked={theme === "vaporTeal"}
                label="💨 Vapor Teal"
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
                    onChange={(_, val) => setFontSize(val)}
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

const mapStateToProps = (state: AppState) => ({
  theme: state.user.theme,
  background: state.user.background,
  backgrounds: state.user.backgrounds,
  vintageFont: state.user.vintageFont,
  scanLines: state.user.scanLines,
  scanLinesIntensity: state.user.scanLinesIntensity,
  fontSize: state.user.fontSize,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setTheme: (theme: ThemeName) => dispatch(setTheme(theme)),
  toggleVintageFont: (vintageFont: boolean) =>
    dispatch(toggleVintageFont(vintageFont)),
  setFontSize: (fontSize: number) => dispatch(setFontSize(fontSize)),
  toggleScanLines: (scanLinesOn: boolean) =>
    dispatch(toggleScanLines(scanLinesOn)),
  setScanLinesIntensity: (intensity: number) =>
    dispatch(setScanLinesIntensity(intensity)),
  setBackground: (background: Background) =>
    dispatch(setBackground(background)),
  setCustomBackground: (color: Color) => dispatch(setCustomBackground(color)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

const CustomColorField = styled.div<{ isDisabled: boolean }>`
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

const SliderLabel = styled.label<{ isDisabled?: boolean }>`
  display: inline-block;
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

const CenteredDesktop = styled(Desktop)`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

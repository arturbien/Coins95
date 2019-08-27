import React, { useState } from "react";
// import styled from "styled-components";

import {
  Tab,
  Tabs,
  TabBody,
  Fieldset,
  Radio,
  Button,
  Checkbox,
  Select
} from "react95";

import { backgrounds } from "../../store/reducers/user";

import Fullpage from "../../components/Fullpage/Fullpage";
import Monitor from "./Monitor";

import useLockBodyScroll from "../../hooks/useLockBodyScroll";

const Layout = ({
  theme,
  setTheme,
  background,
  setBackground,
  vintageFont,
  toggleVintageFont
}) => {
  const [activeTab, setActiveTab] = useState(0);
  useLockBodyScroll();
  return (
    <Fullpage style={{ paddingTop: "0.5rem" }}>
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tab value={0}>Appearance</Tab>
        <Tab value={1}>Background</Tab>
        <Tab value={2}>Settings</Tab>
      </Tabs>
      <div style={{ height: 400 }}>
        {activeTab === 0 && (
          <TabBody>
            <Fieldset label="Theme:">
              <Radio
                value="default"
                onChange={() => setTheme("default")}
                checked={theme === "default"}
                label="default"
              />
              <br />
              <Radio
                value="coldGray"
                onChange={() => setTheme("coldGray")}
                checked={theme === "coldGray"}
                label="🍇 grape"
              />
            </Fieldset>
            <Fieldset label="Font:" style={{ marginTop: "1.5rem" }}>
              <Checkbox
                style={{}}
                name="vintageFont"
                value="vintageFont"
                label="Vintage font"
                onChange={() => toggleVintageFont(!vintageFont)}
                checked={vintageFont}
              />
            </Fieldset>
          </TabBody>
        )}
        {activeTab === 1 && (
          <TabBody>
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
            </Fieldset>
          </TabBody>
        )}
        {activeTab === 2 && <TabBody>Clothing stuff here</TabBody>}
      </div>
    </Fullpage>
  );
};

export default Layout;

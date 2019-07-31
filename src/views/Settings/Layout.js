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

import Fullpage from "../../components/Fullpage/Fullpage";
import Monitor from "./Monitor";

import useLockBodyScroll from "../../hooks/useLockBodyScroll";

const Layout = ({ theme, setTheme, vintageFont, toggleVintageFont }) => {
  const [activeTab, setActiveTab] = useState(0);
  useLockBodyScroll();
  return (
    <Fullpage>
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
                style={{ width: "100%" }}
                value="default"
                onChange={() => setTheme("default")}
                checked={theme === "default"}
                label="default"
              />
              <Radio
                style={{ width: "100%" }}
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
            <Monitor />
            <Fieldset label="Wallpaper:">
              <Select
                items={[
                  { value: "teal", label: "Teal" },
                  { value: "clouds", label: "Clouds" },
                  { value: "swaggin", label: "My six pack" }
                ]}
                selectedIndex={0}
              />
              <Button style={{ padding: "0 40px", float:"right", marginTop:"0.5rem" }}>Browse...</Button>
            </Fieldset>
          </TabBody>
        )}
        {activeTab === 2 && <TabBody>Clothing stuff here</TabBody>}
      </div>
    </Fullpage>
  );
};

export default Layout;

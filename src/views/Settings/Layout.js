import React, { useState } from "react";
import styled from "styled-components";

import {
  Tab,
  Tabs,
  TabBody,
  Fieldset,
  Radio,
  NumberField,
  Checkbox
} from "react95";

import Fullpage from "../../components/Fullpage/Fullpage";

import useLockBodyScroll from "../../hooks/useLockBodyScroll";

const Layout = ({ theme, setTheme, vintageFont, toggleVintageFont }) => {
  const [activeTab, setActiveTab] = useState(0);
  useLockBodyScroll();
  return (
    <Fullpage>
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tab value={0}>Appearance</Tab>
        <Tab value={1}>Account</Tab>
        <Tab value={2}>Info</Tab>
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
            {" "}
            <Fieldset label="Theme:">
              <div style={{ padding: "0.5em 0 0.5em 0" }}>Amount:</div>
              <NumberField
                width={"100%"}
                min={0}
                value={0}
                onChange={() => null}
              />
            </Fieldset>
          </TabBody>
        )}
        {activeTab === 2 && <TabBody>Clothing stuff here</TabBody>}
      </div>
    </Fullpage>
  );
};

export default Layout;

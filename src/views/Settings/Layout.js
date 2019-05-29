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

const Layout = () => {
  const [activeTab, setActiveTab] = useState(0);

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
              <Radio style={{ width: "100%" }} checked label="default" />
              <Radio style={{ width: "100%" }} label="🍇 grape" />
              <Radio style={{ width: "100%" }} label="🥝 kiwi" />
              <Radio style={{ width: "100%" }} label="🦎 custom" disabled />
            </Fieldset>
            <Fieldset label="Font:" style={{ marginTop: "1.5rem" }}>
              <Checkbox
                style={{}}
                name="vintageFont"
                value="vintageFont"
                label="Vintage font"
                onChange={() => null}
                defaultChecked={true}
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
              <Checkbox
                style={{ marginTop: "1rem" }}
                name="shipping"
                value="fast"
                label="Fast shipping"
                onChange={() => null}
                defaultChecked={true}
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

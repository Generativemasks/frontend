import React from "react";
import { Story, Meta } from "@storybook/react";

import TopPageTemplate, { TopPageTemplateProps } from "./TopPageTemplate";
import { HashRouter } from "react-router-dom";

export default {
  title: "templates/TopPageTemplate",
  component: TopPageTemplate,
} as Meta;

const Template: Story<TopPageTemplateProps> = (args) => (
  <HashRouter>
    <TopPageTemplate {...args} />
  </HashRouter>
);

export const Default = Template.bind({});
Default.args = {
  account: "",
};

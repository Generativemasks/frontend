import React from "react";
import { Story, Meta } from "@storybook/react";

import FirstArt, { ArtProps } from "./FirstArt";

export default {
  title: "atoms/arts/FirstArt",
  component: FirstArt,
} as Meta;

const Template: Story<ArtProps> = (args) => <FirstArt {...args} />;

export const Default = Template.bind({});
Default.args = {
  setP5Object: () => {},
};

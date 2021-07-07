import * as React from "react";
import { Story, Meta } from "@storybook/react";

import FourthArt from "./FourthArt";
import { ArtProps } from "./FirstArt";

export default {
  title: "atoms/arts/FourthArt",
  component: FourthArt,
} as Meta;

const Template: Story<ArtProps> = (args) => <FourthArt {...args} />;

export const Default = Template.bind({});
Default.args = {
  setP5Object: () => {},
};

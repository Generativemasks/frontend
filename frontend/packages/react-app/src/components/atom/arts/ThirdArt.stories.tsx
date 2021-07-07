import * as React from "react";
import { Story, Meta } from "@storybook/react";

import ThirdArt from "./ThirdArt";
import { ArtProps } from "./FirstArt";

export default {
  title: "atoms/arts/ThirdArt",
  component: ThirdArt,
} as Meta;

const Template: Story<ArtProps> = (args) => <ThirdArt {...args} />;

export const Default = Template.bind({});
Default.args = {
  setP5Object: () => {},
};

import * as React from "react";
import { Story, Meta } from "@storybook/react";

import SecondArt from "./SecondArt";
import { ArtProps } from "./FirstArt";

export default {
  title: "atoms/arts/SecondArt",
  component: SecondArt,
} as Meta;

const Template: Story<ArtProps> = (args) => <SecondArt {...args} />;

export const Default = Template.bind({});
Default.args = {
  setP5Object: () => {},
};

import * as React from "react";
import { Story, Meta } from "@storybook/react";

import PurchasePageTemplate, {
  DetailPageTemplateProps,
} from "./PurchasePageTemplate";
import { HashRouter } from "react-router-dom";
import { ethers } from "ethers";

export default {
  title: "templates/PurchasePageTemplate",
  component: PurchasePageTemplate,
} as Meta;

const Template: Story<DetailPageTemplateProps> = (args) => (
  <HashRouter>
    <PurchasePageTemplate {...args} />
  </HashRouter>
);

export const Default = Template.bind({});
Default.args = {
  account: "",
};

export const WalletIsConnected = Template.bind({});
WalletIsConnected.args = {
  ...Default.args,
  account: "0x09177D096e3Fa5823B3b2182677b02b0aA01277C",
  walletBalance: ethers.utils.parseEther("100"),
  amount: 1,
};

export const InsufficientBalance = Template.bind({});
InsufficientBalance.args = {
  ...Default.args,
  account: "0x09177D096e3Fa5823B3b2182677b02b0aA01277C",
  walletBalance: ethers.utils.parseEther("0.09"),
  amount: 1,
};

import * as React from "react";
import { Story, Meta } from "@storybook/react";

import PurchasePageTemplate, {
  DetailPageTemplateProps,
} from "./PurchasePageTemplate";
import { HashRouter } from "react-router-dom";
import { BigNumber, ethers } from "ethers";

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
  buy: () => {},
  sendBuyState: {
    status: "None",
  },
  price: ethers.utils.parseEther("0.1"),
};

export const WalletIsConnected = Template.bind({});
WalletIsConnected.args = {
  ...Default.args,
  account: "0x09177D096e3Fa5823B3b2182677b02b0aA01277C",
  remainingAmount: BigNumber.from(10000),
  sendBuyState: { status: "None" },
  walletBalance: ethers.utils.parseEther("100"),
  amount: 1,
};

export const InsufficientBalance = Template.bind({});
InsufficientBalance.args = {
  ...Default.args,
  account: "0x09177D096e3Fa5823B3b2182677b02b0aA01277C",
  sendBuyState: { status: "None" },
  remainingAmount: BigNumber.from(10000),
  walletBalance: ethers.utils.parseEther("0.09"),
  amount: 1,
};

export const Purchasing = Template.bind({});
Purchasing.args = {
  ...WalletIsConnected.args,
  sendBuyState: {
    status: "Mining",
    transaction: {
      hash:
        "0x8320577362182484b59c97922e6a61e93832482cf802e09f676b65c0719ba426",
    },
  },
  amount: 1,
};

export const Success = Template.bind({});
Success.args = {
  ...Purchasing.args,
  imageURL:
    "https://images.unsplash.com/photo-1626200115283-4c0c73f0f4f7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
  sendBuyState: {
    ...Purchasing.args.sendBuyState,
    status: "Success",
  },
  amount: 1,
};

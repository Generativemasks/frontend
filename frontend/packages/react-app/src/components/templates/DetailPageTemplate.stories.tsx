import * as React from "react";
import { Story, Meta } from "@storybook/react";

import DetailPageTemplate, {
  DetailPageTemplateProps,
} from "./DetailPageTemplate";
import { HashRouter } from "react-router-dom";
import { BigNumber, ethers } from "ethers";
import { arts } from "./TopPageTemplate";

export default {
  title: "templates/DetailPageTemplate",
  component: DetailPageTemplate,
} as Meta;

const Template: Story<DetailPageTemplateProps> = (args) => (
  <HashRouter>
    <DetailPageTemplate {...args} />
  </HashRouter>
);

export const Default = Template.bind({});
Default.args = {
  artId: "1",
  art: arts[1],
  account: "",
  p5Object: {},
  setP5Object: (p5: any) => {},
  purchaseArt: () => {},
  artData: {
    art: {
      price: ethers.utils.parseEther("0.03"),
      remainingAmount: 5,
    },
  },
  sendBuyState: {
    status: "None",
  },
  walletBalance: ethers.utils.parseEther("0.03"),
};

export const WalletIsConnected = Template.bind({});
WalletIsConnected.args = {
  ...Default.args,
  account: "0x09177D096e3Fa5823B3b2182677b02b0aA01277C",
  artData: {
    art: {
      price: ethers.utils.parseEther("0.03"),
      remainingAmount: 5,
    },
  },
  sendBuyState: { status: "None" },
};

export const InsufficientBalance = Template.bind({});
InsufficientBalance.args = {
  ...Default.args,
  account: "0x09177D096e3Fa5823B3b2182677b02b0aA01277C",
  artData: {
    art: {
      price: ethers.utils.parseEther("0.03"),
      remainingAmount: 5,
    },
  },
  sendBuyState: { status: "None" },
  walletBalance: ethers.utils.parseEther("0.029"),
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
};

export const Success = Template.bind({});
Success.args = {
  ...Purchasing.args,
  sendBuyState: {
    ...Purchasing.args.sendBuyState,
    status: "Success",
  },
};

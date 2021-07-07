/*
 *     Copyright (C) 2021 TART K.K.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see https://www.gnu.org/licenses/.
 */

import * as React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import EtherscanLink, { EtherscanLinkProps } from "./EtherscanLink";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Atoms/EtherscanLink",
  component: EtherscanLink,
} as Meta;

const Template: Story<EtherscanLinkProps> = (args) => (
  <BrowserRouter>
    <EtherscanLink {...args} />
  </BrowserRouter>
);

export const Transaction = Template.bind({});
Transaction.args = {
  txHash: "0xd07cbde817318492092cc7a27b3064a69bd893c01cb593d6029683ffd290ab3a",
};

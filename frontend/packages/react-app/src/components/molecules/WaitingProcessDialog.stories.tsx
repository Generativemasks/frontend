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
import { Meta, Story } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import WaitingProcessDialog, {
  WaitingProcessDialogProps,
} from "./WaitingProcessDialog";

export default {
  title: "Molecules/WaitingProcessDialog",
  component: WaitingProcessDialog,
} as Meta;

const Template: Story<WaitingProcessDialogProps> = (args) => (
  <BrowserRouter>
    <WaitingProcessDialog {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  transactionStatus: {
    status: "None",
  },
};

export const Mining = Template.bind({});
Mining.args = {
  transactionStatus: {
    status: "Mining",
    transaction: {
      hash:
        "0x8320577362182484b59c97922e6a61e93832482cf802e09f676b65c0719ba426",
    },
  },
};

export const Success = Template.bind({});
Success.args = {
  transactionStatus: {
    status: "Success",
    transaction: {
      hash:
        "0x8320577362182484b59c97922e6a61e93832482cf802e09f676b65c0719ba426",
    },
  },
};

export const Fail = Template.bind({});
Fail.args = {
  transactionStatus: {
    status: "Fail",
    transaction: {
      hash:
        "0x8320577362182484b59c97922e6a61e93832482cf802e09f676b65c0719ba426",
    },
  },
};

export const Error = Template.bind({});
Error.args = {
  transactionStatus: {
    status: "Exception",
    transaction: {
      hash:
        "0x8320577362182484b59c97922e6a61e93832482cf802e09f676b65c0719ba426",
    },
  },
};

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
import { Link, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

export interface EtherscanLinkProps {
  readonly txHash: string;
  readonly small?: boolean;
}

const URLs: { [network: string]: { [type: string]: string } } = {
  "1": {
    tx: "https://etherscan.io/tx/{txHash}",
  },
  "4": {
    tx: "https://rinkeby.etherscan.io/tx/{txHash}",
  },
};

const EtherscanLink: React.FC<EtherscanLinkProps> = ({
  txHash,
  small = false,
}) => {
  const network: string = process.env?.REACT_APP_CHAIN_ID ?? "1";
  const URL = URLs[network];

  const link = URL.tx.replace("{txHash}", txHash);

  if (txHash === "") {
    return null;
  }

  return (
    <Typography align="center" style={{ fontSize: small ? "14px" : "1rem" }}>
      <Link href={link} target="_blank">
        View on Etherscan&nbsp;&nbsp;
        <FontAwesomeIcon
          icon={faExternalLinkAlt}
          size={small ? "sm" : undefined}
        />
      </Link>
    </Typography>
  );
};

export default EtherscanLink;

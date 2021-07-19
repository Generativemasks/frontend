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
import { Button, Link, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { useMemo } from "react";

type Market = "opensea" | "rarible";

export interface MarketplaceLinkProps {
  readonly chainId: string;
  readonly market: Market;
  readonly address: string;
  readonly tokenId?: string;
  readonly small?: boolean;
}

const baseURLs: { [chainId: string]: { opensea: string; rarible: string } } = {
  "1": {
    opensea: "https://opensea.io/",
    rarible: "https://rarible.com/",
  },
  "4": {
    opensea: "https://testnets.opensea.io/",
    rarible: "https://rinkeby.rarible.com/",
  },
};

const MarketplaceLink: React.FC<MarketplaceLinkProps> = ({
  chainId,
  market,
  address,
  tokenId,
  small = false,
}) => {
  const baseUrl: string | undefined = baseURLs?.[chainId]?.[market];
  const name = market === "opensea" ? "OpenSea" : "Rarible";
  const link = useMemo(() => {
    if (market === "opensea" && tokenId === undefined) {
      return `${baseUrl}${address}`;
    }
    if (market === "opensea") {
      return `${baseUrl}assets/${address}/${tokenId}`;
    }
    if (tokenId === undefined) {
      return `${baseUrl}${address}`;
    }
    return `${baseUrl}token/${address}:${tokenId}`;
  }, [market, baseUrl, address, tokenId]);

  if (baseUrl === undefined) {
    return null;
  }

  const handleClick = () => {
    window.open(link, "_blank");
  };
  return (
    <>
      <Button size="small" color="primary" onClick={handleClick}>
        {name}&nbsp;&nbsp;
        <FontAwesomeIcon
          icon={faExternalLinkAlt}
          size={small ? "sm" : undefined}
        />
      </Button>
    </>
  );
};

export default MarketplaceLink;

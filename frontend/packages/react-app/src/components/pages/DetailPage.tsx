import React, { useMemo, useState } from "react";

// @ts-ignore
import { addresses, abis } from "@project/contracts";
import { useContractFunction, useEtherBalance, useEthers } from "@usedapp/core";
import { useParams, RouteComponentProps } from "react-router-dom";
import { Contract } from "@ethersproject/contracts";
import { ethers } from "ethers";
import DetailPageTemplate from "../templates/DetailPageTemplate";
import { arts } from "../templates/TopPageTemplate";

interface DetailPageProps extends RouteComponentProps {}

const defaultPrice = ethers.utils.parseEther("0.03");

const DetailPage = (props: DetailPageProps) => {
  const { artId } = useParams<{ artId: string }>();
  const { account, library, chainId } = useEthers();
  const walletBalance = useEtherBalance(account);
  const [imageURL, setImageURL] = useState("");
  const [isPurchasing, setIsPurchasing] = useState(false);
  const art = useMemo(() => {
    return arts.find((art) => art.id.toString() === artId);
  }, [artId]);

  const masksContract = new Contract(
    process.env?.REACT_APP_NFT_ADDRESS ?? "",
    new ethers.utils.Interface(abis.art),
    library?.getSigner()
  );

  const { send: sendBuy, state: sendBuyState } = useContractFunction(
    masksContract,
    "buy"
  );

  return (
    <DetailPageTemplate
      art={art}
      account={account}
      chainId={chainId}
      sendBuyState={sendBuyState}
      isPurchasing={isPurchasing}
      imageURL={imageURL}
      walletBalance={walletBalance}
    />
  );
};

export default DetailPage;

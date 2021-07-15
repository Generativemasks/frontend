import React, { useState } from "react";

// @ts-ignore
import { abis } from "@project/contracts";
import { useContractFunction, useEtherBalance, useEthers } from "@usedapp/core";
import { RouteComponentProps } from "react-router-dom";
import { Contract } from "@ethersproject/contracts";
import PurchasePageTemplate from "../templates/PurchasePageTemplate";
import useGetPrice from "../../hooks/useGetPrice";
import useGetRemainingAmount from "../../hooks/useGetRemainingAmount";

interface DetailPageProps extends RouteComponentProps {}

const PurchasePage = (props: DetailPageProps) => {
  const { account, library, chainId } = useEthers();
  const walletBalance = useEtherBalance(account);
  const [amount, setAmount] = useState(1);
  const [imageURL, setImageURL] = useState("");
  const [isPurchasing, setIsPurchasing] = useState(false);
  const price = useGetPrice();
  const remainingAmount = useGetRemainingAmount();

  const masksContract: Contract = new Contract(
    process.env.REACT_APP_NFT_ADDRESS ?? "",
    abis.nft
  );

  const { send: sendBuy, state: sendBuyState } = useContractFunction(
    masksContract as Contract,
    "buy"
  );

  console.debug(
    chainId,
    price,
    walletBalance?.toString(),
    process.env.REACT_APP_NFT_ADDRESS ?? ""
  );

  return (
    <PurchasePageTemplate
      account={account}
      amount={amount}
      setAmount={setAmount}
      chainId={chainId}
      sendBuyState={sendBuyState}
      isPurchasing={isPurchasing}
      imageURL={imageURL}
      walletBalance={walletBalance}
      remainingAmount={remainingAmount}
      price={price}
      buy={sendBuy}
    />
  );
};

export default PurchasePage;

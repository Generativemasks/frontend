import React, { useState } from "react";

// @ts-ignore
import { abis } from "@project/contracts";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { RouteComponentProps } from "react-router-dom";
import PurchasePageTemplate from "../templates/PurchasePageTemplate";

interface DetailPageProps extends RouteComponentProps {}

const PurchasePage = (props: DetailPageProps) => {
  const { account, chainId } = useEthers();
  const walletBalance = useEtherBalance(account);
  const [amount, setAmount] = useState(1);
  const [imageURL, setImageURL] = useState("");
  const [isPurchasing, setIsPurchasing] = useState(false);

  return (
    <PurchasePageTemplate
      account={account}
      amount={amount}
      setAmount={setAmount}
      chainId={chainId}
      isPurchasing={isPurchasing}
      imageURL={imageURL}
      walletBalance={walletBalance}
    />
  );
};

export default PurchasePage;

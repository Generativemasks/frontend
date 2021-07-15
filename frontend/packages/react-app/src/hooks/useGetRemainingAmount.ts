import { useContractCall } from "@usedapp/core";

// @ts-ignore
import { abis } from "@project/contracts";
import { BigNumber, ethers } from "ethers";

const useGetRemainingAmount = (): BigNumber | undefined => {
  const [amount] = useContractCall({
    abi: new ethers.utils.Interface(abis.nft),
    address: process.env.REACT_APP_NFT_ADDRESS ?? "",
    method: "remainingAmount",
    args: [],
  }) ?? [undefined];

  return amount;
};

export default useGetRemainingAmount;

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/react-hooks";

// @ts-ignore
import { addresses, abis } from "@project/contracts";
// @ts-ignore
import IpfsHttpClient from "ipfs-http-client";
import { GET_ART } from "../../graphql/subgraph";
import { useContractFunction, useEtherBalance, useEthers } from "@usedapp/core";
import { useParams, RouteComponentProps } from "react-router-dom";
import { Contract } from "@ethersproject/contracts";
import { BigNumber, ethers } from "ethers";
import useAxios from "axios-hooks";
import DetailPageTemplate from "../templates/DetailPageTemplate";
import { arts } from "../templates/TopPageTemplate";

export const IPFS_PINNING_API =
  "https://rf0xlqny1b.execute-api.ap-northeast-1.amazonaws.com/Prod/pinning/pinByHash";

interface DetailPageProps extends RouteComponentProps {
  artId: string;
}

const infura = { host: "ipfs.infura.io", port: 5001, protocol: "https" };
const ipfs = IpfsHttpClient(infura);
const defaultPrice = ethers.utils.parseEther("0.03");

const DetailPage = (props: DetailPageProps) => {
  const { artId } = useParams<{ artId: string }>();
  const { loading, error, data } = useQuery(GET_ART, {
    variables: {
      id: artId,
    },
  });
  const { account, library, chainId } = useEthers();
  const walletBalance = useEtherBalance(account);
  const [imageURL, setImageURL] = useState("");
  const [imageCid, setImageCid] = useState("");
  const [metadataCid, setMetadataCid] = useState("");
  const [generateCount, setGenerateCount] = useState(0);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [p5Object, setP5Object] = useState<any>();
  const [isImagePinned, setIsImagePinned] = useState<boolean>(false);
  const [isMetadataPinned, setIsMetadataPinned] = useState<boolean>(false);
  const [generateArt, setGenerateArt] = useState(false);
  const [isErroredOnPinning, setIsErroredOnPinning] = useState(false);
  const [{ error: pinningError }, postPinning] = useAxios(
    {
      url: IPFS_PINNING_API,
      method: "POST",
    },
    { manual: true }
  );
  const art = useMemo(() => {
    return arts.find((art) => art.id.toString() === artId);
  }, [artId]);

  useEffect(() => {
    if (p5Object === undefined) {
      return;
    }
    p5Object.get().canvas.toBlob(async (blob: Blob | null) => {
      if (blob === null) {
        return;
      }
      setImageURL(URL.createObjectURL(blob));
    });
  }, [p5Object]);

  useEffect(() => {
    if (loading) {
      return;
    }
    setGenerateArt(true);
    setGenerateCount(generateCount + 1);
  }, [loading]);

  const artContract = new Contract(
    process.env?.REACT_APP_ART_ADDRESS ?? "",
    new ethers.utils.Interface(abis.art),
    library?.getSigner()
  );
  const { send: sendBuy, state: sendBuyState } = useContractFunction(
    artContract,
    "buy"
  );

  useEffect(() => {
    const f = async () => {
      if (metadataCid === "" || imageCid === "") {
        return;
      }
      const errorOnMetadataPinning = await postPinning({
        data: { hashToPin: metadataCid },
      })
        .then(() => false)
        .catch(() => true);
      if (errorOnMetadataPinning) {
        setIsErroredOnPinning(true);
        return;
      }
      setIsMetadataPinned(true);
      const errorOnImagePinning = await postPinning({
        data: { hashToPin: imageCid },
      })
        .then(() => false)
        .catch(() => true);
      if (errorOnImagePinning) {
        setIsErroredOnPinning(true);
        return;
      }
      setIsImagePinned(true);
    };
    f();
  }, [
    metadataCid,
    imageCid,
    postPinning,
    setIsMetadataPinned,
    setIsImagePinned,
  ]);

  useEffect(() => {
    if (
      imageCid === "" ||
      metadataCid === "" ||
      !isImagePinned ||
      !isMetadataPinned
    ) {
      return;
    }
    sendBuy(artId, metadataCid, { value: data.art.price });
  }, [imageCid, metadataCid, isImagePinned, isMetadataPinned, artId, data]);

  const purchaseArt = useCallback(async () => {
    if (p5Object === undefined || art === undefined) {
      return;
    }
    setIsPurchasing(true);
    const artNumber = BigNumber.from(data.art.price)
      .mul(1000)
      .sub(defaultPrice.mul(1000))
      .div(ethers.utils.parseUnits("1000", "finney"))
      .toString();

    const image = p5Object.get();
    image.canvas.toBlob(async (blob: Blob | null) => {
      if (blob === null) {
        return;
      }
      const { path: imageCid } = await ipfs.add(blob);
      setImageCid(imageCid);

      const metadata = {
        name: `${art.name} No. ${artNumber}`,
        description: art.description.ja + "\n\n" + art.description.en,
        image: `ipfs://${imageCid}`,
        external_url: window.location.origin,
      };
      const { path: metadataCid } = await ipfs.add(JSON.stringify(metadata));
      setMetadataCid(metadataCid);
    });
  }, [p5Object, ipfs, data, sendBuy, artId, art]);

  return (
    <DetailPageTemplate
      artId={artId}
      art={art}
      account={account}
      p5Object={p5Object}
      setP5Object={setP5Object}
      purchaseArt={purchaseArt}
      artData={data}
      chainId={chainId}
      sendBuyState={sendBuyState}
      generateArt={generateArt}
      setGenerateArt={setGenerateArt}
      generateCount={generateCount}
      setGenerateCount={setGenerateCount}
      isPurchasing={isPurchasing}
      imageURL={imageURL}
      isErroredOnPinning={isErroredOnPinning}
      walletBalance={walletBalance}
    />
  );
};

export default DetailPage;

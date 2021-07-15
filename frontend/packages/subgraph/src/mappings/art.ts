import { Art, Token } from "../types/schema";
import {
  GenerativeArtCollectible,
  AddArt,
  BuyArt,
  Transfer as TransferEvent,
} from "../types/GenerativeArtCollectible/GenerativeArtCollectible";
import { Address, BigInt, log } from "@graphprotocol/graph-ts";

export function handleAddArt(event: AddArt): void {
  handleArt(event.params.artId, event.address);
}

export function handleBuyArt(event: BuyArt): void {
  handleArt(event.params.artId, event.address);

  let tokenId = event.params.tokenId;
  let token = Token.load(tokenId.toString());
  if (token == null) {
    token = new Token(tokenId.toString());
  }

  token.art = event.params.artId.toString();
  token.owner = event.params.buyer.toHexString();
  let art = GenerativeArtCollectible.bind(event.address);
  let tokenURI = art.try_tokenURI(tokenId);
  if (tokenURI.reverted) {
    log.warning("Token URI not found. Campaign: {}", [tokenId.toString()]);
  } else {
    token.tokenURI = tokenURI.value;
  }

  token.save();
}

export function handleArt(artId: BigInt, contract: Address): void {
  let art = Art.load(artId.toString());
  if (art == null) {
    art = new Art(artId.toString());
  }

  let artContract = GenerativeArtCollectible.bind(contract);
  let price = artContract.try_priceOf(artId.toI32());
  if (price.reverted) {
    log.warning("Price not found. Campaign: {}", [artId.toString()]);
  } else {
    art.price = price.value;
  }
  let remainingAmount = artContract.try_remainingAmountOf(artId.toI32());
  if (remainingAmount.reverted) {
    log.warning("Remaining amount not found. Campaign: {}", [artId.toString()]);
  } else {
    art.remainingAmount = BigInt.fromI32(remainingAmount.value);
  }

  art.save();
}

export function handleTransfer(event: TransferEvent): void {
  let tokenId = event.params.tokenId;
  let token = Token.load(tokenId.toString());
  if (token == null) {
    token = new Token(tokenId.toString());
  }

  token.owner = event.params.to.toHexString();

  token.save();
}

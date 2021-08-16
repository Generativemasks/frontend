import React, { useEffect, useState } from "react";

// @ts-ignore
import { addresses, abis } from "@project/contracts";
import { ChainId, Config, shortenIfAddress, useEthers } from "@usedapp/core";
import { Backdrop, Button, Modal } from "@material-ui/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { InjectedConnector } from "@web3-react/injected-connector";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

export const injected = new InjectedConnector({ supportedChainIds: [1, 4] });

export const WalletButton = ({ account }: { account?: string | null }) => {
  const { activate, activateBrowserWallet } = useEthers();
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const rpc: any =
    process.env.REACT_APP_CHAIN_ID === "4"
      ? { 4: "https://rinkeby.infura.io/v3/d355bf426d534bccb6e9b0f69c7b1625" }
      : { 1: "https://mainnet.infura.io/v3/d355bf426d534bccb6e9b0f69c7b1625" };
  const walletConnectConnector = new WalletConnectConnector({
    rpc,
    supportedChainIds: [
      process.env.REACT_APP_CHAIN_ID === "4"
        ? ChainId.Rinkeby
        : ChainId.Mainnet,
    ],
  });

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected);
      }
    });
  }, [activate]);

  return (
    <>
      <Button
        color="inherit"
        variant="outlined"
        onClick={() => {
          if (!account) {
            setOpen(true);
          } else {
            return;
          }
        }}
      >
        {!account ? "Connect Wallet" : shortenIfAddress(account)}
      </Button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Connect Wallet with</h2>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => {
              activateBrowserWallet();
              setOpen(false);
            }}
            style={{ marginRight: 16 }}
          >
            Metamask
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => {
              activate(walletConnectConnector);
              setOpen(false);
            }}
          >
            WalletConnect
          </Button>
        </div>
      </Modal>
    </>
  );
};

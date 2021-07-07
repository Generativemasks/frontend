import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import { ChainId } from "@usedapp/core";
import { useMemo } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

export interface ChainModalProps {
  readonly chainId: ChainId | undefined;
}

export default function ChainModal({ chainId }: ChainModalProps) {
  const classes = useStyles();
  const open = useMemo(() => {
    if (chainId == undefined) {
      return false;
    }
    return process.env.REACT_APP_CHAIN_ID !== chainId.toString();
  }, [chainId]);

  const network =
    process.env.REACT_APP_CHAIN_ID === "4" ? "Rinkeby" : "Mainnet";

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2>Switch to a supported Ethereum network</h2>
            <p>Please switch network to {network}.</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

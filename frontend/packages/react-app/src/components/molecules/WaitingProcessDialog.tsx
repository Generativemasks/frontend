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

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  CircularProgress,
  Button,
} from "@material-ui/core";
import EtherscanLink from "../atom/EtherscanLink";
import { useHistory } from "react-router-dom";

export interface WaitingProcessDialogProps {
  readonly transactionStatus: any;
  readonly isPurchasing: boolean;
  readonly imageURL: string;
  readonly isErroredOnPinning: boolean;
}

const WaitingProcessDialog: React.FC<WaitingProcessDialogProps> = ({
  transactionStatus,
  isPurchasing,
  imageURL,
  isErroredOnPinning,
}) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const history = useHistory();

  useEffect(() => {
    if (isErroredOnPinning) {
      setMessages([
        "Failed to purchase",
        "(Possibly wallet balance is insufficient).",
        "Please reload an app and try again.",
      ]);
      return;
    }
    switch (transactionStatus.status) {
      case "Mining":
        setMessages([]);
        break;
      case "Success":
        setMessages([]);
        break;
      case "Fail":
      case "Exception":
        setMessages([
          "Failed to purchase",
          "(Possibly wallet balance is insufficient).",
          "Please reload an app and try again.",
        ]);
        break;
      default:
        if (isPurchasing) {
          setMessages(["Starting transaction..."]);
        } else {
          setMessages([]);
        }
    }
  }, [isErroredOnPinning, isPurchasing, transactionStatus]);

  useEffect(() => {
    if (isPurchasing || transactionStatus.status !== "None") {
      setOpen(true);
    }
  }, [isPurchasing, transactionStatus.status]);

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} maxWidth="xs">
      <DialogTitle id="simple-dialog-title">
        {transactionStatus.status === "Success"
          ? "You've successfully purchased the art!"
          : "Purchasing art."}
      </DialogTitle>
      <Box m={2} textAlign="center">
        {messages.map((message: string, index: number) => (
          <Typography key={index}>{message}</Typography>
        ))}
        {((!isErroredOnPinning &&
          isPurchasing &&
          transactionStatus.status === "None") ||
          transactionStatus.status === "Mining") && (
          <>
            <Typography>Please wait at the same screen.</Typography>
            <Box m={2}>
              <EtherscanLink
                txHash={transactionStatus?.transaction?.hash ?? ""}
              />
            </Box>
            <Box m={2}>
              <CircularProgress color="secondary" />
            </Box>
          </>
        )}
        {transactionStatus.status === "Success" && (
          <>
            <img src={imageURL} style={{ width: "100%", height: "100%" }} />
            <Box m={2}>
              <EtherscanLink
                txHash={transactionStatus?.transaction?.hash ?? ""}
              />
            </Box>
          </>
        )}
        {(isErroredOnPinning ||
          transactionStatus.status === "Fail" ||
          transactionStatus.status === "Exception") && (
          <>
            <Box m={2}>
              <EtherscanLink
                txHash={transactionStatus?.transaction?.hash ?? ""}
              />
            </Box>
            <Box m={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => window.location.reload()}
              >
                Reload page
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Dialog>
  );
};

export default WaitingProcessDialog;
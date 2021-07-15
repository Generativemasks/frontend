import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { formatEther } from "ethers/lib/utils";
import { AppHeader } from "../molecules/AppHeader";
import {
  Button,
  Checkbox,
  Container,
  Grid,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { AppFooter } from "../molecules/AppFooter";
import { WalletButton } from "../pages/TopPage";
import { ChainId } from "@usedapp/core";
import ChainModal from "../molecules/ChainModal";
import WaitingProcessDialog from "../molecules/WaitingProcessDialog";
import ReactConfetti from "react-confetti";
import QRCode from "qrcode.react";

// @ts-ignore
import { addresses, abis } from "@project/contracts";
import { BigNumber } from "ethers";
import { Smartphone } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    marginTop: 64,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "100%",
  },
  cardContent: {
    flexGrow: 1,
  },
  connectInfo: {
    position: "relative",
    display: "inline-block",
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    padding: 8,
    borderRadius: 6,
    "&:after": {
      position: "absolute",
      content: '""',
      bottom: "-5px",
      left: "50%",
      width: 8,
      height: 8,
      borderBottom: `1px solid ${theme.palette.primary.main}`,
      borderRight: `1px solid ${theme.palette.primary.main}`,
      background: "#fff",
      transform: "translateX(-50%) rotate(45deg)",
    },
  },
  flexBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  itemName: {
    fontSize: "0.875rem",
    paddingRight: 8,
  },
  container: {
    display: "flex",
    alignItems: "center",
    maxWidth: 1024,
    [theme.breakpoints.down(800)]: {
      display: "block",
    },
  },
  imgContent: {
    width: "60%",
    [theme.breakpoints.down(800)]: {
      width: "100%",
    },
  },
  infoContent: {
    width: "40%",
    padding: theme.spacing(2),
    textAlign: "center",
    [theme.breakpoints.down(800)]: {
      width: "100%",
    },
  },
  icon: {
    boxShadow: "none",
    marginBottom: theme.spacing(2),
    "&:active": {
      boxShadow: "none",
    },
    [theme.breakpoints.down(800)]: {
      display: "none",
    },
  },
  qrCode: {
    [theme.breakpoints.down(800)]: {
      display: "none",
    },
  },
  spButton: {
    display: "none",
    [theme.breakpoints.down(800)]: {
      display: "flex",
    },
  },
  sampleImage: {
    position: "relative",
  },
  undefinedImage: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    display: "flex",
    justifyContent: "center",
  },
}));

export interface DetailPageTemplateProps {
  readonly art: any;
  readonly account?: string | null;
  readonly chainId: ChainId | undefined;
  readonly sendBuyState: any;
  readonly isPurchasing: boolean;
  readonly imageURL: string;
  readonly remainingAmount: BigNumber | undefined;
  readonly price: BigNumber | undefined;
  readonly purchaseArt: () => void;
  readonly walletBalance: BigNumber | undefined;
}

const DetailPageTemplate = ({
  account,
  chainId,
  isPurchasing,
  imageURL,
  price,
  purchaseArt,
  remainingAmount,
  sendBuyState,
  walletBalance,
}: DetailPageTemplateProps) => {
  const classes = useStyles();
  const [progress, setProgress] = useState(false);
  const [checked, setChecked] = useState(true);

  const isInsufficient = useMemo(() => {
    if (walletBalance === undefined || price === undefined) {
      return false;
    }
    return walletBalance.sub(price).isNegative();
  }, [walletBalance]);

  useEffect(() => {
    if (imageURL === "") {
      return;
    }

    setProgress(false);
  }, [imageURL]);

  return (
    <div>
      {sendBuyState.status === "Success" && <ReactConfetti />}
      <WaitingProcessDialog
        transactionStatus={sendBuyState}
        isPurchasing={isPurchasing}
        imageURL={imageURL}
      />
      <ChainModal chainId={chainId} />
      <AppHeader account={account} />
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h3"
            align="center"
            color="textPrimary"
            gutterBottom
            style={{
              overflowWrap: "break-word",
            }}
          >
            Generativemasks
          </Typography>
        </Container>
      </div>
      <Container className={classes.container}>
        <Grid container className={classes.imgContent}>
          <Grid item xs={12} style={{ marginBottom: 16 }}>
            <div className={classes.sampleImage}>
              <img
                src={"/images/sample-colored.gif"}
                style={{ width: "100%", height: "100%" }}
                alt=""
              />
              <div className={classes.undefinedImage}>
                <img
                  src="/images/undefined.png"
                  alt="?"
                  style={{
                    width: "50%",
                  }}
                />
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container className={classes.infoContent}>
          <Grid item xs={12}>
            {!!remainingAmount && !!price && (
              <div style={{ marginBottom: 16, textAlign: "center" }}>
                <Typography>
                  <span className={classes.itemName}>Remaining amount:</span>
                  {remainingAmount.toNumber()} / 10000
                </Typography>
                <Typography>
                  <span className={classes.itemName}>Price:</span>
                  <span style={{ fontSize: "1.65rem" }}>
                    {formatEther(price.toString())} ETH
                  </span>
                </Typography>
                {isInsufficient && walletBalance && (
                  <Typography color="error">
                    <span className={classes.itemName}>
                      Insufficient wallet balance:
                    </span>
                    <span>{formatEther(walletBalance.toString())} ETH</span>
                  </Typography>
                )}
              </div>
            )}
            {!account && (
              <div className={classes.flexBox} style={{ marginBottom: 16 }}>
                <div className={classes.connectInfo}>
                  To purchase an art,
                  <br /> connect your wallet first 👛
                </div>
              </div>
            )}
            {!!account && !!remainingAmount ? (
              <div style={{ textAlign: "center" }}>
                <Button
                  onClick={purchaseArt}
                  variant="contained"
                  color="primary"
                  style={{ fontWeight: "bold" }}
                  disabled={
                    price === undefined ||
                    remainingAmount.eq(0) ||
                    !checked ||
                    isInsufficient
                  }
                  size="large"
                  disableElevation
                >
                  {remainingAmount.eq(0) ? "Sold out" : "Purchase Now!"}
                </Button>
                <div
                  style={{
                    marginTop: 16,
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    color="primary"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                  />
                  <span>
                    I agree with the
                    <Link
                      href="https://www.notion.so/tart/WIP-94e269077baa4eda9afdba8fb51bb825"
                      target="_blank"
                      rel="noopener"
                      style={{
                        paddingLeft: 8,
                      }}
                    >
                      Terms & Conditions
                    </Link>
                  </span>
                </div>
              </div>
            ) : (
              <div className={classes.flexBox}>
                <WalletButton />
              </div>
            )}
            {!window.ethereum?.isMetaMask && (
              <>
                <div className={classes.flexBox} style={{ marginTop: 16 }}>
                  <Typography>or</Typography>
                </div>
                <div
                  className={classes.spButton}
                  style={{ marginTop: 16, marginBottom: 16 }}
                >
                  <Button
                    className={classes.spButton}
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      window.open(
                        `https://metamask.app.link/dapp/${window.location.host}/#/arts/`
                      );
                    }}
                    fullWidth
                    disableElevation
                    style={{ marginBottom: 40 }}
                    startIcon={<Smartphone />}
                    disabled={progress}
                  >
                    Use metamask
                  </Button>
                </div>
              </>
            )}
            <div
              className={classes.qrCode}
              style={{ marginTop: 16, marginBottom: 16 }}
            >
              <div className={classes.flexBox} style={{ marginBottom: 16 }}>
                <Typography>
                  Or scan QR code
                  <br />
                  to use metamask app.
                </Typography>
              </div>
              <div className={classes.flexBox}>
                <QRCode
                  value={`https://metamask.app.link/dapp/${window.location.host}/#/arts/`}
                  size={80}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      <AppFooter />
    </div>
  );
};

export default DetailPageTemplate;

import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { formatEther } from "ethers/lib/utils";
import { AppHeader } from "../molecules/AppHeader";
import {
  Avatar,
  Button,
  Checkbox,
  Chip,
  Container,
  Grid,
  IconButton,
  Link,
  makeStyles,
  TextField,
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
import {
  AddBoxOutlined,
  IndeterminateCheckBoxOutlined,
  Smartphone,
} from "@material-ui/icons";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    position: "relative",
    padding: theme.spacing(8, 0, 4),
  },
  purchaseContent: {
    position: "relative",
    padding: theme.spacing(0, 0, 2),
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
  titleContent: {
    display: "block",
    [theme.breakpoints.down(600)]: {
      fontSize: "1.8rem",
    },
  },
  headerImage: {
    positon: "relative",
    marginTop: 64,
    paddingTop: "20%",
    [theme.breakpoints.down(600)]: {
      marginTop: 56,
      paddingTop: "60%",
      backgroundSize: "contain",
      backgroundRepeat: "repeat",
    },
  },
  iconImage: {
    width: 130,
    height: 130,
    position: "absolute",
    top: "-100px",
    left: "50%",
    transform: "translateX(-50%)",
    border: "8px solid #fff",
    borderRadius: "50%",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      width: 146,
      height: 146,
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: "50%",
    },
    "&::after": {
      position: "absolute",
      content: '""',
      bottom: "-16px",
      left: "50%",
      width: 14,
      height: 14,
      borderBottom: `2px solid ${theme.palette.primary.main}`,
      borderRight: `2px solid ${theme.palette.primary.main}`,
      background: "#fff",
      transform: "translateX(-50%) rotate(45deg)",
    },
  },
  creatorInfo: {
    maxWidth: "100%",
  },
  creatorInfoInner: {
    padding: theme.spacing(6),
    [theme.breakpoints.down(600)]: {
      padding: theme.spacing(6, 0, 2),
    },
  },
  creatorInfoFrame: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: theme.spacing(3),
    borderRadius: 6,
    backgroundColor: "#fff",
    border: `1px solid ${theme.palette.primary.main}`,
    display: "flex",
    [theme.breakpoints.down(600)]: {
      display: "block",
    },
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down(600)]: {
      margin: "0 auto",
    },
  },
  creatorLabel: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    position: "absolute",
    top: "-40px",
    left: -14,
    width: 90,
    padding: "0 8px",
    fontWeight: "bold",
    zIndex: 2,
    borderRadius: 3,
    textAlign: "center",
    lineHeight: "28px",
    "&::after": {
      position: "absolute",
      content: '""',
      bottom: "-2px",
      left: "50%",
      width: 14,
      height: 14,
      backgroundColor: theme.palette.primary.main,
      transform: "translateX(-50%) rotate(45deg)",
      zIndex: -1,
    },
    [theme.breakpoints.down(600)]: {
      top: "-50px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: 8,
    },
  },
  linkWrapper: {
    display: "flex",
    [theme.breakpoints.down(600)]: {
      display: "block",
      marginTop: theme.spacing(2),
    },
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
  descriptionContainer: {
    maxWidth: 1024,
  },
  imgContent: {
    width: "100%",
    paddingBottom: 16,
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
  enText: {
    fontSize: 16,
    padding: "0px 16px",
    [theme.breakpoints.down(800)]: {
      display: "block",
      padding: 0,
    },
  },
  listText: {
    position: "relative",
    paddingLeft: 22,
    "&::before": {
      content: `""`,
      width: 5,
      height: 5,
      borderRadius: "50%",
      backgroundColor: "#000",
      position: "absolute",
      display: "block",
      left: 8,
      top: 8,
    },
  },
  blockStyle: {
    backgroundColor: "#fff",
    border: "1px solid #E86D64",
    borderRadius: 3,
    padding: 22,
    boxSizing: "border-box",
    height: "100%",
  },
  background: {
    "&::before": {
      content: `""`,
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: "url(/images/cover.jpg)",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
  },
}));

export interface DetailPageTemplateProps {
  readonly amount: number;
  readonly setAmount: (amount: number) => void;
  readonly account: string | null | undefined;
  readonly chainId: ChainId | undefined;
  readonly sendBuyState: any;
  readonly isPurchasing: boolean;
  readonly imageURL: string;
  readonly remainingAmount: BigNumber | undefined;
  readonly price: BigNumber | undefined;
  readonly buy: (amount: number, config: object) => void;
  readonly walletBalance: BigNumber | undefined;
}

const PurchasePageTemplate = ({
  amount,
  setAmount,
  account,
  chainId,
  isPurchasing,
  imageURL,
  price,
  buy,
  remainingAmount,
  sendBuyState,
  walletBalance,
}: DetailPageTemplateProps) => {
  const classes = useStyles();

  const [progress, setProgress] = useState(false);
  const [checked, setChecked] = useState(false);

  const isInsufficient = useMemo(() => {
    if (walletBalance === undefined || price === undefined) {
      return false;
    }
    return walletBalance.sub(price.mul(amount)).isNegative();
  }, [walletBalance, price, amount]);

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
        chainId={chainId}
        account={account}
      />
      <ChainModal chainId={chainId} />
      <AppHeader account={account} />
      <div className={classes.background}>
        <div className={classes.headerImage}>
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.9)",
              position: "relative",
              zIndex: 11,
            }}
          >
            <div className={classes.heroContent}>
              <div className={classes.iconImage}>
                <img
                  src="/images/icon.png"
                  alt=""
                  style={{
                    width: "100%",
                    borderRadius: "50%",
                    position: "relative",
                    zIndex: 2,
                  }}
                />
              </div>
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h3"
                  align="center"
                  color="textPrimary"
                  className={classes.titleContent}
                  style={{
                    overflowWrap: "break-word",
                  }}
                >
                  Generativemasks
                </Typography>
                <div style={{ textAlign: "center", marginBottom: 40 }}>
                  <Chip
                    label="Created by @takawo"
                    color="primary"
                    clickable
                    onClick={() => {
                      window.open("https://twitter.com/takawo", "_blank");
                    }}
                  />
                </div>
              </Container>
              <Container className={classes.descriptionContainer}>
                <Grid container className={classes.imgContent}>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={3}
                    style={{ padding: 8, marginBottom: 16 }}
                  >
                    <img
                      src={"/images/masks/msks_0.png"}
                      style={{ width: "100%", height: "100%" }}
                      alt=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={3}
                    style={{ padding: 8, marginBottom: 16 }}
                  >
                    <img
                      src={"/images/masks/msks_1.png"}
                      style={{ width: "100%", height: "100%" }}
                      alt=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={3}
                    style={{ padding: 8, marginBottom: 16 }}
                  >
                    <img
                      src={"/images/masks/msks_2.png"}
                      style={{ width: "100%", height: "100%" }}
                      alt=""
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={3}
                    style={{ padding: 8, marginBottom: 16 }}
                  >
                    <img
                      src={"/images/masks/msks_3.png"}
                      style={{ width: "100%", height: "100%" }}
                      alt=""
                    />
                  </Grid>
                </Grid>
              </Container>
              <Container
                className={classes.descriptionContainer}
                style={{ paddingTop: 20, marginBottom: 42 }}
              >
                <Typography
                  variant="body1"
                  align="left"
                  color="textPrimary"
                  paragraph
                  className={classes.enText}
                >
                  Generativemasks is an 10,000 unique NFT arts created with
                  Generative Art. This NFT "generates" unique masks with
                  different expressions one by one, and you can enjoy different
                  colors of the masks every time you reload them on the NFT
                  marketplace.
                </Typography>
                <Typography
                  variant="body1"
                  align="left"
                  color="textPrimary"
                  paragraph
                  className={classes.enText}
                >
                  The inspiration for this work came from discovering a sense of
                  life in geometric patterns that are symmetrically arranged.
                  With unexpected shapes and patterns, I tried to express the
                  scary yet somehow charming atmosphere of Native American totem
                  poles and indigenous Japanese Yokai.
                </Typography>
              </Container>
              <Container className={classes.descriptionContainer}>
                <Typography
                  component="h2"
                  variant="h4"
                  align="center"
                  color="textPrimary"
                  className={classes.titleContent}
                  style={{
                    overflowWrap: "break-word",
                  }}
                >
                  Roadmap
                </Typography>
                <Typography
                  variant="body1"
                  align="left"
                  color="textPrimary"
                  paragraph
                  className={classes.enText}
                >
                  The Generativemasks team is now developing the following
                  roadmap. We'll explore more new content while interacting with
                  the community.
                </Typography>
                <Grid
                  container
                  className={classes.imgContent}
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
                  style={{ alignItems: "strech" }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    style={{ padding: 8, marginBottom: 16 }}
                  >
                    <div className={classes.blockStyle}>
                      <Typography
                        variant="subtitle2"
                        color="primary"
                        style={{ fontWeight: "bold" }}
                      >
                        Block 01
                      </Typography>
                      <Typography
                        component="h3"
                        variant="h5"
                        color="primary"
                        style={{ fontWeight: "bold" }}
                        gutterBottom
                      >
                        Contribution
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        className={classes.listText}
                      >
                        The artist, Shunsuke Takawo, will donate all of his
                        proceeds to the community for the further development of
                        the industry.
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        className={classes.listText}
                      >
                        We’ll keep focusing on building a system to support the
                        artists who love Creative Coding so they can enjoy and
                        continue creating their beautiful works.
                      </Typography>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    style={{ padding: 8, marginBottom: 16 }}
                  >
                    <div className={classes.blockStyle}>
                      <Typography
                        variant="subtitle2"
                        color="primary"
                        style={{ fontWeight: "bold" }}
                      >
                        Block 02
                      </Typography>
                      <Typography
                        component="h3"
                        variant="h5"
                        color="primary"
                        style={{ fontWeight: "bold" }}
                        gutterBottom
                      >
                        Metaverse
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        className={classes.listText}
                      >
                        Planning to buy some lands on Decentraland and build
                        galleries and other facilities there.
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        className={classes.listText}
                      >
                        Making it to have avatars on Decentraland actually wear
                        the masks.
                      </Typography>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    style={{ padding: 8, marginBottom: 16 }}
                  >
                    <div className={classes.blockStyle}>
                      <Typography
                        variant="subtitle2"
                        color="primary"
                        style={{ fontWeight: "bold" }}
                      >
                        Block 03
                      </Typography>
                      <Typography
                        component="h3"
                        variant="h5"
                        color="primary"
                        style={{ fontWeight: "bold" }}
                        gutterBottom
                      >
                        Future
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        className={classes.listText}
                      >
                        Offering official printouts of Generativemasks.
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        className={classes.listText}
                      >
                        Making a photo book of the works.
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        className={classes.listText}
                        gutterBottom
                      >
                        Providing the real carved wood masks.
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Container>
              <Container className={classes.descriptionContainer}>
                <Typography
                  component="h2"
                  variant="h4"
                  align="center"
                  color="textPrimary"
                  className={classes.titleContent}
                  style={{
                    overflowWrap: "break-word",
                  }}
                >
                  Charity
                </Typography>
                <Typography
                  variant="body1"
                  align="left"
                  color="textPrimary"
                  paragraph
                  className={classes.enText}
                >
                  The artist, Takawo, will be donating all of his personal sales
                  from the project to the following organizations and companies.
                </Typography>
                <Grid
                  container
                  className={classes.imgContent}
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
                  style={{ alignItems: "strech" }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    style={{ padding: 8, marginBottom: 8 }}
                  >
                    <div className={classes.blockStyle}>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        className={classes.listText}
                      >
                        Processing Foundation
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        className={classes.listText}
                      >
                        Processing Community Japan
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        className={classes.listText}
                      >
                        OpenProcessing
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        className={classes.listText}
                      >
                        NEORT
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        className={classes.listText}
                      >
                        Coolors
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Container>
            </div>
            <div className={classes.purchaseContent}>
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h4"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                  className={classes.titleContent}
                  style={{
                    overflowWrap: "break-word",
                  }}
                >
                  Purchase here
                </Typography>
              </Container>
            </div>
            <Container className={classes.container}>
              <Grid container className={classes.imgContent}>
                <Grid item xs={12} style={{ marginBottom: 16 }}>
                  <div className={classes.sampleImage}>
                    <img
                      src={"/images/unrevealed.gif"}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid container className={classes.infoContent}>
                <Grid item xs={12}>
                  {!!account && (
                    <div style={{ marginBottom: 16, textAlign: "center" }}>
                      <Typography gutterBottom>
                        <span className={classes.itemName}>
                          Number of purchases:
                        </span>
                      </Typography>
                      <IconButton
                        onClick={() => {
                          if (amount === undefined) {
                            setAmount(1);
                            return;
                          }
                          if (amount <= 1) {
                            return;
                          }
                          setAmount(amount - 1);
                        }}
                        area-label="minus"
                      >
                        <IndeterminateCheckBoxOutlined />
                      </IconButton>
                      <TextField
                        variant="outlined"
                        style={{ width: "20%" }}
                        inputProps={{ style: { textAlign: "center" } }}
                        value={amount ?? ""}
                        size="small"
                        onChange={(e) => {
                          const parsed = Number.parseInt(e.target.value);
                          if (isNaN(parsed)) {
                            setAmount(1);
                            return;
                          }
                          setAmount(parsed);
                        }}
                      />
                      <IconButton
                        onClick={() => setAmount((amount ?? 0) + 1)}
                        area-label="plus"
                      >
                        <AddBoxOutlined />
                      </IconButton>
                    </div>
                  )}
                  {!!remainingAmount && !!price && (
                    <div style={{ marginBottom: 16, textAlign: "center" }}>
                      <Typography>
                        <span className={classes.itemName}>
                          Remaining amount:
                        </span>
                        {remainingAmount.toNumber()} / 10000
                      </Typography>
                      <Typography>
                        <span className={classes.itemName}>Price:</span>
                        <span style={{ fontSize: "1.65rem" }}>
                          {formatEther(price.mul(amount).toString())} ETH
                        </span>
                      </Typography>
                      {isInsufficient && walletBalance && (
                        <Typography color="error">
                          <span className={classes.itemName}>
                            Insufficient wallet balance:
                          </span>
                          <span>
                            {formatEther(walletBalance.toString())} ETH
                          </span>
                        </Typography>
                      )}
                    </div>
                  )}
                  {!account && (
                    <div
                      className={classes.flexBox}
                      style={{ marginBottom: 16 }}
                    >
                      <div className={classes.connectInfo}>
                        Please connect
                        <br /> your wallet first 👛
                      </div>
                    </div>
                  )}
                  {!!account && !!remainingAmount && !!price ? (
                    <div style={{ textAlign: "center" }}>
                      <Button
                        onClick={() => {
                          buy(amount, {
                            value: price.mul(amount),
                          });
                        }}
                        variant="contained"
                        color="primary"
                        style={{ fontWeight: "bold" }}
                        disabled
                        // disabled={
                        //   price === undefined ||
                        //   remainingAmount.eq(0) ||
                        //   !checked ||
                        //   isInsufficient
                        // }
                        size="large"
                        disableElevation
                      >
                        {remainingAmount.eq(0) ? "Sold out" : "Purchase"}
                      </Button>
                      <div
                        style={{
                          marginTop: 16,
                          textAlign: "left",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
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
                            href="https://tart.notion.site/e454816cc8f04f1e8ecffa20408f4370"
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
                      <div
                        className={classes.flexBox}
                        style={{ marginTop: 16 }}
                      >
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
                              `https://metamask.app.link/dapp/${window.location.host}/#/`
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
                    <div
                      className={classes.flexBox}
                      style={{ marginBottom: 16 }}
                    >
                      <Typography>
                        Or you can scan QR code
                        <br />
                        to use metamask app.
                      </Typography>
                    </div>
                    <div className={classes.flexBox}>
                      <QRCode
                        value={`https://metamask.app.link/dapp/${window.location.host}/#/`}
                        size={80}
                      />
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Container>
            <Container className={classes.descriptionContainer}>
              <Grid
                container
                className={classes.imgContent}
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                style={{ alignItems: "strech" }}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  style={{ padding: 8, marginBottom: 8 }}
                >
                  <div>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      style={{ fontSize: 14 }}
                    >
                      The lottery sales for this NFT are available from August
                      17 to August 24. If there are still some NFTs available
                      after August 24, you can continue to purchase them. In
                      that case, the details of the NFT will be confirmed right
                      away. You need ETH to be able to purchase this NFT, and
                      the price is 0.1 ETH. The NFTs will be instantly sent to
                      your wallet after purchase, but at that time, it has not
                      been decided which NFT it will be. The lottery will be
                      held on-chain after August 24, and then the details of the
                      NFT will be finalized. We would highly recommend OpenSea
                      for browsing the NFT. If your NFT status is not changed on
                      OpenSea after the lottery period, please click the
                      “Refresh Metadata” button on the OpenSea NFT page. The
                      maximum number of Generativemasks that can be issued is up
                      to 10,000. For the purpose of marketing use, there will be
                      500 of the NFT issued beforehand. These are used for
                      airdrop and other marketing purposes. As a development
                      incentive, a total of five NFTs will be offered to the
                      artist and the development company. There is no rarity
                      setting for this NFT. The NFTs will be equally randomly
                      selected from the total (10,000 NFTs), regardless of the
                      overall number of your purchases.
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Container>
            <Container className={classes.creatorInfo}>
              <Container maxWidth="sm" className={classes.creatorInfoInner}>
                <div className={classes.creatorInfoFrame}>
                  <div style={{ position: "relative" }}>
                    <Avatar
                      alt="takawo"
                      src="/images/artist.png"
                      className={classes.large}
                    />
                    <span className={classes.creatorLabel}>🎨Creator</span>
                  </div>
                  <div>
                    <Typography style={{ fontWeight: "bold", fontSize: 20 }}>
                      takawo
                    </Typography>
                    <Typography>
                      I'm a creative coder based in Japan. #dailycoding
                    </Typography>
                    <div className={classes.linkWrapper}>
                      <Link
                        href="https://twitter.com/takawo"
                        target="_blank"
                        rel="noopener"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginRight: 8,
                        }}
                      >
                        <ArrowRightRoundedIcon fontSize="small" />
                        <span>Twitter</span>
                      </Link>
                      <Link
                        href="http://cenkhor.org/"
                        target="_blank"
                        rel="noopener"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginRight: 8,
                        }}
                      >
                        <ArrowRightRoundedIcon fontSize="small" />
                        <span>cenkhor.org</span>
                      </Link>
                      <Link
                        href="https://openprocessing.org/user/6533?view=sketches&o=168"
                        target="_blank"
                        rel="noopener"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <ArrowRightRoundedIcon fontSize="small" />
                        <span>OpenProcessing</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </Container>
            </Container>
            <AppFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePageTemplate;

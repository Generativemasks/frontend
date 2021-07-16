import React from "react";

// @ts-ignore
import { abis, addresses } from "@project/contracts";
import { AppHeader } from "../molecules/AppHeader";
import {
  Avatar,
  Chip,
  Container,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { AppFooter } from "../molecules/AppFooter";
import { ChainId } from "@usedapp/core";
import ChainModal from "../molecules/ChainModal";
import { ArtCardForTop } from "../molecules/ArtCardForTop";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    position: "relative",
    padding: theme.spacing(8, 0, 6),
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
  headerImage: {
    marginTop: 64,
    backgroundImage: "url(/images/cover.jpg)",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    paddingTop: "28%",
    [theme.breakpoints.down(600)]: {
      marginTop: 56,
      paddingTop: "60%",
      backgroundSize: "auto",
    },
  },
  iconImage: {
    width: 130,
    height: 130,
    position: "absolute",
    top: "-26%",
    left: "50%",
    transform: "translateX(-50%)",
    border: "8px solid #fff",
    borderRadius: "50%",
    [theme.breakpoints.down(600)]: {
      top: "-20%",
    },
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
    padding: theme.spacing(4),
    [theme.breakpoints.down(600)]: {
      padding: 0,
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
}));

export interface TopPageTemplateProps {
  readonly account?: string | null;
  readonly chainId?: ChainId | undefined;
}

const TopPageTemplate = ({ account, chainId }: TopPageTemplateProps) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <ChainModal chainId={chainId} />
      <AppHeader account={account} />
      <div className={classes.headerImage}>
        <div style={{ backgroundColor: "rgba(255,255,255,0.9)" }}>
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
              <Typography
                variant="body1"
                align="left"
                color="textSecondary"
                paragraph
                style={{ fontSize: 14 }}
              >
                今回の作品の着想は、左右対称に配置した幾何学的なパターンから生命感を発見したところから生まれました。予期しない輪郭とパターンによって、ネイティブ・アメリカンのトーテムポールや日本の土着の妖怪が持つ、怖くて同時にどこか愛らしい雰囲気を表現することを意識しました。
              </Typography>
              <Typography
                variant="body1"
                align="left"
                color="textSecondary"
                paragraph
                style={{ fontSize: 14 }}
              >
                The inspiration for this work came from discovering a sense of
                life in geometric patterns that are symmetrically arranged. With
                unexpected shapes and patterns, I tried to express the scary yet
                somehow charming atmosphere of Native American totem poles and
                indigenous Japanese Yokai.
              </Typography>
            </Container>
          </div>
          <Container style={{ marginBottom: 64 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ArtCardForTop
                name={"Generativemasks"}
                image={"/images/art.png"}
                onClick={() => {
                  history.push(`/arts/`);
                }}
              />
            </div>
          </Container>
          <Container className={classes.creatorInfo}>
            <Container maxWidth="sm" className={classes.creatorInfoInner}>
              <div className={classes.creatorInfoFrame}>
                <div style={{ position: "relative" }}>
                  <Avatar
                    alt="takawo"
                    src="/images/icon.png"
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
  );
};

export default TopPageTemplate;

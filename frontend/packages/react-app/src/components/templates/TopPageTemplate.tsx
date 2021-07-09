import React, { useState } from "react";

// @ts-ignore
import { abis, addresses } from "@project/contracts";
import { AppHeader } from "../molecules/AppHeader";
import {
  Avatar,
  Backdrop,
  Button,
  Chip,
  Container,
  Grid,
  Link,
  makeStyles,
  Modal,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { AppFooter } from "../molecules/AppFooter";
import { ChainId } from "@usedapp/core";
import ChainModal from "../molecules/ChainModal";
import { ArtCardForTop } from "../molecules/ArtCardForTop";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";
import Fade from "@material-ui/core/Fade";

export interface TopPageTemplateProps {
  readonly account?: string | null;
  readonly chainId?: ChainId | undefined;
}

export const arts = [
  {
    id: 0,
    name: "Subject Alpha",
    description: {
      ja:
        "正方形の領域内にランダムな大きさの矩形を充填させる。\n" +
        "それぞれの区画に円と矩形を描画し、円のアウトラインからパーリンノイズを用いた曲線を描画する。",
      en:
        "Fill the square area with rectangles of random sizes.\n" +
        "Draw a circle and a rectangle in each compartment, and draw a curve with purlin noise from the outline of the circle.",
    },
    image: "/images/art0.png",
  },
  {
    id: 1,
    name: "Subject Beta",
    description: {
      ja:
        "7種類のグラフィックからランダムに選び、グリッド状に配置。\n" +
        "色、角度、反転の有無をランダムに選択し描画する。",
      en:
        "Randomly select from seven different graphics and place them in a grid.\n" +
        "Randomly select and draw the color, angle, and inversion.",
    },
    image: "/images/art1.png",
  },
  {
    id: 2,
    name: "Subject Gamma",
    description: {
      ja:
        "円をグリッド状に配置。\n" +
        "円の種類は同心円、チェック、ストライプ、波線から無作為に選ぶ。\n" +
        "90°単位でランダムに分割した円弧と線を重ねて描画する。",
      en:
        "Arrange circles in a grid.\n" +
        "Randomly select a circle type from concentric circles, checks, stripes, and wavy lines.\n" +
        "Overlap arcs and lines randomly divided by 90°.",
    },
    image: "/images/art2.png",
  },
  {
    id: 3,
    name: "Subject Delta",
    description: {
      ja:
        "正方形の領域を再帰的に分割し矩形を配置。\n" +
        "矩形の中にさらにタイル状に同じ大きさの矩形を並べる。",
      en:
        "Recursively divide the square area and place a rectangle.\n" +
        "Arrange more rectangles of the same size inside the rectangle in the form of tiles.",
    },
    image: "/images/art3.png",
  },
];

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
    backgroundImage: "url(/images/cover.png)",
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
                グラフィックデザイン的なアプローチからクリエイティブコーディングを実践するなかで，シンメトリーなグラフィックを作ってみようとしたことがこの作品を作るきっかけでした．予期しない輪郭とパターンによって，ネイティブ・アメリカンの作るトーテムポールや日本の妖怪のような土着的で民族的な雰囲気をコードで表現することを意識しました．
              </Typography>
              <Typography
                variant="body1"
                align="left"
                color="textSecondary"
                paragraph
                style={{ fontSize: 14 }}
              >
                I was inspired to create this work by trying to make symmetrical
                graphics while practicing creative coding in a graphic design
                approach. With unexpected shapes and patterns, I also tried to
                express an indigenous and ethnic atmosphere in the code, like a
                Native American totem pole or a Japanese yokai.
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
                    alt="okazz"
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

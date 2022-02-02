import {
  Breadcrumbs,
  Icon,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    textAlign: "center",
  },
  linkText: {
    textDecoration: "none",
    color: theme.palette.text.secondary,
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export const AppFooter = () => {
  const classes = useStyles();
  const { width } = useWindowDimensions();

  return (
    <footer className={classes.footer}>
      {width >= 600 && (
        <div style={{ display: "inline-block", marginBottom: 16 }}>
          <Breadcrumbs
            separator="|"
            aria-label="breadcrumb"
            style={{ textAlign: "left" }}
          >
            <a
              className={classes.linkText}
              href="https://tart.notion.site/e454816cc8f04f1e8ecffa20408f4370"
              target="_blank"
              rel="noopener"
            >
              Terms of Use
            </a>
            <a
              className={classes.linkText}
              href="https://tart.notion.site/4dd686aafe014b0bb18be3233903b845"
              target="_blank"
              rel="noopener"
            >
              Privacy Policy
            </a>
            <a
              className={classes.linkText}
              href="https://tart.notion.site/eec581bd081e47c29c55d5681e28d7d1"
              target="_blank"
              rel="noopener"
            >
              Specified Commercial Transaction Act
            </a>
          </Breadcrumbs>
        </div>
      )}
      <div style={{ marginBottom: 16 }}>
        <IconButton
          onClick={() =>
            window.open(
              "https://opensea.io/collection/generativemasks",
              "_blank"
            )
          }
        >
          <Icon style={{ padding: 8 }}>
            <img src="/images/opensea.svg" style={{ width: "100%" }} />
          </Icon>
        </IconButton>
        <IconButton
          onClick={() =>
            window.open("https://twitter.com/generativemasks", "_blank")
          }
        >
          <FontAwesomeIcon style={{ padding: 8 }} icon={faTwitter} />
        </IconButton>
        <IconButton
          onClick={() => window.open("https://discord.com/invite/gR3mgVdjfd", "_blank")}
        >
          <FontAwesomeIcon style={{ padding: 8 }} icon={faDiscord} />
        </IconButton>
      </div>
      <div>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          TART K.K.
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </div>
    </footer>
  );
};

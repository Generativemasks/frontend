import { Link } from "react-router-dom";
import { Breadcrumbs, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

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
        <div style={{ display: "inline-block", marginBottom: 32 }}>
          <Breadcrumbs
            separator="|"
            aria-label="breadcrumb"
            style={{ textAlign: "left" }}
          >
            <a
              className={classes.linkText}
              href="https://www.notion.so/tart/WIP-94e269077baa4eda9afdba8fb51bb825"
              target="_blank"
              rel="noopener"
            >
              Terms of Use
            </a>
            <a
              className={classes.linkText}
              href="https://www.notion.so/tart/WIP-c47518b111684d6aaf0fd0ca5d431a41"
              target="_blank"
              rel="noopener"
            >
              Privacy Policy
            </a>
            <a
              className={classes.linkText}
              href="https://www.notion.so/tart/3d0b80d6b0ec4398aa72f4df4d084f04"
              target="_blank"
              rel="noopener"
            >
              Specified Commercial Transaction Act
            </a>
          </Breadcrumbs>
        </div>
      )}
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

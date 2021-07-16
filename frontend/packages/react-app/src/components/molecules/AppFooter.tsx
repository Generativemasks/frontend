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
              href="https://www.notion.so/tart/56b8bbb17dfd44d6a3c67384fba943e4"
              target="_blank"
              rel="noopener"
            >
              Terms of Use
            </a>
            <a
              className={classes.linkText}
              href="https://www.notion.so/tart/f84e94231ee04924ac68ad5436d63bee"
              target="_blank"
              rel="noopener"
            >
              Privacy Policy
            </a>
            <a
              className={classes.linkText}
              href="https://www.notion.so/tart/f4fef6d5ee584afc8c790d29a4e31c2a"
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

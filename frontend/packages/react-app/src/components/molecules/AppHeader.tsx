import {
  AppBar,
  Button,
  createStyles,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { WalletButton } from "../pages/TopPage";
import React, { useState } from "react";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
      [theme.breakpoints.down(760)]: {
        fontSize: "1rem",
      },
    },
    header: {},
  })
);

export const AppHeader = (props: { account: string | null | undefined }) => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const { width } = useWindowDimensions();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <a
            href="/"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontFamily: "Spartan,sans-serif",
              fontWeight: 600,
            }}
          >
            Generativemasks
          </a>
        </Typography>
        {width >= 760 && (
          <>
            <WalletButton account={props.account} />
          </>
        )}
        {width < 760 && (
          <>
            <IconButton
              aria-label="menu"
              style={{ padding: 6, color: "#fff" }}
              onClick={() => setShow(true)}
            >
              <MenuRoundedIcon />
            </IconButton>
            <Drawer anchor={"top"} open={show} onClose={() => setShow(false)}>
              <List>
                <ListItem button>
                  <ListItemText
                    primary={"Terms of Use"}
                    onClick={() => {
                      window.open(
                        "https://www.notion.so/tart/56b8bbb17dfd44d6a3c67384fba943e4",
                        "_blank"
                      );
                      setShow(false);
                    }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    primary={"Privacy Policy"}
                    onClick={() => {
                      window.open(
                        "https://www.notion.so/tart/f84e94231ee04924ac68ad5436d63bee",
                        "_blank"
                      );
                      setShow(false);
                    }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    primary={"Specified Commercial Transaction Act"}
                    onClick={() => {
                      window.open(
                        "https://www.notion.so/tart/f4fef6d5ee584afc8c790d29a4e31c2a",
                        "_blank"
                      );
                      setShow(false);
                    }}
                  />
                </ListItem>
                <ListItem button>
                  <WalletButton account={props.account} />
                </ListItem>
              </List>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

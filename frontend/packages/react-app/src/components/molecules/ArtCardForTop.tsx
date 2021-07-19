import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
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
    padding: theme.spacing(1),
  },
  artTitle: {
    fontSize: "1rem",
    textAlign: "center",
  },
}));

export function ArtCardForTop(props: {
  image: string;
  tokenId?: string;
  description?: string;
  owner?: string;
  onClick?: () => void;
  showSkeleton?: boolean;
}) {
  const classes = useStyles();

  if (props.showSkeleton) {
    return (
      <Grid item xs={12} sm={6} md={3}>
        <Card className={classes.card}>
          <Skeleton variant="rect" className={classes.cardMedia} />
        </Card>
      </Grid>
    );
  }

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card className={classes.card} variant="outlined">
        <CardActionArea onClick={props.onClick}>
          <CardMedia className={classes.cardMedia} image={props.image} />
          <CardContent className={classes.cardContent}>
            <Typography
              className={classes.artTitle}
              variant="h5"
              component="h2"
            >
              Purchase here
            </Typography>
            <Typography
              className={classes.artTitle}
              variant="h5"
              component="h2"
            >
              購入はこちら
            </Typography>
            {props.description !== undefined && (
              <Typography>{props.description}</Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

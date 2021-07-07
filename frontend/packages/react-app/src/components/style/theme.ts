import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#E96D64",
      contrastText: "#fff",
    },
    secondary: {
      main: "#4DD0E1",
      contrastText: "#000",
    },
  },
  typography: {
    h3: {
      fontFamily: ["Spartan", "sans-serif"].join(","),
      fontWeight: 600,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "inherit",
        padding: 14,
      },
    },
  },
});

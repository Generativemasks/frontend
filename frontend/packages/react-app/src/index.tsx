import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChainId, Config, DAppProvider } from "@usedapp/core";
import { StylesProvider, ThemeProvider } from "@material-ui/core";
import { theme } from "./components/style/theme";

const config: Config = {
  readOnlyChainId:
    process.env.REACT_APP_CHAIN_ID === "4" ? ChainId.Rinkeby : ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]:
      "https://mainnet.infura.io/v3/d355bf426d534bccb6e9b0f69c7b1625",
    [ChainId.Rinkeby]:
      "https://rinkeby.infura.io/v3/d355bf426d534bccb6e9b0f69c7b1625",
  },
};

ReactDOM.render(
  <DAppProvider config={config}>
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StylesProvider>
  </DAppProvider>,
  document.getElementById("root")
);

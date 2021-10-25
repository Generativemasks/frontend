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
    [ChainId.Mainnet]: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`,
    [ChainId.Rinkeby]: `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`,
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

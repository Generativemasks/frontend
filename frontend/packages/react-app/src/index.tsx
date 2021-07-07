import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import "./index.css";
import App from "./App";
import { ChainId, Config, DAppProvider } from "@usedapp/core";
import { StylesProvider, ThemeProvider } from "@material-ui/core";
import { theme } from "./components/style/theme";

// You should replace this url with your own and put it into a .env file
// See all subgraphs: https://thegraph.com/explorer/
const client = new ApolloClient({
  uri: process.env.REACT_APP_SUBGRAPH_URL,
});

const config: Config = {
  readOnlyChainId:
    process.env.REACT_APP_CHAIN_ID === "4" ? ChainId.Rinkeby : ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]:
      "https://mainnet.infura.io/v3/190e60804b184f11ba2f8f76a3d50c9c",
    [ChainId.Rinkeby]:
      "https://rinkeby.infura.io/v3/62687d1a985d4508b2b7a24827551934",
  },
};

ReactDOM.render(
  <DAppProvider config={config}>
    <ApolloProvider client={client}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StylesProvider>
    </ApolloProvider>
  </DAppProvider>,
  document.getElementById("root")
);

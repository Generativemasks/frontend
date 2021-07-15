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
      "https://mainnet.infura.io/v3/d355bf426d534bccb6e9b0f69c7b1625",
    [ChainId.Rinkeby]:
      "https://rinkeby.infura.io/v3/d355bf426d534bccb6e9b0f69c7b1625",
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

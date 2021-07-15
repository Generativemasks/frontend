import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import TopPage from "./components/pages/TopPage";
import PurchasePage from "./components/pages/PurchasePage";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={TopPage} />
          <Route exact path="/arts" component={PurchasePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

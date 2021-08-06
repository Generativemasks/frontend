import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import PurchasePage from "./components/pages/PurchasePage";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={PurchasePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

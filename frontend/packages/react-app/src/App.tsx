import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import TopPage from "./components/pages/TopPage";
import DetailPage from "./components/pages/DetailPage";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={TopPage} />
          <Route exact path="/arts" component={DetailPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

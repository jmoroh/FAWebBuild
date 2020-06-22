import React, { Component } from "react";
import "./App.css";
import Home from "./routes/Home";
import FAQ from "./routes/Faq";
import Resources from "./routes/Resources";
import NavBar from "./components/NavBar";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <FAQ />
            </Route>
            <Route path="/resources">
              <Resources />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

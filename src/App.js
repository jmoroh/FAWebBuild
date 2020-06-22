import React, { Component } from "react";
import "./App.css";
import Home from './routes/Home'
import FAQ from './routes/Faq'
import NavBar from './components/NavBar'
import {
	HashRouter as Router,
  Switch,
  Route,
  Link} from 'react-router-dom'

class App extends Component {
  render() {
    return (
			<Router>
				
				<div className="App">
					<NavBar/>
					<Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <FAQ />
          </Route>

        </Switch>
				</div>
			</Router>

    );
  }
}

export default App;

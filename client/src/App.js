import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "./styles/global.scss";

import Home from "./components/home";
import User from "./containers/user";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/user/:id" component={User} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

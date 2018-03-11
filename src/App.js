import React, { Component } from "react";
import "./styl/main.styl";
import history from "./history";
import { Router, Switch, Redirect, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Layout from "./components/Layout/Layout";

import { connect } from "react-redux";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Layout>
          <Route
            render={() => <Dashboard instrumentRacks={[0, 1, 2, 3, 4]} />}
          />
        </Layout>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

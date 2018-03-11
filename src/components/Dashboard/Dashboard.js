import React, { Component } from "react";
import "./Dashboard.styl";
import Composition from "../Composition/Composition";
import Configuration from "../Configuration/Configuration";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <Composition />
        <div class="divider-container">
          <div class="divider" />
        </div>
        <Configuration instrumentRacks={this.props.instrumentRacks} />
      </div>
    );
  }
}

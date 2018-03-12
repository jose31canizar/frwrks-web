import React, { Component } from "react";
import "./Layout.styl";
import NavBar from "../NavBar/NavBar";

export default class Layout extends Component {
  render() {
    return (
      <div>
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}

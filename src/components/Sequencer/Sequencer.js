import React, { Component } from "react";
import "./Sequencer.styl";

export default class Sequencer extends Component {
  render() {
    return (
      <div class="sequencer">
        {[0, 1, 2, 3, 4].map((cell, i) => <div class="cell" key={i} />)}
      </div>
    );
  }
}

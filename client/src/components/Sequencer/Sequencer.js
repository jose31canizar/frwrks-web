import React, { Component } from "react";
import "./Sequencer.styl";

export default class Sequencer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sequenceArray: Array(16).fill(1)
    };
  }
  render() {
    return (
      <div class="sequencer">
        {this.state.sequenceArray.map((cell, i) => (
          <div
            class="cell"
            key={i}
            style={{ background: cell === 1 ? "#413a48" : "white" }}
          />
        ))}
      </div>
    );
  }
}

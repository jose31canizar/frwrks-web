import React, { Component } from "react";
import Sequencer from "../Sequencer/Sequencer";
import "./ConfigurationSequencer.styl";

export default class ConfigurationSequencer extends Component {
  render() {
    return (
      <Sequencer pattern={this.props.pattern} playing={this.props.playing}>
        <div class="cell" />
      </Sequencer>
    );
  }
}

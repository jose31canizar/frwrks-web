import React, { Component } from "react";
import Sequencer from "../Sequencer/Sequencer";
import "./ConfigurationSequencer.styl";

export default class ConfigurationSequencer extends Component {
  render() {
    return (
      <Sequencer
        counterMachine={this.props.counterMachine}
        pattern={this.props.pattern}
        playing={this.props.playing}
        selectedTrackID={this.props.selectedTrackID}
        id={this.props.id}
        onRef={this.props.onRef}
      >
        <div class="cell" />
      </Sequencer>
    );
  }
}

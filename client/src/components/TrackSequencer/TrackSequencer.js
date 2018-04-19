import React, { Component } from "react";
import Sequencer from "../Sequencer/Sequencer";
import "./TrackSequencer.styl";

/*
The sequencer for individual tracks on the composition page
Reuses the sequencer component.
Supplies a specific cell type for the UI
*/
export default class TrackSequencer extends Component {
  render() {
    return (
      <Sequencer
        counterMachine={this.props.counterMachine}
        pattern={this.props.pattern}
        playing={this.props.playing}
        id={this.props.id}
        onRef={this.props.onRef}
      >
        <div class="track-cell" />
      </Sequencer>
    );
  }
}

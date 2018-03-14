import React, { Component } from "react";
import "./Configuration.styl";
import ConfigurationSequencer from "../ConfigurationSequencer/ConfigurationSequencer";
import InstrumentRack from "../InstrumentRack/InstrumentRack";
import SVG from "../svg.js";

const PlayButton = props => (
  <div class="play-button" onMouseDown={props.onMouseDown}>
    {props.icon === "play" ? (
      <SVG name="Play" fill="#413a48" width="60" height="60" />
    ) : (
      <SVG name="Pause" fill="#413a48" width="60" height="60" />
    )}
  </div>
);

/*
The component where one track is configured.
On this component, the user creates, edits, and merges instrument racks.
Merging an instrument rack with another, will combine their patterns,
but the sound will be replaced with the second instrument selected.
*/
export default class Configuration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pattern: Array(16)
        .fill(0)
        .fill(1, 2, 4)
        .fill(1, 8, 10)
        .fill(1, 12, 14),
      playing: false,
      icon: "play"
    };
    this.togglePlaying = this.togglePlaying.bind(this);
  }
  togglePlaying() {
    this.setState((prevState, props) => {
      return {
        playing: !prevState.playing,
        icon: prevState.icon === "play" ? "pause" : "play"
      };
    });
  }
  render() {
    return (
      <div class="configuration" style={{ width: this.props.width }}>
        <header>configuration</header>
        <ConfigurationSequencer
          pattern={this.state.pattern}
          playing={this.state.playing}
        />
        {this.props.instrumentRacks.map((instrumentRacks, i) => (
          <InstrumentRack key={i} />
        ))}
        <PlayButton onMouseDown={this.togglePlaying} icon={this.state.icon} />
      </div>
    );
  }
}

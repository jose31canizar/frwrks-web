import React, { Component } from "react";
import "./Configuration.styl";
import ConfigurationSequencer from "../ConfigurationSequencer/ConfigurationSequencer";
import InstrumentRack from "../InstrumentRack/InstrumentRack";
import Keyboard from "../Keyboard/Keyboard";
import SVG from "../svg.js";
import { connect } from "react-redux";
import CounterMachine from "../CounterMachine/CounterMachine";

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
const mapStateToProps = state => {
  return {
    selectedTrack: state.selectedTrack,
    selectedEnsembleName: state.selectedEnsembleName,
    selectedTrackID: state.selectedTrackID,
    playing: state.playing
  };
};

class Configuration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTrack: this.props.selectedTrack,
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
  componentWillReceiveProps(newProps) {
    console.log("this.props.selectedTrackID");
    console.log(this.props.selectedTrackID);
  }
  componentDidMount() {
    this.setState({
      counterMachine: this.counterMachine
    });
  }
  render() {
    return (
      <div class="configuration" style={{ width: this.props.width }}>
        <header>configuration</header>
        <div class="info">
          <p>{this.props.selectedEnsembleName}</p>
          <p>{this.state.selectedTrack.name}</p>
        </div>
        <ConfigurationSequencer
          counterMachine={this.props.counterMachine}
          pattern={this.props.selectedTrack.pattern}
          playing={this.props.playing}
          id={this.props.selectedTrackID}
        />
        {this.props.instrumentRacks.map((instrumentRacks, i) => (
          <InstrumentRack key={i} />
        ))}
        <PlayButton onMouseDown={this.togglePlaying} icon={this.state.icon} />
        <Keyboard onRef={ref => (this.keyboard = ref)} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Configuration);

import React, { Component } from "react";
import "./Composition.styl";
import TrackSequencer from "../TrackSequencer/TrackSequencer";
import SVG from "../svg.js";
import { v4 } from "node-uuid";
import { connect } from "react-redux";
import {
  addEnsemble,
  selectTrack,
  selectTab,
  toggleTrack
} from "../../actions/ensemble";

const MergeTrackButton = props => (
  <div class="merge-button">
    <SVG name="Merge" fill="#413a48" width="22" height="22" />
  </div>
);

const AddEnsembleButton = props => (
  <div class="add-ensemble-button" onMouseDown={props.addEnsemble}>
    <SVG name="Add" fill="#413a48" width="22" height="22" />
  </div>
);

const PlayButton = props => (
  <div class="play-button" onMouseDown={props.toggleTrack}>
    {props.icon === "play" ? (
      <SVG name="Play" fill="#413a48" width="60" height="60" />
    ) : (
      <SVG name="Pause" fill="#413a48" width="60" height="60" />
    )}
  </div>
);

const Track = props => (
  <div class="track" onMouseDown={() => props.selectTrack(props.id)}>
    <PlayButton
      icon={props.icon}
      toggleTrack={() =>
        props.toggleTrack(props.ensembleIndex, props.trackIndex)
      }
    />
    <TrackSequencer
      counterMachine={props.counterMachine}
      pattern={props.pattern}
      playing={props.playing}
      id={props.id}
      onRef={ref => ref}
    />
  </div>
);

const Ensemble = props => (
  <div
    class={`ensemble ${
      props.ensembleIndex === props.selectedEnsembleIndex ? "shown" : "hidden"
    }`}
  >
    {props.tracks.map((track, i) => (
      <Track
        counterMachine={props.counterMachine}
        toggleTrack={props.toggleTrack}
        ensembleIndex={props.ensembleIndex}
        trackIndex={i}
        name={track.name}
        key={i}
        id={i + "0" + props.ensembleIndex}
        selectTrack={props.selectTrack}
        pattern={track.pattern}
        playing={track.playing}
        icon={track.icon}
      />
    ))}
  </div>
);

const Tabs = props => (
  <div class="tabs">
    {props.ensembles.map((ensemble, i) => (
      <div
        onMouseDown={() => props.selectTab(i)}
        class={`tab ${ensemble.selected ? "selected" : ""}`}
        key={i}
      >
        <li>{ensemble.name}</li>
      </div>
    ))}
  </div>
);

const EnsembleTabBar = props => (
  <div class="ensemble-tab-bar">
    <Tabs ensembles={props.ensembles} selectTab={props.selectTab} />
    {props.ensembles.map((ensemble, i) => (
      <Ensemble
        key={i}
        counterMachine={props.counterMachine}
        tracks={ensemble.tracks}
        toggleTrack={props.toggleTrack}
        selectTrack={props.selectTrack}
        ensembleIndex={i}
        selectedEnsembleIndex={props.selectedEnsembleIndex}
      />
    ))}
  </div>
);

/*
This component is the page that displays all of the ensembles a user has created,
and the list of tracks associated with that ensemble.
The user can turn on and off whatever tracks he desires, and they can overlap.
An ensemble that is playing will continue to play as a user switches to another ensemble.
*/
const mapStateToProps = state => {
  return { ensembles: state.ensembles };
};

const mapDispatchToProps = dispatch => {
  return {
    selectTab: i => dispatch(selectTab(i)),
    toggleTrack: (ei, ti) => dispatch(toggleTrack(ei, ti)),
    selectTrack: i => dispatch(selectTrack(i)),
    addEnsemble: () => dispatch(addEnsemble())
  };
};

class Composition extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class="composition" style={{ width: this.props.width }}>
        <header>composition</header>
        <main>
          <div class="action-bar">
            <MergeTrackButton />
            <AddEnsembleButton addEnsemble={() => this.props.addEnsemble()} />
          </div>
          {console.log("new ensemble in composition")}
          {console.log(this.props.ensembles)}
          <EnsembleTabBar
            counterMachine={this.props.counterMachine}
            toggleTrack={this.props.toggleTrack}
            ensembles={this.props.ensembles}
            selectedEnsembleIndex={this.props.selectedEnsembleIndex}
            selectTab={this.props.selectTab}
            selectTrack={i => this.props.selectTrack(i)}
          />
        </main>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Composition);

import React, { Component } from "react";
import "./Composition.styl";
import TrackSequencer from "../TrackSequencer/TrackSequencer";
import SVG from "../svg.js";

const AddEnsembleButton = props => (
  <div class="add-ensemble-button" onMouseDown={props.addEnsemble}>
    <SVG name="Add" fill="#413a48" width="22" height="22" />
  </div>
);

const PlayButton = props => (
  <div class="play-button" onMouseDown={props.playTrack}>
    {props.icon === "play" ? (
      <SVG name="Play" fill="#413a48" width="60" height="60" />
    ) : (
      <SVG name="Pause" fill="#413a48" width="60" height="60" />
    )}
  </div>
);

const Track = props => (
  <div class="track" onMouseDown={props.selectTrack}>
    <PlayButton
      icon={props.icon}
      playTrack={() => props.playTrack(props.ensembleIndex, props.trackIndex)}
    />
    <TrackSequencer pattern={props.pattern} playing={props.playing} />
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
        playTrack={props.playTrack}
        ensembleIndex={props.ensembleIndex}
        trackIndex={i}
        name={track.name}
        key={i}
        onMouseDown={props.selectTrack}
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
        tracks={ensemble.tracks}
        playTrack={props.playTrack}
        selectTrack={props.selectTrack}
        ensembleIndex={i}
        selectedEnsembleIndex={props.selectedEnsembleIndex}
      />
    ))}
  </div>
);

const ensemblify = (ensembles, selectedEnsembleIndex) => {
  return ensembles.map(
    (ensemble, i) =>
      i == selectedEnsembleIndex
        ? {
            ...ensemble,
            //add playing flag to each track for each ensemble
            tracks: ensemble.tracks.map((track, i) => {
              return { ...track, playing: false, icon: "play" };
            }),
            selected: true
          }
        : {
            ...ensemble,
            //add playing flag to each track for each ensemble even
            //for those not selected
            tracks: ensemble.tracks.map((track, i) => {
              return { ...track, playing: false, icon: "play" };
            }),
            selected: false
          }
  );
};

/*
This component is the page that displays all of the ensembles a user has created,
and the list of tracks associated with that ensemble.
The user can turn on and off whatever tracks he desires, and they can overlap.
An ensemble that is playing will continue to play as a user switches to another ensemble.
*/
export default class Composition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ensembles: ensemblify(
        this.props.ensembles,
        this.props.selectedEnsembleIndex
      )
    };
    this.selectTab = this.selectTab.bind(this);
    this.playTrack = this.playTrack.bind(this);
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      ensembles: ensemblify(newProps.ensembles, newProps.selectedEnsembleIndex)
    });
  }
  playTrack(ensembleIndex, trackIndex) {
    this.setState((prevState, props) => {
      let newEnsembles = prevState.ensembles;
      newEnsembles[ensembleIndex].tracks[trackIndex].playing = !prevState
        .ensembles[ensembleIndex].tracks[trackIndex].playing;
      newEnsembles[ensembleIndex].tracks[trackIndex].icon =
        prevState.ensembles[ensembleIndex].tracks[trackIndex].icon === "play"
          ? "pause"
          : "play";
      console.log(newEnsembles);
      return {
        ensembles: newEnsembles
      };
    });
  }
  selectTab(i) {
    this.setState(
      (prevState, props) => {
        let newEnsembles = prevState.ensembles.map((ensemble, i) => {
          return {
            ...ensemble,
            selected: false
          };
        });
        newEnsembles[i].selected = true;
        return {
          ensembles: newEnsembles
        };
      },
      () => {
        this.props.selectEnsemble(i);
      }
    );
  }
  render() {
    return (
      <div class="composition" style={{ width: this.props.width }}>
        <header>composition</header>
        <main>
          <AddEnsembleButton addEnsemble={this.props.addEnsemble} />
          <EnsembleTabBar
            playTrack={this.playTrack}
            ensembles={this.state.ensembles}
            selectedEnsembleIndex={this.props.selectedEnsembleIndex}
            selectTab={this.selectTab}
            selectTrack={this.props.selectTrack}
          />
        </main>
      </div>
    );
  }
}

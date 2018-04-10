import React, { Component } from "react";
import "./Composition.styl";
import TrackSequencer from "../TrackSequencer/TrackSequencer";
import SVG from "../svg.js";
import { v4 } from "node-uuid";
import { connect } from "react-redux";
import { addEnsemble, selectTrack } from "../../actions/ensemble";

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
  <div class="play-button" onMouseDown={props.playTrack}>
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
      playTrack={() => props.playTrack(props.ensembleIndex, props.trackIndex)}
    />
    <TrackSequencer
      counterMachine={props.counterMachine}
      pattern={props.pattern}
      playing={props.playing}
      id={props.id}
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
        playTrack={props.playTrack}
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
        playTrack={props.playTrack}
        selectTrack={props.selectTrack}
        ensembleIndex={i}
        selectedEnsembleIndex={props.selectedEnsembleIndex}
      />
    ))}
  </div>
);

/*
This function adds the selected flag to each ensemble, and
adds the playing flag and icon type to each track of each ensemble object
*/
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
const mapStateToProps = state => {
  return { ensembles: state.ensembles };
};

class Composition extends Component {
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
    this.updateNewEnsemble = this.updateNewEnsemble.bind(this);
    this.addEnsemble = this.addEnsemble.bind(this);
  }
  componentWillReceiveProps(newProps) {
    console.log("newProps in composition");
    console.log(newProps);
    if (typeof newProps.ensembles === "undefined") {
    } else if (newProps.ensembles.length > this.state.ensembles.length) {
      this.updateNewEnsemble(
        newProps.ensembles,
        newProps.selectedEnsembleIndex
      );
    }
  }
  updateNewEnsemble(newEnsembles, selectedEnsembleIndex) {
    this.setState((prevState, props) => {
      console.log(newEnsembles);
      var newEnsemble = newEnsembles[newEnsembles.length - 1];

      return {
        ensembles: prevState.ensembles.concat(
          ensemblify([newEnsemble], selectedEnsembleIndex)
        )
      };
    });
  }
  //change track playing state to true or false and play or pause respectively
  playTrack(ensembleIndex, trackIndex) {
    this.setState((prevState, props) => {
      let newEnsembles = prevState.ensembles;
      newEnsembles[ensembleIndex].tracks[trackIndex].playing = !prevState
        .ensembles[ensembleIndex].tracks[trackIndex].playing;
      newEnsembles[ensembleIndex].tracks[trackIndex].icon =
        prevState.ensembles[ensembleIndex].tracks[trackIndex].icon === "play"
          ? "pause"
          : "play";
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
  addEnsemble() {
    console.log("add ensemable");
    this.props.dispatch(addEnsemble());
  }
  render() {
    return (
      <div class="composition" style={{ width: this.props.width }}>
        <header>composition</header>
        <main>
          <div class="action-bar">
            <MergeTrackButton />
            <AddEnsembleButton addEnsemble={this.addEnsemble} />
          </div>
          <EnsembleTabBar
            counterMachine={this.props.counterMachine}
            playTrack={this.playTrack}
            ensembles={this.state.ensembles}
            selectedEnsembleIndex={this.props.selectedEnsembleIndex}
            selectTab={this.selectTab}
            selectTrack={i => this.props.dispatch(selectTrack(i))}
          />
        </main>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Composition);

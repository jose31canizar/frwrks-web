import React, { Component } from "react";
import "./Composition.styl";
import SVG from "../svg.js";

const PlayButton = props => (
  <div class="play-button" onMouseDown={props.playTrack}>
    <SVG name="Play" fill="#413a48" width="60" height="60" />
  </div>
);

const Track = props => (
  <div class="track" onMouseDown={props.selectTrack}>
    <PlayButton playTrack={props.playTrack} />
    {props.trackCells.map((trackCell, i) => (
      <div
        class="track-cell"
        key={i}
        style={{ background: trackCell.background }}
      />
    ))}
  </div>
);

const Ensemble = props => (
  <div class="ensemble">
    {props.tracks.map((track, i) => (
      <Track
        playTrack={props.playTrack}
        name={track.name}
        trackCells={track.cells}
        key={i}
        onMouseDown={props.selectTrack}
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
    <Ensemble
      tracks={props.ensembles}
      playTrack={props.playTrack}
      selectTrack={props.selectTrack}
    />
  </div>
);

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
      ensembles: [
        {
          name: "Track 1",
          cells: [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
          selected: false
        },
        {
          name: "Track 2",
          cells: [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
          selected: true
        },
        {
          name: "Track 3",
          cells: [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
          selected: false
        }
      ]
    };
    this.selectTab = this.selectTab.bind(this);
    this.playTrack = this.playTrack.bind(this);
  }
  playTrack() {
    console.log("playing");
  }
  selectTab(i) {
    this.setState((prevState, props) => {
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
    });
  }
  render() {
    return (
      <div class="composition" style={{ width: this.props.width }}>
        <header>composition</header>
        <main>
          <EnsembleTabBar
            playTrack={this.playTrack}
            ensembles={this.state.ensembles}
            selectTab={this.selectTab}
            selectTrack={this.props.selectTrack}
          />
        </main>
      </div>
    );
  }
}

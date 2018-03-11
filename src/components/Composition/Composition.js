import React, { Component } from "react";
import "./Composition.styl";
import SVG from "../svg.js";

const PlayButton = props => (
  <div class="play-button" onMouseDown={props.playTrack}>
    <SVG name="Play" fill="black" width="60" height="60" />
  </div>
);

const Track = props => (
  <div class="track">
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
      />
    ))}
  </div>
);

const Tabs = props => (
  <div class="tabs">
    {props.ensembles.map((ensemble, i) => (
      <div class="tab">
        <li>{ensemble.name}</li>
      </div>
    ))}
  </div>
);

const EnsembleTabBar = props => (
  <div class="ensemble-tab-bar">
    <Tabs ensembles={props.ensembles} />
    <Ensemble tracks={props.ensembles} playTrack={props.playTrack} />
  </div>
);

export default class Composition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ensembles: [
        {
          name: "track1",
          cells: [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
        },
        {
          name: "track2",
          cells: [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
        }
      ]
    };
  }
  playTrack() {
    console.log("playing");
  }
  render() {
    return (
      <div class="composition">
        <header>composition</header>
        <main>
          <EnsembleTabBar
            playTrack={this.playTrack}
            ensembles={this.state.ensembles}
          />
        </main>
      </div>
    );
  }
}

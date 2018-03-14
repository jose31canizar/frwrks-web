import React, { Component } from "react";
import "./Sequencer.styl";

export default class Sequencer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pattern: this.props.pattern,
      shownPattern: this.props.pattern,
      markerIndex: 0,
      playing: false,
      intervalID: null
    };
    this.play = this.play.bind(this);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.playing) {
      this.play();
    } else {
      this.pause();
    }
  }
  pause() {
    window.clearInterval(this.state.intervalID);
  }
  play() {
    let intervalID = window.setInterval(
      () =>
        this.setState((prevState, props) => {
          let newMarkerIndex = (prevState.markerIndex + 1) % 16;
          return {
            shownPattern: prevState.pattern.map(
              (beat, i) => (i == newMarkerIndex ? 2 : beat)
            ),
            markerIndex: newMarkerIndex
          };
        }),
      500
    );
    this.setState({
      intervalID
    });
  }
  render() {
    return (
      <div class="sequencer">
        {this.state.shownPattern.map((cell, i) => (
          <div
            class="cell"
            key={i}
            style={{
              background: cell === 1 ? "#413a48" : cell == 2 ? "red" : "white"
            }}
          />
        ))}
      </div>
    );
  }
}

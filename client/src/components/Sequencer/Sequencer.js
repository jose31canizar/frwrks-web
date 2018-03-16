import React, { Component } from "react";
import Synthesizer from "../Synthesizer/Synthesizer";
import "./Sequencer.styl";

/*
This presentational component that displays to the user the beat of the rhythm
This component is fed a pattern, and a flag telling it whether or not to play
*/
export default class Sequencer extends Component {
  constructor(props) {
    super(props);
    /*
    pattern: the pattern of 0s and 1s fed from the Configuration component,
    shownPattern: the same as the original pattern,
    except with a red marker somewhere in the array,
    markerIndex: the index in the pattern that indicates what beat we are on,
    playing: whether or not this component should be playing,
    intervalID: the id of the beat interval,
    cleared when playing is set to false,
    recreated when playing is true again
    */
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
      if (this.state.playing === false) {
        this.play();
      }
    } else {
      this.pause();
    }
  }
  pause() {
    window.clearInterval(this.state.intervalID);
    this.setState({
      playing: false
    });
  }
  play() {
    let intervalID = window.setInterval(
      () =>
        this.setState(
          (prevState, props) => {
            let newMarkerIndex = (prevState.markerIndex + 1) % 16;
            return {
              shownPattern: prevState.pattern.map(
                (beat, i) => (i == newMarkerIndex ? 2 : beat)
              ),
              markerIndex: newMarkerIndex
            };
          },
          () => {
            this.synthesizer.playC();
          }
        ),
      500
    );
    this.setState({
      playing: true,
      intervalID
    });
  }
  render() {
    return (
      <div class="sequencer">
        <Synthesizer onRef={ref => (this.synthesizer = ref)} />
        {this.state.shownPattern.map((cell, i) =>
          React.Children.map(this.props.children, (element, refCell) => {
            return React.cloneElement(element, {
              ref: refCell,
              style: {
                background:
                  cell === 1 ? "#413a48" : cell === 2 ? "red" : "white"
              }
            });
          })
        )}
      </div>
    );
  }
}

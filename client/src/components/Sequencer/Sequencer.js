import React, { Component } from "react";
import Metronome from "../Metronome/Metronome";
import "./Sequencer.styl";
import { connect } from "react-redux";
import CounterMachine from "../CounterMachine/CounterMachine";
/*
This presentational component that displays to the user the beat of the rhythm
This component is fed a pattern, and a flag telling it whether or not to play
*/
// @connect(
//   state => ({

//   }),
//   dispatch => ({

//   })
// )
const mapStateToProps = state => {
  return { counters: state.counters };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     playSequencer: id => dispatch(playSequencer(id)),
//     pauseSequencer: id => dispatch(pauseSequencer(id))
//   };
// };
class Sequencer extends Component {
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
    this.increment = this.increment.bind(this);
    this.pause = this.pause.bind(this);
    this.start = this.start.bind(this);
  }
  componentWillReceiveProps(newProps) {
    //currently not updating higher up playing variable
    console.log("counters");
    console.log(newProps.counters);
    console.log(newProps.counters[this.props.id]);
    console.log("this.props.id");
    console.log(this.props.id);
    if (newProps.playing && this.state.playing) {
      this.increment(newProps.counters[this.props.id]);
    } else if (newProps.playing === true && this.state.playing === false) {
      this.start();
      console.log("this play()");
      this.setState({ playing: true });
    } else if (
      typeof newProps.counters[this.props.id] === "undefined" ||
      newProps.counters[this.props.id] === -1
    ) {
    } else if (newProps.counters[this.props.id] !== -1) {
      console.log("this pause()");
      this.pause();
      this.setState({ playing: false });
    }
  }
  pause() {
    this.counterMachine.pauseCounter(this.props.id);
  }
  start() {
    this.counterMachine.startCounter(this.props.id);
  }
  increment(marker) {
    // this.metronome.playC();
    this.setState((prevState, props) => {
      return {
        shownPattern: prevState.pattern.map(
          (beat, i) => (i == marker ? 2 : beat)
        ),
        markerIndex: marker
      };
    });
  }
  render() {
    return (
      <div class="sequencer">
        <CounterMachine onRef={ref => (this.counterMachine = ref)} />
        <Metronome onRef={ref => (this.metronome = ref)} />
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

export default connect(mapStateToProps)(Sequencer);

import React, { Component } from "react";
import "./Sequencer.styl";
import { connect } from "react-redux";
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
      intervalID: null,
      playing: false
    };
    this.increment = this.increment.bind(this);
    this.pause = this.pause.bind(this);
    this.join = this.join.bind(this);
    this.pauseAll = this.pauseAll.bind(this);
    this.start = this.start.bind(this);
  }
  componentWillReceiveProps(newProps) {
    /*
      the kickstarter: the first track to kick off the setinterval
      the starter: any track starting that isn't the kickstarter
      the continuers: any track that has started and continues to increment
      the pausers: tracks that pause, but aren't the last one to pause
      the last pauser
    */
    if (typeof newProps.counters === "undefined") {
      console.log("newProps");
      console.log(newProps);
    } else if (
      newProps.counters[this.props.id] === -1 &&
      newProps.playing === false
    ) {
      if (this.props.id === "000") {
        console.log("newProps.playing");
        console.log(newProps.playing);
      }
      //this guard prevents componentWillReceiveProps from looping infinitely because of how redux updates props
      //the kickstarter case
      //play button has been played and counter machine hasn't started
    } else if (
      newProps.playing === true &&
      newProps.counterMachine.state.counting === false &&
      this.state.playing === false
    ) {
      this.start();
      this.setState({ playing: true });
      //the pausers
      //playbutton has been paused and this was previously playing
    } else if (newProps.playing === false && this.state.playing === true) {
      this.pause();
      this.setState({ playing: false });

      //find whether or not all sequencers have been paused

      //mutate so that the sequencer being paused can be checked for last pauser
      newProps.counters[this.props.id] = -1;

      //variable determining if this is the last pauser
      var allPaused;

      if (
        JSON.stringify(newProps.counters) !== "{}" ||
        typeof newProps.counters === "undefined"
      ) {
        //check if every counter is set to -1 or not using reduce
        allPaused = !!Object.values(newProps.counters).reduce(function(a, b) {
          return a === b ? a : NaN;
        });
      } else {
        allPaused = true;
      }

      if (allPaused) {
        this.pauseAll();
      }

      //the starter
      //play button has been played and counter machine was already counting
    } else if (
      newProps.playing === true &&
      newProps.counterMachine.state.counting === true &&
      this.state.playing === false
    ) {
      this.join();
      this.setState({ playing: true });
      //the continuers
      //the new marker from the new counters object is different from the old marker (this.state)
      //and this sequencer was previously playing
    } else if (
      newProps.counters[this.props.id] !== this.state.marker &&
      this.state.playing === true
    ) {
      this.increment(newProps.counters[this.props.id]);
    }
  }
  pause() {
    if (typeof this.props.counterMachine !== "undefined")
      this.props.counterMachine.pauseCounter(this.props.id);
  }
  start() {
    this.props.counterMachine.startCounter(this.props.id);
  }
  join() {
    this.props.counterMachine.joinCounter(this.props.id);
  }
  pauseAll() {
    if (typeof this.props.counterMachine !== "undefined")
      this.props.counterMachine.pauseAll();
  }
  increment(marker) {
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

import React, { Component } from "react";
import {
  playSequencers,
  pauseSequencer,
  pauseAll,
  startSequencer,
  joinSequencer
} from "../../actions/counter";
import Metronome from "../Metronome/Metronome";
import { connect } from "react-redux";
/*
Singleton Counter Machine. This class controls all sequencers and tells them
whether they should be playing or not. This way we only have one setinterval function running at any given time.
*/
class CounterMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: [],
      intervalID: -1,
      counting: false
    };
    this.pauseCounter = this.pauseCounter.bind(this);
    this.pauseAll = this.pauseAll.bind(this);
    this.startCounter = this.startCounter.bind(this);
    this.joinCounter = this.joinCounter.bind(this);
    this.startCounterInterval = this.startCounterInterval.bind(this);
    return CounterMachine.instance;
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  pauseAll() {
    //this dispatches that we pause all sequencers
    this.props.dispatch(pauseAll(this.state.ids));
    //we clear the setinterval
    window.clearInterval(this.state.intervalID);
    //the counter machine should no longer be counting
    this.setState({ counting: false });
  }
  pauseCounter(id) {
    //this dispatches to redux that we pause this sequencer
    this.props.dispatch(pauseSequencer(id));
  }
  //a sequencer has joined the counter
  joinCounter(id) {
    console.log("sequencer has joined counter.");
    //add this new counter to the list of ids if it doesn't exist
    if (this.state.ids.indexOf(id) === -1) {
      this.setState((prevState, props) => {
        let newIDs = prevState.ids;
        newIDs.push(id);
        return {
          ids: newIDs
        };
      });
    }
    this.props.dispatch(joinSequencer(id));
  }
  //start the counter machine
  startCounter(id) {
    console.log("COUNTER HAS STARTED.");
    //add this new counter to the list of ids if it doesn't exist
    if (this.state.ids.indexOf(id) === -1) {
      this.setState((prevState, props) => {
        let newIDs = prevState.ids;
        newIDs.push(id);
        return {
          ids: newIDs
        };
      });
    }

    this.setState({ counting: true });

    //first tick of the start sequencer
    this.metronome.tick();
    this.props.dispatch(startSequencer(id));

    //if there is already an intervalID in existence, clear it
    if (this.state.intervalID !== -1) {
      window.clearInterval(this.state.intervalID);
    }
    //begin the single setinterval function
    this.startCounterInterval();
  }
  //This starts the single setInterval function that runs every second
  startCounterInterval() {
    let intervalID = window.setInterval(() => {
      this.metronome.tick();
      this.props.dispatch(playSequencers(this.state.ids));
    }, 1000);
    //save the interval id to the counterMachine state
    this.setState({ intervalID });
  }
  render() {
    return <Metronome onRef={ref => (this.metronome = ref)} />;
  }
}

// const instance = new CounterMachine();
// Object.freeze(instance);

export default connect()(CounterMachine);

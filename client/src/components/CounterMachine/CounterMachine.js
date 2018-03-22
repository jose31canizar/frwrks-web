import React, { Component } from "react";
import { playSequencers, pauseSequencer } from "../../actions/counter";
import { connect } from "react-redux";
/*
Singleton Counter Machine. This class controls all sequencers and tells them
whether they should be playing or not.
*/

class CounterMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: [],
      intervalID: null
    };
    this.pauseAllCounters = this.pauseAllCounters.bind(this);
    this.pauseCounter = this.pauseCounter.bind(this);
    this.startCounter = this.startCounter.bind(this);
    this.startCounters = this.startCounters.bind(this);
    return CounterMachine.instance;
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  pauseAllCounters() {
    window.clearInterval(this.state.intervalID);
  }
  pauseCounter(id) {
    this.props.dispatch(pauseSequencer(id));
    console.log("pausing counter here");
    this.pauseAllCounters();
  }
  startCounter(id) {
    console.log("starting counter");
    if (this.state.ids.indexOf(id) === -1) {
      this.setState((prevState, props) => {
        let newIDs = prevState.ids;
        newIDs.push(id);
        return {
          ids: newIDs
        };
      });
    }
    console.log("start counter");
    this.startCounters();
  }

  startCounters() {
    console.log("starting counters");
    console.log(this.state.ids);
    let intervalID = window.setInterval(() => {
      console.log(this.state.ids);
      this.props.dispatch(playSequencers(this.state.ids));
    }, 1000);
    this.setState({ intervalID });
  }
  render() {
    return null;
  }
}

// const instance = new CounterMachine();
// Object.freeze(instance);

export default connect()(CounterMachine);

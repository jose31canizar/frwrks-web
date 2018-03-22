import React, { Component } from "react";
import Tone from "tone";

/*
This component is the sound producer for the sequencers.
*/
export default class Metronome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      synth: new Tone.Synth({
        oscillator: {
          type: "pwm",
          modulationFrequency: 0.1
        },
        envelope: {
          attack: 0.0,
          decay: 0,
          sustain: 0.1,
          release: 0.05
        }
      }).toMaster()
    };
    this.playC = this.playC.bind(this);
    this.playD = this.playD.bind(this);
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  playC() {
    this.state.synth.triggerAttackRelease("C4", "8n");
  }
  playD() {
    this.state.synth.triggerAttackRelease("D4", "4n");
  }
  render() {
    return <div />;
  }
}

import React, { Component } from "react";
import Tone from "tone";

/*
This component is the sound producer for the sequencers.
*/
export default class Metronome extends Component {
  constructor(props) {
    super(props);
    var synth = new Tone.Synth({
      oscillator: {
        type: "pwm",
        modulationFrequency: 2.2
      },
      envelope: {
        attack: 0.1,
        decay: 0.4,
        sustain: 1.0,
        release: 0.1
      }
    }).toMaster();
    synth.set("volume", -12);
    this.state = {
      synth: synth
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

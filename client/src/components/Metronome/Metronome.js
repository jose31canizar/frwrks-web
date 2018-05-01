import React, { Component } from "react";
import Tone from "tone";

/*
This component is the sound producer for the sequencers.
*/
export default class Metronome extends Component {
  constructor(props) {
    super(props);
    //create synthesizer
    var synth = new Tone.Synth({
      oscillator: {
        //sine, square, triangle, or sawtooth or pwm or custom
        type: "sawtooth",
        modulationFrequency: 1.2,
        partials: [1, 0.2, 0.01]
      },
      envelope: {
        attack: 0.01,
        decay: 0.01,
        sustain: 0.02,
        release: 0.01
      }
    }).toMaster();
    synth.set("volume", -10);
    this.state = {
      synth: synth
    };
    this.tick = this.tick.bind(this);
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  //output metronome tick sound
  tick() {
    this.state.synth.triggerAttackRelease("C4", "8n");
  }
  render() {
    return <div />;
  }
}

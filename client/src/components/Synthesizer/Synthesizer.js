import React, { Component } from "react";
import Tone from "tone";

export default class Synthesizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      synth: new Tone.Synth().toMaster()
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

import React, { Component } from "react";
import Tone from "tone";
import Instrument from "../Instrument/Instrument";

/*
This component is the keyboard synthesizer.
There is one keyboard, but the data played by the user is different for each track.
*/
export default class Keyboard extends Component {
  constructor(props) {
    super(props);
    var synth = Tone.Synth;
    //create the synth that creates sound
    var polySynth = new Tone.PolySynth(10, synth).toMaster();

    this.state = {
      polySynth: polySynth,
      currentNotes: []
    };
    this.playNotes = this.playNotes.bind(this);
    this.releaseNotes = this.releaseNotes.bind(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  componentDidMount() {
    //allow this component to be referenced so that it can call playNote
    this.props.onRef(this);
  }
  //output audio for this note
  playNotes(notes) {
    console.log("play this note");
    console.log(notes);
    this.setState({ currentNotes: notes }, () => {
      this.state.polySynth.triggerAttack(notes);
    });
  }
  releaseNotes(notes) {
    console.log("releasing");
    this.state.polySynth.triggerRelease(notes);
  }

  render() {
    return (
      //<Instrument
      // onRef={ref => (this.instrument = ref)}
      // update={this.update}
      // />
      <div />
    );
  }
}

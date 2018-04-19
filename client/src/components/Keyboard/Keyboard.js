import React, { Component } from "react";
import "./Keyboard.styl";
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
      //keyMap tracks the current state of what keys are being pressed
      keyMap: [
        { code: "65", on: false },
        { code: "87", on: false }, //black
        { code: "83", on: false },
        { code: "69", on: false }, //black
        { code: "68", on: false },
        { code: "70", on: false },
        { code: "84", on: false }, //black
        { code: "71", on: false },
        { code: "89", on: false }, //black
        { code: "72", on: false },
        { code: "85", on: false }, //black
        { code: "74", on: false },
        { code: "75", on: false },
        { code: "79", on: false }, //black
        { code: "76", on: false },
        { code: "80", on: false }, //black
        { code: "186", on: false }
      ]
    };
    this.playNote = this.playNote.bind(this);
    this.releaseNote = this.releaseNote.bind(this);
    this.findNote = this.findNote.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.update = this.update.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    prevState.keyMap.map((key, i) => {
      if (key.on == false && this.state.keyMap[i].on == true) {
        console.log("key pressed");
        this.playNote(this.findNote(parseInt(key.code)));
        this.props.recordNote();
      } else if (key.on == true && this.state.keyMap[i].on == false) {
        console.log("key released");
        this.releaseNote(this.findNote(parseInt(key.code)));
      }
    });
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  componenentWillReceiveProps(newProps) {
    console.log("receiving new props");
    console.log(newProps);
  }
  componentDidMount() {
    //allow this component to be referenced so that it can call playNote
    this.props.onRef(this);

    //loop through all instrument settings and update this keyboard's polysynth accordingly
    let k;
    let settings = this.instrument.state;
    for (k in settings) {
      this.state.polySynth.set(k, settings[k]);
    }

    "keydown keyup"
      .split(" ")
      .map(name => document.addEventListener(name, this.handleKeyPress, false));
  }
  update() {
    let k;
    let settings = this.instrument.state;
    for (k in settings) {
      this.state.polySynth.set(k, settings[k]);
    }
  }
  handleKeyPress(e) {
    this.setState((prevState, props) => {
      let newMap = prevState.keyMap.map(
        (key, i) =>
          key.code === e.keyCode.toString()
            ? { ...key, on: e.type === "keydown" }
            : key
      );
      // console.log(newMap);
      return {
        keyMap: newMap
      };
    });
  }
  //output audio for this note
  playNote(note) {
    this.state.polySynth.triggerAttack([note]);
  }
  releaseNote(note) {
    console.log("releasing");
    this.state.polySynth.triggerRelease([note]);
  }
  findNote(code) {
    switch (code) {
      case 65:
        return "C4";
      case 87:
        return "C#4";
      case 83:
        return "D4";
      case 69:
        return "D#4";
      case 68:
        return "E4";
      case 70:
        return "F4";
      case 84:
        return "F#4";
      case 71:
        return "G4";
      case 89:
        return "G#4";
      case 72:
        return "A4";
      case 85:
        return "A#4";
      case 74:
        return "B4";
      case 75:
        return "C5";
      case 79:
        return "C#5";
      case 76:
        return "D5";
      case 80:
        return "D#5";
      case 186:
        return "E5";
    }
  }
  render() {
    return (
      <div class="keyboard">
        <Instrument
          onRef={ref => (this.instrument = ref)}
          update={this.update}
        />
        <div class="keyboard-notes">
          {this.state.keyMap.map((key, i) => (
            <div>
              <div class={`key ${key.on ? "pressed" : "unpressed"}`} />
              <p>{this.findNote(parseInt(key.code))}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

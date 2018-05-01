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
      octave: 0,
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
        { code: "186", on: false },
        { code: "88", on: false },
        { code: "90", on: false }
      ]
    };
    this.playNote = this.playNote.bind(this);
    this.playNotes = this.playNotes.bind(this);
    this.releaseNote = this.releaseNote.bind(this);
    this.findNote = this.findNote.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.update = this.update.bind(this);
    this.increaseOctave = this.increaseOctave.bind(this);
    this.decreaseOctave = this.decreaseOctave.bind(this);
  }
  playNotes(oldMap, newMap) {
    console.log("prevState.keyMap");
    console.log(newMap);

    newMap.map((key, i) => {
      // console.log(key);
      // console.log(key.on);
      console.log(key.code);
      console.log("key.code");
      // console.log(key.on);
      // console.log(newMap[i].on);
      // console.log(oldMap[i].on);
      if (oldMap[i].on === false && newMap[i].on === true) {
        if (key.code == 90) {
          this.decreaseOctave();
        } else if (key.code == 88) {
          this.increaseOctave();
        } else {
          this.playNote(this.findNote(parseInt(key.code)));
        }
      } else if (oldMap[i].on === true && newMap[i].on === false) {
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
    this.setState(
      (prevState, props) => {
        let newMap = prevState.keyMap.map(
          (key, i) =>
            key.code === e.keyCode.toString()
              ? { ...key, on: e.type === "keydown" }
              : key
        );

        this.playNotes(this.state.keyMap, newMap);

        return {
          keyMap: newMap
        };
      },
      () => {
        let notesArray = this.state.keyMap
          .filter(note => note.on)
          .map(note => note.code)
          .map(code => this.findNote(parseInt(code)));
        this.props.recordNote(notesArray);
      }
    );
  }
  //output audio for this note
  playNote(note) {
    console.log("play this note");
    console.log(note);
    this.state.polySynth.triggerAttack([note]);
  }
  releaseNote(note) {
    console.log("releasing");
    this.state.polySynth.triggerRelease([note]);
  }
  findNote(code) {
    const { octave } = this.state;
    switch (code) {
      case 65:
        return "C" + (octave + 4);
      case 87:
        return "C#" + (octave + 4);
      case 83:
        return "D" + (octave + 4);
      case 69:
        return "D#" + (octave + 4);
      case 68:
        return "E" + (octave + 4);
      case 70:
        return "F" + (octave + 4);
      case 84:
        return "F#" + (octave + 4);
      case 71:
        return "G" + (octave + 4);
      case 89:
        return "G#" + (octave + 4);
      case 72:
        return "A" + (octave + 4);
      case 85:
        return "A#" + (octave + 4);
      case 74:
        return "B" + (octave + 4);
      case 75:
        return "C" + (octave + 5);
      case 79:
        return "C#" + (octave + 5);
      case 76:
        return "D" + (octave + 5);
      case 80:
        return "D#" + (octave + 5);
      case 186:
        return "E" + (octave + 5);
    }
  }
  increaseOctave() {
    // console.log("increasing octave");
    this.setState((prevState, props) => {
      return { octave: prevState.octave + 1 };
    });
  }
  decreaseOctave() {
    console.log("decreasing");
    this.setState((prevState, props) => {
      return { octave: prevState.octave - 1 };
    });
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

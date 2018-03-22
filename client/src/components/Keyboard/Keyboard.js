import React, { Component } from "react";
import "./Keyboard.styl";
import Tone from "tone";

/*
This component is the keyboard synthesizer.
*/
export default class Keyboard extends Component {
  constructor(props) {
    super(props);
    var synth = Tone.Synth;
    var polySynth = new Tone.PolySynth(10, synth).toMaster();

    polySynth.set("volume", -5);
    polySynth.set("detune", 0);
    this.state = {
      polySynth: polySynth,
      keyMap: {}
    };
    this.playNote = this.playNote.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    let map = prevState.keyMap;
    console.log(map);
    Object.keys(map).map(keyCode => {
      console.log("keycode", keyCode);
      console.log(map[keyCode]);
      if (map[keyCode] == true) {
        console.log("playing");
        this.playNote(parseInt(keyCode));
      }
    });
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  componentDidMount() {
    this.props.onRef(this);
    "keydown keyup"
      .split(" ")
      .map(name => document.addEventListener(name, this.handleKeyPress, false));
  }
  handleKeyPress(e) {
    this.setState((prevState, props) => {
      let newMap = prevState.keyMap;
      newMap[e.keyCode] = e.type === "keydown";
      return {
        keyMap: newMap
      };
    });
  }

  playNote(code) {
    switch (code) {
      case 65:
        this.state.polySynth.triggerAttackRelease(["C4"], "2n");
        return;
      case 83:
        this.state.polySynth.triggerAttackRelease(["E4"], "2n");
        return;
      case 68:
        this.state.polySynth.triggerAttackRelease(["G4"], "2n");
        return;
      case 70:
        this.state.polySynth.triggerAttackRelease(["F4"], "2n");
        return;
      case 71:
        this.state.polySynth.triggerAttackRelease(["A4"], "2n");
        return;
      case 72:
        this.state.polySynth.triggerAttackRelease(["C5"], "2n");
        return;
      case 74:
        this.state.polySynth.triggerAttackRelease(["D5"], "2n");
        return;
      case 75:
        this.state.polySynth.triggerAttackRelease(["F5"], "2n");
        return;
      case 76:
        this.state.polySynth.triggerAttackRelease(["C5"], "2n");
        return;
      case 186:
        this.state.polySynth.triggerAttackRelease(["E5"], "2n");
        return;
    }
  }
  render() {
    return (
      <div class="keyboard">
        <div class="key" />
        <div class="key" />
        <div class="key" />
        <div class="key" />
        <div class="key" />
        <div class="key" />
        <div class="key" />
        <div class="key" />
        <div class="key" />
        <div class="key" />
      </div>
    );
  }
}

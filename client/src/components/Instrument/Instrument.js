import React, { Component } from "react";
import "./Instrument.styl";

export default class Instrument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenInstrument: "70s synth",
      //type prefix: am, fm, fat
      //types: sine, square, triangle, or sawtooth or pwm or custom
      oscillator: {
        type: "square4",
        modulationType: "sawtooth60",
        modulationIndex: 4,
        harmonicity: 3.4
      },
      envelope: {
        attack: 0.01,
        decay: 0.01,
        sustain: 1.0,
        release: 0.1
      },
      volume: -11,
      detune: 0
    };
    this.choose80sSynth = this.choose80sSynth.bind(this);
    this.choose70sSynth = this.choose70sSynth.bind(this);
    this.chooseLightPad = this.chooseLightPad.bind(this);
  }
  choose80sSynth() {
    this.setState(
      {
        oscillator: {
          type: "fatsawtooth4",
          modulationType: "sawtooth60",
          modulationIndex: 4,
          harmonicity: 3.4
        },
        envelope: {
          attack: 0.01,
          decay: 0.01,
          sustain: 1.0,
          release: 0.1
        }
      },
      () => this.props.update()
    );
  }
  choose70sSynth() {
    this.setState(
      {
        oscillator: {
          type: "square4",
          modulationType: "sawtooth60",
          modulationIndex: 4,
          harmonicity: 3.4
        },
        envelope: {
          attack: 0.01,
          decay: 0.01,
          sustain: 1.0,
          release: 0.1
        }
      },
      () => this.props.update()
    );
  }
  chooseLightPad() {
    this.setState(
      {
        oscillator: {
          type: "sine"
        },
        envelope: {
          attack: 0.001,
          decay: 0.4,
          sustain: 0.01,
          release: 1.4,
          attackCurve: "exponential"
        }
      },
      () => this.props.update()
    );
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  componentDidMount() {
    //allow this component to be referenced so that a keyboard can have an associated instrument
    this.props.onRef(this);
  }
  handleOptionPress(option) {
    this.setState({ chosenInstrument: option });
    switch (option) {
      case "80s synth":
        this.choose80sSynth();
        break;
      case "70s synth":
        this.choose70sSynth();
        break;
      case "light pad":
        this.chooseLightPad();
      default:
        break;
    }
  }
  render() {
    return (
      <div class="instrument">
        <p>Choose your instrument sound.</p>
        {["80s synth", "70s synth", "light pad"].map((option, i) => (
          <p
            class="option"
            onMouseDown={() => this.handleOptionPress(option)}
            style={{
              backgroundColor:
                this.state.chosenInstrument === option ? "black" : "white"
            }}
          >
            {option}
          </p>
        ))}
      </div>
    );
  }
}

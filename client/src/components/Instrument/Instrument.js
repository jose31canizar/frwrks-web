import React, { Component } from "react";
import "./Instrument.styl";

const instruments = {
  "70s synth": {
    oscillator: {
      type: "square8",
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
  "light pad": {
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
  "80s synth": {
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
  "Wavy Synth": {
    oscillator: {
      type: "fatsawtooth8",
      modulationType: "sawtooth20",
      modulationIndex: 8,
      harmonicity: 3.4
    },
    envelope: {
      attack: 0.01,
      decay: 0.01,
      sustain: 1.0,
      release: 0.1
    }
  },
  Kick: {
    oscillator: {
      type: "sine2",
      modulationType: "sine2",
      modulationIndex: 1,
      harmonicity: 1.4
    },
    envelope: {
      attack: 0.0,
      decay: 0.2,
      sustain: 1.0,
      release: 0.05
    }
  }
};

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
    this.handleOptionPress = this.handleOptionPress.bind(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  componentDidMount() {
    //allow this component to be referenced so that a keyboard can have an associated instrument
    this.props.onRef(this);
  }
  handleOptionPress(option) {
    console.log(option);
    console.log(instruments[option]);
    this.setState(
      {
        chosenInstrument: option,
        envelope: instruments[option].envelope,
        oscillator: instruments[option].oscillator
      },
      () => this.props.update()
    );
  }
  render() {
    return (
      <div class="instrument">
        <p>Choose your instrument sound.</p>
        {Object.keys(instruments).map((option, i) => (
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

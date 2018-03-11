import React, { Component } from "react";
import "./Configuration.styl";
import Sequencer from "../Sequencer/Sequencer";
import InstrumentRack from "../InstrumentRack/InstrumentRack";

export default class Configuration extends Component {
  render() {
    return (
      <div class="configuration">
        <header>configuration</header>
        <Sequencer />
        {this.props.instrumentRacks.map((instrumentRacks, i) => (
          <InstrumentRack key={i} />
        ))}
      </div>
    );
  }
}

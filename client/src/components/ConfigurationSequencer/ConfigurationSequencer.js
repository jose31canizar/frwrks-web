import React, { Component } from "react";
import Sequencer from "../Sequencer/Sequencer";
import "./ConfigurationSequencer.styl";
import { connect } from "react-redux";
import { sendNotes } from "../../actions/configuration";
import SocketIOClient from "socket.io-client";
import fs from "fs";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  sendNotes: notes => dispatch(sendNotes(notes))
});

class ConfigurationSequencer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.socket = SocketIOClient(`http://localhost:${3001}`);
  }
  componentWillReceiveProps(newProps) {
    console.log("newProps.pattern in configuration sequencer");
    console.log(
      newProps.pattern.reduce((acc, note) => acc + (note === 1 ? "x" : "_"), "")
    );
    let notes = newProps.pattern.reduce(
      (acc, note) => acc + (note === 1 ? "x" : "_"),
      ""
    );
    // this.props.sendNotes(notes);
    this.socket.emit("send-notes", notes);
  }
  componentDidMount() {
    this.socket.on("receive-midi", midi => {
      console.log(midi);
      console.log("receiving");
      // var data = midi.replace(/^data:image\/\w+;base64,/, "");
      // var buf = new Buffer(data, "base64");
      // fs.writeFile("image.png", buf);
      // fs.writeFile("tmp/test.mid", midi, function(err) {
      //   if(err) {
      //       return console.log(err);
      //   }

      //   console.log("The file was saved!");
      // });
    });
  }
  componentWillUnmount() {
    this.socket.disconnect();
  }
  render() {
    return (
      <Sequencer
        counterMachine={this.props.counterMachine}
        pattern={this.props.pattern}
        playing={this.props.playing}
        selectedTrackID={this.props.selectedTrackID}
        id={this.props.id}
        onRef={this.props.onRef}
      >
        <div class="cell" />
      </Sequencer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ConfigurationSequencer
);

import React, { Component } from "react";
import "./Dashboard.styl";
import Composition from "../Composition/Composition";
import Configuration from "../Configuration/Configuration";

/*
The highest component containing the configuration and composition pages
*/
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    const w = Math.max(document.body.clientWidth, window.innerWidth || 0);
    this.state = {
      firstPaneWidth: w / 2,
      fullWidth: w,
      cursor: "pointer",
      ensembles: [
        {
          name: "Ensemble 1",
          tracks: [
            {
              name: "Track 1",
              pattern: [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0]
            },
            {
              name: "Track 2",
              pattern: [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0]
            },
            {
              name: "Track 3",
              pattern: [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0]
            }
          ]
        },
        {
          name: "Ensemble 2",
          tracks: [
            {
              name: "Track 1",
              pattern: [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0]
            },
            {
              name: "Track 2",
              pattern: [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0]
            },
            {
              name: "Track 3",
              pattern: [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0]
            },
            {
              name: "Track 4",
              pattern: [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0]
            }
          ]
        },
        {
          name: "Ensemble 3",
          tracks: [
            {
              name: "Track 1",
              pattern: [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0]
            },
            {
              name: "Track 2",
              pattern: [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0]
            },
            {
              name: "Track 3",
              pattern: [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0]
            },
            {
              name: "Track 4",
              pattern: [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0]
            },
            {
              name: "Track 5",
              pattern: [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0]
            }
          ]
        }
      ],
      selectedEnsembleIndex: 0
    };
    this.adjustPaneWidths = this.adjustPaneWidths.bind(this);
    this.selectEnsemble = this.selectEnsemble.bind(this);
  }
  componentDidMount() {
    window.addEventListener("resize", () => {
      const w = Math.max(document.body.clientWidth, window.innerWidth || 0);
      this.setState({ firstPaneWidth: w / 2, fullWidth: w });
    });
  }
  adjustPaneWidths(e) {
    console.log(e.clientX);
    this.setState({
      firstPaneWidth: e.clientX
    });
  }
  selectTrack(i) {}
  selectEnsemble(i) {
    this.setState({
      selectedEnsembleIndex: i
    });
  }
  render() {
    return (
      <div className="dashboard">
        <Composition
          width={this.state.firstPaneWidth}
          selectEnsemble={this.selectEnsemble}
          selectedEnsembleIndex={this.state.selectedEnsembleIndex}
          ensembles={this.state.ensembles}
        />
        <div
          class="divider-container"
          onDrag={e => this.adjustPaneWidths(e)}
          onMouseDown={() => this.setState({ cursor: "ew-resize" })}
          onMouseUp={() => this.setState({ cursor: "pointer" })}
          onDragEnd={e => this.adjustPaneWidths(e)}
        >
          <div class="divider" style={{ cursor: this.state.cursor }} />
        </div>
        <Configuration
          instrumentRacks={this.props.instrumentRacks}
          width={this.state.fullWidth - this.state.firstPaneWidth}
        />
      </div>
    );
  }
}

import React, { Component } from "react";
import "./Dashboard.styl";
import Composition from "../Composition/Composition";
import Configuration from "../Configuration/Configuration";
import { connect } from "react-redux";
/*
The highest component containing the configuration and composition pages
*/
const mapStateToProps = state => {
  return { ensembles: state.ensembles };
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    const w = Math.max(document.body.clientWidth, window.innerWidth || 0);
    this.state = {
      firstPaneWidth: w / 2,
      fullWidth: w,
      cursor: "pointer",
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

export default connect(mapStateToProps)(Dashboard);
// export default Dashboard;

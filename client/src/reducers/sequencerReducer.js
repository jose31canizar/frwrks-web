const defaultState = {
  counters: {},
  selectedTrackID: "000",
  playingSelectedTrack: false,
  selectedTrack: {
    name: "Track 1",
    pattern: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  selectedEnsembleName: "Ensemble 1",
  ensembles: [
    {
      name: "Ensemble 1",
      tracks: [
        {
          name: "Track 1",
          pattern: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          name: "Track 2",
          pattern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]
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
  ]
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SELECT_TRACK":
      const id = action.id;
      console.log("ID");
      console.log(id);
      // console.log(state.ensembles[id[2]]);
      let ensemble = state.ensembles[id[2]];
      // console.log(ensemble.tracks[id[0]]);
      let track = ensemble.tracks[id[0]];
      return {
        ensembles: state.ensembles,
        counters: state.counters,
        selectedTrackID: id,
        selectedTrack: { ...track },
        selectedEnsembleName: ensemble.name,
        playing: state.playing
      };
    case "ADD_ENSEMBLE":
      console.log("state");
      console.log(state);
      return {
        playing: state.playing,
        selectedTrackID: state.selectedTrackID,
        selectedTrack: { ...state.selectedTrack },
        selectedEnsembleName: state.selectedEnsembleName,
        ensembles: [
          ...state.ensembles,
          {
            name: "new",
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
          }
        ],
        counters: { ...state.counters }
      };
    case "JOIN":
      return {
        playing: state.playing,
        selectedTrackID: state.selectedTrackID,
        selectedTrack: { ...state.selectedTrack },
        selectedEnsembleName: state.selectedEnsembleName,
        counters: {
          ...state.counters,
          [action.id]: 0
        },
        ensembles: state.ensembles
      };
    case "START":
      return {
        playing: true,
        selectedTrackID: state.selectedTrackID,
        selectedTrack: { ...state.selectedTrack },
        selectedEnsembleName: state.selectedEnsembleName,
        counters: {
          ...state.counters,
          [action.id]: 0
        },
        ensembles: state.ensembles
      };
    case "INCREMENT":
      return {
        playing: state.playing,
        selectedTrackID: state.selectedTrackID,
        selectedTrack: { ...state.selectedTrack },
        selectedEnsembleName: state.selectedEnsembleName,
        counters: {
          ...state.counters,
          ...action.ids.reduce((obj, id) => {
            if (typeof state.counters[id] === "undefined") {
              obj[id] = 0;
            } else if (
              typeof state.counters[id] !== "undefined" &&
              state.counters[id] !== -1
            ) {
              obj[id] = (state.counters[id] + 1) % 16;
            } else {
              obj[id] = -1;
            }
            return obj;
          }, {})
        },
        ensembles: state.ensembles
      };
    case "PAUSE":
      return {
        playing: state.playing,
        selectedTrackID: state.selectedTrackID,
        selectedTrack: { ...state.selectedTrack },
        selectedEnsembleName: state.selectedEnsembleName,
        counters: {
          ...state.counters,
          [action.id]: -1
        },
        ensembles: state.ensembles
      };
    case "PAUSE_ALL":
      return {
        playing: false,
        selectedTrackID: state.selectedTrackID,
        selectedTrack: { ...state.selectedTrack },
        selectedEnsembleName: state.selectedEnsembleName,
        counters: {
          ...state.counters,
          ...action.ids.reduce((obj, id) => {
            obj[id] = -1;
            return obj;
          }, {})
        },
        ensembles: state.ensembles
      };
    case "RESTART":
      return {};
    default:
      return defaultState;
  }
};

export default reducer;

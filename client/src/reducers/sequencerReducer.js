const defaultState = {
  counters: {},
  selectedTrackID: "000",
  playing: false, //not to be confused with the playing flag associated with the playing flag in each track
  //this flag means whether or not anything is playing (is the counter on)
  //not whether a specific track is playing or not
  selectedTrack: {
    name: "Track 1",
    pattern: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  selectedEnsembleName: "Ensemble 1",
  ensembles: [
    {
      name: "Ensemble 1",
      selected: true,
      tracks: [
        {
          name: "Track 1",
          pattern: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          playing: false,
          icon: "play"
        },
        {
          name: "Track 2",
          pattern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
          playing: false,
          icon: "play"
        },
        {
          name: "Track 3",
          pattern: [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
          playing: false,
          icon: "play"
        }
      ]
    },
    {
      name: "Ensemble 2",
      selected: false,
      tracks: [
        {
          name: "Track 1",
          pattern: [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
          playing: false,
          icon: "play"
        },
        {
          name: "Track 2",
          pattern: [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
          playing: false,
          icon: "play"
        },
        {
          name: "Track 3",
          pattern: [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
          playing: false,
          icon: "play"
        },
        {
          name: "Track 4",
          pattern: [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
          playing: false,
          icon: "play"
        }
      ]
    },
    {
      name: "Ensemble 3",
      selected: false,
      tracks: [
        {
          name: "Track 1",
          pattern: [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
          playing: false,
          icon: "play"
        },
        {
          name: "Track 2",
          pattern: [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
          playing: false,
          icon: "play"
        },
        {
          name: "Track 3",
          pattern: [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
          playing: false,
          icon: "play"
        },
        {
          name: "Track 4",
          pattern: [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
          playing: false,
          icon: "play"
        },
        {
          name: "Track 5",
          pattern: [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
          playing: false,
          icon: "play"
        }
      ]
    }
  ]
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "TOGGLE_TRACK":
      //change track playing state to true or false and play or pause respectively
      let newE = state.ensembles.map(
        (ensemble, i) =>
          i === action.ei
            ? {
                ...ensemble,
                tracks: ensemble.tracks.map(
                  (track, j) =>
                    j === action.ti
                      ? {
                          ...track,
                          playing: !track.playing,
                          icon: track.icon === "play" ? "pause" : "play"
                        }
                      : track
                )
              }
            : ensemble
      );
      console.log("toggle track");
      console.log(newE);
      return {
        ...state,
        ensembles: newE
      };
    case "SELECT_TAB":
      console.log("action");
      console.log(action.i);
      console.log(
        state.ensembles.map(
          (ensemble, i) =>
            i === action.i
              ? { ...ensemble, selected: true }
              : { ...ensemble, selected: false }
        )
      );
      return {
        ...state,
        ensembles: state.ensembles.map(
          (ensemble, i) =>
            i === action.i
              ? { ...ensemble, selected: true }
              : { ...ensemble, selected: false }
        )
      };
    case "RECORD_NOTE":
      // const id = action.id;
      // console.log("ID");
      // console.log(action.id);
      //an id works like this:
      //000
      //first number is the index of the track in the ensemble
      //last number is the index of what ensemble it belongs to

      // let ensemble = state.ensembles[id[2]];
      // let track = ensemble.tracks[id[0]];
      let ei = parseInt(action.id[2]);
      let tj = parseInt(action.id[0]);

      let newEnsembles = state.ensembles.map(
        (ensemble, i) =>
          i === ei
            ? {
                ...ensemble,
                tracks: ensemble.tracks.map(
                  (track, j) =>
                    j === tj
                      ? {
                          ...track,
                          pattern: track.pattern.map(
                            (n, i) => (i === action.i ? 1 : n)
                          )
                        }
                      : track
                )
              }
            : ensemble
      );
      // console.log("newEnsembles");
      // console.log(action.id[2]);

      // console.log(newEnsembles[i].tracks[j]);
      // console.log(newEnsembles);

      return {
        ...state,
        selectedTrack: {
          ...state.selectedTrack,
          pattern: state.selectedTrack.pattern.map(
            (n, i) => (i === action.i ? 1 : n)
          )
        },
        ensembles: newEnsembles
      };
    //when a track is selected by the user, it shows on the configuration page
    case "SELECT_TRACK":
      const id = action.id;
      let ensemble = state.ensembles[id[2]];
      let track = ensemble.tracks[id[0]];
      return {
        ensembles: state.ensembles,
        counters: state.counters,
        selectedTrackID: id,
        selectedTrack: { ...track },
        selectedEnsembleName: ensemble.name,
        playing: state.playing
      };
    //adding a new ensemble
    case "ADD_ENSEMBLE":
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
    //when a track joins in and starts playing in sync
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
    //when the first track plays
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
    //when all the tracks that are currently playing play the next beat
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
    //when a track gets paused
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
    //when the final track is paused
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

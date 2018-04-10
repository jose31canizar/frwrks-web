const defaultState = {
  counters: {},
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
  ]
};

const reducer = (state = defaultState, action) => {
  // console.log("calling reducer");
  switch (action.type) {
    case "ADD_ENSEMBLE":
      console.log("state");
      console.log(state);
      return {
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
        counters: {
          ...state.counters,
          [action.id]: 0
        },
        ensembles: state.ensembles
      };
    case "START":
      return {
        counters: {
          ...state.counters,
          [action.id]: 0
        },
        ensembles: state.ensembles
      };
    case "INCREMENT":
      return {
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
      // console.log("calling pause");
      // console.log("state.counters");
      // console.log(state.counters);
      // console.log("action.id");
      // console.log(action.id);
      return {
        counters: {
          ...state.counters,
          [action.id]: -1
        },
        ensembles: state.ensembles
      };
    case "PAUSE_ALL":
      // console.log("pausing all");
      // console.log(state.counters);
      return {
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

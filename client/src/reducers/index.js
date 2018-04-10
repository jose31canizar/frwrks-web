const defaultState = { counters: {} };

const reducer = (state = defaultState, action) => {
  // console.log("calling reducer");
  switch (action.type) {
    case "JOIN":
      return {
        counters: {
          ...state.counters,
          [action.id]: 0
        }
      };
    case "START":
      return {
        counters: {
          ...state.counters,
          [action.id]: 0
        }
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
        }
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
        }
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
        }
      };
    case "RESTART":
      return {};
    default:
      return defaultState;
  }
};

export default reducer;

const defaultState = { counters: {} };

const reducer = (state = defaultState, action) => {
  console.log("calling reducer");
  switch (action.type) {
    case "INCREMENT":
      console.log("calling increment");
      console.log(action.ids);
      return {
        counters: {
          ...state.counters,
          ...action.ids.reduce((obj, id) => {
            obj[id] =
              typeof state.counters[id] !== "undefined"
                ? (state.counters[id] + 1) % 16
                : 0;
            return obj;
          }, {})
        }
      };
    case "PAUSE":
      console.log("calling pause");
      return {
        counters: {
          ...state.counters,
          [action.id]: -1
        }
      };
    case "RESTART":
      return {};
    default:
      return defaultState;
  }
};

export default reducer;

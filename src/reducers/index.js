const defaultState = {
  loggedIn: false,
  firstName: "",
  id: ""
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {};
    default:
      return defaultState;
  }
};

export default reducer;

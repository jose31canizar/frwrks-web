export const addEnsemble = () => {
  return { type: "ADD_ENSEMBLE" };
};

export const selectTrack = id => {
  return { type: "SELECT_TRACK", id: id };
};

export const selectTab = i => {
  return { type: "SELECT_TAB", i: i };
};

export const toggleTrack = (ei, ti) => {
  return {
    type: "TOGGLE_TRACK",
    ei: ei,
    ti: ti
  };
};

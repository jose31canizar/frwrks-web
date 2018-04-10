export const addEnsemble = () => {
  return { type: "ADD_ENSEMBLE" };
};

export const selectTrack = id => {
  return { type: "SELECT_TRACK", id: id };
};

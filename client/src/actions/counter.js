export const playSequencers = ids => {
  // console.log("playing sequencers");
  return { type: "INCREMENT", ids: ids };
};

export const joinSequencer = id => {
  return { type: "JOIN", id: id };
};

export const startSequencer = id => {
  return { type: "START", id: id };
};

export const pauseSequencer = id => {
  return { type: "PAUSE", id: id };
};

export const pauseAll = ids => {
  return { type: "PAUSE_ALL", ids: ids };
};

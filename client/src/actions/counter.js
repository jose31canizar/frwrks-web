export const playSequencers = ids => {
  console.log("playing sequencers");
  return { type: "INCREMENT", ids: ids };
};

export const pauseSequencer = id => {
  return { type: "PAUSE", id: id };
};

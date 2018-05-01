export const recordNote = (i, notesPlayed, id) => {
  return { type: "RECORD_NOTE", i: i, notesPlayed: notesPlayed, id: id };
};

const API = "http://localhost:3001";

export const sendNotesSuccess = notes => ({
  type: "SEND_NOTES_SUCCESS",
  notes: notes
});

export const sendNotesError = notes => ({
  type: "SEND_NOTES_ERROR",
  notes: notes
});

export const sendNotes = notes => {
  console.log("in action, notes");
  console.log(notes);
  return dispatch => {
    console.log("in action, notes in dispatch");
    console.log(notes);
    fetch(`${API}/scribble`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ notes: notes })
    })
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          return res.json();
        } else {
          const error = new Error(res.statusText);
          error.response = res;
          console.log(`There was clearly an error with scribbling`);
          dispatch(sendNotesError(error));
          throw error;
        }
      })
      .then(res => {
        dispatch(sendNotesSuccess(res));
      })
      .catch(error => {
        dispatch(sendNotesError(error));
      });
  };
};

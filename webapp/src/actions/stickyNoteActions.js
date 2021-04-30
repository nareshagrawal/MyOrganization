export const GET_ALL_NOTES = "GET_ALL_NOTES";
export const ADD_NEW_NOTE = "ADD_NEW_NOTE";
export const DELETE_NOTE = "DELETE_EVENT";

export const getAllNotes = (dispatch, payload) => {
    dispatch({ type: GET_ALL_NOTES, payload })
}

export const addNewNote = (dispatch, payload) => {
    dispatch({ type: ADD_NEW_NOTE, payload })
}

export const deleteNote = (dispatch, payload) => {
    dispatch({ type: DELETE_NOTE, payload })
}

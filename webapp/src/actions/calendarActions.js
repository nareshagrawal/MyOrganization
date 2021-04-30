export const GET_ALL_EVENTS = "GET_ALL_EVENTS";
export const ADD_NEW_EVENTS = "ADD_NEW_EVENTS";
export const SELECT_EVENT = "SELECT_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";
export const UPDATE_EVENT = "UPDATE_EVENT";


export const getAllEvents = (dispatch, payload) => {
    dispatch({ type: GET_ALL_EVENTS, payload })
}


export const addNewEvent = (dispatch, payload) => {
    dispatch({ type: ADD_NEW_EVENTS, payload })
}

export const selectEvent = (dispatch, payload) => {
    dispatch({ type: SELECT_EVENT, payload })
}

export const updateEvent = (dispatch, payload) => {
    dispatch({ type: UPDATE_EVENT, payload })
}
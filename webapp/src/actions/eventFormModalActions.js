export const SHOW_MODAL = "SHOW_MODAL";
export const UPDATE_DATERANGE = "UPDATE_DATERANGE"


export const showAndHideModal = (dispatch, payload) => {
    dispatch({ type: SHOW_MODAL, payload })
}


export const updateDateRange = (dispatch, payload) => {
    dispatch({ type: UPDATE_DATERANGE, payload })
}
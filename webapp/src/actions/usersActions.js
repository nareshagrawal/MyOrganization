export const GET_ALL_USERS = "GET_ALL_USERS";


export const getAllUsers = (dispatch, payload) => {
    dispatch({ type: GET_ALL_USERS, payload })
}

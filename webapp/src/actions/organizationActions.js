export const GET_CURRENT_ORG_DETAIL = "GET_CURRENT_ORG_DETAIL";


export const getOrgDetails = (dispatch, payload) => {
    dispatch({ type: GET_CURRENT_ORG_DETAIL, payload })
}

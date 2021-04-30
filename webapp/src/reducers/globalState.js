import { GET_CURRENT_ORG_DETAIL } from './../actions/organizationActions'
import { GET_ALL_USERS } from './../actions/usersActions'


const globalState = {
    orgDetail: {},
    usersList: []
};


export const globalStateReducer = (state = globalState, action) => {
    switch (action.type) {
        case GET_CURRENT_ORG_DETAIL:
            // console.log("action.payload", action.payload)
            return {
                ...state, orgDetail: action.payload
            }
        case GET_ALL_USERS:
            return {
                ...state, usersList: action.payload
            }
        default:
            return state;

    }

};

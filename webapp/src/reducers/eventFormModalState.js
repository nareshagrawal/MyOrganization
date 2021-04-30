import {
    SHOW_MODAL
    , UPDATE_DATERANGE
} from './../actions/eventFormModalActions'

const initialState = {
    modalShow: false,
    dateRange: {
        start: {
            date: "",
            time: "",
            timezone: ""
        },
        end: {
            date: "",
            time: "",
            timezone: ""
        }
    }
};


export const eventFormReducer = (state = initialState, action) => {

    switch (action.type) {
        case SHOW_MODAL:
            return { ...state, modalShow: action.payload }
        case UPDATE_DATERANGE:
            return { ...state, dateRange: { ...action.payload } }
        default:
            return state;

    }
};

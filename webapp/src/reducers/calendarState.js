import {
    GET_ALL_EVENTS,
    ADD_NEW_EVENTS,
    SELECT_EVENT,
    UPDATE_EVENT
} from './../actions/calendarActions'


const initialState = {
    eventList: [],
    selectedEvent: {}
};


export const calendarReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_ALL_EVENTS:
            return {
                ...state, eventList: action.payload
            }
        case ADD_NEW_EVENTS:
            let { eventList } = { ...state };
            eventList.push(action.payload);
            return { ...state, eventList: eventList }
        case SELECT_EVENT:
            console.log(action.payload);
            let selectedEvent = state.eventList.filter(event =>
                event.eventId === action.payload.eventId);
            return {
                ...state, selectedEvent: selectedEvent[0]
            }
        case UPDATE_EVENT:
            let { startDateTime, endDateTime, eventId } = { ...action.payload };
            let updatedEventList = state.eventList.map(event => {
                if (event.eventId === eventId) {
                    return {
                        ...event,
                        start: {
                            ...event.start,
                            dateTime: startDateTime
                        },
                        end: {
                            ...event.end,
                            dateTime: endDateTime
                        },
                    }
                } else {
                    return event;
                }
            });
            return {
                ...state, eventList: updatedEventList
            }
        default:
            return state;

    }
};

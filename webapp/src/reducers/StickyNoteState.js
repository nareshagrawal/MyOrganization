import { ADD_NEW_NOTE, DELETE_NOTE, GET_ALL_NOTES } from '../actions/stickyNoteActions'


const initialNotesState = {
    lastNoteCreated: null,
    totalNotes: 0,
    notes: [],
};

export const notesReducer = (state = initialNotesState, action) => {
    switch (action.type) {
        case GET_ALL_NOTES:

            return {
                ...state
                , totalNotes: action.payload.stickies === undefined ? 0 : action.payload.stickies.length
                , notes: action.payload.stickies === undefined ? [] : action.payload.stickies
            }
        case ADD_NEW_NOTE:
            const newState = {
                notes: [...state.notes, action.payload],
                totalNotes: state.notes.length + 1,
                lastNoteCreated: new Date().toTimeString().slice(0, 8),
            };
            console.log('After ADD_NOTE: ', newState);
            return newState;

        case DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.payload.id),
                totalNotes: state.notes.length - 1,
            };
        default:
            return state;
    }
};



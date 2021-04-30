import { combineReducers, createStore } from 'redux';
import { globalStateReducer } from './reducers/globalState'
import { eventFormReducer } from './reducers/eventFormModalState'
import { calendarReducer } from './reducers/calendarState';
import { notesReducer } from './reducers/StickyNoteState'

const reducers = combineReducers({
    eventFormReducer,
    calendarReducer,
    globalStateReducer,
    notesReducer
});

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
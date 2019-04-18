/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import homereducer from './modules/reducers/reducer';
import gamereducer from './modules/reducers/gamereducer';


// Combine all reducers into one root reducer
const reducer = combineReducers({
     homereducer,
     gamereducer
});

export default reducer;

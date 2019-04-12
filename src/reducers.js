/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import reducertest from './modules/reducers/reducer';


// Combine all reducers into one root reducer
const reducer = combineReducers({
     reducertest
});

export default reducer;
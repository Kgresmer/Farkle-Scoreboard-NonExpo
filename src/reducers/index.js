import { combineReducers } from 'redux';
import PlayerReducer from "./PlayerReducer";
import SortOrderReducer from "./SortOrderReducer";

export default combineReducers({
    sortOrder: SortOrderReducer,
    player: PlayerReducer
})
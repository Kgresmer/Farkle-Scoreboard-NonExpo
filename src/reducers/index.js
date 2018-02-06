import { combineReducers } from 'redux';
import PlayerReducer from "./PlayerReducer";
import SortOrderReducer from "./SortOrderReducer";

export default combineReducers({
    player: PlayerReducer,
    sortOrder: SortOrderReducer
})
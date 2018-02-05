import { combineReducers } from 'redux';
import PlayerReducer from "./PlayerReducer";

export default combineReducers({
    player: PlayerReducer
})
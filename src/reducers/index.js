import { combineReducers } from 'redux';
import PlayerReducer from "./PlayerReducer";
import SortOrderReducer from "./SortOrderReducer";
import GameScoreboardReducer from "./GameScoreboardReducer";

export default combineReducers({
    sortOrder: SortOrderReducer,
    player: PlayerReducer,
    game: GameScoreboardReducer
})
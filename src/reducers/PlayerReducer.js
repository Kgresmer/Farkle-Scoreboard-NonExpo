import { REHYDRATE } from 'redux-persist/es/constants';
import { ADD_EXISTING_PLAYER,
    DROP_PLAYER,
    PLAYER_CREATED,
    PLAYER_DELETED} from "../actions/types";

const INITIAL_STATE = {
    playerList: [],
    roster: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PLAYER_CREATED:
            console.log('create player');
            const newPlayer = {
                id: 1,
                name: action.payload,
                wins: 0,
                losses: 0,
                bestScore: null,
                worstScore: null
            };
            state.playerList.push(newPlayer);
            state.roster.push(newPlayer);
            return {
                playerList: state.playerList,
                roster: state.roster
            };
        case PLAYER_DELETED:
            console.log('delete player');
            const playerListIndex = state.playerList.find(player => {
                return player.id === action.payload;
            });
            const rosterIndex = state.roster.find(player => {
                return player.id === action.payload;
            });
            state.playerList.splice(playerListIndex, 1);
            state.roster.splice(rosterIndex, 1);
            return {
                playerList: state.playerList,
                roster: state.roster,
            };
        case DROP_PLAYER:
            console.log('drop player' + state.roster);
            if (state.roster) {
                const rosterIndexDrop = state.roster.find(player => {
                    return player.id === action.payload;
                });
                state.roster.splice(rosterIndexDrop, 1);
                return {
                    roster: state.roster,
                    playerList: state.playerList
                };
            } else {
                return { ...state };
            }
        case ADD_EXISTING_PLAYER:
            console.log('add player' + state.roster);
            return {
                playerList: state.playerList,
                roster: state.roster.push(newPlayer)
            };
        case REHYDRATE:
            console.log('hydrate');
            let playerList = [];
            let roster = [];
            if (action.payload.playerList) {
                playerList = action.payload.playerList;
            }
            if (action.payload.roster) {
                roster = action.payload.roster;
            }
            return {
                playerList: playerList,
                roster: roster
            };
        default:
            console.log('default');
            return { ...state};
    }
}
import {ADD_PLAYER, DROP_PLAYER, PLAYER_CREATED, PLAYER_DELETED} from "../actions/types";
import {REHYDRATE} from 'redux-persist/es/constants';

const INITIAL_STATE = {
    playerList: [],
    roster: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PLAYER_CREATED:
            console.log('create player' + state.roster);
            const newPlayer = {
                id: 1,
                name: action.payload,
                wins: 0,
                losses: 0,
                bestScore: null,
                worstScore: null
            };
            return {
                playerList: state.playerList.push(newPlayer),
                roster: state.roster.push(newPlayer)
            };
        case PLAYER_DELETED:
            console.log('delete player' + state.roster);
            const playerListIndex = state.playerList.find(player => {
                return player.id = action.payload;
            });
            const rosterIndex = state.roster.find(player => {
                return player.id = action.payload;
            });
            return {
                playerList: state.playerList.splice(playerListIndex, 1),
                roster: state.roster.splice(rosterIndex, 1),
            };
        case DROP_PLAYER:
            console.log('drop player' + state.roster);
            if (state.roster) {
                const rosterIndexDrop = state.roster.find(player => {
                    return player.id = action.payload;
                });

                return {
                    roster: state.roster.splice(rosterIndexDrop, 1),
                    playerList: state.playerList
                };
            } else {
                return { ...state };
            }
        case ADD_PLAYER:
            console.log('add player' + state.roster);
            return {
                playerList: state.playerList,
                roster: state.roster.push(newPlayer)
            };
        default:
            console.log('default');
            return state;
    }
}
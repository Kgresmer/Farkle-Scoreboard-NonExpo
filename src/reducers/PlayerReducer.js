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
            const t = new Date();
            const newPlayer = {
                id: t.getTime(),
                key: t.getTime(),
                name: action.payload,
                wins: 0,
                losses: 0,
                bestScore: 0,
                worstScore: 0
            };
            state.playerList.push(newPlayer);
            state.roster.push(newPlayer);
            return {
                playerList: clone(state.playerList),
                roster: clone(state.roster)
            };
        case PLAYER_DELETED:
            console.log('delete player');
            let playerListIndexDrop = -1;
            state.playerList.map((player, index) => {
                if (player.id === action.payload) {
                    playerListIndexDrop = index;
                }
            });
            if (playerListIndexDrop !== -1) {
                state.playerList.splice(playerListIndexDrop, 1);
            }

            let rosterIndexDrop = -1;
            state.roster.map((player, index) => {
                if (player.id === action.payload) {
                    rosterIndexDrop = index;
                }
            });
            if (rosterIndexDrop !== -1) {
                state.roster.splice(rosterIndexDrop, 1);
            }

            return {
                playerList: clone(state.playerList),
                roster: clone(state.roster),
            };
        case DROP_PLAYER:
            console.log('drop player');
            if (state.roster) {
                let rosterIndexDrop = -1;
                state.roster.map((player, index) => {
                    if (player.id === action.payload) {
                        rosterIndexDrop = index;
                    }
                });
                if (rosterIndexDrop !== -1) {
                    state.roster.splice(rosterIndexDrop, 1);
                }
                return {
                    roster: clone(state.roster),
                    playerList: clone(state.playerList)
                };
            } else {
                return { ...state };
            }
        case ADD_EXISTING_PLAYER:
            console.log('add player');
            if (action.payload) {
                state.roster.push(action.payload);
            }

            return {
                playerList: clone(state.playerList),
                roster: clone(state.roster)
            };
        case REHYDRATE:
            console.log('hydrate');
            let playerList = [];
            let roster = [];
            if (action.payload && action.payload.playerList) {
                playerList = action.payload.playerList;
            }
            if (action.payload && action.payload.roster) {
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

function clone(src) {
    return JSON.parse(JSON.stringify(src));
}
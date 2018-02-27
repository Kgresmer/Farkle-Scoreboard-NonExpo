import { REHYDRATE } from 'redux-persist/es/constants';
import {
    ADD_EXISTING_PLAYER,
    DROP_PLAYER,
    PLAYER_CREATED,
    PLAYER_DELETED,
    PLAYER_NAME_UPDATED
} from "../actions/types";

const INITIAL_STATE = {
    playerList: [],
    roster: [],
    playerName: '',
    errorMessage: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PLAYER_NAME_UPDATED:
            console.log('player name updated reducer')
            if (action.payload) {
                return {
                    ...state,
                    playerName: action.payload
                };
            } else {
                return {
                    ...state,
                    playerName: ''
                }
            }
        case PLAYER_CREATED:
            if (action.payload) {
                const existingPlayer = state.playerList.find(
                    (existingPlayer) => {
                        return existingPlayer.name.toLowerCase() === action.payload.toLowerCase();
                    });
                if (existingPlayer) {
                    return {
                        ...state,
                        errorMessage: 'That player already exists! Be original.'
                    };
                }

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
            }
            return {
                playerList: clone(state.playerList),
                roster: clone(state.roster),
                playerName: '',
                errorMessage: ''
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
                playerName: '',
                errorMessage: ''
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
                    playerList: clone(state.playerList),
                    playerName: '',
                    errorMessage: ''
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
                roster: clone(state.roster),
                playerName: '',
                errorMessage: ''
            };
        case REHYDRATE:
            console.log('hydrate');
            if (action.payload) {
                let playerList = [];
                let roster = [];
                if (action.payload && action.payload.player.playerList) {
                    playerList = action.payload.player.playerList;
                }
                if (action.payload && action.payload.player.roster) {
                    roster = action.payload.player.roster;
                }
                return {
                    playerList: playerList,
                    roster: roster,
                    playerName: '',
                    errorMessage: ''
                };
            } else {
                return { ...state};
            }
        default:
            console.log('default');
            return { ...state};
    }
}

function clone(src) {
    return JSON.parse(JSON.stringify(src));
}
import {CREATE_INITIAL_ORDER_LIST, UPDATE_PLAYER_ORDER_LIST} from "../actions/types";
const INITIAL_STATE = {
    playerList: [],
    roster: [],
    sortedPlayerList: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_PLAYER_ORDER_LIST:
            console.log('update player list reducer');

            return {
                ...state,
                sortedPlayerList: clone(action.payload)
            };
        case CREATE_INITIAL_ORDER_LIST:
            console.log('create player sort list');
            const initialPlayerList = {};
            state.roster.map((player, index) => {
                initialPlayerList[index] = player;
            });

            return {
                ...state,
                sortedPlayerList: initialPlayerList
            };
        default:
            console.log('sort list default');
            return { ...state};
    }
}

function clone(src) {
    return JSON.parse(JSON.stringify(src));
}
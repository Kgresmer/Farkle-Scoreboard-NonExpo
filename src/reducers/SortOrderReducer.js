import {CREATE_INITIAL_ORDER_LIST, SEND_PLAYER_ORDER_LIST} from "../actions/types";
const INITIAL_STATE = {
    roster: [],
    sortedPlayerList: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEND_PLAYER_ORDER_LIST:
            console.log('send player list reducer');
            console.log(action.payload)
            return {
                ...state,
                sortedPlayerList: clone(action.payload)
            };
        case CREATE_INITIAL_ORDER_LIST:
            console.log('create player sort list');
            console.log(action.payload)
            const initialPlayerList = {};
            action.payload.map((player, index) => {
                initialPlayerList[index] = player;
            });

            return {
                roster: action.payload,
                sortedPlayerList: initialPlayerList
            };
        default:
            return {...state};
    }
}

function clone(src) {
    return JSON.parse(JSON.stringify(src));
}
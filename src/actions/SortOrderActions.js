import {CREATE_INITIAL_ORDER_LIST, SEND_PLAYER_ORDER_LIST} from "./types";

export const createInitialPlayerOrderList = (roster) => {
    console.log('create player order list');
    return {
        type: CREATE_INITIAL_ORDER_LIST,
        payload: roster
    };
};

export const updatePlayerOrderList = (newRoster) => {
    console.log('update order list action');
    return {
        type: SEND_PLAYER_ORDER_LIST,
        payload: newRoster
    };
};



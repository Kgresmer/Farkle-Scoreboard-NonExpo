import {CREATE_INITIAL_ORDER_LIST, UPDATE_PLAYER_ORDER_LIST} from "./types";

export const createInitialPlayerOrderList = () => {
    console.log('create player order list');
    return {
        type: CREATE_INITIAL_ORDER_LIST,
        payload: ''
    };
};

export const updatePlayerOrderList = (id) => {
    console.log('update order list action');
    return {
        type: UPDATE_PLAYER_ORDER_LIST,
        payload: id
    };
};



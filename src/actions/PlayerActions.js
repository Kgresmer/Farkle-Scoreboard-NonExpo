import {ADD_PLAYER, DROP_PLAYER, PLAYER_CREATED, PLAYER_DELETED} from "./types";

export const playerCreated = (name) => {
    return {
        type: PLAYER_CREATED,
        payload: name
    };
};

export const playerDeleted = (name) => {
    return {
        type: PLAYER_DELETED,
        payload: name
    };
};

export const addPlayerToRoster = (name) => {
    return {
        type: ADD_PLAYER,
        payload: name
    };
};


export const removePlayerToRoster = (name) => {
    return {
        type: DROP_PLAYER,
        payload: name
    };
};


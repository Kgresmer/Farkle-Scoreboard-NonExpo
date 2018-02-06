import {
    ADD_EXISTING_PLAYER,
    DROP_PLAYER,
    PLAYER_CREATED,
    PLAYER_DELETED
} from "./types";

export const playerCreated = (name) => {
    return {
        type: PLAYER_CREATED,
        payload: name
    };
};

export const playerDeleted = (id) => {
    console.log('send player deleted action');
    return {
        type: PLAYER_DELETED,
        payload: id
    };
};

export const addExistingPlayerToRoster = (player) => {
    return {
        type: ADD_EXISTING_PLAYER,
        payload: player
    };
};


export const removePlayerToRoster = (id) => {
    return {
        type: DROP_PLAYER,
        payload: id
    };
};


import {
    UPDATE_ROUND_SCORE,
    ADD_ROUND_SCORE_TO_ACTIVE_PLAYER,
    ADD_FARKLE_TO_ACTIVE_PLAYER
} from "./types";

export const updateRoundScore = (score) => {
    return {
        type: UPDATE_ROUND_SCORE,
        payload: score
    };
};

export const addRoundScoreToActivePlayerScore = (id) => {
    return {
        type: ADD_ROUND_SCORE_TO_ACTIVE_PLAYER,
        payload: id
    };
};

export const addFarkleToActivePlayer = (id) => {
    return {
        type: ADD_FARKLE_TO_ACTIVE_PLAYER,
        payload: id
    };
};
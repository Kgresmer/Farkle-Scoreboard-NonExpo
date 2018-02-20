import {
    ADD_ROUND_SCORE_TO_ACTIVE_PLAYER,
    SEND_PLAYER_ORDER_LIST,
    UPDATE_ROUND_SCORE
} from "../actions/types";

const INITIAL_STATE = {
    currentGamePlayersAndScores: [],
    roundScore: null,

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEND_PLAYER_ORDER_LIST:
            console.log('send player list reducer');
            const currentGamePlayersAndScores = [];
            for (let index in action.payload) {
                if (action.payload.hasOwnProperty(index)) {
                    currentGamePlayersAndScores[index] = action.payload[index];
                    currentGamePlayersAndScores[index].farkles = 0;
                    currentGamePlayersAndScores[index].score = 0;
                    currentGamePlayersAndScores[index].turns = 0;
                    console.log(index === '0');
                    index === '0' ? currentGamePlayersAndScores[index].isActive = true : currentGamePlayersAndScores[index].isActive = false;
                }
            }
            return {
                ...state,
                currentGamePlayersAndScores: clone(currentGamePlayersAndScores)
            };
        case UPDATE_ROUND_SCORE:
            return {...state, roundScore: action.payload};
        // case ADD_ROUND_SCORE_TO_ACTIVE_PLAYER:
        //     const activePlayer =
        default:
            return {...state};
    }
}

function clone(src) {
    return JSON.parse(JSON.stringify(src));
}
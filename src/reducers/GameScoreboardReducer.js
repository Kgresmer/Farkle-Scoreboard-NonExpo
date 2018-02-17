import { SEND_PLAYER_ORDER_LIST} from "../actions/types";
const INITIAL_STATE = {
    currentGamePlayersAndScores: []
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
                    console.log(index === '0');
                    index === '0' ? currentGamePlayersAndScores[index].isActive = true : currentGamePlayersAndScores[index].isActive = false;
                }
            }
            return {
                ...state,
                currentGamePlayersAndScores: clone(currentGamePlayersAndScores)
            };
        default:
            return {...state};
    }
}

function clone(src) {
    return JSON.parse(JSON.stringify(src));
}
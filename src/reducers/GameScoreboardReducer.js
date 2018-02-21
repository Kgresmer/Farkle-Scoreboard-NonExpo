import {
    ADD_FARKLE_TO_ACTIVE_PLAYER,
    ADD_ROUND_SCORE_TO_ACTIVE_PLAYER,
    SEND_PLAYER_ORDER_LIST,
    UPDATE_ROUND_SCORE
} from "../actions/types";

const INITIAL_STATE = {
    currentGamePlayersAndScores: [],
    roundScore: null,
    round: {},
    lastRound: false
};

export default (state = INITIAL_STATE, action) => {
    function clearRound() {
        for (let index in action.payload) {
            if (action.payload.hasOwnProperty(index)) {
                state.round[state.currentGamePlayersAndScores[index].name] = 0;
            }
        }
    }

    function checkForThreeFarkles(player) {
        if (player.farkles === 3) {
            player.score -= 1000;
            player.farkles = 0;
        }
    }

    function updateRound(player) {
        state.round[player.name] = 1;
        if (checkIfRoundIsOver(state.round)) {
            clearRound();
        }
    }

    function checkIfRoundIsOver(round) {
        let roundFinished = true;
        for (let player in round) {
            if (round.hasOwnProperty(player)) {
                if (round[player]) {
                    roundFinished = true;
                } else {
                    return false;
                }
            }
        }
        return roundFinished;
    }

    function checkForOverTenThousand(activePlayer) {
        if (activePlayer.score >= 10000) {
            for (let player in state.round) {
                if (state.round.hasOwnProperty(player)) {
                    if (player.id === activePlayer.id) {
                        state.round[player.name] = 1;
                    } else {
                        state.round[player.name] = 0;
                    }
                }
            }
            return true;
        } else {
            return false;
        }
    }

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

                    // Set the first player to be active
                    index === '0' ? currentGamePlayersAndScores[index].isActive = true : currentGamePlayersAndScores[index].isActive = false;

                    // create a round object to keep track of who has gone this round.
                    state.round[currentGamePlayersAndScores[index].name] = 0;
                }
            }
            return {
                ...state,
                currentGamePlayersAndScores: clone(currentGamePlayersAndScores)
            };
        case UPDATE_ROUND_SCORE:
            return {...state, roundScore: action.payload};
        case ADD_ROUND_SCORE_TO_ACTIVE_PLAYER:
            const activePlayer = state.currentGamePlayersAndScores.find((player) => player.id === action.payload);
            activePlayer.score += state.roundScore;
            state.lastRound = checkForOverTenThousand(activePlayer);
            updateRound(activePlayer);
            return {
                lastRound: state.lastRound,
                currentGamePlayersAndScores: clone(currentGamePlayersAndScores),
                roundScore: 0,
                round: clone(state.round)
            };
        case ADD_FARKLE_TO_ACTIVE_PLAYER:
            const activePlayer = state.currentGamePlayersAndScores.find((player) => player.id === action.payload);
            // update num of farkles
            activePlayer.farkles += 1;
            // check for three farkles
            checkForThreeFarkles(activePlayer);
            // update round object to say this player has gone this round
            updateRound(activePlayer);
            return {
                lastRound: false,
                currentGamePlayersAndScores: clone(currentGamePlayersAndScores),
                roundScore: 0,
                round: clone(state.round)
            };
        default:
            return {...state};
    }
}

function clone(src) {
    return JSON.parse(JSON.stringify(src));
}
import {
    ADD_FARKLE_TO_ACTIVE_PLAYER,
    ADD_ROUND_SCORE_TO_ACTIVE_PLAYER,
    SEND_PLAYER_ORDER_LIST,
    UPDATE_ROUND_SCORE
} from "../actions/types";

const INITIAL_STATE = {
    currentGamePlayersAndScores: [],
    roundScore: '',
    round: {},
    lastRound: false,
    totalPlayers: 0
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

    function makeNextPlayerActive(turnOrder) {
        console.log(state.currentGamePlayersAndScores);
        console.log(turnOrder);
        console.log(state.currentGamePlayersAndScores[turnOrder]);
        if (turnOrder === state.totalPlayers) {
            state.currentGamePlayersAndScores[0].isActive = true;
        } else {
            state.currentGamePlayersAndScores[turnOrder].isActive = true;
        }
    }

    const activePlayer = state.currentGamePlayersAndScores.find((player) => player.id === action.payload);

    switch (action.type) {
        case SEND_PLAYER_ORDER_LIST:
            console.log('send player list reducer');
            const currentGamePlayersAndScores = [];
            let lastIndex = 1;
            for (let index in action.payload) {
                if (action.payload.hasOwnProperty(index)) {
                    currentGamePlayersAndScores[index] = action.payload[index];
                    currentGamePlayersAndScores[index].farkles = 0;
                    currentGamePlayersAndScores[index].score = 0;
                    currentGamePlayersAndScores[index].turns = 0;
                    currentGamePlayersAndScores[index].turnOrder = +index + 1;

                    // Set the first player to be active
                    index === '0' ? currentGamePlayersAndScores[index].isActive = true : currentGamePlayersAndScores[index].isActive = false;
                    lastIndex = index;
                    // create a round object to keep track of who has gone this round.
                    state.round[currentGamePlayersAndScores[index].name] = 0;
                }
            }
            return {
                roundScore: '',
                round: clone(state.round),
                lastRound: false,
                totalPlayers: +lastIndex + 1,
                currentGamePlayersAndScores: clone(currentGamePlayersAndScores)
            };

        case UPDATE_ROUND_SCORE:
            return {...state, roundScore: action.payload};

        case ADD_ROUND_SCORE_TO_ACTIVE_PLAYER:
            activePlayer.score += +state.roundScore;
            activePlayer.isActive = false;
            makeNextPlayerActive(activePlayer.turnOrder);
            state.lastRound = checkForOverTenThousand(activePlayer);
            updateRound(activePlayer);
            console.log(state);
            return {
                ...state,
                lastRound: state.lastRound,
                currentGamePlayersAndScores: clone(state.currentGamePlayersAndScores),
                roundScore: '',
                round: clone(state.round)
            };

        case ADD_FARKLE_TO_ACTIVE_PLAYER:
            // update num of farkles
            activePlayer.farkles += 1;
            activePlayer.isActive = false;
            makeNextPlayerActive(activePlayer.turnOrder);

            // check for three farkles
            checkForThreeFarkles(activePlayer);
            // update round object to say this player has gone this round
            updateRound(activePlayer);
            console.log(state.currentGamePlayersAndScores);
            return {
                ...state,
                lastRound: false,
                currentGamePlayersAndScores: clone(state.currentGamePlayersAndScores),
                roundScore: '',
                round: clone(state.round)
            };
        default:
            return {...state};
    }
}

function clone(src) {
    return JSON.parse(JSON.stringify(src));
}
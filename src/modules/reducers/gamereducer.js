import {
  SAVE_ID,
  SAVE_SCORE,
  GAME_WINNER,
  ROUND_LOG,
  GAME_LOG
} from "../actions/actions-game";

const initialState = {
  winner: "",
  id: "",
  score: 0,
  roundCount: 1,
  round: [],
  log: []
};

function addValue(prev, newValue) {
  let sum = prev + newValue;
  return sum;
}

const gamereducer = function(state = initialState, action) {
  console.log("test reducer", action);
  switch (action.type) {
    case SAVE_ID:
      return { ...state, id: action.id };
    case SAVE_SCORE:
      return {
        ...state,
        score: addValue(state.score, parseFloat(action.value))
      };
    case ROUND_LOG:
      let currentRound = { ...state };
      return {
        ...currentRound,
        score: currentRound.score + -action.score,
        round: [
          ...currentRound.round,
          {
            name: action.name,
            score: action.score
          }
        ]
      };
    case GAME_WINNER:
      let prevScore = { ...state };

      return {
        ...prevScore,
        winner: action.name
      };

    case GAME_LOG:
      let newRound = { ...state };
      return {
        ...newRound,
        log: [
          ...newRound.log,
          [
            {
              round: newRound.roundCount,
              name: action.winnerName,
              score: newRound.score
            },
            ...newRound.round
          ]
        ],
        score: 0,
        round: [],
        id: "",
        roundCount: newRound.roundCount + 1
      };

    default:
      return state;
  }
};

export default gamereducer;

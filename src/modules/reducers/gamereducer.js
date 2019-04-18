import {
  SAVE_ID,
  SAVE_SCORE,
  GAME_LOG,
  ROUND_LOG
} from "../actions/actions-game";

const initialState = {
  log: [],
  id: "",
  score: 0,
  total: 0,
  roundCount: 1,
  round: []
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
        round: [
          ...currentRound.round,
          {
            round: currentRound.roundCount,
            name: action.name,
            score: action.score
          }
        ],
        log: [...currentRound.log, currentRound.round]
      };
    case GAME_LOG:
      let game = { ...state };
      console.log(game.round);
      return {
        ...game,
        log: [...game.log, game.round]
      };

    default:
      return state;
  }
};

export default gamereducer;

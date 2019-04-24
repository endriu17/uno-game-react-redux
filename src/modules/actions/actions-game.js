export const SAVE_ID = "SAVE_ID";
export const SAVE_SCORE = "SAVE_SCORE";
export const GAME_WINNER = "GAME_WINNER";
export const ROUND_LOG = "ROUND_LOG";
export const GAME_LOG = "GAME_LOG";
export const GAME_RESET = "GAME_RESET";

export function saveID(id) {
  return {
    type: SAVE_ID,
    id
  };
}

export function saveScore(score) {
  return {
    type: SAVE_SCORE,
    score
  };
}

export function gameWinner(name) {
  return {
    type: GAME_WINNER,
    name,
  };
}

export function roundLog(name, score){
  return {
    type: ROUND_LOG,
    name,
    score,
  };
}

export function gameLog(winnerName, winnerScore){
  return {
    type: GAME_LOG,
    winnerName,
    winnerScore
  }
}

export function gameReset(){
  return {
    type: GAME_RESET,
  }
}

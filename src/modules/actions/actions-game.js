export const SAVE_ID = "SAVE_ID";
export const SAVE_SCORE = "SAVE_SCORE";
export const GAME_LOG = "GAME_LOG";
export const ROUND_LOG = "ROUND_LOG";


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

export function gameLog(round, name, score, result) {
  return {
    type: GAME_LOG,
    round,
    name,
    score,
    result
  };
}

export function roundLog(round, name, score, result){
  return {
    type: ROUND_LOG,
    round,
    name,
    score,
    result
  };
}

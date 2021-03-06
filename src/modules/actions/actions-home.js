export const TEXT_ACTION = "TEST_ACTION";
export const INPUT_ACTION = "INPUT_ACTION";
export const ADD_PLAYER = "ADD_PLAYER";
export const ADD_PLAYERS = "ADD_PLAYERS";
export const REMOVE_PLAYER = "REMOVE_PLAYER";
export const CHANGE_NAME = "CHANGE_NAME";
export const CHANGE_SCORE = "CHANGE_SCORE";
export const CHANGE_BUTTON_TEXT = "CHANGE_BUTTON_TEXT";
export const HOME_RESET = 'HOME_RESET'

export function checkTest(text) {
  return {
    type: TEXT_ACTION,
    text
  };
}

export function inputTest(value) {
  return {
    type: INPUT_ACTION,
    value
  };
}

export function addPlayer(name, id, score) {
  return {
    type: ADD_PLAYER,
    name,
    id,
    score
  };
}

export function removePlayer(id) {
  return {
    type: REMOVE_PLAYER,
    id
  };
}

export function changeName(name, id) {
  return {
    type: CHANGE_NAME,
    name,
    id
  };
}

export function changeScore(score, id) {
  return {
    type: CHANGE_SCORE,
    score,
    id
  };
}

export function addPlayers(value) {
  return {
    type: ADD_PLAYERS,
    value
  };
}

export function changeButtonText(text, id) {
  return {
    type: CHANGE_BUTTON_TEXT,
    text,
    id
  };
}

export function homeReset(){
  return {
    type: HOME_RESET,
  }
}

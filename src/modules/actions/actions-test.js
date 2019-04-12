export const TEXT_ACTION = "TEST_ACTION";
export const INPUT_ACTION = "INPUT_ACTION";
export const ADD_PLAYER = "ADD_PLAYER";
export const ADD_PLAYERS = "ADD_PLAYERS";
export const REMOVE_PLAYER = "REMOVE_PLAYER";
export const CHANGE_NAME = "CHANGE_NAME";

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

export function addPlayer(name, id) {
  return {
    type: ADD_PLAYER,
    name,
    id
  };
}

export function removePlayer(id) {
  return {
    type: REMOVE_PLAYER,
    id
  };
}

export function changeName(name) {
  return {
    type: CHANGE_NAME,
    name
  };
}

export function addPlayers(value) {
  return {
    type: ADD_PLAYERS,
    value
  };
}

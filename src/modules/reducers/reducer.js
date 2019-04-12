import {
  TEXT_ACTION,
  INPUT_ACTION,
  ADD_PLAYER,
  ADD_PLAYERS,
  REMOVE_PLAYER,
  CHANGE_NAME
} from "../actions/actions-test";

const initialState = {
  text: "Wprowadź liczbę graczy!",
  value: 0,
  players: [],
  id: 0
};

function addValue(prev, newValue) {
  let sum = prev + newValue;
  console.log(sum);
  return sum;
}

const reducer = function(state = initialState, action) {
  console.log("test reducer", action);
  switch (action.type) {
    case TEXT_ACTION:
      return { ...state, text: action.text };
    case INPUT_ACTION:
      return {
        ...state,
        value: addValue(state.value, parseFloat(action.value))
      };
    case ADD_PLAYERS:
      let prevState = {...state}
      let players = [];
      for (var i = 0; i < action.value; i++) {
        prevState.id++;
        let player = { id: prevState.id, name: 'Player ' + prevState.id }
        players.push(player)
      }
      return {
        ...prevState,
        players: players
      };
    case ADD_PLAYER:
      let game = { ...state };
      game.id++;
      return {
        ...game,
        players: [...game.players, { id: game.id, name: action.name }]
      };
    case REMOVE_PLAYER:
      let player = state.players.filter(item => item.id !== action.id);
      return {
        ...state,
        player
      };
    case CHANGE_NAME:
      

      return {
        ...state,
        players: [...state.players, { id: action.id, name: action.name }]
      };
    default:
      return state;
  }
};

export default reducer;

import {
  TEXT_ACTION,
  INPUT_ACTION,
  ADD_PLAYER,
  ADD_PLAYERS,
  REMOVE_PLAYER,
  CHANGE_NAME,
  CHANGE_SCORE,
  CHANGE_BUTTON_TEXT
} from "../actions/actions-home";

const initialState = {
  text: "Enter a players number!",
  value: 0,
  players: [],
  id: 0,
  button: "Change name"
};

function addValue(prev, newValue) {
  let sum = prev + newValue;
  return sum;
}

function changeScore(prev, newValue) {
  let score = prev + newValue;
  return score;
}

const reducer = function(state = initialState, action) {
  switch (action.type) {
    case TEXT_ACTION:
      return { ...state, text: action.text };
    case INPUT_ACTION:
      return {
        ...state,
        value: addValue(state.value, parseFloat(action.value))
      };
    case ADD_PLAYERS:
      let prevState = { ...state };
      let players = [];
      for (var i = 0; i < action.value; i++) {
        prevState.id++;
        let player = {
          id: prevState.id,
          name: "Player " + prevState.id,
          score: 0,
          button: "Change name"
        };
        players.push(player);
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
      let prevPlayers = { ...state };
      return {
        ...prevPlayers,
        players: prevPlayers.players.map(player => {
          if (player.id === action.id) {
            return { ...player, name: action.name };
          }
          return player;
        })
      };
    case CHANGE_BUTTON_TEXT:
      let prevButtons = { ...state };
      return {
        ...prevButtons,
        players: prevButtons.players.map(player => {
          if (player.id === action.id) {
            return { ...player, button: action.text };
          }
          return player;
        })
      };
      
      case CHANGE_SCORE:
        let prevScore = { ...state };
        return {
          ...prevScore,
          players: prevScore.players.map(player => {
            if (player.id === action.id) {
              return { ...player, score: changeScore(player.score, action.score) };
            }
            return player;
          })
        };
    default:
      return state;
  }
};

export default reducer;

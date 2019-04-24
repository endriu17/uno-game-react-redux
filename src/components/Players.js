import React from "react";
import { connect } from "react-redux";
import * as homeactions from "../modules/actions/actions-home";

const Players = props => {
  return (
    <section className="game-wrapper_players fade-in">
      {props.players.map((player, i) => {
        return (
          <button
            className="players-counter_map fade-in"
            key={i}
            id={`${"bb" + player.id}`}
            onClick={(e, id) => props.showInput(e, player.id)}
          >
            <h3 className="players-counter_player">{player.name}</h3>
            <h3 className="players-map_score">{player.score}</h3>
          </button>
        );
      })}
    </section>
  );
};

const mapStateToProps = function(state) {
  return {
    players: state.homereducer.players
  };
};

const mapDispatchToProps = {
  ...homeactions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Players);

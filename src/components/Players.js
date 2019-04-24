import React from "react";
import { connect } from "react-redux";
import * as homeactions from "../modules/actions/actions-home";

const Players = props => {
  return (
    <section className="game-wrapper_players">
      {props.players.map((player, i) => {
        return (
          <div
            className="players-counter_map"
            key={i}
            id={`${"bb" + player.id}`}
            onClick={(e, id) => props.showInput(e, player.id)}
          >
            <div className="players-counter_player">
              <h3>{player.name}</h3>
            </div>
            <h3 className="players-map_score">{player.score}</h3>
          </div>
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

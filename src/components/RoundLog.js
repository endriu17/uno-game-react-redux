import React from "react";
import { connect } from "react-redux";
import * as homeactions from "../modules/actions/actions-home";
import * as gameactions from "../modules/actions/actions-game";

const RoundLog = props => {
  return (
    <section className="game-round_log fade-in">
      <div className="round-log_map">
        {props.log.map((game, i) => {
          return (
            <div className="round-log_list fade-in" key={i}>
              <p>{game.name}</p>
              <p>{game.score}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const mapStateToProps = function(state) {
  return {
    players: state.homereducer.players,
    log: state.gamereducer.round,
    win: state.gamereducer.log
  };
};

const mapDispatchToProps = {
  ...homeactions,
  ...gameactions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoundLog);

import React from "react";
import { connect } from "react-redux";
import * as homeactions from "../modules/actions/actions-home";
import * as gameactions from "../modules/actions/actions-game";

const RoundLog = props => {
  console.log(props.log.length);
  return (
    <section className="game-log_wrapper">
      <h3>Round log</h3>
      <div className="log-table_map">
          {props.log.map((game, i) => {
            let logLength = props.log.length;
            return (
              <div key={i}>
                {console.log(i)}
                <h4 style={{ display: i === logLength - 1 ? "block" : "none" }}>
                  {props.players[props.winID - 1].name}
                </h4>
                <h4 style={{ display: i === logLength - 1 ? "block" : "none" }}>
                  {props.players[props.winID - 1].score}
                </h4>
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

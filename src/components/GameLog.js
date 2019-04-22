import React from "react";
import { connect } from "react-redux";
import * as gameactions from "../modules/actions/actions-game";

const GameLog = props => {
  return (
    <section className="game-log_wrapper">
      <h4>Game log</h4>
      <div className="log-table_map">
        {props.win.map((game, i) => {
          return (
            <div key={i}>
              <p>
                {game.map((a, j) => {
                  return (
                    <div key={j}>
                      <span>{a.round}</span>
                      <span>{a.name}</span>
                      <span>{a.score}</span>
                    </div>
                  );
                })}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const mapStateToProps = function(state) {
  return {
    win: state.gamereducer.log
  };
};

const mapDispatchToProps = {
  ...gameactions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameLog);

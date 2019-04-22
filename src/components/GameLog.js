import React from "react";
import { connect } from "react-redux";
import * as gameactions from "../modules/actions/actions-game";

const GameLog = props => {
  console.log(props.log.length);
  return (
    <section className="game-log_wrapper">
      <h4>Game log</h4>
      <div className="log-table_map">
          {props.win.map((game, i) => {
            return (
              <div key={i}>
                {console.log(i)}
                <p>{game.round}</p>
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

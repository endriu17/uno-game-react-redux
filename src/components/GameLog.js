import React from "react";
import { connect } from "react-redux";
import * as gameactions from "../modules/actions/actions-game";

const GameLog = props => {
  return (
    <section className="game-log_wrapper fade-in">
      <div className="log-table_map fade-in">
        {props.win.map((game, i) => {
          return (
            <table key={i}>
              <tbody>
                {game.map((a, j) => {
                  return (
                    <tr key={j}>
                      <td>{a.round}</td>
                      <td>{a.name}</td>
                      <td>{a.score}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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

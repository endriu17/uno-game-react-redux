import React, { Component } from "react";
import { connect } from "react-redux";
import * as homeactions from "../modules/actions/actions-home";
import * as gameactions from "../modules/actions/actions-game";

class GameLog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="game-log_wrapper">
        <h1>Game log</h1>
        <table className="log-table_map">
          <tbody>
            {this.props.log.map((game, i) => {
              return (
                <tr key={i}>
                  <td>{game.name}</td>
                  <td>{game.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    players: state.homereducer.players,
    log: state.gamereducer.round
  };
};

const mapDispatchToProps = {
  ...homeactions,
  ...gameactions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameLog);

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as gameactions from "../modules/actions/actions-game";
import * as homeactions from "../modules/actions/actions-home";

const GameOver = props => {
  return (
    <section className="game-log_wrapper">
      <h4>Game log</h4>
      <div className="log-table_map">
        {props.players.map((player, i) => {
          return (
            <ul key={i} className="gameover-players_list">
              <li>{player.name}</li>
              <li>{player.score}</li>
            </ul>
          );
        })}
        <h2>
          Winner is: {props.winner} with score:{" "}
          {Math.max.apply(
            Math,
            props.players.map((player, i) => {
              return player.score;
            })
          )}
        </h2>
        {props.log.map((game, i) => {
          return (
            <div key={i}>
              {game.map((a, j) => {
                return (
                  <ul key={j} className="gameover-log_list">
                    <li>{a.round}</li>
                    <li>{a.name}</li>
                    <li>{a.score}</li>
                  </ul>
                );
              })}
            </div>
          );
        })}
      </div>
      <Link
        className="home-play_button"
        to="/"
        onClick={() => {
          props.gameReset();
          props.homeReset();
        }}
      >
        Play again
      </Link>
    </section>
  );
};

const mapStateToProps = function(state) {
  return {
    log: state.gamereducer.log,
    players: state.homereducer.players,
    id: state.gamereducer.id,
    winner: state.gamereducer.winner
  };
};

const mapDispatchToProps = {
  ...gameactions,
  ...homeactions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameOver);

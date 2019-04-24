import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import GameLog from "./GameLog";
import * as gameactions from "../modules/actions/actions-game";
import * as homeactions from "../modules/actions/actions-home";

const GameOver = props => {
  return (
    <section className="gameover_wrapper fade-in">
      <h1>Game log</h1>
      <div className="gameover-table_map">
        <div className="gameover-players_log">
          {props.players.map((player, i) => {
            return (
              <div
                className="gameover-counter_map fade-in"
                key={i}
                id={`${"bb" + player.id}`}
              >
                <div className="gameover-counter_player">
                  <h3>{player.name}</h3>
                </div>
                <h3 className="gameover-map_score">{player.score}</h3>
              </div>
            );
          })}
        </div>
        <h1 className="gameover-winner_info">
          {props.winner} WON with score:{" "}
          {Math.max.apply(
            Math,
            props.players.map((player, i) => {
              return player.score;
            })
          )}!!!
        </h1>
        <GameLog
          log={props.log}
          players={props.players}
        />
      </div>
      <Link
        className="gameover-play_button"
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

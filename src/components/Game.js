import React, { Component } from "react";
import Players from "./Players";
import RoundLog from "./RoundLog";
import GameLog from "./GameLog";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as homeactions from "../modules/actions/actions-home";
import * as gameactions from "../modules/actions/actions-game";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonWinner: "Won",
      score: "",
      total: 0,
      round: 1,
      winner: "",
      playersCount: 0,
      classActive: "",
      showButton: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showInput = this.showInput.bind(this);
    this.resetRound = this.resetRound.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let formHide = document.querySelectorAll(".game-log_name");
    formHide[parseFloat(e.target.id) - 1].style.display = "none";
    this.setState({
      total: this.state.score,
      playersCount: this.state.playersCount + 1
    });

    this.props.changeScore(this.state.score, this.props.id);

    this.props.roundLog(
      this.props.players[parseFloat(e.target.id) - 1].name,
      -this.state.score
    );
    this.setState({
      score: ""
    });
    e.target.reset();
  }

  handleChange(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      this.setState({ score: parseFloat(e.target.value) });
    }
  }
  showInput(e, id) {
    let formShow = document.querySelectorAll(".game-log_name");
    let buttonPlayer = document.querySelectorAll(".players-counter_map");
    buttonPlayer[id - 1].style.backgroundColor = "#bfeaf7";
    let playerStopClick = document.querySelectorAll(".players-counter_map");
    for (var i = 0; i < playerStopClick.length; i++) {
      playerStopClick[i].disabled = true;
    }

    for (var j = 0; j < this.props.players.length; j++) {
      formShow[j].style.display = "flex";
    }

    this.setState({
      buttonWinner: "Winner!",
      winner: this.props.players[id - 1].name,
      showButton: formShow.length === 1 ? true : false,
      playersCount: this.state.playersCount + 1
    });
    formShow[id - 1].style.display = "none";
    this.props.saveID(id);
  }
  clearAll() {
    for (var i = 0; i < this.props.players.length; i++) {
      if (this.props.players[i].score >= 500) {
        let gameWinner = this.props.players[i];
        this.props.gameWinner(gameWinner.name);
        this.props.history.push("/gameover");
      }
    }
  }

  resetRound() {
    this.props.gameLog(
      this.props.players[parseFloat(this.props.id) - 1].name,
      this.props.players[parseFloat(this.props.id) - 1].score
    );
    let formShow = document.querySelectorAll(".game-log_name");
    let playerStopClick = document.querySelectorAll(".players-counter_map");
    for (var i = 0; i < playerStopClick.length; i++) {
      playerStopClick[i].style.backgroundColor = "#fff";
    }
    for (var k = 0; k < playerStopClick.length; k++) {
      playerStopClick[k].disabled = false;
    }
    for (var j = 0; j < this.props.players.length; j++) {
      formShow[j].style.display = "none";
    }
    this.setState({
      buttonWinner: "Won",
      round: +1,
      winner: "",
      score: "",
      classActive: "",
      playersCount: 0
    });
    this.clearAll();
  }

  render() {
    let formShow = document.querySelectorAll(".game-log_name");
    const showButton =
      formShow.length === this.state.playersCount &&
      this.state.playersCount > 0 ? (
        <button className="game-newroud_button" onClick={this.resetRound}>
          Next round
        </button>
      ) : (
        ""
      );
    const winText = this.state.winner
      ? `Winner of round ${this.props.roundCount} is ${this.state.winner}!`
      : "Choose a winner. Click on the player!";

    const winnerLog = () => {
      if (this.props.id === "") {
        return "";
      } else {
        return (
          <div className="round-log_winner">
            <p>{this.state.winner}</p>{" "}
            <p>{this.props.players[parseFloat(this.props.id) - 1].score}</p>
          </div>
        );
      }
    };
    return (
      <section className="game-wrapper_main fade-in">
        <div className="round-info">
          <h2>Round </h2>
          <span className="round-info_count">{this.props.roundCount}</span>
        </div>
        <Players
          players={this.props.players}
          button={this.state.buttonWinner}
          showInput={this.showInput}
        />
        <h2 className="round-winner fade-in">{winText}</h2>
        <div
          style={{ display: this.state.winner ? "none" : "flex" }}
          className="game-log_header"
        />
        {this.props.players.map((player, i) => {
          return (
            <div className="game-wrapper_input fade-in" key={i}>
              <form
                style={{ display: "none" }}
                className="game-log_name fade-in"
                id={player.id}
                onSubmit={e => this.handleSubmit(e)}
              >
                <label className="game-log_label">
                  Enter {player.name} score:
                </label>
                <input
                  className={`${"is" + player.id} ${"game-round_input"}`}
                  type="text"
                  onChange={this.handleChange}
                  placeholder={player.score}
                />
                <button type="submit" className={"bs" + player.id}>
                  Enter
                </button>
              </form>
            </div>
          );
        })}

        {showButton}
        {winnerLog()}
        <RoundLog
          log={this.props.log}
          players={this.props.players}
          winID={this.props.id}
        />
        <GameLog log={this.props.log} players={this.props.players} input={this.showInput}/>
        <Link
          className="home-play_button"
          to="/"
          onClick={() => {
            this.props.gameReset();
            this.props.homeReset();
          }}
        >
          Reset game
        </Link>
      </section>
    );
  }
}

const mapStateToProps = function(state) {
  console.log(state);
  return {
    players: state.homereducer.players,
    log: state.gamereducer.log,
    id: state.gamereducer.id,
    round: state.gamereducer.round,
    roundCount: state.gamereducer.roundCount
  };
};

const mapDispatchToProps = {
  ...homeactions,
  ...gameactions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

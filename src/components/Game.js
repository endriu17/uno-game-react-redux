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
      score: 0,
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
      score: 0
    });
    e.target.reset();
  }

  handleChange(e) {
    this.setState({
      score: parseFloat(e.target.value)
    });
  }

  showInput(e, id) {
    let formShow = document.querySelectorAll(".game-log_name");
    let buttonScore = document.querySelectorAll(".game-won_button");
    let testButton = e.target.getAttribute("id");
    let buttonShow = document.querySelector(`#${testButton}`);
    buttonShow.classList.remove("game-won_button");

    for (var i = 0; i < buttonScore.length; i++) {
      buttonScore[i].style.display = "none";
      formShow[i].style.display = "flex";
    }

    this.setState({
      buttonWinner: "Winner!",
      winner:
        "Winner of " +
        this.state.round +
        " round is " +
        this.props.players[id - 1].name,
      classActive: testButton,
      showButton: formShow.length === 1 ? true : false,
      playersCount: this.state.playersCount + 1
    });
    formShow[id - 1].style.display = "none";
    this.props.saveID(id);
  }
  clearAll(){
    for (var i = 0; i < this.props.players.length; i++) {
      if (this.props.players[i].score >= 500) {
        let gameWinner = this.props.players[i];
        this.props.gameWinner(gameWinner.name);
        this.props.history.push("/gameover");
      } else {
        this.resetRound();
      }
    }
  }

  resetRound() {
    
    this.props.gameLog(
      this.props.players[parseFloat(this.props.id) - 1].name,
      this.props.players[parseFloat(this.props.id) - 1].score
    );
    let buttonScore = document.querySelectorAll(".game-won_button");
    let formShow = document.querySelectorAll(".game-log_name");
    let buttonShow = document.querySelector(`#${this.state.classActive}`);
    buttonShow.classList.remove("winner");
    buttonShow.classList.toggle("game-won_button");
    buttonShow.style.display = "flex";
    for (var j = 0; j < buttonScore.length; j++) {
      buttonScore[j].style.display = "flex";
      formShow[j].style.display = "none";
    }
    this.setState({
      buttonWinner: "Won",
      round: +1,
      winner: "",
      score: 0,
      classActive: "",
      playersCount: 0
    });
  }

  render() {
    let showHeader = this.state.winner;
    let formShow = document.querySelectorAll(".game-log_name");
    const showButton =
      formShow.length === this.state.playersCount &&
      this.state.playersCount > 0 ? (
        <button onClick={this.clearAll}>New round</button>
      ) : (
        ""
      );
    const tableHead = this.props.players.map((player, i) => {
      return (
        <p
          key={i}
          style={{ display: showHeader === "Winner!" ? "none" : "flex" }}
        >
          {player.name}
        </p>
      );
    });
    return (
      <section className="game-wrapper_main">
        <Players players={this.props.players} />
        <h2>{`Runda ${this.props.roundCount}`}</h2>
        <h2
          className="round-winner"
          style={{ display: this.state.winner ? "flex" : "none" }}
        >
          {this.state.winner}
        </h2>
        <div style={{ display: this.state.winner ? "none" : "block" }}>
          <div className="game-log_header">{tableHead}</div>
        </div>
        <div className="game-log_map">
          {this.props.players.map((player, i) => {
            return (
              <div key={i}>
                <form
                  style={{ display: "none" }}
                  className="game-log_name"
                  id={player.id}
                  onSubmit={e => this.handleSubmit(e)}
                >
                  <label>
                    Enter {player.name} score:
                    <input
                      className={`${"is" + player.id} ${"game-round_input"}`}
                      type="text"
                      onChange={e => this.handleChange(e)}
                      placeholder={player.score}
                    />
                  </label>
                  <button
                    type="submit"
                    className={"bs" + player.id}
                    onClick={this.isSubmit}
                  >
                    Enter
                  </button>
                </form>
                <input
                  type="button"
                  className="game-won_button"
                  id={`${"bb" + player.id}`}
                  onClick={(e, id) => this.showInput(e, player.id)}
                  value={this.state.buttonWinner}
                />
              </div>
            );
          })}
        </div>
        {showButton}
        <RoundLog
          log={this.props.log}
          players={this.props.players}
          winID={this.props.id}
        />
        <GameLog log={this.props.log} />
        <Link
          className="home-play_button"
          to="/gameover"
          style={{ display: this.props.value === 0 ? "none" : "flex" }}
          reset={this.clearAll}
        >
          The end
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

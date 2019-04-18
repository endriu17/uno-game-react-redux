import React, { Component } from "react";
import Players from "./Players";
import GameLog from './GameLog'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as homeactions from "../modules/actions/actions-home";
import * as gameactions from "../modules/actions/actions-game";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: 'Won',
      score: 0,
      total: 0,
      round: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showInput = this.showInput.bind(this);
    this.isSubmit = this.isSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(e.target)
    let formHide = document.querySelectorAll(".players-form_name");
      formHide[parseFloat(e.target.id)-1].style.display = "none";
    // let scoreShow = documet.querySelector(`${"score" + parseFloat(e.target.id)-1}`);
    // scoreShow.style.display = 'flex'
    this.setState({
      total: this.state.score
    })
    let scoreShow = document.querySelector(`${"score" + parseFloat(e.target.id)}`);
    scoreShow.style.visibility = "visible";
    this.props.changeScore(this.state.score, this.props.id);
    this.props.roundLog(this.props.round, this.props.players[parseFloat(e.target.id)-1].name, -this.state.score)
    this.setState({
      score: 0,
    })
    e.target.reset();
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({
      score: parseFloat(e.target.value)
    })
  }

  showInput(id) {
    let formShow = document.querySelectorAll(".players-form_name");
    let buttonShow = document.querySelectorAll(".game-won_button");
    for (var i = 0; i < buttonShow.length; i++) {
      buttonShow[i].style.display = "none";
      formShow[i].style.display = "flex";
    }
    buttonShow[id - 1].style.display = "flex";
    buttonShow[id - 1].classList.toggle("winner");
    this.setState({
      winner: 'Winner!'
    })
    buttonShow[id - 1].disabled = true;
    formShow[id - 1].style.display = "none";
    this.props.saveID(id);
  }

  isSubmit(id){

  }

  render() {
    const tableHead = this.props.players.map((player, i) => {
      return (
        <th key={i} className="players-table_map">
          {player.name}
        </th>
      );
    });
    return (
      <section className="game-wrapper_main">
        <Players />
        <table>
          <thead>
            <tr>
              <th>Round</th>
              {tableHead}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              {this.props.players.map((player, i) => {
                return (
                  <td key={i} className="players-table_map">
                    <form
                      style={{ display: "none" }}
                      className="players-form_name"
                      id={player.id}
                      onSubmit={e => this.handleSubmit(e)}
                    >
                      <input
                        className={`${"is" + player.id} ${"game-round_input"}`}
                        type="text"
                        onChange={e => this.handleChange(e)}
                        placeholder={player.score}
                      />
                    <button type="submit" className={"bs" + player.id} onClick={this.isSubmit}>
                        Enter
                      </button>
                    </form>
                    <h3 className={`${"score" + player.id}`} style={{visibility: 'hidden'}}>It works!</h3>
                    <input
                      type="button"
                      className={`${"game-won_button"} ${"bb" + player.id}`}
                      onClick={e => this.showInput(player.id)}
                      value={this.state.winner}
                    />
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
        <GameLog />
        <Link
          className="home-play_button"
          to="/gameover"
          style={{ display: this.props.value === 0 ? "none" : "flex" }}
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
    round: state.gamereducer.round
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

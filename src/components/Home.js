import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as testactions from "../modules/actions/actions-test";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      text: "Wybrana liczba graczy:",
      players: [],
      name: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.enterName = this.enterName.bind(this);
    this.changePlayerName = this.changePlayerName.bind(this);
    this.setVisible = this.setVisible.bind(this);
    this.setHidden = this.setHidden.bind(this);
  }

  enterName(e) {
    console.log('click', e.target.value);
    this.setState({
      name: e.target.value
    });
  }

  changePlayerName(e) {
    e.preventDefault();
    console.log(this.state.name, e.target.id);
    this.props.changeName(this.state.name, parseFloat(e.target.id));
    this.setState({
      name: ""
    });
    e.target.reset();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.inputTest(this.state.value);
    this.setState({
      value: ""
    });
    this.checkThis(this.state.text);
    this.props.addPlayers(this.state.value);
  }

  handleChange(e) {
    console.log(e.target.value);
    this.checkThis("wprowadzam liczbę graczy...");
    this.setState({
      value: e.target.value
    });
  }
  checkThis = text => {
    return this.props.checkTest(text);
  };

  setVisible(e) {
    console.log("click", e.target.id);
    this.setState({
      id: parseFloat(e.target.id)
    });
    this.props.removePlayer(parseFloat(e.target.id));
    this.props.inputTest(this.state.value - 1);
  }

  setHidden() {
    console.log("click hidde");
    this.setState({
      id: 0
    });
  }

  render() {
    console.log(this.state);
    const players = this.props.players.map((player, i) => {
      return (
        <div key={i}>
          <h4>Enter Player {player.id} name:</h4>
          <form id={player.id} onSubmit={e => this.changePlayerName(e)}>
            <input
              type="text"
              onChange={e => this.enterName(e)}
              placeholder={player.name}
            />
            <button type="submit" id={player.id} onClick={this.setHidden}>
              Zatwierdź
            </button>
          </form>
        </div>
      );
    });

    return (
      <section className="container">
        <h3>{this.props.text}</h3>
        <div style={{ display: this.props.value > 0 ? "none" : "block" }}>
          <form onSubmit={e => this.handleSubmit(e)}>
            <input
              type="text"
              onChange={e => this.handleChange(e)}
              value={this.state.value}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        <p style={{ display: this.props.value === 0 ? "none" : "block" }}>
          {this.props.value}
        </p>
        {players}
        <Link
          to="/game"
          style={{ display: this.props.value === 0 ? "none" : "block" }}
        >
          Play the game
        </Link>
      </section>
    );
  }
}

const mapStateToProps = function(state) {
  console.log(state);
  return {
    text: state.reducertest.text,
    value: state.reducertest.value,
    players: state.reducertest.players
  };
};

const mapDispatchToProps = {
  ...testactions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

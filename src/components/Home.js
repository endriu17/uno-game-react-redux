import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as testactions from "../modules/actions/actions-test";
import PlayersTable from "./PlayersTable";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      text: "Liczba graczy:"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setVisible = this.setVisible.bind(this);
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

  render() {
    return (
      <section className="home-wrapper">
        <h1>Uno Game Counter</h1>
        <div className="home-info_text">
          <h3 className="home-info_header">{this.props.text}</h3>
          <p
            className="home-players_value"
            style={{ display: this.props.value === 0 ? "none" : "flex" }}
          >
            {this.props.value}
          </p>
        </div>

        <div
          className="home-value_form"
          style={{ display: this.props.value > 0 ? "none" : "flex" }}
        >
          <form
            className="home-players_number"
            onSubmit={e => this.handleSubmit(e)}
          >
            <input
              type="text"
              onChange={e => this.handleChange(e)}
              value={this.state.value}
            />
            <button className="button-submit" type="submit">
              Submit
            </button>
          </form>
        </div>
        <PlayersTable
          style={{ display: this.props.value === 0 ? "none" : "flex" }}
        />
        <Link
          className="home-play_button"
          to="/game"
          style={{ display: this.props.value === 0 ? "none" : "flex" }}
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

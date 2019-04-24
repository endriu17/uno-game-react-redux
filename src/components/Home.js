import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as homeactions from "../modules/actions/actions-home";
import PlayersTable from "./PlayersTable";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      text: "Number of players:"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.value <= 9 && this.state.value >= 2) {
      this.props.inputTest(this.state.value);
      this.setState({
        value: ""
      });
      this.checkThis(this.state.text);
      this.props.addPlayers(parseFloat(this.state.value));
    } else {
      this.checkThis("Value must be from 2 to 9");
      this.setState({
        value: ""
      });
    }
  }

  handleChange(e) {
    console.log(e.target.value);
    this.checkThis("proccesing...");
    this.setState({
      value: e.target.value
    });
  }

  checkThis = text => {
    return this.props.checkTest(text);
  };

  render() {
    return (
      <section className="home-wrapper fade-in">
        <h1 className="home-header">Uno Game Counter</h1>
        <div className="home-info_text">
          <h3 className="home-info_header fade-in">{this.props.text}</h3>
          <p
            className="home-players_value"
            style={{ display: this.props.value === 0 ? "none" : "flex" }}
          >
            {this.props.value}
          </p>
        </div>

        <div
          className="home-value_form fade-in"
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
          className="home-play_button fade-in"
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
    text: state.homereducer.text,
    value: state.homereducer.value,
    players: state.homereducer.players
  };
};

const mapDispatchToProps = {
  ...homeactions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

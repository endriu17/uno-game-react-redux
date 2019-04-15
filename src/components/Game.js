import React, { Component } from "react";
import Players from "./Players";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as testactions from "../modules/actions/actions-test";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleChange(e) {
    console.log(e.target.value);
  }
  checkThis = text => {
    return this.props.checkTest(text);
  };

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
                      className="players-form_name"
                      id={player.id}
                      onSubmit={e => this.handleSubmit(e)}
                    >
                      <input
                        style={{ display: "none" }}
                        className={"is" + player.id}
                        type="text"
                        onChange={e => this.handleChange(e)}
                        placeholder={player.name}
                        value={player.score}
                      />
                      <button type="submit" className={"bs" + player.id}>
                        Won
                      </button>
                    </form>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
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
    players: state.reducertest.players
  };
};

const mapDispatchToProps = {
  ...testactions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

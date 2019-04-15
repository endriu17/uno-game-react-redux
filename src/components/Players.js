import React, { Component } from "react";
import { connect } from "react-redux";
import * as testactions from "../modules/actions/actions-test";

class Players extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="game-wrapper_players">
        {this.props.players.map((player, i) => {
          return (
            <div className="players-table_map" key={i}>
              <h3>{player.id}.</h3>
              <h3>{player.name}</h3>
              <h3>{player.score}</h3>
            </div>
          );
        })}
      </section>
    );
  }
}

const mapStateToProps = function(state) {
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
)(Players);

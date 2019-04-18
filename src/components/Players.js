import React, { Component } from "react";
import { connect } from "react-redux";
import * as homeactions from "../modules/actions/actions-home";

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
              <div className='players-map_player'>
                <h3>{player.name}</h3>
              </div>
              <h3 className='players-map_score'>{player.score}</h3>
            </div>
          );
        })}
      </section>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    players: state.homereducer.players
  };
};

const mapDispatchToProps = {
  ...homeactions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Players);

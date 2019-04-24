import React, { Component } from "react";
import { connect } from "react-redux";
import * as homeactions from "../modules/actions/actions-home";

class PlayersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
    this.enterName = this.enterName.bind(this);
    this.changePlayerName = this.changePlayerName.bind(this);
  }

  enterName(e) {
    this.setState({
      name: e.target.value
    });
  }

  changePlayerName(e) {
    e.preventDefault();
    this.props.changeName(this.state.name, parseFloat(e.target.id));
    const hiddenInput = document.querySelector(".is" + parseFloat(e.target.id));
    const buttonChangetext = document.querySelector(
      ".bs" + parseFloat(e.target.id)
    );

    if (hiddenInput.style.display === "none") {
      hiddenInput.style.display = "flex";
      this.props.changeButtonText('Save', parseFloat(e.target.id))
      buttonChangetext.style.backgroundColor = "red";
    } else if (hiddenInput.style.display === "flex") {
      hiddenInput.style.display = "none";
      this.props.changeButtonText('Changed', parseFloat(e.target.id))
      buttonChangetext.style.backgroundColor = "green";
    }
    this.setState({
      name: ""
    });
    e.target.reset();
  }

  render() {
    return (
      <section className="players-table_wrapper">
        {this.props.players.map((player, i) => {
          return (
            <div className="players-table_map fade-in" key={i}>
              <h3>{player.id}.</h3>
              <h3>{player.name}</h3>
              <form
                className="players-form_name"
                id={player.id}
                onSubmit={this.changePlayerName}
              >
                <input
                  style={{ display: "none" }}
                  className={"is" + player.id}
                  type="text"
                  onChange={e => this.enterName(e)}
                  placeholder={player.name}
                />
                <button type="submit" className={"bs" + player.id}>
                  {player.button}
                </button>
              </form>
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
)(PlayersTable);
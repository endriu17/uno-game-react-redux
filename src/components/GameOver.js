import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as homeactions from "../modules/actions/actions-home";

class GameOver extends Component {
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
    this.props.inputTest(this.state.value);
    this.setState({
      value: ""
    });
    this.checkThis(this.state.text);
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

  render() {
    return (
      <section className="container">
        <h1>Game over</h1>
        <Link to="/">Again</Link>
      </section>
    );
  }
}

const mapStateToProps = function(state) {
  console.log(state);
  return {
    text: state.homereducer.text,
    value: state.homereducer.value
  };
};

const mapDispatchToProps = {
  ...homeactions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameOver);

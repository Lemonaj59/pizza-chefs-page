import React from "react";

export default class CreateButton extends React.Component {
  constructor(props) {
    super(props);
  }
  handleCreatePizzaClick() {
    this.props.navigation("/createPizza");
  }
  render() {
    if (this.props.userId === 1) {
      return (
        <button key='create' onClick={() => this.handleCreatePizzaClick()}>
          Create Pizza
        </button>
      );
    } else {
      return <h1></h1>
    }
  }
}

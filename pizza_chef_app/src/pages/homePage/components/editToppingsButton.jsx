import React from "react";

export default class EditButton extends React.Component {
  constructor(props) {
    super(props);
  }
  handleEditButtonClick() {
    this.props.navigation("/editToppings")
  }
  render() {
    if (this.props.userId === 2) {
      return (
        <button key='edit' onClick={() => this.handleEditButtonClick()}>
            editToppings
          </button>
      )
    } else {
      return <h1></h1>
    }
  }
}
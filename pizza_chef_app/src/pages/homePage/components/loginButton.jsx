import React from 'react';

export default class LoginButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.userId)
    if (this.props.userId === null) {
    return (
      <button onClick={() => this.props.navigation("/loginPage")}>login</button>
    )
    } else {
      return <h1></h1>
    }
  }
}
import React from 'react';

export default class LogoutButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.userId) {
    return (
      <button onClick={() => this.props.logout()}>logout</button>
    )
    } else {
      return <h1></h1>
    }
  }
}
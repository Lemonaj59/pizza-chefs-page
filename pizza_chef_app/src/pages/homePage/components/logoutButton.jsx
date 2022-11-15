import React from 'react';

export default class LogoutButton extends React.Component {
  constructor(props) {
    super(props);
  }

  async logout() {
    await this.props.handleLogout();
    await this.props.logout();
  }

  render() {
    if (this.props.userId) {
    return (
      <button onClick={() => this.logout()}>logout</button>
    )
    } else {
      return <h1></h1>
    }
  }
}
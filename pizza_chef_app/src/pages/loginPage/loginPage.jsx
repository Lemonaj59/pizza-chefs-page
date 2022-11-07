import React from "react";
import { useNavigate } from "react-router-dom";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <div>
        <h1>loginPage</h1>
        <form>
          <label>Username</label>
          <input
            key="username"
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />
        </form>
        <form>
          <label>password</label>
          <input
            key="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </form>
        <button onClick={() => this.handleLogin()}>login</button>


        <button onClick={() => this.props.navigation("/editToppings")}>
          editToppings
        </button>
        <button onClick={() => this.props.navigation("/")}>homepage</button>
        <button onClick={() => this.props.navigation("/editPizza")}>
          editPizza
        </button>
      </div>
    );
  }
}

export default function LoginPage(props) {
  const navigation = useNavigate();

  return <Login {...props} navigation={navigation} />;
}

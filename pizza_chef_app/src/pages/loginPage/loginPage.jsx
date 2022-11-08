import React from "react";
import { useNavigate } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      username: "",
      password: "",
      sucess: null,
      userId: null
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

  }

  async componentDidMount() {
    await this.props.checkLoginStatus();
    let sucess = await this.props.logInSucess;

    if (sucess) {
      await this.redirect(true);
    } else {
      this.setState({ isLoaded: true})
    }
  }

  async handleLogin() {
    let username = this.state.username;
    let password = this.state.password;

    const body = { username, password };

    const response = await fetch("/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    }).then((res) => res.json());
    let sucess = response.sucess;
    let userId = response.userId;

    this.setState(await { sucess: sucess, userId: userId });
    await this.redirect(sucess, userId);

  }

  async redirect(sucess, userId) {
    await this.props.loggedIn(userId, sucess);
    if (sucess) {
      this.props.navigation("/");
    }
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>loading</div>
    } if (this.state.sucess === null) {
    return (
      <div className="app">
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

        <button onClick={() => this.props.navigation("/")}>homepage</button>

      </div>
    );
    } else {
      return (
        <div>
          <h1>loginPage</h1>
          <h1> please enter valid username/password</h1>
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
      )
    }
  }
}

export default function LoginPage(props) {
  const navigation = useNavigate();

  return <Login {...props} navigation={navigation} />;
}

import React from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";

import DisplayPizzas from "./components/pizzas";
import CreateButton from "./components/createPizzaButton";
import EditButton from "./components/editToppingsButton";
import LogoutButton from "./components/logoutButton";
import LoginButton from "./components/loginButton";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pizzas: [],
      isLoaded: false,
    };
    this.resetState = this.resetState.bind(this);
    this.getPizzas = this.getPizzas.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    await this.getPizzas();
    await this.props.checkLoginStatus();
    await this.setState({ isLoaded: true, });
  }
  async componentWillUnmount() {
    this.setState({isLoaded: false, pizzas: []})
  }
  async resetState() {
    this.setState(await { isLoaded: false, pizzas: [] });
  }

  async getPizzas() {
    let response = await fetch("/homepage");
    response = await response.json();
    this.setState({ pizzas: response.pizzaobj });
  }

  async logout() {
    this.props.handleLogout();
    this.resetState();
    await this.getPizzas();
    await this.props.checkLoginStatus();
    this.setState({isLoaded: true})
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>loading</div>;
    } else {
      return (
        <div className="app">
          <h1>Welcome to Lemonada pizza!</h1>
          {this.state.pizzas.map((pizza) => {
            return (
              <DisplayPizzas
                pizza={pizza}
                userId={this.props.userId}
                navigation={this.props.navigation}
                selectedPizza={this.props.selectedPizza}
                resetState={this.resetState}
              />
            );
          })}
          <CreateButton
            navigation={this.props.navigation}
            userId={this.props.userId}
          />
          <EditButton
            navigation={this.props.navigation}
            userId={this.props.userId}
          />

          <LoginButton
            userId={this.props.userId}
            navigation={this.props.navigation}
          />
          <LogoutButton
            userId={this.props.userId}
            logout={this.logout}
          />
        </div>
      );
    }
  }
}

export default function HomePage(props) {
  const navigation = useNavigate();

  return <Homepage {...props} navigation={navigation} />;
}

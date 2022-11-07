import React from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";

import DisplayPizzas from "./components/pizzas";
import CreateButton from "./components/createPizzaButton";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pizzas: [],
      isLoaded: false,
    };
    this.resetState = this.resetState.bind(this);
    this.getPizzas = this.getPizzas.bind(this);
    
  }

  async componentDidMount() {
    await this.getPizzas();
    await this.props.checkLoginStatus();
    await this.setState({ isLoaded: true });
    

  }
  resetState() {
    this.setState({isLoaded: false})
    this.getPizzas();
    this.setState({ isLoaded: true})
  }

  async getPizzas() {
    let response = await fetch("/homepage");
    response = await response.json();
    this.setState({ pizzas: response.pizzaobj });
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>loading</div>;
    } else {
      return (
        <div className="app">
          <h1>Homepage</h1>
          {this.state.pizzas.map((pizza) => {
            return <DisplayPizzas pizza={pizza} userId={this.props.userId}
            navigation={this.props.navigation}
            selectedPizza={this.props.selectedPizza} 
            resetState={this.resetState}/>;
          })}
          <CreateButton navigation={this.props.navigation}
          userId={this.props.userId}/>

          <button onClick={() => this.props.navigation("/editToppings")}>
            editToppings
          </button>
          <button onClick={() => this.props.navigation("/loginPage")}>
            loginPage
          </button>
        </div>
      );
    }
  }
}

export default function HomePage(props) {
  const navigation = useNavigate();

  return <Homepage {...props} navigation={navigation} />;
}

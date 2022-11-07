import React from "react";
import {useNavigate} from "react-router-dom";
import './homepage.css'

import DisplayPizzas from "./components/pizzas";

class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      pizzas: []
    };
  }

  async componentDidMount() {
    await this.getPizzas();
  }

  async getPizzas() {
    let response = await fetch("/homepage")
    response = await response.json();
    await this.setState({pizzas: response.pizzaobj})
  }

  render() {
    return (
      
      <div className="app">

      <h1>Homepage</h1>
      {this.state.pizzas.map(pizza => {
          return (
            <DisplayPizzas
            pizza={pizza}/>
          )
        })}

      <button onClick={() => this.props.navigation("/editToppings")}>
        editToppings
      </button>
      <button onClick={() => this.props.navigation("/editPizza")}>
        editPizza
      </button>
      <button onClick={() => this.props.navigation("/loginPage")}>
        loginPage
      </button>
    </div>
  );
  }
}

export default function HomePage(props) {
  const navigation = useNavigate();

  return <Homepage {...props} navigation ={navigation}/>
}

import React from "react";
import {useNavigate} from "react-router-dom";
import './homepage.css'

class Homepage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="app">
      <h1>Homepage</h1>
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

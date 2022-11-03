import React from "react";
import { useNavigate } from "react-router-dom";

class Login extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
      <h1>loginPage</h1>
      <button onClick={() => this.props.navigation("/editToppings")}>
        editToppings
      </button>
      <button onClick={() => this.props.navigation("/")}>
        homepage
      </button>
      <button onClick={() => this.props.navigation("/editPizza")}>
        editPizza
      </button>
    </div>
  );
  }
}

export default function LoginPage(props) {
  const navigation = useNavigate();

  return <Login {...props} navigation ={navigation}/>
}
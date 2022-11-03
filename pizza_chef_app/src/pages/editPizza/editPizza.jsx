import React from "react";
import { useNavigate } from "react-router-dom";

class EditingPizza extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>editPizza</h1>
        <button onClick={() => this.props.navigation("/editToppings")}>
          editToppings
        </button>
        <button onClick={() => this.props.navigation("/")}>
          homepage
        </button>
        <button onClick={() => this.props.navigation("/loginPage")}>
          loginPage
        </button>
      </div>
    );
  }
}

export default function EditPizza(props) {
  const navigation = useNavigate();

  return <EditingPizza {...props} navigation={navigation} />;
}

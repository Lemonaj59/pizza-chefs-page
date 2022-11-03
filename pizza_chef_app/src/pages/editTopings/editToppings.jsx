import React from "react";
import { useNavigate } from "react-router-dom";

class EditingTopings extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
      <h1>EditTopings</h1>
      <button onClick={() => this.props.navigation("/editPizza")}>
        editPizza
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

export default function EditTopings(props) {
  const navigation = useNavigate();

  return <EditingTopings {...props} navigation={navigation}/>
}
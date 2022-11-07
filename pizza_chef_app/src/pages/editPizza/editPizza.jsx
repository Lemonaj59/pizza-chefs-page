import React from "react";
import { useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

class EditingPizza extends React.Component {
  constructor() {
    super();
    this.state = {
      toppings: [],
      isLoaded: false,
      eventKey: [0, 1, 2],
    };
  }

  componentDidMount() {
    this.getSelectedToppings();
    this.setState({ isLoaded: true });

  }

  async getSelectedToppings() {
    let response = await fetch(`/Pizza/${this.props.pizzaName}`);
    response = await response.json();
    this.setState({ toppings: response });
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading</div>;
    } else {
      return (
        <div>
          <h1>editPizza</h1>

          <ListToppings toppings={this.state.toppings} />

          <button onClick={() => this.props.navigation("/editToppings")}>
            editToppings
          </button>
          <button onClick={() => this.props.navigation("/")}>homepage</button>
          <button onClick={() => this.props.navigation("/loginPage")}>
            loginPage
          </button>
        </div>
      );
    }
  }
}

class ListToppings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventKey: [0, 1, 2]
    };
  }

  render() {
    console.log(this.props.toppings);
    return (
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        {this.props.toppings.map((option, index) => {
          return (
            <Accordion.Item eventKey={this.state.eventKey[index]}>
              <Accordion.Header>{option[0].type}</Accordion.Header>
              <Accordion.Body>
                {option.map(toppings => {
                  return (
                    <p> {toppings.topping} selected {toppings.pizza_mix_id}</p>
                  )
                })}
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    );
  }
}

export default function EditPizza(props) {
  const navigation = useNavigate();

  return <EditingPizza {...props} navigation={navigation} />;
}

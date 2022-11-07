import React from "react";
import { useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import PizzaForm from "./components/pizzaNameform";
class CreatePizza extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      toppings: [],
      name: "",
      eventKey: [0, 1, 2],
      selected: {},
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  async componentDidMount() {
    await this.getOptions();
    this.setState({ isLoaded: true });
  }

  async getOptions() {
    let response = await fetch("/createPizza").then((res) => res.json());
    let meat = response.meat;
    let vegetable = response.vegetable;
    let sauce = response.sauce;

    this.setState({
      toppings: [meat, vegetable, sauce],
    });
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  async handleSelection(option, index2, index1) {
    (await option.selected)
      ? (option.selected = false)
      : (option.selected = true);
  }

  render() {
    if (!this.state.isLoaded) {
      <div>loading</div>;
    }
    return (
      <div>
        <PizzaForm toppings={this.state.toppings} />

        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          {this.state.toppings.map((option, index1) => {
            return (
              <Accordion.Item eventKey={this.state.eventKey[index1]}>
                <Accordion.Header>{option[0].type}</Accordion.Header>
                <Accordion.Body>
                  {option.map((toppings) => {
                    return (
                      <p key={toppings.topping}>
                        {toppings.topping}

                        <input
                          type="checkbox"
                          defaultChecked={toppings.selected}
                          onChange={() => this.handleSelection(toppings)}
                        />
                      </p>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>
    );
  }
}

export default function AddPizza(props) {
  const navigation = useNavigate();

  return <CreatePizza {...props} navigation={navigation} />;
}

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
      pizzaName: JSON.parse(localStorage.getItem("pizzaName"))[0] || null,
    };
    this.getSelectedToppings = this.getSelectedToppings.bind(this);
  }

  componentDidMount() {
    let pizzaName = this.props.pizzaName;
    if (pizzaName) {
      localStorage.setItem("pizzaName", JSON.stringify(pizzaName));
      this.setState({ pizzaName });
    }
    this.getSelectedToppings();
    this.setState({ isLoaded: true });
  }

  async getSelectedToppings() {
    let response = await fetch(`/pizza/${this.state.pizzaName}`);
    response = await response.json();
    this.setState({ toppings: response });
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading</div>;
    } else {
      return (
        <div>
          <h1>{this.state.pizzaName} pizza <button>edit name</button></h1>

          <ListToppings
            toppings={this.state.toppings}
            getSelectedToppings={this.getSelectedToppings}
            pizzaName={this.state.pizzaName}
          />

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
      eventKey: [0, 1, 2],
    };
  }

  async updateTopping(toppingId, selected, pizzaName) {
    const body = { toppingId, selected };

    await fetch(`/pizza/${pizzaName}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    this.props.getSelectedToppings();
  }

  render() {

    return (
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        {this.props.toppings.map((option, index) => {
          return (
            <Accordion.Item eventKey={this.state.eventKey[index]}>
              <Accordion.Header>{option[0].type}</Accordion.Header>
              <Accordion.Body>
                {option.map((toppings) => {
                  return (
                    <p>
                      {" "}
                      {toppings.topping}{" "}
                      <input
                        type="checkbox"
                        checked={toppings.selected}
                        onChange={() =>
                          this.updateTopping(
                            toppings.topping_id,
                            toppings.selected,
                            this.props.pizzaName
                          )
                        }
                      />
                    </p>
                  );
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

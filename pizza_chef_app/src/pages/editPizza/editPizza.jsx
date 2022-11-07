import React from "react";
import { useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

class EditingPizza extends React.Component {
  constructor() {
    super();
    this.state = {
      toppings: [],
      isLoaded: false,
      editName: false,
      eventKey: [0, 1, 2],
      pizzaName: JSON.parse(localStorage.getItem("pizzaName"))[0] || null,
      pizzaNameEdit: "",
    };
    this.getSelectedToppings = this.getSelectedToppings.bind(this);
    this.handleChangingName = this.handleChangingName.bind(this);

  }

  async componentDidMount() {
    let pizzaName = await this.props.pizzaName;
    console.log(this.props.pizzaName);
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
  updateLocalStorage(pizzaName) {
    localStorage.removeItem("pizzaName")
    localStorage.setItem("pizzaName", JSON.stringify(pizzaName));
  }

  editName() {
    this.setState({ editName: true, pizzaNameEdit: this.state.pizzaName });
  }
  handleChangingName(event) {
    this.setState({ pizzaNameEdit: event.target.value });
  }
  async handleNameChange() {
    let newPizzaName = this.state.pizzaNameEdit;
    const body = { newName: newPizzaName };
    await fetch(`/pizza/${this.state.pizzaName}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(() => this.props.selectedPizza(newPizzaName))
      .then(() =>
        localStorage.setItem(
          "pizzaName",
          JSON.stringify(newPizzaName)
        )
      )
      .then(
        this.setState({
          isLoaded: false,
          pizzaName: newPizzaName,
          pizzaNameEdit: "",
          editName: false,
          toppings: [],
        })
      );
    this.componentDidMount();
  }


  render() {
    if (!this.state.isLoaded) {
      return <div>Loading</div>;
    } else if (this.state.editName === false) {
      return (
        <div>
          <h1>
            {this.state.pizzaName} pizza{" "}
            <button
              onClick={() => {
                this.editName();
              }}
            >
              edit name
            </button>
          </h1>

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
    } else {
      return (
        <div>
          <form>
            <input
              key="pizzaName"
              value={this.state.pizzaNameEdit}
              onChange={this.handleChangingName}
            />
            <button onClick={() => this.handleNameChange()}>save</button>
          </form>

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

import React from "react";

class PizzaForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: JSON.parse(localStorage.getItem("name")) || "",
      failed: JSON.parse(localStorage.getItem("failed")) || false
    };
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  componentWillUnmount() {
  }
  handleNameChange(event) {
    this.setState({ name: event.target.value });
    localStorage.setItem("name", JSON.stringify(event.target.value))
  }
  
  handleSubmit = event => {
    event.preventDefault();
  }

  async putPizza() {
    console.log(this.props.pizzaNames)
    if (this.props.pizzaNames.includes(this.state.name)) {
      localStorage.setItem("failed", JSON.stringify(true))
    } else {
      const body = { name: this.state.name, toppings: this.props.toppings };
      let response = await fetch("/createPizza", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      })
    }
  }

  render() {
    if (this.state.failed === true) {
      return (
        <div>
          <h1>Create your mastery pizza!</h1>
          <h4>Choose a different name</h4>
          <form onSubmit={this.handleSubmit}>
            <label> Please pick a unique name</label>
            <input
              key="newPizza"
              value={this.state.name}
              onChange={this.handleNameChange}
              required
            />
            <button type="submit" onClick={() => this.putPizza()}>Add your pizza!</button>
          </form>
        </div>
      );
    }
    return (
      <div>
        <h1>Create your mastery pizza!</h1>
        <form>
          <label> Please pick a unique name</label>
          <input
            key="newPizza"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <button onClick={() => this.putPizza()}>Add your pizza!</button>
        </form>
      </div>
    );
  }
}
export default PizzaForm;

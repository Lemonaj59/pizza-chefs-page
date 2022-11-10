import React from "react";

class PizzaForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      failed: false,
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.putPizza.bind(this);
  }
  componentWillUnmount() {
    this.handleNav(true);
  }
  handleNameChange(event) {
    this.setState({ name: event.target.value });
    localStorage.setItem("name", JSON.stringify(event.target.value));
  }

  handleNav(response) {
    if (response) {
      localStorage.clear();
      this.props.homePageNav();
    }
  }

  async putPizza() {
    if (this.props.pizzaNames.includes(this.state.name)) {
      localStorage.setItem("failed", JSON.stringify(true));
    } else {
      const body = { name: this.state.name, toppings: this.props.toppings };
      let response = await fetch("/createPizza", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
    }
  }
  async putAndReset() {
    this.putPizza()
    await this.props.homePageNav();
    await this.props.resetState();
    
  }

  render() {
    if (this.state.failed === true) {
      return (
        <div>
          <h1>Create your mastery pizza!</h1>
          <h4>Choose a different name</h4>
          <form>
            <label> Please pick a unique name</label>
            <input
              key="newPizza"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
            <button onClick={() => this.putAndReset()}>Add your pizza!</button>
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
          <button onClick={() => this.putAndReset()}>Add your pizza!</button>
        </form>
      </div>
    );
  }
}
export default PizzaForm;

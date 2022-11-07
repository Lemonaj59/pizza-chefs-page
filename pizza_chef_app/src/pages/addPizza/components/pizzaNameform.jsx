import React from "react";

class PizzaForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      failed: false
    };
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  render() {
    if (this.state.name === true) {
      return (
        <div>
          <h1>Create your mastery pizza!</h1>
          <h4>Please pick a name</h4>
        <form>
          <label> Please pick a unique name</label>
          <input
            key="newPizza"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <button>Add your pizza!</button>
        </form>
      </div>
      )
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
        </form>
      </div>
    );
  }
}
export default PizzaForm
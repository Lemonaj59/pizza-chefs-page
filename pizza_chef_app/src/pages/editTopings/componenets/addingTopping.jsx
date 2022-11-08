import React from "react";

class AddTopping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sucess: null,
    };
  }

  async addNewTopping(option) {
    let newTopping = this.props.newTopping;
    const body = { option, newTopping };

    let response = await fetch("/toppings", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log(response);
    if (!response.sucess) {
    }
  }

  render() {
    if (
      this.props.addingTopping &&
      this.props.option === this.props.newToppingOption &&
      this.props.sucess === true
    ) {
      return (
        <td>
          <form>
            <input
              key={this.props.option}
              value={this.props.newTopping}
              onChange={this.props.handleNewToppingChange}
            />
            <button
              key="add"
              onClick={() => this.addNewTopping(this.props.option)}
            >
              {" "}
              add
            </button>
            <button key="cancel" onClick={() => this.props.cancelClick()}>
              cancel
            </button>
          </form>
        </td>
      );
    } else {
      return (
        <td>
          <button
            key={this.props.option}
            onClick={() => this.props.handleClick(this.props.option)}
          >
            addTopping
          </button>
        </td>
      );
    }
  }
}

export default AddTopping;

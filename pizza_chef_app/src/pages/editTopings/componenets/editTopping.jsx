import React from "react";

class EditTopping extends React.Component {
  constructor(props) {
    super(props);
  }

  async editTopping(id) {
    const topping = this.props.editItem;
    const body = { id, topping };

    await fetch("/toppings", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    }).then(() => this.props.cancelEdit());
  }

  render() {
    if (
      this.props.edit &&
      this.props.editItemTopping === this.props.item.topping
    ) {
      return (
        <td>
          <form>
            <input
              key={this.props.item.topping}
              value={this.props.editItem}
              onChange={this.props.handleEditTopping}
            />
            <button
              key={this.props.item.id}
              onClick={() => this.editTopping(this.props.item.topping_id)}
            >
              save
            </button>
            <button key="cancel" onClick={() => this.props.cancelEdit()}>
              cancel
            </button>
          </form>
        </td>
      );
    } else {
      return (
        <>
          <td key={this.props.item.id}> {this.props.item.topping} </td>
          <td>
            <button
              onClick={() => this.props.toggleEdit(this.props.item.topping)}
            >
              edit
            </button>
          </td>
        </>
      );
    }
  }
}

export default EditTopping;

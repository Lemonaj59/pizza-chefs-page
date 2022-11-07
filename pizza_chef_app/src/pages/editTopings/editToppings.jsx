import React from "react";
import { useNavigate } from "react-router-dom";
import "./editToppings.css";

import AddTopping from "./componenets/addingTopping";
import EditTopping from "./componenets/editTopping";

class EditingTopings extends React.Component {
  constructor() {
    super();
    this.options = ["meat", "vegetable", "sauce"];
    this.state = {
      isLoaded: false,
      meat: null,
      vegetable: null,
      sauce: null,
      addingTopping: false,
      edit: false,
      editItem: null,
      editItemTopping: null,
      newToppingOption: null,
      newTopping: "",
      sucess: true,
    };
    this.addNewTopping = this.addNewTopping.bind(this);
    this.handleNewToppingChange = this.handleNewToppingChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEditTopping = this.handleEditTopping.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.getToppings = this.getToppings.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);

  }

  async componentDidMount() {
    await this.getToppings();
  }
  //fetching all of the toppings,
  async getToppings() {
    let toppings = await fetch("/toppings");
    toppings = await toppings.json();
    let meat = toppings.meat;
    let vegetable = toppings.vegetable;
    let sauce = toppings.sauce;
    //setting the state appropriatly.
    this.setState(await { meat, vegetable, sauce, isLoaded: true });
  }

  async addNewTopping(option) {
    console.log(option);
    let newTopping = this.state.newTopping;
    const body = { option, newTopping };
    console.log(body);
    await fetch("/toppings", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  async deleteTopping(id) {
    console.log(id);
    const body = { id };
    await fetch("/toppings", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    }).then(() => this.getToppings())
  }

  toggleEdit(topping) {
    this.setState({edit: true, editItem: topping, editItemTopping: topping})
  }
  async cancelEdit() {
    this.setState({edit: false, editItem: null, editItemTopping: null})
    await this.getToppings();
  }

  handleEditTopping(event) {
    this.setState({ editItem: event.target.value })
  }

  handleClick(option) {
    this.setState({ addingTopping: true, newToppingOption: option });
  }

  handleNewToppingChange(event) {
    this.setState({ newTopping: event.target.value });
  }
  notSucess() {
    this.setState({sucess: false})
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>loading</div>;
    } else {
      return (
        <div className="app">
          <h1>EditTopings</h1>
          <div>
            {this.options.map((option) => {
              return (
                <table className="center">
                  <thead>
                    <tr>
                      <th key={option}> {option}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state[option].map((item) => {

                      return (
                        <tr className="=center">
                         
                          
                            <EditTopping
                            item={item}
                            handleEditTopping={this.handleEditTopping}
                            editItem={this.state.editItem}
                            toggleEdit={this.toggleEdit}
                            edit={this.state.edit}
                            editItemTopping={this.state.editItemTopping}
                            getToppings={this.cancelEdit}
                            />
                        
                          <td>
                            <button
                              onClick={() =>
                                this.deleteTopping(item.topping_id)
                              }
                            >
                              delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <AddTopping
                        newTopping={this.state.newTopping}
                        addingTopping={this.state.addingTopping}
                        newToppingOption={this.state.newToppingOption}
                        option={option}
                        handleClick={this.handleClick}
                        handleNewToppingChange={this.handleNewToppingChange}
                        sucess={this.state.sucess}
                        notSucess={this.notSucess}
                      />
                    </tr>
                  </tbody>
                </table>
              );
            })}
          </div>

          <button onClick={() => this.props.navigation("/")}>homepage</button>

        </div>
      );
    }
  }
}

export default function EditTopings(props) {
  const navigation = useNavigate();

  return <EditingTopings {...props} navigation={navigation} />;
}

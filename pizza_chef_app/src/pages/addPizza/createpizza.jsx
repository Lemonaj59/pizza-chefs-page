import React from 'react';
import {useNavigate} from 'react-router-dom'
import Accordion from "react-bootstrap/Accordion";


class CreatePizza extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      toppings: [],
      meat: [],
      vegetable: [],
      sauce: [],
      name: '',
      eventKey: [0, 1, 2]
    }
  }

  async componentDidMount() {
    await this.getOptions();
    this.setState({isLoaded: true});
  }

  async getOptions() {
    let response = await fetch("/toppings").then(res => res.json());
    let meat = response.meat;
    let vegetable = response.vegetable;
    let sauce = response.sauce;
    this.setState({toppings: [meat, vegetable, sauce]})
    console.log(this.state.toppings);
  }
  render() {
    if (!this.state.isLoaded) {
      <div>loading</div>
    }
    return (
      <div>
      <form>

      </form>

      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        {this.state.toppings.map((option, index) => {
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
      </div>
    )
  }
}

export default function AddPizza(props) {
  const navigation = useNavigate();

  return <CreatePizza {...props} navigation={navigation}/>
}

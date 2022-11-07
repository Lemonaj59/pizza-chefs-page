import React from "react";
import Card from "react-bootstrap/Card";
import "../homepage.css";

class DisplayPizzas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      isLoaded: false,
      text: "",
    };
  }

  async componentDidMount() {
    await this.setOptions();
    await this.createText();
  }

  async setOptions() {
    let options = Object.keys(this.props.pizza);
    this.setState({ options: options, isLoaded: true });
  }


  render() {
    if (!this.state.isLoaded) {
      return <div>loading</div>;
    }
    return (
      <div>
      <Card key={this.props.pizza.name} className="card" border="danger" style={{ width: "18rem" }}>
        <Card.Header className="Header">{this.props.pizza.name}</Card.Header>
        <Card.Body>
          <Card.Title> Toppings </Card.Title>
          <Card.Text>
            {this.state.options.map((option) => {
              if (option !== "name") {
                return (
                  <p key={option}>
                    {option} : {this.props.pizza[option].join(", ")}
                  </p>
                )
              }
            })}
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
    );
  }
}

export default DisplayPizzas;

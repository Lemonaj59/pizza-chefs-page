import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

class ListToppings extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    return(
      <Accordion defaultActiveKey={['0']} alwaysOpen>
        
      </Accordion>
    )
  }
}
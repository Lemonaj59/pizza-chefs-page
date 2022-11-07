import React from "react";
import './App.css';
import {Routes, Route, Navigate } from "react-router-dom";
import EditPizza from "./pages/editPizza/editPizza";
import EditTopings from "./pages/editTopings/editToppings";
import LoginPage from "./pages/loginPage/loginPage";
import HomePage from "./pages/homePage/homepage";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: null,
      logInSucess: false,
    }
    this.loggedIn = this.loggedIn.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
    this.logout = this.logout.bind(this);
  }
loggedIn(userId, sucess) {
  this.setState({userId, logInSucess: true})
}

async handleLogout() {
  await fetch("/loggedInStatus", {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: null,
  });
}

  async checkLoginStatus() {
    let response = await fetch("/logginStatus");
    response = await response.json();


    if (response.userId) {
      this.loggedIn(response.userId, true );
    }
  }

  logout() {
    this.setState({userId: null, logInSucess: false})
  }

  render() {
    return (
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route exact path="/editPizza" element={<EditPizza/>}/>
          <Route exact path="/editToppings" element={<EditTopings/>}/>
          <Route exact path="/loginPage" element={<LoginPage
          checkLoginStatus={this.checkLoginStatus}
          loggedIn={this.loggedIn}
          logInSucess={this.state.logInSucess}

          />}/>
        </Routes>
      </div>
    )
  }
}

export default App;

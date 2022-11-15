import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import EditPizza from "./pages/editPizza/editPizza";
import EditTopings from "./pages/editTopings/editToppings";
import LoginPage from "./pages/loginPage/loginPage";
import HomePage from "./pages/homePage/homepage";
import "bootstrap/dist/css/bootstrap.min.css";
import AddPizza from "./pages/addPizza/createpizza";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: null,
      logInSucess: false,
      pizzaName: "",
    };
    this.loggedIn = this.loggedIn.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
    this.logout = this.logout.bind(this);
    this.selectedPizza = this.selectedPizza.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  loggedIn(userId, sucess) {
    this.setState({ userId: userId, logInSucess: true });
  }

  async handleLogout() {
    await fetch("/loginStatus", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: null,
    })
     await this.setState({ userId: null, logInSucess: null })
  }
  resetState() {
    this.setState({ userId: null, logInSucess: false }).then(() =>
      this.componentDidMount()
    );
  }

  async checkLoginStatus() {
    let response = await fetch("/logginStatus");
    response = await response.json();

    if (response.userId) {
      this.loggedIn(response.userId, true);
    }
  }

  logout() {
    this.setState({ userId: null, logInSucess: false });
  }

  async selectedPizza(pizza) {
    await this.setState({ pizzaName: pizza });
  }

  render() {
    return (
      <div>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <HomePage
                userId={this.state.userId}
                checkLoginStatus={this.checkLoginStatus}
                selectedPizza={this.selectedPizza}
                handleLogout={this.handleLogout}
              />
            }
          />
          <Route
            exact
            path="/editPizza"
            element={
              <EditPizza
                pizzaName={this.state.pizzaName}
                selectedPizza={this.selectedPizza}
              />
            }
          />
          <Route exact path="/editToppings" element={<EditTopings />} />
          <Route
            exact
            path="/loginPage"
            element={
              <LoginPage
                checkLoginStatus={this.checkLoginStatus}
                loggedIn={this.loggedIn}
                logInSucess={this.state.logInSucess}
              />
            }
          />
          <Route exact path="/createPizza" element={<AddPizza />} />
        </Routes>
      </div>
    );
  }
}

export default App;

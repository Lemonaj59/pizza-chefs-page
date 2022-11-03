import React from "react";
import './App.css';
import {Routes, Route, Navigate } from "react-router-dom";
import EditPizza from "./pages/editPizza/editPizza";
import EditTopings from "./pages/editTopings/editToppings";
import LoginPage from "./pages/loginPage/loginPage";
import HomePage from "./pages/homePage/homepage";

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route exact path="/editPizza" element={<EditPizza/>}/>
          <Route exact path="/editToppings" element={<EditTopings/>}/>
          <Route exact path="/loginPage" element={<LoginPage/>}/>
        </Routes>
      </div>
    )
  }
}

export default App;

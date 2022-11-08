const express = require("express");
let router = express.Router();
let client = require("../db");

router.use(function async(req, res, next) {

  next();
});

router.route("/").get(async (req, res) => {
  let text = `SELECT pizzas.name, toppings.topping, toppings.type FROM pizzas_and_toppings JOIN pizzas ON pizzas.pizza_id = pizza JOIN toppings ON toppings.topping_id = pizzas_and_toppings.toppings`;

  let response = await client.query(text);
  //this lets me pair all the toppings and everything with their own
  //catagory while being able to still access them being i have a join and
  //i want the ones that are paird together.
  response = response.rows;

  let pizzaobj = [];
  let nameArray = [];
  let typeArray = []
  response.forEach((pizza) => {
    let name = pizza.name;
    let topping = pizza.topping;
    let type = pizza.type;
    if (!nameArray.includes(pizza.name)) {
      pizzaobj.push({ name: [name], [type]: [topping]});
      nameArray.push(name);
      typeArray.push(type);
 
    } else if(!typeArray.includes(type)) {
      pizzaobj[nameArray.indexOf(name)][type] = [topping];
      
    } else  {
      pizzaobj[nameArray.indexOf(name)][type].push(topping)
    }
  });
  res.json({ pizzaobj });
});

module.exports = router;

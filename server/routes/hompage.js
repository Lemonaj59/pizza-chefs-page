const express = require("express");
let router = express.Router();
let 

router.use(function async(req, res, next) {
  next();
});

router.route("/")
.get(async (req, res) => {
  const text = `SELECT pizzas.name, toppings.topping FROM pizzas_and_toppings JOIN pizzas ON pizzas.pizza_id = pizza JOIN toppings ON toppings.topping_id = pizzas_and_toppings.toppings`;
  

});

module.exports = router;

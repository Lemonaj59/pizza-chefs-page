const express = require("express");
let router = express.Router();
const client = require("../db");

router.use(function async(req, res, next) {
  console.log("toppings");
  next();
});

router
  .route("/")
  .get(async (req, res) => {
    let text = `SELECT * FROM toppings ORDER BY topping`;
    let toppingsQuery = await client.query(text);
    const toppings = toppingsQuery.rows;

    let meat = toppings
      .filter((topping) => topping.type === "meat")
      .map((topping) => {
        topping["selected"] = false;
        return topping;
      });
    let vegetable = toppings
      .filter((topping) => topping.type === "vegetable")
      .map((topping) => {
        topping["selected"] = false;
        return topping;
      });
    let sauce = toppings
      .filter((topping) => topping.type === "sauce")
      .map((topping) => {
        topping["selected"] = false;
        return topping;
      });

    let nameText = `SELECT name FROM pizzas`;
    let nameResponse = await client.query(nameText);
    let pizzaNames = nameResponse.rows;
    pizzaNames = pizzaNames.map((name) => name.name);

    res.json({ meat, vegetable, sauce, pizzaNames });
  })
  .post(async (req, res) => {
    const name = await req.body.name;
    const toppings = await req.body.toppings;
    let selectedToppings = [];
    toppings.forEach((array) => {
      array.forEach((topping) => {
        if (topping.selected) {
          selectedToppings.push(topping);
        }
      });
    });
    let toppingIds = selectedToppings.map((topping) => topping.topping_id);

    let getPizzaIdText = `SELECT pizza_id FROM pizzas`;
    let idResponse = await client.query(getPizzaIdText);
    let ids = idResponse.rows;
    ids = ids.map((id) => id.pizza_id);

    ids.map(id => {
      let text = `SELECT toppings FROM pizzas_and_toppings WHERE pizza = $1`;
      let values = [id];
      let response = await client.query(text, values);
      
    })
  });

module.exports = router;

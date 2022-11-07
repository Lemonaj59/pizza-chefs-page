const express = require("express");
let router = express.Router();
const client = require("../db");

router.use(function async(req, res, next) {
  next();
});

router.route("/:name").get(async (req, res) => {
  let name = await req.params.name;
  const text1 = `SELECT pizza_id FROM pizzas WHERE name = $1`;
  const values = [name];
  let idQuery = await client.query(text1, values);
  const id = idQuery.rows[0].pizza_id;

  let text = `SELECT * FROM toppings ORDER BY topping`;
  let toppingsQuery = await client.query(text);
  const idText = `SELECT toppings.topping_id FROM toppings JOIN pizzas_and_toppings ON toppings.topping_id = pizzas_and_toppings.toppings WHERE pizzas_and_toppings.pizza = $1`;
  const idValue = [id];
  let selectedItemIds = await client.query(idText, idValue);
  selectedItemIds = selectedItemIds.rows.map((topping) => topping.topping_id);

  const toppings = toppingsQuery.rows;
  let meat = toppings.filter((topping) => topping.type === "meat");
  let vegetable = toppings.filter((topping) => topping.type === "vegetable");
  let sauce = toppings.filter((topping) => topping.type === "sauce");

  let returnArray = [meat, vegetable, sauce].map((type) => {
    return type.map((option) => {
      if (selectedItemIds.includes(option.topping_id)) {
        option["selected"] = true;
        return option;
      } else {
        option["selected"] = false;
        return option;
      }
    });
  });
  res.json(returnArray);
});

module.exports = router;

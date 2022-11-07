const express = require("express");
let router = express.Router();
const client = require("../db");

router.use(function async(req, res, next) {
  next();
});

router
  .route("/:name")
  .get(async (req, res) => {
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
    returnArray = returnArray.map((type) => {
      return type.sort((a, b) => b.selected - a.selected);
    });
    res.json(returnArray);
  })
  .patch(async (req, res) => {
    const body = await req.body;
    const pizzaName = await req.params.name;

    const text1 = `SELECT pizza_id FROM pizzas WHERE name = $1`;
    const values = [pizzaName];
    let idQuery = await client.query(text1, values);
    const pizzaId = idQuery.rows[0].pizza_id;

    if (body.selected) {
      let text = `DELETE FROM pizzas_and_toppings WHERE toppings = $1 AND pizza = $2`;
      let values = [body.toppingId, pizzaId];
      await client.query(text, values);
      res.sendStatus(200);
    } else {
      let text = `INSERT INTO pizzas_and_toppings (toppings, pizza) VALUES ($1, $2)`;
      let values = [body.toppingId, pizzaId]
      await client.query(text, values);
      res.sendStatus(200);
    }

    console.log(body);
  });

module.exports = router;

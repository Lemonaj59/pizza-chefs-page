const express = require("express");
let router = express.Router();
const client = require("../db");

router.use(function async(req, res, next) {
  next();
});

router
  .route("/:name")
  .get(async (req, res) => {
    let name = req.params.name.toString();
      console.log(name);
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

  })
  .put(async (req, res) => {
    let newName = await req.body.newName;
    const pizzaName = req.params.name; 

    const text1 = `SELECT pizza_id FROM pizzas WHERE name = $1`;
    const values = [pizzaName];
    let idQuery = await client.query(text1, values);
    const pizzaId = idQuery.rows[0].pizza_id;

    let checkingText = `SELECT name FROM pizzas WHERE name = $1`;
    let checkingValue = [newName];
    let response = await client.query(checkingText, checkingValue);
    response = response.rows[0];
    console.log(pizzaId)
    if (!response) {
      const changeText = `UPDATE pizzas SET name = $1 WHERE pizza_id = $2`;
      const changeValues = [newName, pizzaId];
      await client.query(changeText, changeValues);
    }
    res.sendStatus(200);
  })
  .delete(async (req, res) => {
    let pizzaName = req.params.name;

    const text1 = `SELECT pizza_id FROM pizzas WHERE name = $1`;
    const values = [pizzaName];
    let idQuery = await client.query(text1, values);
    console.log(values)
    const pizzaId = idQuery.rows[0].pizza_id;

    const deleteText = `DELETE FROM pizzas WHERE pizza_id = $1`;
    const deleteValue = [pizzaId]

    await client.query(deleteText, deleteValue);
    res.sendStatus(200);
  })

module.exports = router;

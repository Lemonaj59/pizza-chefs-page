const express = require("express");
let router = express.Router();
const client = require("../db")

router.use(function async(req, res, next) {
  next()
});

router
  .route("/:name")
  .get(async (req, res) => {
    const options = ['meat', 'vegetable', 'sauce']
    let name = await req.params.name;
    const text1 = `SELECT pizza_id FROM pizzas WHERE name = $1`
    const values = [name];
    let idQuery = await client.query(text1, values);
    const id = idQuery.rows[0].pizza_id
    let responses = [];
    for(let index = 0; index < options.length; index += 1) {
      let text = `SELECT toppings.topping_id,toppings.type, toppings.topping, pizzas_and_toppings.pizza_mix_id FROM pizzas_and_toppings RIGHT OUTER JOIN toppings ON pizzas_and_toppings.toppings = toppings.topping_id
      WHERE toppings.type = $2 AND (pizzas_and_toppings.pizza = $1 OR pizzas_and_toppings.pizza IS NULL);`
      let values = [id, options[index]]
      let response = await client.query(text, values);
      responses.push(response.rows);
    }

    res.json(responses)
  })

  module.exports = router;
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
    let meat = toppings.filter((topping) => topping.type === "meat");
    let vegetable = toppings.filter((topping) => topping.type === "vegetable");
    let sauce = toppings.filter((topping) => topping.type === "sauce");
    console.log(meat)

    res.json({ meat, vegetable, sauce });
  })
  .put(async (req, res, next) => {
    const type = await req.body.option;
    const topping = await req.body.newTopping;

    let checkText = `SELECT topping FROM toppings WHERE topping = $1`;
    let checkValue = [topping];
    let response = await client.query(checkText, checkValue);

    if (!response.rows[0]) {
      let text = `INSERT INTO toppings (type, topping) VALUES ($1, $2)`;
      let values = [type, topping];
      await client.query(text, values);
      res.sendStatus(200);
    } else {
      res.json({ sucess: false });
    }
  })
  .delete(async (req, res) => {
    const body = await req.body.id;

    const text = "DELETE FROM toppings WHERE topping_id = $1";
    const values = [body];
    await client.query(text, values);
    res.sendStatus(200);
  })
  .patch(async (req, res) => {
    const body = await req.body;
    const text = "UPDATE toppings SET topping = $1 WHERE topping_id = $2";
    const values = [body.topping, body.id];

    let checkText = `SELECT topping FROM toppings WHERE topping = $1`;
    let checkValue = [body.topping];
    let response = await client.query(checkText, checkValue);
    if (!response.rows[0]) {
      await client.query(text, values);
      res.sendStatus(200);
    }
  });

module.exports = router;

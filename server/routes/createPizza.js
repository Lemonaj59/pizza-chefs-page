const express = require("express");
let router = express.Router();
const client = require("../db");

router.use(function async(req, res, next) {
  console.log("toppings");
  next();
});

router.route("/").get(async (req, res) => {
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
  console.log(vegetable);
  let sauce = toppings
    .filter((topping) => topping.type === "sauce")
    .map((topping) => {
      topping["selected"] = false;
      return topping;
    });


  res.json({ meat, vegetable, sauce});
});

module.exports = router;

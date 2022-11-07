const express = require("express");
let router = express.Router();
const client = require("../db");

async function query(text, values) {
  let response = await client.query(text, values);
  console.log(response.rows);
  return response.rows;
}

function createString(array) {
  let string = "";
  for (index = 1; index <= array.length; index += 2) {
    if (index === array.length - 1) {
      string += `($${index}, $${index + 1});`;
    } else {
      string += `($${index}, $${index + 1}), `;
    }
  }
  return string;
}


router.use(function async(req, res, next) {
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

    function compareArrays() {
      let newPizzaLength = toppingIds.length;
      let currentPizzaLength = [];
      let sameToppings = [];
      idByPizzas.forEach((array) => currentPizzaLength.push(array.length));
      if (currentPizzaLength.includes(newPizzaLength[0])) {
        let index = currentPizzaLength.indexOf(newPizzaLength[0]);
        for (
          let ind = 1;
          ind < currentPizzaLength.indexOf(newPizzaLength[0]);
          ind += 1
        ) {
          if (toppingIds[ind] === idByPizzas[index][ind]) {
            sameToppings.push(toppingIds[ind]);
          } else {
            break;
          }
        }
      } else {
        return true;
      }
      return sameToppings !== newPizzaLength;
    }


    let selectedToppings = [];
    toppings.forEach((array) => {
      array.forEach((topping) => {
        if (topping.selected) {
          selectedToppings.push(topping);
        }
      });
    });
    let toppingIds = selectedToppings
      .map((topping) => topping.topping_id)
      .sort((a, b) => a - b);

    let getPizzaIdText = `SELECT pizza_id FROM pizzas`;
    let idResponse = await client.query(getPizzaIdText);
    let ids = idResponse.rows;
    ids = ids.map((id) => id.pizza_id);
    let text = `SELECT toppings, pizza FROM pizzas_and_toppings`;
    let response = await client.query(text);
    let idArray = [];
    response = response.rows;
    response.forEach((obj) => {
      if (!idArray.includes(obj.pizza)) {
        idArray.push(obj.pizza);
      }
    });

    let idByPizzas = idArray.map((num) => {
      return response.map((obj) => {
        if (obj.pizza === num) {
          return obj.toppings;
        } else {
          return;
        }
      });
    });
    idByPizzas = idByPizzas.map((array) => {
      return array.filter((num) => num);
    });
    
    let sucess = compareArrays();
    if (sucess) {
      let text = `INSERT INTO pizzas (name) VALUES ($1)`;
      let values = [name];
      await client.query(text, values);
      text2 = `SELECT pizza_id FROM pizzas WHERE name = $1`;

      let id = await client.query(text2, values);
      id = id.rows[0].pizza_id;

      let toppingValues = [];
      toppingIds.forEach((num) => {
        toppingValues.push(id);
        toppingValues.push(num);
      });
      let string = createString(toppingValues);
      console.log(toppingValues);
      console.log(string);
      let toppingText = `INSERT INTO pizzas_and_toppings (pizza, toppings)
        VALUES ${string}`;
        console.log(toppingText);
      await client.query(toppingText, toppingValues);
      res.sendStatus(200);
    } else {
    res.json({ sucess: false });
    }
  });

module.exports = router;

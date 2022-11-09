const path = require("path");

module.exports = function (app) {
  const toppings = require("./server/routes/toppingsEdit");
  const login = require("./server/routes/loginpage");
  const pizza = require("./server/routes/pizzaEdit");
  const homepage = require("./server/routes/hompage");
  const logginStatus = require("./server/routes/loginStatus");
  const createPizza = require("./server/routes/createPizza");

  app.use("/toppings", toppings);
  app.use("/login", login);
  app.use("/pizza", pizza);
  app.use("/homepage", homepage);
  app.use("/logginStatus", logginStatus);
  app.use("/createPizza", createPizza);
};

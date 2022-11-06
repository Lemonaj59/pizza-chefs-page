const express = require("express");
const app = express();
const cors = require("cors");
const toppings = require("./routes/toppingsEdit");
const login = require("./routes/loginpage");
const pizza = require("./routes/pizzaEdit");
const homepage = require("./routes/hompage");
let morgan = require("morgan")
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
  console.log('made it to index');
  next();
})

app.use("/toppings", toppings);
app.use("/login", login);
app.use("/pizza", pizza);
app.use("/homepage", homepage);


app.listen(port, (err) => {
  console.log(`listening on port ${port}`)
})
const express = require("express");
const app = express();
const cors = require("cors");
let morgan = require("morgan");
const client = require("./db");
let session = require("express-session");
pgSession = require("connect-pg-simple")(session);

const toppings = require("./routes/toppingsEdit");
const login = require("./routes/loginpage");
const pizza = require("./routes/pizzaEdit");
const homepage = require("./routes/hompage");
const logginStatus = require("./routes/loginStatus");
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new pgSession({
      pool: client,
      tableName: "session",
    }),
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: true,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 3,
    },
  })
);

app.use(function (req, res, next) {
  req.session;
  console.log("made it to index");
  next();
});

app.use("/toppings", toppings);
app.use("/login", login);
app.use("/pizza", pizza);
app.use("/homepage", homepage);
app.use("/logginStatus", logginStatus);

app.listen(port, (err) => {
  console.log(`listening on port ${port}`);
});

const express = require("express");
const app = express();
const cors = require("cors");
let morgan = require("morgan");
const client = require("./server/db");
let session = require("express-session");
pgSession = require("connect-pg-simple")(session);

const toppings = require("./server/routes/toppingsEdit");
const login = require("./server/routes/loginpage");
const pizza = require("./server/routes/pizzaEdit");
const homepage = require("./server/routes/hompage");
const logginStatus = require("./server/routes/loginStatus");
const createPizza = require("./server/routes/createPizza");
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/build"));

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

app.use(async function (req, res, next) {
    app.get('/', (req, res, next) => {

      res.status(200).json({
        status: 'success',
        data: {
          name: 'name of your app',
          version: '0.1.0'
        }
      });
      
      req.session;
      next();
    });
  });




    app.use("/api/toppings", toppings);
    app.use("/api/login", login);
    app.use("/api/pizza", pizza);
    app.use("/api/homepage", homepage);
    app.use("/api/logginStatus", logginStatus);
    app.use("/api/createPizza", createPizza);


    app.listen(port, (err) => {
      console.log(`listening on port ${port}`);
    });


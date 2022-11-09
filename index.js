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


   app.use("/toppings", toppings);
    app.use("/login", login);
    app.use("/pizza", pizza);
    app.use("/homepage", homepage);
    app.use("/logginStatus", logginStatus);
    app.use("/createPizza", createPizza);
    app.get('/', (req, res) => res.render('pages/index'))
    app.get('/homepage', async (req, res) => {
        let text = `SELECT pizzas.name, toppings.topping, toppings.type FROM pizzas_and_toppings JOIN pizzas ON pizzas.pizza_id = pizza JOIN toppings ON toppings.topping_id = pizzas_and_toppings.toppings`;
      
        let response = await client.query(text);
        //this lets me pair all the toppings and everything with their own
        //catagory while being able to still access them being i have a join and
        //i want the ones that are paird together.
        response = response.rows;
      
        let pizzaobj = [];
        let nameArray = [];
        let typeArray = []
        response.forEach((pizza) => {
          let name = pizza.name;
          let topping = pizza.topping;
          let type = pizza.type;
          if (!nameArray.includes(pizza.name)) {
            pizzaobj.push({ name: [name], [type]: [topping]});
            nameArray.push(name);
            typeArray.push(type);
       
          } else if(!typeArray.includes(type)) {
            pizzaobj[nameArray.indexOf(name)][type] = [topping];
            
          } else  {
            pizzaobj[nameArray.indexOf(name)][type].push(topping)
          }
        });
        res.json({ pizzaobj });
      
    })


    app.listen(port, (err) => {
      console.log(`listening on port ${port}`);
    });


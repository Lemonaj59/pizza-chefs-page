const express = require("express");
const app = express();
let session = require("express-session");
let morgan = require("morgan")
const port = process.env.PORT || 3001;

app.use(morgan());
app.use(express.json());

app.listen(port, (err) => {
  console.log(`listening on port ${port}`)
})
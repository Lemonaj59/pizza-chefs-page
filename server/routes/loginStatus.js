let express = require("express");
let router = express.Router();
const client = require("../db");
const session = require("express-session");

router.use(function async(req, res, next) {
  next();
});

router
  .route("/")
  .get(async (req, res, next) => {

    if (req.session.user) {
      let userId = await req.session.user.userId;

      res.json({ userId });
    } else {
      res.json(false);
    }
  })
  .put(async (req, res, next) => {
    let userInput = req.body;

    let username = userInput.username;
    let userId = userInput.userId;
    req.session.user = { userId: userId, username: username };
  })
  .delete(async (req, res, next) => {
    req.session.destroy(req.session);
    next();
    res.sendstatus(200);
  });

module.exports = router;
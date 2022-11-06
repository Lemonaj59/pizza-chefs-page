const express = require("express");
let router = express.Router();

router.use(function async(req, res, next) {
  next()
});

router
  .route("/")
  .get(async (req, res) => {
    
  })

  module.exports = router;
const express = require("express");
var app = express();
const router = express.Router();


module.exports = function (router) {
  router.get("/", function (req, res) {
    res.end(
      "Server is live..."
    );
  });

  // Auth controllers
  require("./controllers/auth.api")(router);

  // feed controllers
  require("./controllers/feed.api")(router);

}
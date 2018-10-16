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

  // user controllers
  require("./controllers/user.api")(router);

  // article controllers
  require("./controllers/article.api")(router);

  // comment controllers
  require("./controllers/comment.api")(router);

}
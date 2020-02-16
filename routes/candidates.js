var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  let query = "SELECT * FROM `candidates` ORDER BY id ASC";

  db.query(query, (err, result) => {
    if (err) {
      res.redirect("/");
    }
    res.send(result);
  });
});

router.post("/create", function(req, res, next) {
  var email = req.body.email;
  //var email = req.query.email si GET
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var phone_number = req.body.phone_number;

  let query =
    "INSERT INTO `candidates` (`candidate_id`, `email`, `first_name`, `last_name`, `phone_number`) VALUES (NULL, '" +
    email +
    "', '" +
    first_name +
    "', '" +
    last_name +
    "', '" +
    phone_number +
    "');";

  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});
module.exports = router;

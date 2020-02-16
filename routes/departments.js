var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    let query = "SELECT * FROM `departments` ORDER BY id ASC"; 
  
    db.query(query, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      res.send(result);
    });
  });

  router.post("/create", function(req, res, next) {
    var department_name = req.body.department_name;

  
    let query =
      "INSERT INTO `departments` (`department_id`, `department_name`) VALUES (NULL, '" +
      department_name +
      "');";
  
    db.query(query, (err, result) => {
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  });
  module.exports = router;

var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    let query = "SELECT * FROM `jobs` ORDER BY id ASC"; 
  
    db.query(query, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      res.send(result);
    });
  });

  router.post("/create", function(req, res, next) {
    var job_title = req.body.job_title;
    var max_salary = req.body.max_salary;
  
    let query =
      "INSERT INTO `jobs` (`job_id`, `job_title`, `max_salary`) VALUES (NULL, '" +
      job_title +
      "', '" +
      max_salary +
      "');";
  
    db.query(query, (err, result) => {
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  });
  module.exports = router;

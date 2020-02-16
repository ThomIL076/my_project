var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    let query = "SELECT * FROM `companies` ORDER BY id ASC"; 
  
    db.query(query, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      res.send(result);
    });
  });

  router.post("/create", function(req, res, next) {
    var company_name = req.body.company_name;
    var company_taxId = req.body.company_taxId;
    var company_industry = req.body.company_industry;

  
    let query =
      "INSERT INTO `companies` (`company_id`, `company_name`, `company_taxId`, `company_industry`) VALUES (NULL, '" +
      company_name +
      "', '" +
      company_taxId +
      "', '" +
      company_industry +
      "');";
  
    db.query(query, (err, result) => {
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  });
  module.exports = router;
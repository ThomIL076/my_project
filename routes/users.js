var express = require("express");
var router = express.Router();
var request = require("request");
var uuidv4 = require("uuid/v4");
var passwordHash = require("password-hash");
var forgotPasswordForm = require("../models/mailCenter");

function makePassword(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

router.get("/", function(req, res, next) {
  let query = "SELECT * FROM `users` ORDER BY id ASC";
  db.query(query, (err, result) => {
    if (err) {
      res.redirect("/");
    }
    res.send(result);
  });
});

router.post("/register", function(req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var password = req.body.password;
  request.post(
    "https://projet-webschool-aeca78.appdrag.site/api/client/register",
    {
      form: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      }
    },
    function(err, httpResponse, body) {
      if (err) {
        res.send(err);
      }
      console.log(httpResponse);
      res.send(JSON.parse(body));
    }
  );
});

router.post("/login", function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  request.post(
    "https://projet-webschool-aeca78.appdrag.site/api/client/login",
    {
      form: { email: email, password: password }
    },
    function(err, httpResponse, body) {
      if (err) {
        res.send(err);
      }
      console.log(httpResponse);
      res.send(JSON.parse(body));
    }
  );
});

router.post("/checkToken", function(req, res) {
  var email = req.body.email;
  var token = req.body.token;
  request.post(
    "https://projet-webschool-aeca78.appdrag.site/api/client/checktoken",
    {
      form: { email: email, token: token }
    },
    function(err, httpResponse, body) {
      if (err) {
        res.send(err);
      }
      console.log(httpResponse);
      res.send(JSON.parse(body));
    }
  );
});

router.post("/checktokenRegister", function(req, res) {
  var id = req.body.id;
  var token = req.body.token;
  request.post(
    "https://projet-webschool-aeca78.appdrag.site/api/client/checktokenRegister",
    {
      form: { id: id, token: token }
    },
    function(err, httpResponse, body) {
      if (err) {
        res.send(err);
      }
      console.log(httpResponse);
      res.send(JSON.parse(body));
    }
  );
});

router.get("/newpassword", function(req, res, next) {
  res.render("forgotPassword", {
    title: "Enter your mail",
    error: null
  });
});

router.get("/adduser", function(req, res, next) {
  res.render("form", {
    title: "Add a User",
    error: null
  });
});

router.get("/forgot-password", function(req, res, next) {
  var email = req.query.email;
  var queryGetEmail = "SELECT * FROM `users` WHERE email = '" + email + "'";
  db.query(queryGetEmail, (err, result) => {
    if (err) {  
      res.send(err);
    } else {
      res.send(result);
      var user = result;
      var newToken = uuidv4();
      var querySetToken =
        "UPDATE `users` SET token ='" +
        newToken +
        "' WHERE id='" +
        user[0].id +
        "'";
      db.query(querySetToken, (err, result) => {
        if (err) {
          res.send(err);
        } else {
          var password = makePassword(10);
          var hashedPassword = passwordHash.generate(password);
          var forgotPassword = new forgotPasswordForm(email, password);
          forgotPassword.sendEmail();
          let query =
            "UPDATE `users` SET password ='" +
            hashedPassword +
            "' WHERE id='" +
            user[0].id +
            "'";
          db.query(query, (err, result) => {
            if (err) {
              res.send(err);
            } else {
              res.send(result.body);
            }
          });        
        }
      });
    }
  });
});

// router.get("/reset-password", function(req, res) {
//   var token = req.query.token;
//   if (token == null) {
//     res.send("No Token");
//   }
//   // Checker si utilisateur avec token
//   // if (NO USER) {
//   //   result.send("Invalid Token");
//   // }

//   // Si token, la page s'affiche --> mise a jour du mdp
//   // Ensuite, gerer l'action du formulaire

//   res.render("resetPassword", {
//     title: "Reset Your Password",
//     token: token,
//     error: null
//   });
// });

// router.post("/reset-password", function(req, res, next) {
//   var token = req.body.token;
//   var new_pass = req.body.newPassword;
//   var confirm_pass = req.body.confirmNewPassword;

//   if (new_pass !== confirm_pass) {
//     res.render("resetPassword", {
//       title: "Reset Your Password",
//       token: token,
//       error: "The passwords don't match"
//     });
//   }
// });

//1. Post token => verifie si un utilisateur existe avec ce token
//   Generer un nouveau mdp et envoyer ce mdp par mail (sauvegarder en hash)

//2. L'utilisateur envoie un nouveau mdp (interface), verifie avec le token s'il a le droit de le faire (autrement dit si c'est bien son token)

router.post("/create", function(req, res, next) {
  var email = req.body.email;
  var hashedPassword = passwordHash.generate("password");
  var newToken = uuidv4();
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;

  let query =
    "INSERT INTO `users` (`id`, `email`, `password`, `token`, `firstName`, `lastName`) VALUES (NULL, '" +
    email +
    "', '" +
    hashedPassword +
    "', '" +
    newToken +
    "', '" +
    firstName +
    "', '" +
    lastName +
    "');";

  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;

var express = require("express");
var router = express.Router();
var User = require("../models/user");

/* GET users listing. */
router.get("/", (req, res, next) => {
  User.findAll()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

// router.post("/", (req, res, next) => {
//   console.log(res.body);
//   // User.findAll({
//   //   where: {
//   //     email: {
//   //       [Op.]: "none"
//   //     }
//   //   }
//   // });
// });

module.exports = router;

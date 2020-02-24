var express = require("express");
var router = express.Router();
var User = require("../models/user");

/* GET All Users */
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

/* Signup */
router.post("/signup", (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(async finded => {
      // 같은 이메일을 쓰는 유저가 없으므로 가입 가능
      if(finded === null) {
        const newUser = await User.create({ email: req.body.email, password: req.body.password, name: req.body.name });
        res.json({result: "success", data: newUser});
      }
      // 같은 이메일을 쓰는 유저 존재. 가입 불가능
      else {
        res.json({"result": "duplicate"});
      }
      
    })
    .catch(err => {
      console.error(err);
      res.status(400).send('Server Error');
    });
});

/* Signin */
router.get("/signin", (req, res, next) => {
  res.send(req.session);
});

module.exports = router;
var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Custom = require("../models/custom");

/* GET All Users */
router.get("/", (req, res, next) => {
  User.findAll()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.error(err);
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
      try {
        // 같은 이메일을 쓰는 유저가 없으므로 가입 가능
        if (finded === null) {
          const newUser = await User.create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
          });
          await Custom.create({
            user_id: newUser.dataValues.email,
            custom_col: ["start","end","message_id","http_method","status"],
            platform: req.body.platform
          });
          res.json({ result: "success", data: newUser });
        }
        // 같은 이메일을 쓰는 유저 존재. 가입 불가능
        else {
          res.json({ result: "duplicate" });
        }
      } catch (err) {
        console.log(err);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(400).send("Server Error");
    });
});

/* Duplicate check */
router.post("/duplicateCheck", (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(async finded => {
      // 같은 이메일을 쓰는 유저가 없을때
      if (finded === null) {
        res.json({ result: "success" });
      }
      // 같은 이메일을 쓰는 유저가 있을때
      else {
        res.json({ result: "duplicate" });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(400).send("Server Error");
    });
});

/* Modify */
router.post("/modify", (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(async finded => {
      // 유저가 있으면 정보 수정
      if (finded !== null) {
        const updatedUser = await User.update(
          {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
          },
          {
            where: {
              email: req.body.email
            }
          }
        );
        res.json({ result: "success", data: updatedUser });
      }
      // 유저가 없으면 실패 메시지 전송
      else {
        res.json({ result: "noUser" });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(400).send("Server Error");
    });
});

/* Signin */
router.get("/signin", (req, res, next) => {
  res.send(req.session);
});

module.exports = router;

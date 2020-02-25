var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Custom = require("../models/custom");

let jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");

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
            custom_col: ["start", "end", "message_id", "http_method", "status"],
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
router.post("/signin", (req, res, next) => {
  // default : HMAC SHA256
  let token = jwt.sign(
    {
      email: req.body.email
    },
    secretObj.secret, // 비밀 키
    {
      expiresIn: "1h" // 유효 시간은 1시간
    }
  );

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      // 비밀번호 검증
      if (user.dataValues.password === req.body.password) {
        res.json({
          result: "success",
          name: user.dataValues.name,
          email: user.dataValues.email,
          token: token
        });
      } else {
        res.status(403).json({
          result: "fail",
          message: "not logged in"
        });
      }
    })
    .catch(err => {
      console.error("err");
    });
});

/* Token Check */
router.post("/check", (req, res, next) => {
  // default : HMAC SHA256
  const token = req.headers["x-access-token"] || req.body.token;

  // token does not exist
  if (!token) {
    return res.status(403).json({
      result: "fail",
      message: "not logged in"
    });
  }

  let decoded = new Promise((resolve, reject) => {
    jwt.verify(token, secretObj.secret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });

  // if token is valid, it will respond with its info
  const respond = token => {
    res.json({
      result: "success",
      token: token
    });
  };

  // if it has failed to verify, it will return an error message
  const onError = error => {
    res.status(403).json({
      result: "fail",
      message: error.message
    });
  };

  decoded.then(respond).catch(onError);
});

module.exports = router;

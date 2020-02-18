var express = require("express");
var router = express.Router();
var Spa = require("../models/Spa");
const { Op } = require("sequelize");

/* GET SPA for search pages */
router.get("/", function(req, res, next) {
  let response = [];

  // MAKE Response FORM
  const findEach = element => {
    return new Promise(resolve => {
      Spa.findAll({
        where: {
          message_id: element.dataValues.message_id
        },
        order: [["time", "ASC"]]
      })
        .then(each => {
          let eachResponse = {};
          eachResponse["start"] = each[0].dataValues.time;
          eachResponse["end"] = each.slice(-1)[0].dataValues.time;
          eachResponse["message_id"] = each[0].dataValues.message_id;
          eachResponse["server"] = each[0].dataValues.server_name;
          eachResponse["service"] = each[0].dataValues.service_name;
          eachResponse["car_id"] = each[0].dataValues.car_id;
          eachResponse["function"] = each[0].dataValues.function;
          eachResponse["status"] = each.slice(-1)[0].dataValues.success;
          response.push({ ...eachResponse });
          resolve(eachResponse);
        })
        .catch(err => {
          console.error(err);
          next(err);
        });
    });
  };

  const loopLogic = array => {
    return new Promise(resolve => {
      for (const element of array) {
        findEach(element)
          .then(results => {
            if(element === array[array.length - 1]) resolve(results);
          })
          .catch(err => {
            console.error(err);
            next(err);
          });
      }
    });
  };

  // Get all message_id in SPA
  Spa.findAll({
    attributes: ["message_id"],
    distinct: true,
    where: {
      message_id: {
        [Op.not]: "none"
      }
    }
  })
    // GET all query each message_ids
    .then(message_ids => {
      loopLogic(message_ids).then(() => {
        res.json(response);
      });
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

module.exports = router;

var express = require("express");
var router = express.Router();
var Spa = require("../models/Spa");
var Vehicle = require("../models/vehicle");
const { Op } = require("sequelize");

/* GET SPA for search pages */
router.get("/", (req, res, next) => {
  let response = [];
  let Data;
  if(req.query.data === "spa") Data = Spa;
  else if(req.query.data === "vehicle") Data = Vehicle;
  else Data = Spa;

  // MAKE Response FORM
  const findEach = element => {
    return new Promise(resolve => {
      Data.findAll({
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
          eachResponse["log_level"] = each[0].dataValues.log_level;
          eachResponse["server_range"] = each[0].dataValues.server_range;
          eachResponse["protocol"] = each[0].dataValues.protocol;
          eachResponse["http_method"] = each[0].dataValues.http_method;
          eachResponse["uri"] = each[0].dataValues.uri;
          eachResponse["source"] = each[0].dataValues.source;
          eachResponse["destination"] = each[0].dataValues.destination;
          eachResponse["commu_type"] = each[0].dataValues.commu_type;
          eachResponse["contents"] = each[0].dataValues.contents;
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
  Data.findAll({
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

/* Get Spa for detail pages */
router.post("/detail", (req, res, next) => {
  let response = [];
  let Data;
  if(req.query.data === "spa") Data = Spa;
  else if(req.query.data === "vehicle") Data = Vehicle;

  const formEach = array => {
    return new Promise(resolve => {
      for (const element of array) {
        response.push({...element.dataValues});
        if(element === array[array.length - 1]) res.json(response);
      }
    });
  };

  Data.findAll({
    where: {
      message_id: req.body.message_id
    },
    order: [["time", "ASC"]]
  })
  .then((each) => {
    formEach(each);
  })
  .catch((err) => {
    console.error(err);
  })
});

module.exports = router;

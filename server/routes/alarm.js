var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.json([{
        title: "00:00:01 에러 발생",
        id: "asdf-asdf-1234-1234"
    },
    {
        title: "00:00:02 에러 발생",
        id: "asdf-asdf-1234-1234"
    },
    {
        title: "00:00:03 에러 발생",
        id: "asdf-asdf-1234-1234"
    }]);
});

module.exports = router;
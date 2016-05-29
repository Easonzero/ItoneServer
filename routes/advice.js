var dao = require('./dao');
var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  dao.advicedao.send(req.query,function(result){
    res.send(result);
  });
});

module.exports = router;

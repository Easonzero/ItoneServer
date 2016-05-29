var dao = require('./dao');
var express = require('express');
var router = express.Router();

router.post('/send', function(req, res, next) {
  dao.messagedao.send(req.query,function(result){
    res.send(result);
  });
});

router.post('/getMessage', function(req, res, next) {
  dao.messagedao.getMessage(req.query,function(result){
    res.send(result);
  });
});

module.exports = router;

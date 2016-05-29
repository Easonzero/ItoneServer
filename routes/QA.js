var dao = require('./dao');
var express = require('express');
var router = express.Router();

router.post('/createQ', function(req, res, next) {
  dao.qadao.send(req.query,function(result){
    res.send(result);
  });
});

router.post('/addA', function(req, res, next) {
  dao.qadao.getMessage(req.query,function(result){
    res.send(result);
  });
});

router.post('/getQ_A', function(req, res, next) {
  dao.qadao.getMessage(req.query.id,function(result){
    res.send(result);
  });
});

router.post('/getQ', function(req, res, next) {
  dao.qadao.getMessage(req.query,function(result){
    res.send(result);
  });
});

router.post('/getA', function(req, res, next) {
  dao.qadao.getMessage(req.query,function(result){
    res.send(result);
  });
});

module.exports = router;

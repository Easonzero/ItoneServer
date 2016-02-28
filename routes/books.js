var dao = require('./Dao/bookdao');
var express = require('express');
var router = express.Router();

/* GET books listing. */
router.get('/search', function(req, res, next) {
  var json = dao.search(req.body);
  console.log(req.body);
  res.json(json);
});

router.get('/booklist',function(req,res,next){
  var json = dao.booklist(req.body);
  console.log(req.body);
  res.json(json);
});

module.exports = router;

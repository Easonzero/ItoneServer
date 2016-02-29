var dao = require('./Dao/bookdao');
var express = require('express');
var router = express.Router();

/* GET books listing. */
router.get('/search', function(req, res, next) {
  dao.search(req.query,function(result){
    res.send(result);
  });
});

router.get('/booklist',function(req,res,next){
  dao.booklist(req.query,function(result){
    res.send(result);
  });
});

router.get('/download',function(req,res,next){
  console.log(req.query.id)
  dao.geturl(req.query.id,function(result){
    res.download(result.url);
  })
})

module.exports = router;

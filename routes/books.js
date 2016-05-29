var dao = require('./dao');
var express = require('express');
var router = express.Router();

/* GET books listing. */
router.get('/search', function(req, res, next) {
  dao.bookdao.search(req.query,function(result){
    res.send(result);
  });
});

router.get('/booklist',function(req,res,next){
  dao.bookdao.booklist(req.query,function(result){
    res.send(result);
  });
});

router.get('/download',function(req,res,next){
  dao.bookdao.geturl(req.query.id,function(result){
    res.download(result.url);
  })
});

router.get('/booksbyuser',function(req,res,next){
  dao.bookdao.booksbyuser(req.query,function(result){
    res.send(result.url);
  })
});

module.exports = router;

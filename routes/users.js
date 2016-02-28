var dao = require('./Dao/userdao');
var express = require('express');
var multiparty = require('multiparty');
var router = express.Router();

router.post('/login', function(req, res, next) {
  dao.login(req.body,function(user){
    if(user.length != 0){
      req.session.user = user;
      res.send('ok');
    }
    else res.send('error');
  });
});

router.post('/userinfo',function(req,res,next){
  var user = req.session.user[0];
  res.send(JSON.stringify(user));
});

router.post('/register',function(req,res,next){
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    var userinfo = JSON.parse(fields.userinfo[0]);
    dao.check(userinfo.id,function(result){
      if(result){
        res.send('error');
      }else{
        res.send('ok');
      }
    })
  });
});

router.get("/logout",function(req,res){
    req.session.destory();
});

module.exports = router;

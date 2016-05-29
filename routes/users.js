var dao = require('./dao');
var express = require('express');
var multiparty = require('multiparty');
var fs = require('fs');
var router = express.Router();

router.post('/login', function(req, res, next) {
  dao.userdao.login(req.body,function(user){
    if(user.length != 0){
      req.session.user = user[0];
      res.send('ok');
    }
    else res.send('error');
  });
});

router.post('/modify',function(req,res,next){
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    var userinfo = JSON.parse(fields.userinfo[0]);
    dao.userdao.check(userinfo.id,true,function(result){
      if(result){
        res.send('error');
      }else{
        res.send('ok');
        if(userinfo.picture){
          var uploadedPath = files.inputFile[0].path;
          userinfo.picture = '..//res//user//' + userinfo.id + '//headPic.jpg';
          fs.rename(uploadedPath, userinfo.picture);
        }else{
          userinfo.picture = null;
        }
        dao.userdao.add(userinfo);
      }
    })
  });
});

router.post('/userbaseinfo',function(req,res,next){
  var user = req.session.user;
  res.send(JSON.stringify(user));
});

router.post('/userelseinfo',function(req,res,next){
  var id = req.session.user.id;
  dao.userdao.userplu(id,function(userplu){
    res.send(userplu);
  })
});

router.get("/getrank",function(req,res){
    //todo
});

router.post('/register',function(req,res,next){
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    var userinfo = JSON.parse(fields.userinfo[0]);
    dao.userdao.check(userinfo.id,false,function(result){
      if(result){
        res.send('error');
      }else{
        res.send('ok');
        if(userinfo.picture){
          var uploadedPath = files.inputFile[0].path;
          userinfo.picture = '..//res//user//' + userinfo.id + '//headPic.jpg';
          fs.rename(uploadedPath, userinfo.picture);
        }else{
          userinfo.picture = null;
        }
        dao.userdao.add(userinfo);
      }
    })
  });
});

router.get("/logout",function(req,res){
    req.session.destory();
});

router.get("/usersbyorder",function(req,res){
    //todo
});

module.exports = router;

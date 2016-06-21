const multiparty = require('multiparty');
const fs = require('fs');
const proxy = require('../proxy/userProxy');
const config = require('../config').initConfig();
const EventProxy  = require("eventproxy");
const updateOrderlistTask = require('../task/updateOrderlistTask');
/**
 * Created by eason on 5/30/16.
 */
exports.create = function(req,res){
    var form = new multiparty.Form();
    var ep = EventProxy.create();

    form.parse(req, ep.doneLater("after_parseFrom"));

    ep.once("after_parseFrom",function(fields, files) {
        var userinfo = JSON.parse(fields.userinfo[0]);
        proxy.checkUserExists({id:userInfo.id}, ep.doneLater("after_checkUserExists"));

        ep.once("after_checkUserExists",function () {
            if(userinfo.picture){
                var uploadedPath = files.inputFile[0].path;
                userinfo.picture = '..//res//user//' + userinfo.id + '//headPic.jpg';
                fs.rename(uploadedPath, userinfo.picture);
            }else{
                userinfo.picture = null;
            }

            ep.doneLater("after_createUserPic");
        });

        ep.once("after_createUserPic", function (isUserExist) {
            if (!isUserExist) {
                proxy.create(userinfo,(err,result)=>{
                    if(err) res.send(config.statusCode.STATUS_ERROR);
                    return res.send(config.statusCode.STATUS_OK);
                });
            } else {
                return res.send(config.statusCode.STATUS_ERROR);
            }
        });
    });

    ep.fail(function (err) {
        return res.send(config.statusCode.STATUS_ERROR);
    });
};

exports.login = function(req, res) {
    if (!req.session) {
        return res.send(config.statusCode.STATUS_ERROR);
    }
    
    proxy.login(req.body,function(err,result){
        if (err||!result) {
            return res.send(config.statusCode.STATUS_ERROR);
        }
        req.session.user = result;
        return res.send(config.statusCode.STATUS_OK);
    });
};

exports.modify = function(req,res){
    var form = new multiparty.Form();
    var ep = EventProxy.create();

    form.parse(req, ep.doneLater("after_parseFrom"));

    ep.once("after_parseFrom",function(fields, files) {
        var userinfo = JSON.parse(fields);
        proxy.checkUserExists({id:userInfo.id}, ep.doneLater("after_checkUserExists"));

        ep.once("after_checkUserExists", function (isUserExist) {
            if (isUserExist) {
                proxy.modify(userinfo,ep.doneLater("after_modifyUser"));
            } else {
                return callback(new ServerError(), null);
            }
        });

        ep.once("after_modifyUser",function () {
            if(userinfo.picture){
                var uploadedPath = files.inputFile[0].path;
                userinfo.picture = '..//res//user//' + userinfo.id + '//headPic.jpg';
                fs.rename(uploadedPath, userinfo.picture);
            }else{
                userinfo.picture = null;
            }
            return res.send(config.statusCode.STATUS_OK);
        });
    });

    ep.fail(function (err) {
        return res.send(config.statusCode.STATUS_ERROR);
    });
};

exports.baseInfo = function(req,res){
    if (!req.session||!req.session.user) {
        return res.send(config.statusCode.STATUS_ERROR);
    }
    var user = req.session.user;
    res.send(user);
};

exports.plusInfo = function(req,res){
    if (!req.session||!req.session.user) {
        return res.send(config.statusCode.STATUS_ERROR);
    }
    if(req.session.userPlu){
        return res.send(req.session.userPlu);
    }
    var id = req.session.user.id;

    proxy.getPluInfo({id:id},function(err,result){
        if (err||result.length === 0) {
            res.statusCode = err.statusCode;
            return res.send(config.statusCode.STATUS_ERROR);
        }
        req.session.userPlu = result;
        return res.send(result);
    });
};

exports.measureRank = function(req,res){
    if (!req.session||!req.session.user) {
        return res.send(config.statusCode.STATUS_ERROR);
    }
    
    let id = req.session.user.id;
    
    if(!req.session.userPlu){
        proxy.getPluInfo({id:id},function(err,result){
            if (err||result.length === 0) {
                res.statusCode = err.statusCode;
                return res.send(config.statusCode.STATUS_ERROR);
            }
            req.session.userPlu = result;
            proxy.getRank({downloadNum:result.downloadNum},function(err,result){
                if (err) {
                    res.statusCode = err.statusCode;
                    return res.send(config.statusCode.STATUS_ERROR);
                }
                if(result.rank<100)  result.rank = getRank(id);
                return res.send(result.rank+'');
            });
        });
    }else{
        proxy.getRank({downloadNum:req.session.userPlu.downloadNum},function(err,result){
            if (err||result.length === 0) {
                res.statusCode = err.statusCode;
                return res.send(config.statusCode.STATUS_ERROR);
            }
            if(result.rank<100)  result.rank = getRank(id);
            return res.send(result.rank+'');
        });
    }
};

exports.logout = function(req,res){
    req.session.destroy();
    res.clearCookie();
    return res.redirect("/users/login");
};

exports.sortUsers = function(req,res){
    if(!global.studentlist){
        updateOrderlistTask.run((err)=>{
		    if (err) {
                res.statusCode = err.statusCode;
                return res.send(config.statusCode.STATUS_ERROR);
            }
		    let s = getOrderlist()
		    return res.send(s);
	    });
    }
    else{
        return res.send(getOrderlist());
    }
};

function getOrderlist(){
    let orderlist = [];
    let i = 0;
    if(!global.studentlist) return orderlist;
    for(let student of global.studentlist){
        if(student.rank < 10){
            orderlist[i] = student;
            i++;
            if(i === 10) return orderlist;
        }
    }
    return orderlist;
}

function getRank(id){
    if(!global.studentlist) return 0;
    for(let student in global.studentlist){
        if(student.id == id){
            return student.rank;
        }
    }
}

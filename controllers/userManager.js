var multiparty = require('multiparty');
var fs = require('fs');
var proxy = require('../proxy/userProxy');
var config = require('../config');
var resUtil = require('../utils/resUtil');
var EventProxy  = require("eventproxy");
/**
 * Created by eason on 5/30/16.
 */
exports.create = function(req,res,next){
    var form = new multiparty.Form();
    var ep = EventProxy.create();

    form.parse(req, ep.doneLater("after_parseFrom"));

    ep.once("after_parseFrom",function(fields, files) {
        var userinfo = JSON.parse(fields.userinfo[0]);
        proxy.checkUserExists(userInfo.id, ep.doneLater("after_checkUserExists"));

        ep.once("after_checkUserExists", function (isUserExist) {
            if (!isUserExist) {
                proxy.create(userinfo,ep.doneLater("after_createUser"));
            } else {
                return callback(new ServerError(), null);
            }
        });

        ep.once("after_createUser",function () {
            if(userinfo.picture){
                var uploadedPath = files.inputFile[0].path;
                userinfo.picture = '..//res//user//' + userinfo.id + '//headPic.jpg';
                fs.rename(uploadedPath, userinfo.picture);
            }else{
                userinfo.picture = null;
            }
            return res.send(resUtil.generateRes(null, config.statusCode.STATUS_OK));
        });
    });

    ep.fail(function (err) {
        return res.send(resUtil.generateRes(null, config.statusCode.STATUS_ERROR));
    });
};

exports.login = function(req, res, next) {
    if (!req.session) {
        return res.send(resUtil.generateRes(null, config.statusCode.STATUS_ERROR));
    }
    
    proxy.login(body,function(err,result){
        if (err||result.length === 0) {
            return res.send(resUtil.generateRes(null, config.statusCode.STATUS_ERROR));
        }
        req.session.user = user[0];
        return res.send(resUtil.generateRes(null,config.statusCode.STATUS_OK));
    });
};

exports.modify = function(req,res){
    var form = new multiparty.Form();
    var ep = EventProxy.create();

    form.parse(req, ep.doneLater("after_parseFrom"));

    ep.once("after_parseFrom",function(fields, files) {
        var userinfo = JSON.parse(fields.userinfo[0]);
        proxy.checkUserExists(userInfo.id, ep.doneLater("after_checkUserExists"));

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
            return res.send(resUtil.generateRes(null, config.statusCode.STATUS_OK));
        });
    });

    ep.fail(function (err) {
        return res.send(resUtil.generateRes(null, config.statusCode.STATUS_ERROR));
    });
};

exports.baseInfo = function(req,res,next){
    var user = req.session.user;
    res.send(JSON.stringify(user));
};

exports.plusInfo = function(req,res,next){
    var id = req.session.user.id;
    proxy.getPluInfo(id,function(err,result){
        if (err||result.length === 0) {
            return res.send(resUtil.generateRes(null, config.statusCode.STATUS_ERROR));
        }
        return res.send(result);
    });
};

exports.measureRank = function(req,res){
    //todo
};

exports.logout = function(req,res){
    req.session.destory();
    res.clearCookie();
    return res.redirect("/login");
};

exports.sortUsers = function(req,res){
    //todo
};

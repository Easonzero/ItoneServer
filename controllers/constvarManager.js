const proxy = require('../proxy/universityProxy');
const sms = require('../utils/smsUtil');
const config = require('../config').initConfig();
/**
 * Created by eason on 5/31/16.
 */

exports.university = function(req, res) {
    proxy.findAllUniversity(function (err,result) {
        if (err) {
            res.statusCode = err.statusCode;
            return res.send(config.statusCode.STATUS_ERROR);
        }
        return res.send(result);
    });
};

exports.faculty = function(req, res) {
    let handler = function (err,result) {
        if (err) {
            res.statusCode = err.statusCode;
            return res.send(config.statusCode.STATUS_ERROR);
        }
        return res.send(result);
    }
    if(req.body.fromUniversity == '*'){
        proxy.findFaculty(handler);
    }else{
        proxy.findFacultyByUniversity(req.body,handler)
    }
};

exports.course = function(req, res) {
    proxy.findCourseByUniversity(req.body,function (err,result) {
        if (err) {
            res.statusCode = err.statusCode;
            return res.send(config.statusCode.STATUS_ERROR);
        }
        return res.send(result);
    });
};

exports.class = function(req, res) {
    let handler = function (err,result) {
        if (err) {
            res.statusCode = err.statusCode;
            return res.send(config.statusCode.STATUS_ERROR);
        }
        return res.send(result);
    }
    if(req.body.fromUniversity == '*'&&req.body.fromFaculty == '*'){
        proxy.findClass(handler);
    }else if(req.body.fromUniversity == '*'){
        proxy.findClassByFaculty(req.body,handler);
    }else if(req.body.fromFaculty == '*'){
        proxy.findClassByUniversity(req.body,handler);
    }else{
        proxy.findClassByfu(req.body,handler);
    }
};

exports.sms = function(req, res) {
    sms.sendSms(req.body.mob,(ckn,data)=>{
        req.session.ckn = ckn;
        res.send(ckn);
    });
};
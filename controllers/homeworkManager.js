const proxy = require('../proxy/homeworkProxy');
const config = require('../config').initConfig();
require('../utils/dateUtil');
const fs = require('fs');
const EventProxy  = require("eventproxy");
const multiparty = require('multiparty');
/**
 * Created by eason on 5/30/16.
 */
exports.sendHomework = function(req, res) {
    let form = new multiparty.Form();
    let ep = EventProxy.create();

    form.parse(req, ep.doneLater("after_parseFrom"));

    ep.once("after_parseFrom",function(fields, files) {
        let homework = JSON.parse(fields.homework[0]);
        homework.sdate = new Date().Format('yyyy-M-d');
        if(homework.picUrl == 'true'){
            let uploadedPath = files.file[0].path;
            homework.picUrl = '/res/homework/' + homework.courseNo + homework.sdate + '/';
            let savePath = __dirname+'/../public'+homework.picUrl;
            if (!fs.existsSync(savePath)) {
                fs.mkdirSync(savePath);
            }
            fs.rename(uploadedPath, savePath + 'homework.jpg');
        }else{
            homework.picUrl = '';
        }
    
        proxy.addHomework(homework,function (err,result) {
            if (err) {
                res.statusCode = err.statusCode;
                return res.send(config.statusCode.STATUS_ERROR);
            }
            return res.send(config.statusCode.STATUS_OK);
        });
    });
    
    ep.fail(function (err) {
        return res.send(config.statusCode.STATUS_ERROR);
    });
};

exports.getHomework = function(req, res) {
    if (!req.session||!req.session.user) {
        return res.send(config.statusCode.STATUS_ERROR);
    }
    req.body['university'] = req.session.user.university;
    req.body['Class'] = req.session.user.Class;
    req.body['date'] = new Date().Format('yyyy-M-d');
    proxy.findHomework(req.body,function (err,result) {
        if (err) {
            res.statusCode = err.statusCode;
            return res.send(err);//config.statusCode.STATUS_ERROR);
        }
        return res.send(result);
    });
};

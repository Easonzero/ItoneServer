const proxy = require('../proxy/messageProxy');
const config = require('../config').initConfig();
const multiparty = require('multiparty');
const EventProxy  = require("eventproxy");
const fs = require("fs");
/**
 * Created by eason on 5/30/16.
 */
exports.sendMessage = function(req, res) {
    let form = new multiparty.Form();
    let ep = EventProxy.create();

    form.parse(req, ep.doneLater("after_parseFrom"));

    ep.once("after_parseFrom",function(fields, files) {
        let message = JSON.parse(fields.message[0]);
        message.date = new Date().Format('yyyy-M-d');

        if(message.picUrl == 'true'){
            let uploadedPath = files.file[0].path;
            message.picUrl = '/res/message/' + message.uid + message.date +  '/';
            let savePath = __dirname+'/../public'+message.picUrl;
            if (!fs.existsSync(savePath)) {
                fs.mkdirSync(savePath);
            }
            fs.rename(uploadedPath, savePath + 'message.jpg');
        }else{
            message.picUrl = '';
        }
        proxy.addMessage(req.body,function (err,result) {
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

exports.getMessage = function(req, res) {
    if (!req.session||!req.session.user) {
        return res.send(config.statusCode.STATUS_ERROR);
    }
    req.body['university'] = req.session.user.university;
    req.body['Class'] = req.session.user.Class;
    proxy.findMessage(req.body,function (err,result) {
        if (err) {
            res.statusCode = err.statusCode;
            return res.send(config.statusCode.STATUS_ERROR);
        }
        return res.send(result);
    });
};

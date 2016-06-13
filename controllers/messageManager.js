var proxy = require('../proxy/messageProxy');
var config = require('../config').initConfig();
/**
 * Created by eason on 5/30/16.
 */
exports.sendMessage = function(req, res) {
    proxy.addMessage(req.body,function (err,result) {
        if (err) {
            res.statusCode = err.statusCode;
            return res.send(config.statusCode.STATUS_ERROR);
        }
        return res.send(config.statusCode.STATUS_OK);
    });
};

exports.getMessage = function(req, res) {
    if (!req.session||!req.session.user) {
        return res.send(config.statusCode.STATUS_ERROR);
    }
    req.body['university'] = req.session.user.university;
    req.body['class'] = req.session.user.class;
    proxy.findMessage(req.body,function (err,result) {
        if (err) {
            res.statusCode = err.statusCode;
            return res.send(config.statusCode.STATUS_ERROR);
        }
        return res.send(result);
    });
};

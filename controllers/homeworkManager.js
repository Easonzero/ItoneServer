const proxy = require('../proxy/homeworkProxy');
const config = require('../config').initConfig();
require('../utils/dateUtil');
/**
 * Created by eason on 5/30/16.
 */
exports.sendHomework = function(req, res) {
    proxy.addHomework(req.body,function (err,result) {
        if (err) {
            res.statusCode = err.statusCode;
            return res.send(config.statusCode.STATUS_ERROR);
        }
        return res.send(config.statusCode.STATUS_OK);
    });
};

exports.getHomework = function(req, res) {
    if (!req.session||!req.session.user) {
        return res.send(config.statusCode.STATUS_ERROR);
    }
    req.body['university'] = req.session.user.university;
    req.body['class'] = req.session.user.class;
    req.body['date'] = new Date().Format('yyyy-M-d');
    proxy.findHomework(req.body,function (err,result) {
        if (err) {
            res.statusCode = err.statusCode;
            return res.send(config.statusCode.STATUS_OK);
        }
        return res.send(result);
    });
};

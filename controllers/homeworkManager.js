var proxy = require('../proxy/homeworkProxy');
var config = require('../config').initConfig();
/**
 * Created by eason on 5/30/16.
 */
exports.sendHomework = function(req, res) {
    proxy.addHomework(req.query,function (err,result) {
        if (err) {
            return res.send(config.statusCode.STATUS_ERROR);
        }
        return res.send(config.statusCode.STATUS_ERROR);
    });
};

exports.getHomework = function(req, res) {
    proxy.findHomework(req.query,function (err,result) {
        if (err) {
            return res.send(config.statusCode.STATUS_ERROR);
        }
        return res.send(result);
    });
};

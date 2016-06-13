const proxy = require('../proxy/universityProxy');
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
    proxy.findClassByUniversity(req.body,function (err,result) {
        if (err) {
            res.statusCode = err.statusCode;
            return res.send(config.statusCode.STATUS_ERROR);
        }
        return res.send(result);
    });
};
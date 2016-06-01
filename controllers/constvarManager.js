var proxy = require('../proxy/universityProxy');
var config = require('../config').initConfig();
/**
 * Created by eason on 5/31/16.
 */
exports.university = function(req, res) {
    proxy.findAllUniversity(function (err,result) {
        if (err) {
            return res.send(config.statusCode.STATUS_ERROR);
        }
        return res.send(result);
    });
};

exports.course = function(req, res) {
    proxy.findAllUniversity(req.query.fromUniversity,function (err,result) {
        if (err) {
            return res.send(config.statusCode.STATUS_ERROR);
        }
        return res.send(result);
    });
};
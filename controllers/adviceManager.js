var proxy = require('../proxy/adviceProxy');
var config = require('../config').initConfig();
/**
 * Created by eason on 5/30/16.
 */
exports.advice = function(req, res, next) {
    proxy.addAdvice(req.query,function (err,result) {
        if (err) {
            return res.send(config.statusCode.STATUS_ERROR);
        }
        return res.send(config.statusCode.STATUS_OK);
    });
};
var proxy = require('../proxy/adviceProxy');
var config = require('../config');
var resUtil = require('../utils/resUtil');
/**
 * Created by eason on 5/30/16.
 */
exports.advice = function(req, res, next) {
    proxy.addAdvice(req.query,function (err,result) {
        if (err) {
            return res.send(resUtil.generateRes(null, err.statusCode));
        }
        return res.send(resUtil.generateRes(null, config.statusCode.STATUS_OK));
    });
};
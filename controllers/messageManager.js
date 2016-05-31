var proxy = require('../proxy/messageProxy');
var config = require('../config');
var resUtil = require('../utils/resUtil');
/**
 * Created by eason on 5/30/16.
 */
exports.sendMessage = function(req, res, next) {
    proxy.addMessage(req.query,function (err,result) {
        if (err) {
            return res.send(resUtil.generateRes(null, config.statusCode.STATUS_ERROR));
        }
        return res.send(resUtil.generateRes(null, config.statusCode.STATUS_OK));
    });
};

exports.getMessage = function(req, res, next) {
    proxy.findMessage(req.query,function (err,result) {
        if (err) {
            return res.send(resUtil.generateRes(null, config.statusCode.STATUS_ERROR));
        }
        return res.send(result);
    });
};
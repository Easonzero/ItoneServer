var proxy = require('../proxy/tribuneProxy');
var config = require('../config');
var resUtil = require('../utils/resUtil');
/**
 * Created by eason on 5/30/16.
 */
exports.getIssue = function(req, res) {
    proxy.findIssue(req.body.QA,function(err,result){
        if (err||result.length === 0) {
            return res.send(resUtil.generateRes(null, config.statusCode.STATUS_ERROR));
        }
        return res.send(result);
    });
};

exports.getQuestions = function(req, res) {
    proxy.findQuestions(req.body,function(err,result){
        if (err||result.length === 0) {
            return res.send(resUtil.generateRes(null, config.statusCode.STATUS_ERROR));
        }
        return res.send(result);
    });
};

exports.createIssue = function(req, res) {
    proxy.createIssue(req.body,function(err){
        if (err) {
            return res.send(resUtil.generateRes(null, config.statusCode.STATUS_ERROR));
        }
        return res.send(resUtil.generateRes(null, config.statusCode.STATUS_OK));
    });
};
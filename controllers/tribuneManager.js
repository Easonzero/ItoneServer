var proxy = require('../proxy/tribuneProxy');
var config = require('../config').initConfig();
/**
 * Created by eason on 5/30/16.
 */
exports.getIssue = function(req, res) {
    proxy.findIssue(req.body.QA,function(err,result){
        if (err||result.length === 0) {
            res.statusCode = err.statusCode;
            return res.send(config.statusCode.STATUS_ERROR);
        }
        return res.send(result);
    });
};

exports.getQuestions = function(req, res) {
    proxy.findQuestions(req.body,function(err,result){
        if (err||result.length === 0) {
            res.statusCode = err.statusCode;
            return res.send(config.statusCode.STATUS_ERROR);
        }
        return res.send(result);
    });
};

exports.createIssue = function(req, res) {
    proxy.createIssue(req.body,function(err){
        if (err) {
            res.statusCode = err.statusCode;
            return res.send(config.statusCode.STATUS_ERROR);
        }
        return res.send(config.statusCode.STATUS_OK);
    });
};
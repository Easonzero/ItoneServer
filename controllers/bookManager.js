var proxy = require('../proxy/bookProxy');
var config = require('../config').initConfig();
/**
 * Created by eason on 5/30/16.
 */
exports.search = function(req, res, next) {
    proxy.findBookByName(req.query,function (err,result) {
        if (err) {
            res.statusCode = err.statusCode;
            return res.send(onfig.statusCode.STATUS_ERROR);
        }
        return res.send(result);
    });
};

exports.booksBySubject = function(req, res, next) {
    proxy.findBookBySubject(req.query,function (err,result) {
        if (err) {
            res.statusCode = err.statusCode;
            return res.send(config.statusCode.STATUS_ERROR);
        }
        return res.send(result);
    });
};

exports.booksByUser = function(req, res, next) {
    proxy.findBookByUploader(req.query,function (err,result) {
        if (err) {
            res.statusCode = err.statusCode;
            return res.send(config.statusCode.STATUS_ERROR);
        }
        return res.send(result);
    });
};

exports.download = function(req, res, next) {
    proxy.download(req.query,function (err,result) {
        if (err) {
            res.statusCode = err.statusCode;
            return res.send(config.statusCode.STATUS_ERROR);
        }
        return res.download(result.url);
    });
};
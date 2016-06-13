var proxy = require('../proxy/bookProxy');
var config = require('../config').initConfig();
var path = require('path');
/**
 * Created by eason on 5/30/16.
 */
exports.search = function(req, res) {

    proxy.findBookByName(req.body,function (err,result) {
        if (err) {
            res.statusCode = err.statusCode;
            return res.send(config.statusCode.STATUS_ERROR);
        }
        return res.send(result);
    });
    
};

exports.booksBySubject = function(req, res) {
    proxy.findBookBySubject(req.body,function (err,result) {
        if (err) {
            res.statusCode = err.statusCode;
            return res.send(config.statusCode.STATUS_ERROR);
        }
        return res.send(result);
    });
};

exports.userbooks = function(req, res) {
    proxy.findBookByUploader(req.body,function (err,result) {
        if (err) {
            res.statusCode = err.statusCode;
            return res.send(config.statusCode.STATUS_ERROR);
        }
        return res.send(result);
    });
};

exports.download = function(req, res) {
    proxy.checkMoney(req.body,function(err,result){
        if(!result) {
            res.statusCode = 404;
	    console.log('money');
            return res.send(config.statusCode.STATUS_ERROR);
        }
        proxy.download(req.body,function (err,result) {
            if (err) {
                res.statusCode = 404;
		console.log('download');
                return res.send(config.statusCode.STATUS_ERROR);
            }
            return res.send(result.url);
        });
    });
};

exports.transport = function(req,res) {
    return res.download(__dirname + '/../' + req.body.url);
}

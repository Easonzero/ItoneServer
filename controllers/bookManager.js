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
            return res.send(config.statusCode.STATUS_ERROR);
        }

	proxy.getUrl(req.body,function(err,url){
	    return res.download(__dirname + '/../' + url,(error)=>{
                if(error) {
                    console.log(error);
                }
                else{
                    proxy.update(req.body,function (err,result) {
                        if (err) {
                            console.log(error);
                        }
                    });
                }
            });
	});
    });
};

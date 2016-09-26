const proxy = require('../proxy/bookProxy');
const config = require('../config').initConfig();
const path = require('path');
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
	if(req.body.category==undefined){
	proxy.findBookBySubject(req.body,function (err,result) {
        if (err) {
            res.statusCode = err.statusCode;
            return res.send(config.statusCode.STATUS_ERROR);
        }
        return res.send(result);
    });
	}else{
	proxy.findBookByCategory(req.body,function (err,result) {
        if (err) {
            res.statusCode = err.statusCode;
            return res.send(config.statusCode.STATUS_ERROR);
        }
        return res.send(result);
    });
	}
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
    proxy.checkMoney(req.body,function(err,result) {
        if (!result) {
            res.statusCode = 404;
            return res.send(config.statusCode.STATUS_ERROR);
        }
        
        proxy.getUrl(req.body,function(err,url){
	    	if(err){
	    		res.statusCode = err.statusCode;
            	return res.send(config.statusCode.STATUS_ERROR);
	    	}
            proxy.update(req.body,function (err,result) {
                if (err) {
                    res.statusCode = err.statusCode;
            		return res.send(config.statusCode.STATUS_ERROR);
                }
                return res.send(url);
            });
        });
    });
};

exports.watch = function(req, res){
	proxy.getUrl(req.body,function(err,url){
	    	if(err){
	    		res.statusCode = err.statusCode;
            	return res.send(config.statusCode.STATUS_ERROR);
	    	}
	return res.send(url);
        });
}

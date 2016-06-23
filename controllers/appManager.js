const proxy = require('../proxy/appProxy');
const config = require('../config').initConfig();

exports.update = function(req, res) {
	let version = parseInt(req.body.version);
	proxy.adapk(function (err,result) {
        if (err) {
            res.statusCode = err.statusCode;
            return res.send(config.statusCode.STATUS_ERROR);
        }
        if (version < parseInt(result.adapkvcode))
        	return res.send(result.adapkurl);
        else res.send(config.statusCode.STATUS_ERROR);
    });
};

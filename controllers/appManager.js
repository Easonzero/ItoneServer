var config = require('../config').initConfig();

exports.update = function(req, res) {
	let version = parseInt(req.body.version);
	if(version < config.versionCode){
		res.send(config.apkurl);
	}else{
		res.send(config.statusCode.STATUS_ERROR);
	}
};

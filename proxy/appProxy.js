var mysqlClient = require("../utils/sqlUtil");

exports.adapk = function (callback) {
    mysqlClient.query({
        sql     : `SELECT * FROM app WHERE configName = :p1 OR configName = :p2`,
        params  : {p1:'adapkvcode',p2:'adapkurl'}
    }, function (err, rows) {
        if (err) {
            return callback(DBError(), null);
        }
		rows = toJson(rows);
        callback(null, rows);
    });
};

function toJson(rows){
	let json = {};
	for(let pairs of rows){
		json[pairs.configName] = pairs.value;
	}
	return json;
}

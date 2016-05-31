var mysqlClient = require("../utils/sqlUtil");
/**
 * Created by eason on 5/30/16.
 */
exports.addAdvice = function (adviceItem, callback) {
    mysqlClient.query({
        sql     : "INSERT INTO advice VALUES(:id, :advice)",
        params  : adviceItem
    }, function (err, rows) {
        if (err) {
            return callback(ServerError(), null);
        }

        callback(null, null);
    });
};
var mysqlClient = require("../utils/sqlUtil");
/**
 * Created by eason on 5/31/16.
 */
exports.addMessage = function (messageItem, callback) {
    mysqlClient.query({
        sql     : "INSERT INTO message VALUE(:uid, :message, :date, :category)",
        params  : messageItem
    }, function (err, rows) {
        if (err) {
            return callback(ServerError(), null);
        }

        callback(null, null);
    });
};

exports.findMessage = function (messageItem, callback) {
    mysqlClient.query({
        sql     : "SELECT * FROM message WHERE uid = :uid and date > :date",
        params  : messageItem
    }, function (err, rows) {
        if (err) {
            return callback(ServerError(), null);
        }

        callback(null, rows);
    });
};
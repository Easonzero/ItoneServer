var mysqlClient = require("../utils/sqlUtil");
/**
 * Created by eason on 5/31/16.
 */
exports.addMessage = function (messageItem, callback) {
    mysqlClient.query({
        sql     : "INSERT INTO message VALUE(:uid, :message, :date, :category, :receiver, :recCategory)",
        params  : messageItem
    }, function (err, rows) {
        if (err) {
            return callback(DBError(), null);
        }

        callback(null, null);
    });
};

exports.findMessage = function (messageItem, callback) {
    mysqlClient.query({
        sql     : "SELECT * FROM message WHERE recCategory = :recCategory and receiver = :receiver and date > :date",
        params  : messageItem
    }, function (err, rows) {
        if (err) {
            return callback(DBError(), null);
        }

        callback(null, rows);
    });
};

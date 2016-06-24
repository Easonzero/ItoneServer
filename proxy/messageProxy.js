var mysqlClient = require("../utils/sqlUtil");
/**
 * Created by eason on 5/31/16.
 */
exports.addMessage = function (messageItem, callback) {
    mysqlClient.query({
        sql     : "INSERT INTO message VALUE(0,:uid, :message, :date, :category,:picUrl)",
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
        sql     : "SELECT m.id,u.userName as uname,m.message,m.date,m.category,u.picture as picUrl " +
        "FROM message as m join user as u on m.uid = u.id " +
        "WHERE u.Class = :Class and u.university = :university and m.date > :date",
        params  : messageItem
    }, function (err, rows) {
        if (err) {
            return callback(DBError(), null);
        }

        callback(null, rows);
    });
};

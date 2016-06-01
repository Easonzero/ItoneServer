var mysqlClient = require("../utils/sqlUtil");
/**
 * Created by eason on 6/1/16.
 */
exports.addHomework = function (homeworkItem, callback) {
    mysqlClient.query({
        sql     : "INSERT INTO homework VALUE(:uid, :message, :sdate, :fdate, :courseNo,:picture)",
        params  : homeworkItem
    }, function (err, rows) {
        if (err) {
            return callback(ServerError(), null);
        }

        callback(null, null);
    });
};

exports.findHomework = function (homeworkItem, callback) {
    mysqlClient.query({
        sql     : "SELECT * FROM message " +
        "WHERE courseNo = :courseNo and date > :sdate and date < fdate",
        params  : homeworkItem
    }, function (err, rows) {
        if (err) {
            return callback(ServerError(), null);
        }

        callback(null, rows);
    });
};
var mysqlClient = require("../utils/sqlUtil");
/**
 * Created by eason on 6/1/16.
 */
exports.addHomework = function (homeworkItem, callback) {
    mysqlClient.query({
        sql     : "INSERT INTO homework VALUE(0,:uid, :message, :sdate, :fdate, :courseNo,:picUrl)",
        params  : homeworkItem
    }, function (err, rows) {
        if (err) {
            return callback(DBError(), null);
        }

        callback(null, null);
    });
};

exports.findHomework = function (homeworkItem, callback) {
    mysqlClient.query({
        sql     : "SELECT h.id,u.userName as uname,h.message,h.sdate,h.fdate,c.name,c.is,h.picUrl,c.name as course " +
        "FROM homework as h join user as u on h.uid = u.id join course as c on h.courseNo = c.id " +
        "WHERE u.class = :class and u.university = :university and sdate < :date and fdate > :date",
        params  : homeworkItem
    }, function (err, rows) {
        if (err) {
            return callback(DBError(),null);
        }

        callback(null, rows);
    });
};

var mysqlClient = require("../utils/sqlUtil");
/**
 * Created by eason on 5/30/16.
 */
exports.findBookByName = function (findItem, callback) {
    mysqlClient.query({
        sql     : "SELECT b.id,b.bookName,b.category,b.subject,b.occupation,b.fromUniversity,b.count," +
                "b.downloadNumber,u.userName as uploader,b.picture " +
                "FROM books as b join user as u on b.uid = u.id " +
                "WHERE b.bookName LIKE :bookName AND b.fromUniversity = :fromUniversity",
        params  : findItem
    }, function (err, rows) {
        if (err) {
            return callback(err, null);
        }

        callback(null, rows);
    });
};

exports.findBookBySubject = function (findItem, callback) {
    mysqlClient.query({
        sql     : "SELECT b.id,b.bookName,b.category,b.subject,b.occupation,b.fromUniversity,b.count," +
                "b.downloadNumber,u.userName as uploader,b.pic," +
                "FROM books as b join user as u on b.uid = u.id " +
                "WHERE b.subject = :subject AND b.fromUniversity = :fromUniversity LIMIT :start,10",
        params  : findItem
    }, function (err, rows) {
        if (err) {
            return callback(err, null);
        }

        callback(null, rows);
    });
};

exports.findBookByUploader = function (findItem, callback) {
    mysqlClient.query({
        sql     : "SELECT b.id,b.bookName,b.category,b.subject,b.occupation,b.fromUniversity,b.count," +
                "b.downloadNumber,u.userName as uploader,b.pic," +
                "FROM bookdata as b join userinfo as u on b.uid = u.id WHERE u.id = :uid",
        params  : findItem
    }, function (err, rows) {
        if (err) {
            return callback(err, null);
        }

        callback(null, rows);
    });
};

exports.getBookUrl = function (id, callback) {
    mysqlClient.query({
        sql     : "SELECT url FROM bookdata WHERE id = :id",
        params  : {id:id}
    }, function (err, rows) {
        if (err) {
            return callback(err, null);
        }

        callback(null, rows[0]);
    });
};
var mysqlClient = require("../utils/sqlUtil");
/**
 * Created by eason on 5/30/16.
 */
exports.findBookByName = function (findItem, callback) {
    mysqlClient.query({
        sql     : "SELECT id,bookName,category,subject,occupation,fromUniversity,count,downloadNumber,uploader,pic," +
        "FROM bookdata WHERE bookName LIKE :bookName AND fromUniversity = :fromUniversity",
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
        sql     : "SELECT id,bookName,category,subject,occupation,fromUniversity,count,downloadNumber,uploader,pic," +
        "FROM bookdata WHERE subject = :subject AND fromUniversity = :fromUniversity LIMIT :start,10",
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
        sql     : "SELECT b.id,b.bookName,b.category,b.subject,b.occupation,b.fromUniversity,b.count,b.downloadNumber,u.userName as uploader,b.pic," +
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

        callback(null, rows);
    });
};
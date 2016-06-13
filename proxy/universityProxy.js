var mysqlClient = require("../utils/sqlUtil");
/**
 * Created by eason on 5/31/16.
 */
exports.findAllUniversity = function (callback) {
    mysqlClient.query({
        sql     : "SELECT * FROM university",
        params  : null
    }, function (err, result) {
        if (err||!result) {
            return callback(DBError(), null);
        }

        callback(null, result);
    });
};

exports.findUniversity = function (id, callback) {
    mysqlClient.query({
        sql     : "SELECT * FROM university WHERE id = :id",
        params  : id
    }, function (err, result) {
        if (err||!result) {
            return callback(DBError(), null);
        }

        callback(null, result[0]);
    });
};

exports.findCourseByUniversity = function (fromUniversity, callback) {
    mysqlClient.query({
        sql     : "SELECT * FROM course WHERE fromUniversity = :fromUniversity",
        params  : fromUniversity
    }, function (err, result) {
        if (err||!result) {
            return callback(DBError(), null);
        }

        callback(null, result);
    });
};

exports.findClassByUniversity = function (fromUniversity, callback) {
    mysqlClient.query({
        sql     : "SELECT * FROM class WHERE fromUniversity = :fromUniversity",
        params  : fromUniversity
    }, function (err, result) {
        if (err||!result) {
            return callback(DBError(), null);
        }

        callback(null, result);
    });
};
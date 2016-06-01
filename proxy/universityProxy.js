var mysqlClient = require("../utils/sqlUtil");
/**
 * Created by eason on 5/31/16.
 */
exports.findAllUniversity = function (callback) {
    mysqlClient.query({
        sql     : "SELECT * FROM university",
        params  : null
    }, function (err, result) {
        if (err||result.length===0) {
            return callback(ServerError(), null);
        }

        callback(null, result);
    });
};

exports.findUniversity = function (id, callback) {
    mysqlClient.query({
        sql     : "SELECT * FROM university WHERE id = :id",
        params  : {id:id}
    }, function (err, result) {
        if (err||result.length===0) {
            return callback(ServerError(), null);
        }

        callback(null, result[0]);
    });
};

exports.findCourseByUniversity = function (fromUniversity, callback) {
    mysqlClient.query({
        sql     : "SELECT * FROM course WHERE fromUniversity = :fromUniversity",
        params  : {fromUniversity:fromUniversity}
    }, function (err, result) {
        if (err||result.length===0) {
            return callback(ServerError(), null);
        }

        callback(null, result);
    });
};
var mysqlClient = require("../utils/sqlUtil");
/**
 * Created by eason on 5/31/16.
 */
exports.findAllUniversity = function (callback) {
    mysqlClient.query({
        sql     : "SELECT name FROM university",
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
        sql     : "SELECT name FROM university WHERE id = :id",
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
        sql     : "SELECT id,name FROM course WHERE fromUniversity = :fromUniversity",
        params  : fromUniversity
    }, function (err, result) {
        if (err||!result) {
            return callback(DBError(), null);
        }

        callback(null, result);
    });
};

exports.findClass = function (callback) {
    mysqlClient.query({
        sql     : "SELECT distinct name FROM class",
        params  : null
    }, function (err, result) {
        if (err||!result) {
            return callback(DBError(), null);
        }

        callback(null, result);
    });
};

exports.findClassByFaculty = function (fromFaculty, callback) {
    mysqlClient.query({
        sql     : "SELECT distinct name FROM class WHERE fromFaculty = :fromFaculty",
        params  : fromFaculty
    }, function (err, result) {
        if (err||!result) {
            return callback(DBError(), null);
        }

        callback(null, result);
    });
};

exports.findClassByUniversity = function (fromUniversity, callback) {
    mysqlClient.query({
        sql     : "SELECT name FROM class WHERE fromUniversity = :fromUniversity",
        params  : fromUniversity
    }, function (err, result) {
        if (err||!result) {
            return callback(DBError(), null);
        }

        callback(null, result);
    });
};

exports.findClassByfu = function (params, callback) {
    mysqlClient.query({
        sql     : "SELECT name FROM class WHERE fromUniversity = :fromUniversity and fromFaculty = :fromFaculty",
        params  : params
    }, function (err, result) {
        if (err||!result) {
            return callback(DBError(), null);
        }

        callback(null, result);
    });
};

exports.findFaculty = function (callback) {
    mysqlClient.query({
        sql     : "SELECT distinct fromFaculty as name FROM class",
        params  : null
    }, function (err, result) {
        if (err||!result) {
            return callback(DBError(), null);
        }

        callback(null, result);
    });
};

exports.findFacultyByUniversity = function (fromUniversity, callback) {
    mysqlClient.query({
        sql     : "SELECT distinct fromFaculty as name FROM class WHERE fromUniversity = :fromUniversity",
        params  : fromUniversity
    }, function (err, result) {
        if (err||!result) {
            return callback(DBError(), null);
        }

        callback(null, result);
    });
};
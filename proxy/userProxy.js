var mysqlClient = require("../utils/sqlUtil");
/**
 * Created by eason on 5/31/16.
 */
exports.getUsersByOrder = function (callback) {
    mysqlClient.query({
        sql     : "SELECT top 10 userinfo.userName,userplu.downloadNum,userinfo.url," +
        "FROM userplu join userinfo on userplu.id = userinfo.id order by downloadNum",
        params  : null
    }, function (err, rows) {
        if (err) {
            return callback(new ServerError(), null);
        }
        callback(null, rows);
    });
};

exports.findUserById = function (userId, callback) {
    userId = userId || "";

    if (userId.length === 0) {
        return callback(new InvalidParamError(), null);
    }

    mysqlClient.query({
        sql     : "SELECT * FROM userinfo WHERE id = :id",
        params  : {id:userId}
    }, function (err, rows) {
        if (err) {
            return callback(new ServerError(), null);
        }
        callback(null, rows);
    });
};

exports.getPluInfo = function (userId, callback) {
    userId = userId || "";

    if (userId.length === 0) {
        return callback(new InvalidParamError(), null);
    }

    mysqlClient.query({
        sql     : "SELECT * FROM userplu WHERE id = :id",
        params  : {id:userId}
    }, function (err, rows) {
        if (err) {
            return callback(new ServerError(), null);
        }
        callback(null, rows);
    });
};

exports.login = function (userId, callback) {
    userId = userId || "";

    if (userId.length === 0) {
        return callback(new InvalidParamError(), null);
    }

    mysqlClient.query({
        sql     : "SELECT * FROM userinfo WHERE id = :id and passWords = :passWords",
        params  : {id:userId}
    }, function (err, rows) {
        if (err || !rows) {
            return callback(new ServerError(), null);
        }

        if (rows.length > 0) {
            callback(null, rows[0]);
        } else {
            callback(null, null);
        }
    });
};

exports.create = function(userInfo, callback){
    if (!(userInfo.id && userInfo.passWords)) {
        return callback(new InvalidParamError(), null);
    }

    mysqlClient.query({
        sql     : "INSERT INTO userinfo VALUES(:id, :passWords, :studentNo, :universityNo, :uName)",
        params  : userInfo
    },  function (err, rows) {
        if (err || !rows || rows.affectedRows === 0) {
            console.dir(rows);
            return callback(new ServerError(), null);
        }

        return callback(null, null);
    });
};

exports.modify = function (userInfo,callback) {
    return callback(null,null);
};

exports.checkUserExists = function(userId, callback) {
    if (!userId) {
        return callback(new InvalidParamError(), null);
    }

    mysqlClient.query({
        sql     : "SELECT COUNT(1) as 'count' FROM userinfo WHERE id = :id",
        params  : {id:id}
    }, function (err, rows) {
        if (err || !rows) {
            return callback(new ServerError(), null);
        }

        return callback(null, rows[0].count !== 0);
    });
};
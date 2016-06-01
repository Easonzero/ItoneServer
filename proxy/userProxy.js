var mysqlClient = require("../utils/sqlUtil");
/**
 * Created by eason on 5/31/16.
 */
exports.getUsersByOrder = function (callback) {
    mysqlClient.query({
        sql     : "SELECT top 10 user.userName,SUM(books.downloadNumber) as downloadNum,user.picture " +
                "FROM books join user on books.uid = user.id " +
                "group by user.userName,user.picture order by downloadNum",
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
        sql     : "SELECT * FROM user WHERE id = :id",
        params  : {id:userId}
    }, function (err, rows) {
        if (err) {
            return callback(new ServerError(), null);
        }
        callback(null, rows[0]);
    });
};

exports.getPluInfo = function (userId, callback) {
    userId = userId || "";

    if (userId.length === 0) {
        return callback(new InvalidParamError(), null);
    }

    mysqlClient.query({
        sql     : "SELECT u.id,u.money,u.course,SUM(b.downloadNumber) as downloadNum" +
                "FROM userplus as u join books as b on b.uid = u.id WHERE u.id = :id",
        params  : {id:userId}
    }, function (err, rows) {
        if (err) {
            return callback(new ServerError(), null);
        }
        callback(null, rows[0]);
    });
};

exports.login = function (userId, callback) {
    userId = userId || "";

    if (userId.length === 0) {
        return callback(new InvalidParamError(), null);
    }

    mysqlClient.query({
        sql     : "SELECT * FROM user WHERE id = :id and passWords = :passWords",
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
        sql     : "INSERT INTO user VALUES(:id, :passWords, :studentNo, :universityNo, :uName)",
        params  : userInfo
    },  function (err, rows) {
        if (err || !rows || rows.affectedRows === 0) {
            console.dir(rows);
            return callback(new ServerError(), null);
        }

        return callback(null, null);
    });
};

exports.checkUserExists = function(userId, callback) {
    if (!userId) {
        return callback(new InvalidParamError(), null);
    }

    mysqlClient.query({
        sql     : "SELECT COUNT(1) as 'count' FROM user WHERE id = :id",
        params  : {id:id}
    }, function (err, rows) {
        if (err || !rows) {
            return callback(new ServerError(), null);
        }

        return callback(null, rows[0].count !== 0);
    });
};

exports.getRank = function(downloadNum,identify, callback) {
    if (!downloadNum) {
        return callback(new InvalidParamError(), null);
    }

    mysqlClient.query({
        sql     : "SELECT SUM(count) as 'rank' FROM rank " +
        "WHERE identify = :identify and start < :downloadNum and end > :downloadNum",
        params  : {downloadNum:downloadNum,identify:identify}
    }, function (err, rows) {
        if (err || !rows) {
            return callback(new ServerError(), null);
        }

        return callback(null, rows.count[0]);
    });
};
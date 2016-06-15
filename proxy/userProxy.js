var mysqlClient = require("../utils/sqlUtil");
/**
 * Created by eason on 5/31/16.
 */
exports.getUsersByOrder = function (callback) {
    mysqlClient.query({
        sql     : "SELECT @rownum:=@rownum+1 AS rank,user.userName,userplus.downloadNum,user.university,user.picture " +
                "FROM userplus join user on userplus.id = user.id " +
                "order by userplus.downloadNum limit 0, 10",
        params  : null
    }, function (err, rows) {
        if (err) {
            return callback(new DBError(), null);
        }
        callback(null, rows);
    });
};

exports.findUserById = function (userInfo, callback) {
    if (userId.length === 0) {
        return callback(new InvalidParamError(), null);
    }

    mysqlClient.query({
        sql     : "SELECT * FROM user WHERE id = :id",
        params  : userInfo
    }, function (err, rows) {
        if (err || !rows) {
            return callback(new ServerError(), null);
        }
        callback(null, rows[0]);
    });
};

exports.getPluInfo = function (userInfo, callback) {
    mysqlClient.query({
        sql     : 'SELECT id,money,downloadNum ' +
        'FROM userplus WHERE id = :id',
        params  : userInfo
    }, function (err, rows) {
        if (err || !rows) {
            return callback(new ServerError(), null);
        }
        callback(null, rows[0]);
    });
};

exports.login = function (userInfo, callback) {
    userInfo.id = userInfo.id || "";
    userInfo.passWords = userInfo.passWords || "";

    if (userInfo.id === 0||userInfo.passWords === 0) {
        return callback(new InvalidParamError(), null);
    }

    mysqlClient.query({
        sql     : "SELECT * FROM user WHERE id = :id and passWords = :passWords",
        params  : userInfo
    }, function (err, rows) {
        if (err || !rows) {
            return callback(new ServerError(), null);
        }
        callback(null, rows[0]);
    });
};

exports.create = function(userInfo, callback){
    if (!(userInfo.id && userInfo.passWords)) {
        return callback(new InvalidParamError(), null);
    }

    mysqlClient.processTransaction((connection)=>{
      connection.beginTransaction((err)=>{
            if (err) { throw err; }
            connection.query('INSERT INTO user VALUES(:id, :passWords, :userName, :university, :faculty, :grade, :class, :picture)',
              userInfo, (err, result)=>{
              if (err) {
                  connection.rollback(function() {
                      throw DBError();
                  });
              }

              connection.query('INSERT INTO userPlus VALUES(:id,0,0)', {id:userInfo.id}, (err, result)=>{
                  if (err) {
                      connection.rollback(function() {
                          throw DBError();
                      });
                  }
                  connection.commit((err)=>{
                      if (err) {
                          connection.rollback(function() {
                              throw DBError();
                          });
                      }
                      if (err || result.affectedRows === 0) {
                          return callback(new DBError(), null);
                      }
                      return callback(null, null);
                  });
            });
          });
    });
  });
};

exports.checkUserExists = function(userInfo, callback) {
    if (!userInfo) {
        return callback(new InvalidParamError(), null);
    }

    mysqlClient.query({
        sql     : "SELECT * FROM user WHERE id = :id",
        params  : userInfo
    }, function (err, rows) {
        if (err || !rows) {
            return callback(new DBError(), null);
        }

        return callback(null, rows.length!==0);
    });
};

exports.getRank = function(downloadNum, callback) {
    mysqlClient.query({
        sql     : "SELECT SUM(count) as 'rank' FROM rank " +
        "WHERE end > :downloadNum",
        params  : downloadNum
    }, function (err, rows) {
        if (err || !rows) {
            return callback(new DBError(), null);
        }

        return callback(null, rows[0]);
    });
};

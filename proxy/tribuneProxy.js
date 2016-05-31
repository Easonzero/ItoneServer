var mysqlClient = require("../utils/sqlUtil");
/**
 * Created by eason on 5/31/16.
 */
exports.findQuestions = function (questionItem,callback) {
    mysqlClient.query({
        sql     : "SELECT * FROM tribune LIMIT :start,:limit",
        params  : questionItem
    }, function (err, rows) {
        if (err) {
            return callback(new ServerError(), null);
        }
        callback(null, rows);
    });
};

exports.findIssue = function (QA,callback) {
    mysqlClient.query({
        sql     : "SELECT * FROM tribune WHERE id = :QA",
        params  : {QA:QA}
    }, function (err, rows) {
        if (err) {
            return callback(new ServerError(), null);
        }
        callback(null, rows);
    });
};

exports.createIssue = function (issueItem,callback) {
    mysqlClient.query({
        sql     : "INSERT INTO tribune VALUE(:QA, :Qid, :id, :message)",
        params  : null
    }, function (err, rows) {
        if (err) {
            return callback(new ServerError(), null);
        }
        callback(null, null);
    });
};
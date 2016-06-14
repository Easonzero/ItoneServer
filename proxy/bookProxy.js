var mysqlClient = require("../utils/sqlUtil");
/**
 * Created by eason on 5/30/16.
 */
exports.findBookByName = function (findItem, callback) {
    findItem.bookName = '%' + findItem.bookName + '%';

    mysqlClient.query({
        sql     : "SELECT b.id,b.bookName,b.category,b.subject,b.occupation,b.fromUniversity,b.count," +
                "b.downloadNumber,u.userName as uploader,b.uid,b.money,b.pic " +
                "FROM books as b join user as u on b.uid = u.id " +
                "WHERE b.bookName LIKE :bookName AND b.fromUniversity = :fromUniversity",
        params  : findItem
    }, function (err, rows) {
        if (err) {
            return callback(new DBError(), null);
        }

        callback(null, rows);
    });
};

exports.findBookBySubject = function (findItem, callback) {
    let start = parseInt(findItem.start);
    let end = start + 10;
    let sql = 'SELECT b.id,b.bookName,b.category,b.subject,b.occupation,b.fromUniversity,b.count,' +
                'b.downloadNumber,u.userName as uploader,b.uid,b.money,b.pic ' +
                'FROM books as b join user as u on b.uid = u.id ';
    if(findItem.subject == '*') sql += 'WHERE b.fromUniversity = :fromUniversity LIMIT '+start+','+end;
    else sql += 'WHERE b.subject = :subject AND b.fromUniversity = :fromUniversity LIMIT '+start+','+end;
    mysqlClient.query({
        sql     : sql,
        params  : findItem
    }, function (err, rows) {
        if (err) {
            console.log(err);
            return callback(new DBError(), null);
        }

        callback(null, rows);
    });
};

exports.findBookByUploader = function (findItem, callback) {
    mysqlClient.query({
        sql     : "SELECT b.id,b.bookName,b.category,b.subject,b.occupation,b.fromUniversity,b.count," +
                "b.downloadNumber,u.userName as uploader,b.uid,b.money,b.money,b.pic " +
                "FROM books as b join user as u on b.uid = u.id WHERE u.id = :uid",
        params  : findItem
    }, function (err, rows) {
        if (err) {
            return callback(new DBError(), null);
        }

        callback(null, rows);
    });
};

exports.checkMoney = function(downloadItem,callback){
    mysqlClient.query({
        sql     : "SELECT * FROM books as b join userplus as u on u.id = :uid " +
        "WHERE b.id = :id and b.money <= u.money",
        params  : downloadItem
    }, function (err, rows) {
        if (err) {
            return callback(err, null);
        }

        callback(null, rows.length!==0);
    });
};

exports.getUrl = function (downloadItem,callback) {
    mysqlClient.query({
        sql     : 'SELECT url FROM books WHERE id = :id',
        params  : downloadItem
    }, function (err, rows) {
        if (err) {
            return callback(err, null);
        }

        callback(null, rows[0]);
    });
}

exports.update = function (downloadItem, callback) {
    mysqlClient.query({
        sql     : 'UPDATE books as b join userplus as u on b.uid = u.id ' +
                  'join userplus as mu on mu.id = :uid ' +
                  'SET b.downloadNumber = b.downloadNumber + 1,u.downloadNum = u.downloadNum + 1,' +
                  'mu.money = mu.money - b.money,u.money = u.money + 1 ' +
                  'WHERE b.id = :id',
        params  : downloadItem
    }, function (err, rows) {
        if (err) {
            return callback(err, null);
        }

        callback(null, null);
    });
};

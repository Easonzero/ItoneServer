var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host:'localhost',
  user:'root',
  password:'123',
  database:'itone'
});

var bookdao = {
  search:function(info){
    var sql = 'SELECT * FROM bookdata WHERE bookName LIKE ? AND fromUniversity = ?';
    var parms = ['%'+info.bookName+'%',info.fromUniversity];
    sql = mysql.format(sql, parms);
    pool.getConnection(function(err, connection) {
      connection.query( sql, function(err, rows) {
        connection.release();
        if(err) console.log(err);
        return rows;
      });
    });
  },
  booklist:function(info){
    var sql = 'SELECT * FROM bookdata WHERE subject = ? AND fromUniversity = ?';
    var parms = [info.subject,info.fromUniversity];
    sql = mysql.format(sql, parms);
    pool.getConnection(function(err, connection) {
      connection.query( sql, function(err, rows) {
        connection.release();
        if(err) console.log(err);
        return rows;
      });
    });
  }
}

module.exports = bookdao;

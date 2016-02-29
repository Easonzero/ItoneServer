var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host:'localhost',
  user:'root',
  password:'123',
  database:'itone'
});

var bookdao = {
  search:function(info,func){
    var sql = 'SELECT bookName, subject,occupation,fromUniversity,downloadNmuber FROM bookdata WHERE bookName LIKE ? AND fromUniversity = ?';
    var parms = ['%'+info.bookName+'%',info.fromUniversity];
    sql = mysql.format(sql, parms);
    pool.getConnection(function(err, connection) {
      connection.query( sql, function(err, rows) {
        connection.release();
        if(err) console.log(err);
        func(rows);
      });
    });
  },
  booklist:function(info,func){
    var sql = 'SELECT bookName, subject,occupation,fromUniversity,downloadNumber FROM bookdata WHERE subject = ? AND fromUniversity = ? LIMIT '+info.count+',10';
    var parms = [info.subject,info.fromUniversity];
    sql = mysql.format(sql, parms);
    pool.getConnection(function(err, connection) {
      connection.query( sql, function(err, rows) {
        connection.release();
        if(err) console.log(err);
        func(rows);
      });
    });
  },
  geturl:function(id,func){
    var sql = 'SELECT url FROM bookdata WHERE id = ?';
    var parms = [id];
    sql = mysql.format(sql, parms);
    pool.getConnection(function(err, connection) {
      connection.query( sql, function(err, rows) {
        connection.release();
        if(err) console.log(err);
        func(rows[0]);
      });
    });
  }
}

module.exports = bookdao;

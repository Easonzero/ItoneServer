var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host:'ap-cdbr-azure-east-c.cloudapp.net',
  user:'bebfb06c93e7ea',
  password:'758b09ef',
  database:'itone'
});

var userdao = {
  check:function(id,func){
    var sql = 'SELECT * FROM userinfo WHERE id = ?';
    var parms = [id];
    sql = mysql.format(sql, parms);
    pool.getConnection(function(err, connection) {
      connection.query( sql, function(err, rows) {
        connection.release();
        if(err) console.log(err);
        func(!rows.length == 0)
      });
    });
  },
  add:function(info){
    var sql = 'INSERT INTO userinfo VALUE( ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    var parms = [info.id,info.passWords,info.userName,info.province,info.city,info.university,info.faculty,info.occupation,info.picture];
    sql = mysql.format(sql, parms);
    pool.getConnection(function(err, connection) {
      connection.query( sql, function(err, rows) {
        connection.release();
        if(err) console.log(err);
        return rows;
      });
    });
  },
  login:function(info,func){
    var sql = 'SELECT * FROM userinfo WHERE id = ? AND passWords = ?';
    var parms = [info.id,info.passWords];
    sql = mysql.format(sql, parms);
    pool.getConnection(function(err, connection) {
      connection.query( sql, function(err, rows) {
        connection.release();
        if(err) console.log(err);
        func(rows);
      });
    });
  }
}

module.exports = userdao;

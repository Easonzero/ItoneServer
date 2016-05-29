var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 10,
  port:3388,
  user:'root',
  password:'wilabim803',
  database:'Test'
});

var advicedao = {
  send:function(advice){
    var sql = 'INSERT INTO advice VALUE(?, ?)';
    var parms = [advice.id,advice.advice];
    sql = mysql.format(sql, parms);
    pool.getConnection(function(err, connection) {
      connection.query( sql, function(err, rows) {
        connection.release();
        if(err) console.log(err);
        func(!rows.length == 0);
      });
    });
  }
}

var bookdao = {
  search:function(info,func){
    var sql = 'SELECT bookName, category, subject,occupation,fromUniversity,downloadNmuber,uid FROM bookdata WHERE bookName LIKE ? AND fromUniversity = ?';
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
    var sql = 'SELECT bookName, category, subject,occupation,fromUniversity,downloadNumber,uid FROM bookdata WHERE subject = ? AND fromUniversity = ? LIMIT '+info.start+',10';
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
  },
  booksbyuser:function(info,func){
    var sql = 'SELECT bookName, category, subject,occupation,fromUniversity,downloadNumber,uid FROM bookdata WHERE uid = ? and category = ?';
    var parms = [info.uid,info.category];
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

var messagedao = {
  send:function(message){
    var sql = 'INSERT INTO message VALUE(?, ?, ?, ?)';
    var parms = [message.id,message.date,message.category,message.message];
    sql = mysql.format(sql, parms);
    pool.getConnection(function(err, connection) {
      connection.query( sql, function(err, rows) {
        connection.release();
        if(err) console.log(err);
        func(!rows.length == 0)
      });
    });
  },
  getMessage:function(message){
    var sql = 'SELECT * FROM message WHERE id = ? and date = ? and category = ?';
    var parms = [message.id,message.date,message.category];
    sql = mysql.format(sql, parms);
    pool.getConnection(function(err, connection) {
      connection.query( sql, function(err, rows) {
        connection.release();
        if(err) console.log(err);
        func(rows)
      });
    });
  }
}

var qadao = {
  createQ:function(Q){
    var sql = 'INSERT INTO f2fq VALUE(?, ?, ?, ?)';
    var parms = [Q.Qid,Q.id,Q.message];
    sql = mysql.format(sql, parms);
    pool.getConnection(function(err, connection) {
      connection.query( sql, function(err, rows) {
        connection.release();
        if(err) console.log(err);
        func(!rows.length == 0)
      });
    });
  },
  addA:function(A){
    var sql = 'INSERT INTO f2fa VALUE(?, ?, ?, ?)';
    var parms = [A.Qid,A.Cid,A.Rid,A.answer];
    sql = mysql.format(sql, parms);
    pool.getConnection(function(err, connection) {
      connection.query( sql, function(err, rows) {
        connection.release();
        if(err) console.log(err);
        func(!rows.length == 0)
      });
    });
  },
  getQ_A:function(id){
    var sql = 'SELECT * FROM f2fq WHERE Qid = ?';
    var parms = [id];
    sql = mysql.format(sql, parms);
    pool.getConnection(function(err, connection) {
      connection.query( sql, function(err, rows) {
        connection.release();
        if(err) console.log(err);
        func(rows)
      });
    });
  },
  getQ:function(info){
    var sql = 'SELECT * FROM f2fq LIMIT ?,?';
    var parms = [info.start,info.limit];
    sql = mysql.format(sql, parms);
    pool.getConnection(function(err, connection) {
      connection.query( sql, function(err, rows) {
        connection.release();
        if(err) console.log(err);
        func(rows)
      });
    });
  },
  getA:function(info){
    var sql = 'SELECT * FROM f2fa WHERE Qid = ? and Cid = ?';
    var parms = [info.Qid,info.Cid];
    sql = mysql.format(sql, parms);
    pool.getConnection(function(err, connection) {
      connection.query( sql, function(err, rows) {
        connection.release();
        if(err) console.log(err);
        func(rows)
      });
    });
  }
}

var userdao = {
  check:function(id,isDel,func){
    var sql = isDel?'DELETE':'SELECT *' + 'FROM userinfo WHERE id = ?';
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
    var sql = 'INSERT INTO userinfo VALUE(?, ?, ?, ?, ?, ?)';
    var parms = [info.id,info.passWords,info.userName,info.university,info.faculty,info.picture];
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
  },
  userplu:function(id,func){
    var sql = 'SELECT * FROM userplu WHERE id = ?';
    var parms = [id];
    sql = mysql.format(sql,parms);
    pool.getConnection(function(err,connection) {
      connectino.query(sql, function(err,rows) {
        connection.release();
        if(err) console.log(err);
        func(rows);
      })
    })
  },
  byorder:function(func){
    var sql = 'SELECT userName,downloadNum,url FROM userplu order by downloadNum';
    pool.getConnection(function(err,connection) {
      connectino.query(sql, function(err,rows) {
        connection.release();
        if(err) console.log(err);
        func(rows);
      })
    })
  }
}

module.exports.advicedao = advicedao;
module.exports.bookdao = bookdao;
module.exports.messagedao = messagedao;
module.exports.qadao = qadao;
module.exports.userdao = userdao;

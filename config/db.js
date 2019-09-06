// module.exports = {
//   mysql_dev: {
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'mysql',
//     connectionLimit: 10,
//     supportBigNumbers: true
//   }
// }
var mysql = require('mysql')
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'mysql',
  port: 3306
});

var query = function(sql, options, callback) {
  pool.getConnection(function(err, connection) {
    if (err) {
      callback(err, null, null);
    } else {
      connection.query(sql, options, function(err, results, fields) {
        // 释放连接
        connection.release();
        callback(err, results, fields)
      })
    }
  })
};

module.exports = query
// // mysql CRUD
// var sqlclient = module.exports;

// var _pool = null;

// var NND = {};

// /*
//  * Innit sql connection pool
//  * @param {Object} app The app for the server.
//  */
// NND.init = function(){
// 	if(!_pool)
// 		_pool = require('./dao-pool').createMysqlPool();
// };

// /**
//  * Excute sql statement
//  * @param {String} sql Statement The sql need to excute.
//  * @param {Object} args The args for the sql.
//  * @param {fuction} callback Callback function.
//  * 
//  */
// NND.query = function(sql, args, callback){
// 	_pool.acquire(function(err, client) {
// 		if (!!err) {
// 			console.error('[sqlqueryErr] '+err.stack);
// 			return;
// 		}
// 		client.query(sql, args, function(err, res) {
// 			_pool.release(client);
// 			callback.apply(null, [err, res]);
// 		});
// 	});
// };

// /**
//  * Close connection pool.
//  */
// NND.shutdown = function(){
// 	_pool.destroyAllNow();
// };

// /**
//  * init database
//  */
// sqlclient.init = function() {
// 	if (!!_pool){
// 		return sqlclient;
// 	} else {
// 		NND.init();
// 		sqlclient.insert = NND.query;
// 		sqlclient.update = NND.query;
// 		//sqlclient.delete = NND.query;
// 		sqlclient.query = NND.query;
//     return sqlclient;
// 	}
// };

// /**
//  * shutdown database
//  */
// sqlclient.shutdown = function() {
// 	NND.shutdown();
// };
var mysql = require('mysql');

console.time("t");
var pool = mysql.createPool({
    connectionLimit: 10,
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "pomelo",
    charset: 'UTF8MB4_GENERAL_CI'
});
mysql.query =  function(sql, args, cb){
	pool.getConnection(function(err, connection) {
		// 使用连接
	connection.query( sql, args, function(err, res) {
			
		// 连接使用完成后释放连接
		connection.release();
		cb(err, res);
			// 不要在这里使用connection进行查询，因为连接已经被归还到连接池了
		});
	});
}  
module.exports = mysql;
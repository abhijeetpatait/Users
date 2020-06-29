let mysql = require('mysql2');
let config = require('../../config');

let connection = mysql.createPool({
    host: config.mysql.host,
    user: config.mysql.username,
    password: config.mysql.password,
    database: 'node_db',
    multipleStatements: true

});
  
module.exports = connection.promise();
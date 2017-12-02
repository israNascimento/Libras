var mysql = require('mysql');

function createDBConnection() {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'libras'
        });
    }
    
    module.exports = function() {
        return createDBConnection;
    }

const mysql = require('mysql')
const util = require('util')

var pool = mysql.createPool({
    connectionLimit: 100,
    host: '18.209.63.46',
    user: 'root',
    password: 'root',
    database: 'fa_discord'
})

pool.getConnection((err, connection) => {
    if(err) {
        console.log(err)
    }

    if(connection){
        connection.release()
        return
    }
})


pool.query = util.promisify(pool.query) // Magic happens here.

module.exports = pool;
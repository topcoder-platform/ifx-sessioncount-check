/**
 * The application entry point
 */

global.Promise = require('bluebird')
const config = require('config')
const logger = require('./common/logger')
const { getInformixConnection, prepare, wrapTransaction } = require('./common/helper')

console.log('DISABLE_LOGGING :: ' + config.DISABLE_LOGGING)
console.log('DISABLE_LOGGING :: ' + typeof (config.DISABLE_LOGGING))
logger.info(`Verifying the database`)

//let connection
/*
let sql = `select count(*)::int as count from ${table}`
*/

async function play() {
//let sql = `select sysdatabases.name database, syssessions.hostname, count(*) sessions  from syslocks, sysdatabases , outer syssessions where syslocks.tabname = "sysdatabases" and syslocks.rowidlk = sysdatabases.rowid and syslocks.owner = syssessions.sid group by sysdatabases.name, syssessions.hostname order by count(*) desc`
let sql = config.get('INFORMIX.sqlquery')

const connectionString = 'SERVER=' + config.get('INFORMIX.SERVER') +
                           ';DATABASE=' + config.get('INFORMIX.DATABASE') +
                           ';HOST=' + config.get('INFORMIX.HOST') +
                           ';Protocol=' + config.get('INFORMIX.PROTOCOL') +
                           ';SERVICE=' + config.get('INFORMIX.PORT') +
                           ';DB_LOCALE=' + config.get('INFORMIX.DB_LOCALE') +
                           ';UID=' + config.get('INFORMIX.USER') +
                           ';PWD=' + config.get('INFORMIX.PASSWORD')

try {
const connection = await getInformixConnection()
//const result = connection.queryAsync(sql)
const queryStmt = await prepare(connection, sql)
const queryResult = Promise.promisifyAll((await queryStmt.executeAsync()))
const result = await queryResult.fetchAllAsync();
//console.log("Number of Rows : " , result.length)
/*for(let i = 0; i < result.length; i++){
   sessioncount = result[i].sessions == null ? result[i].sessions:result[i].sessions.trim() ;
}*/
console.log(result);
connection.closeAsync();
} catch(e) {console.log('Error', e )}
}
play()

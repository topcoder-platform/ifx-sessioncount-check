/**
 * The default configuration file.
 */

module.exports = {
  DISABLE_LOGGING: false, // If true, logging will be disabled
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',

  // informix database configuration
  INFORMIX: {
    SERVER: process.env.IFX_SERVER || 'informixoltp_tcp',
    DATABASE: process.env.IFX_DATABASE || 'sysmaster',
    HOST: process.env.INFORMIX_HOST || 'localhost',
    PROTOCOL: process.env.IFX_PROTOCOL || 'onsoctcp',
    PORT: process.env.IFX_PORT || '2020',
    DB_LOCALE: process.env.IFX_DB_LOCALE || 'en_US.utf8',
    USER: process.env.IFX_USER || 'user',
    PASSWORD: process.env.IFX_PASSWORD || 'password',
    POOL_MAX_SIZE: parseInt(process.env.IFX_POOL_MAX_SIZE || '10'),
    sqlquery: process.env.sqlquery || 'select * from dual'
  }
}

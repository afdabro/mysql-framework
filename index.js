'use strict';

const Classes = Object.create(null);

/**
* Execute list of SQL database commands asynchronously.
* @param {SqlConnectionManager} sqlConnectionManager A SQL connection manager
* @param {string[]} sqlCommands array of SQL commands to execute.
* @return {Promise} returns an array containing the results of each command.
* @public
*/
exports.executeCommandsAsync = function executeCommandsAsync(
    sqlConnectionManager, sqlCommands) {
    const SqlCommandWorker = loadClass('SqlCommandWorker');
    const sqlWorker = new SqlCommandWorker();
    return sqlConnectionManager.executeAsync(
        (connection) => sqlWorker.queryAsync(
        connection, sqlCommands));
};

/**
* Query SQL database asynchronously.
* @param {SqlConnectionManager} sqlConnectionManager A SQL connection manager
* @param {string} query to execute.
* @return {Promise} A promise which will contain the SQL query result.
* @public
*/
exports.queryAsync = function queryAsync(sqlConnectionManager, query) {
    const SqlQueryWorker = loadClass('SqlQueryWorker');
    const sqlWorker = new SqlQueryWorker();
    return sqlConnectionManager.executeAsync(
        (connection) => sqlWorker.queryAsync(
        connection, query));
};

/**
* Initializes a new instance of SqlConnectionManager.
* @param {object|string} config Connection Configuration
* @see {@link https://github.com/mysqljs/mysql#connection-options}
* @return {SqlConnectionManager} A MySQL connection manager
* @public
*/
exports.createSqlConnectionManager = function createSqlConnectionManager(
    config) {
    const SqlConnectionFactory = loadClass('SqlConnectionFactory');
    const SqlConnectionManager = loadClass('SqlConnectionManager');
    const connectionFactory = new SqlConnectionFactory(config);
    return new SqlConnectionManager(connectionFactory);
};

/**
 * Load the given class.
 * @param {string} className Name of class to default
 * @return {function|object} Class constructor or exports
 * @private
 * Source: https://github.com/mysqljs/mysql/blob/master/index.js
 */
function loadClass(className) {
    const Class = Classes[className];

    if (Class !== undefined) {
      return Class;
    }

    // This uses a switch for static require analysis
    switch (className) {
      case 'SqlConnectionFactory':
        Class = require('./lib/SqlConnectionFactory');
        break;
    case 'SqlConnectionManager':
        Class = require('./lib/SqlConnectionManager');
        break;
    case 'SqlQueryWorker':
        Class = require('./lib/SqlQueryWorker');
        break;
    case 'SqlCommandWorker':
        Class = require('./lib/SqlCommandWorker');
        break;
      default:
        throw new Error('Cannot find class \'' + className + '\'');
    }

    // Store to prevent invoking require()
    Classes[className] = Class;

    return Class;
  }

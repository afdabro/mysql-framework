'use strict';
const Promise = require('promise');

/** Class representing a sql query worker. */
module.exports = class SqlQueryWorker {
/**
* Query SQL database asynchronously
* @param {Connection} connection - The connection
* @param {string} sqlQuery - The SQL query to execute.
* @return {Promise} A promise which will contain the SQL query result.
*/
queryAsync(connection, sqlQuery) {
    return new Promise((resolve, reject) => {
        connection.query(sqlQuery, (error, results) => {
            if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }
};

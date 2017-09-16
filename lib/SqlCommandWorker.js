'use strict';
const Promise = require('promise');

/** Class representing a sql command worker. */
module.exports = class SqlCommandWorker {
/**
* Execute SQL database transaction commands asynchronously
* @param {IConnection} connection - The connection
* @param {string[]} sqlCommands array of SQL commands to execute.
* @return {Promise} returns an array containing the results of each command.
* @public
*/
executeCommandsAsync(connection, sqlCommands) {
    return new Promise((resolve, reject) => {
        connection.beginTransaction((err) => {
        if (err) {
            reject(err);
        }

        const sqlCommandListPromise = this._SqlCommandListPromise(
            connection, sqlCommands);
        sqlCommandListPromise.then((commandResultsArray) => {
            connection.commit((err) => {
                    if (err) {
                        return connection.rollback(() => {
                        reject(err);
                        });
                    }
                    resolve(commandResultsArray);
                    });
                })
                .catch((reason) => reject(reason));
            });
        });
    }

/**
* Internal function
* @param {Connection} connection - The connection
* @param {string[]} sqlCommands list of SQL commands to execute.
* @return {Promise} returns an array containing the results of each command.
* @private
*/
_SqlCommandListPromise(connection, sqlCommands) {
    return new Promise((resolve, reject) => {
        let iteration = 0;
        let commandResultsArray = [];
        let prom = null;
        for (let sqlCommand of sqlCommands) {
            iteration++;
            // first iteration
            if (prom === null) {
                prom = this._SqlCommandPromise(
                    connection, sqlCommand, iteration);
            } else {
                prom = prom.then((commandObj) => {
                    commandResultsArray.push(commandObj);
                    return this._SqlCommandPromise(
                        connection, sqlCommand, iteration);
                })
                .catch((reason) => reject(reason));
            }
        }
        prom.then((commandObj) => {
            commandResultsArray.push(commandObj);
            resolve(commandResultsArray);
        })
        .catch((reason) => reject(reason));
        });
    }

/**
* Internal function
* @param {Connection} connection - The connection
* @param {string[]} sqlCommand SQL command to execute.
* @param {number} id
* @return {Promise} object containing information about the command's results.
* @private
*/
_SqlCommandPromise(connection, sqlCommand, id) {
    return new Promise((resolve, reject) => {
        connection.query(sqlCommand, (error, results) => {
            if (error) {
                return connection.rollback(() => {
                    reject(error);
                });
            }
            let commandObj = {};
            // TODO: Create CommandResult type
            commandObj['Command' + id] = {
                'affectedRows': results.affectedRows,
                'changedRows': results.changedRows,
                'insertedId': results.insertId,
            };
            resolve(commandObj);
          });
        });
    }
};

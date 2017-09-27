'use strict';
const Promise = require('promise');

/** Class representing a sql connection manager. */
module.exports = class SqlConnectionManager {
/**
* Initializes a new instance of SqlConnectionManager.
* @param {SqlConnectionFactory} connectionFactory SQL connection factory
*/
constructor(connectionFactory) {
    this._connectionFactory = connectionFactory;
}

/**
* Manages SQL connection asynchronously while executing a SQL statement.
* @param {Promise} sqlFuncPromise - The SQL promise to execute.
* @return {Promise} A promise which will contain the SQL statement result.
* @public
*/
executeAsync(sqlFuncPromise) {
    const connection = this._connectionFactory.createInstance();
    return new Promise((resolve, reject) => {
        this._OpenConnectionPromise(connection)
            .then(() => {
                sqlFuncPromise(connection)
                .then((result) => {
                    this._CloseConnectionPromise(connection)
                    .then(() => {
                        resolve(result);
                    })
                    .catch((reason) => {
                        reject(reason);
                    });
                })
                .catch((reason) => {
                    // fire and forget close connection because query failed.
                    this._CloseConnectionPromise(connection);
                    reject(reason);
                });
            })
            .catch((reason) => {
                reject(reason);
            });
        });
    }

/**
 * Internal function for opening a connection.
 * @param {Connection} connection
 * @return {Promise}
 * @private
 */
_OpenConnectionPromise(connection) {
    return new Promise((resolve, reject) => {
        connection.connect((connectionError) => {
            if (connectionError) {
                reject(connectionError);
            }
            resolve();
        });
    });
}

/**
 * Internal function for closing a connection.
 * @param {Connection} connection
 * @return {Promise}
 * @private
 */
_CloseConnectionPromise(connection) {
    return new Promise((resolve, reject) => {
        connection.end((connectionError) => {
            if (connectionError) {
                reject(connectionError);
            }
            resolve();
            });
        });
    }
};

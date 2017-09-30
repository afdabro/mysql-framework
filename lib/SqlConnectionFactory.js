'use strict';
const mysql = require('mysql');

/** Class representing a sql connection factory. */
module.exports = class SqlConnectionFactory {
    /**
    * Initializes a new instance of SqlConnectionFactory.
    * @param {ConnectionConfig} options default connection options
    * @see {@link https://github.com/mysqljs/mysql#connection-options}
    */
    constructor(options) {
        this.defaultConnectionOptions = options;
    }

    /**
    * Creates Connection by merging default options with argument options.
    * @param {ConnectionConfig} options - Custom connection options.
    * @see {@link https://github.com/mysqljs/mysql#connection-options}
    * @return {Connection} A connection instance.
    */
    createInstance(options) {
        const mergedOptions = Object.assign({},
            this.defaultConnectionOptions, options);
        return mysql.createConnection(mergedOptions);
    }
};

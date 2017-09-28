# MySql Framework
[![Build Status](https://travis-ci.org/afdabro/mysql-framework.svg?branch=master)](https://travis-ci.org/afdabro/mysql-framework)
Simplify [MySQL pure js client](https://github.com/mysqljs/mysql) code complexity and reduce code duplication with the MySQL framework.

## Installation
 `npm install mysql-framework`

## Usage

### SQL Command Worker

Example usage:
```javascript
'use strict';
const sqlFramework = require('mysql-framework');

/*
Example connection options
See the following reference for available options:
https://github.com/mysqljs/mysql#connection-options
*/
const connectionOptions = {
    host: 'localhost',
    user: 'idea',
    password: 'idea1234',
    database: 'idea_db',
};

// Connection manager handles opening and closing one time use connections.
const sqlConnectionManager = sqlFramework.createSqlConnectionManager(
    connectionOptions);

// Example list of SQL command statements to execute:
const commandList = [
    'INSERT INTO idea_db.job (name) values ("foo");',
    'INSERT INTO idea_db.job (name) values ("bar");',
];

sqlFramework.executeCommandsAsync(sqlConnectionManager, commandList)
.then((results) => {
    // Returns an array of Command Results
    console.log('Command results: ', results);
})
.catch(
   (reason) => {
        console.log('Handle rejected promise ('+reason+') here.');
});
```

### SQL Query Worker

Example usage:
```javascript
'use strict';
const sqlFramework = require('mysql-framework');

/*
Example connection options
See the following reference for available options:
https://github.com/mysqljs/mysql#connection-options
*/
const connectionOptions = {
    host: 'localhost',
    user: 'idea',
    password: 'idea1234',
    database: 'idea_db',
};

// Connection manager handles opening and closing one time use connections.
const sqlConnectionManager = sqlFramework.createSqlConnectionManager(
    connectionOptions);

// Query SQL database
sqlFramework.queryAsync(
    sqlConnectionManager, 'SELECT * FROM idea_db.job;')
.then((result) => {
    console.log('The query result is: ', result);
})
.catch(
   (reason) => {
        console.log('Handle rejected promise ('+reason+') here.');
});
```

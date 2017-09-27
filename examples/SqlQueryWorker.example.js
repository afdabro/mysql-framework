'use strict';
const sqlFramework = require('../index');

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

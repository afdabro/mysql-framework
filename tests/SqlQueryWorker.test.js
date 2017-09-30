'use strict';

const SqlQueryWorker = require('../lib/SqlQueryWorker.js');

describe('SqlQueryWorker tests', () => {
    test('query failed', () => {
        const connection = {
            query: jest.fn((query, callback) => callback('error')),
        };
        const sqlQueryWorker = new SqlQueryWorker();
        const myQuery = 'SELECT * FROM table';

        return sqlQueryWorker.queryAsync(connection, myQuery)
            .then((result) => {
                expect(result).toBe();
            })
            .catch((err) => {
                expect(connection.query).toBeCalledWith(myQuery,
                    expect.anything());
                expect(err).toBe('error');
            });
    });

    test('query success', () => {
        const connection = {
            query: jest.fn((query, callback) => callback(undefined, 'success')),
        };
        const sqlQueryWorker = new SqlQueryWorker();
        const myQuery = 'SELECT * FROM table';

        return sqlQueryWorker.queryAsync(connection, myQuery)
            .then((result) => {
                expect(connection.query).toBeCalledWith(myQuery,
                    expect.anything());
                expect(result).toBe('success');
            })
            .catch((err) => {
                expect(err).toBe();
            });
    });
});

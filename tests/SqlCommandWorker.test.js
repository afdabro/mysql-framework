'use strict';

const SqlCommandWorker = require('../lib/SqlCommandWorker.js');

describe('SqlCommandWorker tests', () => {
    test('beginTransaction failed', () => {
        const connection = {
            beginTransaction: jest.fn((callback) => {
                callback('transaction error');
            }),
        };
        const sqlCommandWorker = new SqlCommandWorker();
        const commandList = [
            'INSERT INTO idea_db.job (name) values ("foo");',
            'INSERT INTO idea_db.job (name) values ("bar");',
        ];

        return sqlCommandWorker.executeCommandsAsync(connection, commandList)
            .then((result) => {
                expect(result).toBe();
            })
            .catch((err) => {
                expect(err).toBe('transaction error');
            });
    });
    test('command failed', () => {
        const connection = {
            beginTransaction: jest.fn((callback) => {
                callback(undefined);
            }),
            query: jest.fn((query, callback) => callback('command error')),
            rollback: jest.fn((callback) => {
                callback();
            }),
        };
        const sqlCommandWorker = new SqlCommandWorker();
        const commandList = [
            'INSERT INTO idea_db.job (name) values ("foo");',
            'INSERT INTO idea_db.job (name) values ("bar");',
        ];

        return sqlCommandWorker.executeCommandsAsync(connection, commandList)
            .then((result) => {
                expect(result).toBe();
            })
            .catch((err) => {
                expect(err).toBe('command error');
            });
    });
    test('commit failed', () => {
        const fakeResult = {
            affectedRows: 1,
            changedRows: 1,
            insertId: 'hello',
        };
        const connection = {
            beginTransaction: jest.fn((callback) => {
                callback(undefined);
            }),
            commit: jest.fn((callback) => {
                callback('commit failed');
            }),
            rollback: jest.fn((callback) => {
                callback();
            }),
            query: jest.fn((query, callback) => {
                callback(undefined, fakeResult);
            }),
        };
        const sqlCommandWorker = new SqlCommandWorker();
        const commandList = [
            'INSERT INTO idea_db.job (name) values ("foo");',
            'INSERT INTO idea_db.job (name) values ("bar");',
        ];

        return sqlCommandWorker.executeCommandsAsync(connection, commandList)
            .then((results) => {
                expect(results).toBe();
            })
            .catch((err) => {
                expect(err).toBe('commit failed');
            });
    });
    test('commands succeeded', () => {
        const fakeResult = {
            affectedRows: 1,
            changedRows: 1,
            insertId: 'hello',
        };
        const connection = {
            beginTransaction: jest.fn((callback) => {
                callback(undefined);
            }),
            commit: jest.fn((callback) => {
                callback(undefined);
            }),
            query: jest.fn((query, callback) => {
                callback(undefined, fakeResult);
            }),
        };
        const sqlCommandWorker = new SqlCommandWorker();
        const commandList = [
            'INSERT INTO idea_db.job (name) values ("foo");',
            'INSERT INTO idea_db.job (name) values ("bar");',
        ];

        return sqlCommandWorker.executeCommandsAsync(connection, commandList)
            .then((results) => {
                expect(results).toBeDefined();
                expect(results.length).toBe(2);
                for (let result of results) {
                    let commandResult;
                    if (result.Command1) {
                        commandResult = result.Command1;
                    } else if (result.Command2) {
                        commandResult = result.Command2;
                    } else {
                        expect(commandResult).toBeDefined();
                    }
                    expect(commandResult.affectedRows).toBe(1);
                    expect(commandResult.changedRows).toBe(1);
                    expect(commandResult.insertedId).toBe('hello');
                }
            })
            .catch((err) => {
                expect(err).toBe();
            });
    });
});

'use strict';

const SqlConnectionManager = require('../lib/SqlConnectionManager.js');

describe('SqlConnectionManager tests', () => {
    test('open connection failed', () => {
        const connection = {
            connect: jest.fn((callback) => callback('connection error')),
        };
        const connectionFactory = {
            createInstance: jest.fn(() => connection),
        };
    const sqlConnectionManager = new SqlConnectionManager(connectionFactory);
        const sqlFuncPromise = ()=> Promise.resolve('hello');
        return sqlConnectionManager.executeAsync(sqlFuncPromise)
            .then((result) => {
                expect(result).toBe();
            })
            .catch((err) => {
                expect(err).toBe('connection error');
            });
    });
    test('close connection failed', () => {
        const connection = {
            connect: jest.fn((callback) => callback(undefined)),
            end: jest.fn((callback) => callback('connection error')),
        };
        const connectionFactory = {
            createInstance: jest.fn(() => connection),
        };
    const sqlConnectionManager = new SqlConnectionManager(connectionFactory);
        const sqlFuncPromise = ()=> Promise.resolve('hello');
        return sqlConnectionManager.executeAsync(sqlFuncPromise)
            .then((result) => {
                expect(result).toBe();
            })
            .catch((err) => {
                expect(err).toBe('connection error');
            });
    });
    test('query failed', () => {
        const connection = {
            connect: jest.fn((callback) => callback(undefined)),
            end: jest.fn((callback) => callback(undefined)),
        };
        const connectionFactory = {
            createInstance: jest.fn(() => connection),
        };
    const sqlConnectionManager = new SqlConnectionManager(connectionFactory);
        const sqlFuncPromise = ()=> Promise.reject('query error');
        return sqlConnectionManager.executeAsync(sqlFuncPromise)
            .then((result) => {
                expect(result).toBe();
            })
            .catch((err) => {
                expect(err).toBe('query error');
            });
    });
    test('query succeeded', () => {
        const connection = {
            connect: jest.fn((callback) => callback(undefined)),
            end: jest.fn((callback) => callback(undefined)),
        };
        const connectionFactory = {
            createInstance: jest.fn(() => connection),
        };
    const sqlConnectionManager = new SqlConnectionManager(connectionFactory);
        const sqlFuncPromise = ()=> Promise.resolve('query succeeded');
        return sqlConnectionManager.executeAsync(sqlFuncPromise)
            .then((result) => {
                expect(result).toBe('query succeeded');
            })
            .catch((err) => {
                expect(err).toBe();
            });
    });
});

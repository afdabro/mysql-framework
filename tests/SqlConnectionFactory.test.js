'use strict';

const SqlConnectionFactory = require('../lib/SqlConnectionFactory.js');

describe('SqlConnectionFactory tests', () => {
    test('create simple connection', () => {
        const sqlConnectionFactory = new SqlConnectionFactory();
        const connection = sqlConnectionFactory.createInstance();
        expect(connection).toBeDefined();
    });
});

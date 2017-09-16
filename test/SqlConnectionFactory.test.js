'use strict';
const SqlConnectionFactory = require('../source/SqlConnectionFactory');

test('create connection instance', () => {
    const connectionFactory = new SqlConnectionFactory({
        host: 'localhost',
        user: 'testuser',
        password: 'test1234',
        database: 'test_me',
    });

    const connection = connectionFactory.createInstance();

    expect(connection).toBeDefined();
  });

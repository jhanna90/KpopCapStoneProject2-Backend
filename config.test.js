const testy = require('testy');
const config = require('./config'); // Import the main config file
const configTest = require('./config.test'); // Import the test config file

describe('Configuration Tests', () => {
    test("Test Configuration", function () {
        process.env.NODE_ENV = "test"; // Ensure test environment
        const configTest = require("./config");

        expect(configTest.SECRET_KEY).toBe("your_secret_key_here"); // Default for test
        expect(configTest.PORT).toBe(3001); // Test port, if that's the default
        expect(configTest.BCRYPT_WORK_FACTOR).toBe(1); // Test-level bcrypt factor
        expect(configTest.getDatabaseUri()).toBe("postgresql:///kpop_db_test"); // Test DB URI
    });

    test('Environment Variables Affect Configuration', () => {
        // Set environment variables to simulate different conditions
        process.env.SECRET_KEY = "your_secret_key_here";
        process.env.PORT = "3001";
        process.env.DATABASE_URL = "postgresql:///kpop_db_test";

        const reloadedConfig = require('./config'); // Re-import to apply env changes

        expect(reloadedConfig.SECRET_KEY).toBe("your_secret_key_here"); // Custom secret key
        expect(reloadedConfig.PORT).toBe(3001); // Custom port
        expect(reloadedConfig.getDatabaseUri()).toBe("postgresql:///kpop_db_test"); // Custom database URI
    });

    // Verify that the code sets the 'BCRYPT_WORK_FACTOR' to 1 when the 'NODE_ENV' environment variable is set to 'test'.
    test('should set BCRYPT_WORK_FACTOR to 1 when NODE_ENV is set to "test"', () => {
        jest.resetModules();
        process.env.NODE_ENV = 'test';
        const config = require('./config');

        expect(config.BCRYPT_WORK_FACTOR).toBe(1);
    });
    // Verify that the code sets the 'BCRYPT_WORK_FACTOR' to 12 when the 'NODE_ENV' environment variable is not set to 'test'.
    test('should set BCRYPT_WORK_FACTOR to 12 when NODE_ENV is not set to "test"', () => {
        jest.resetModules();
        process.env.NODE_ENV = 'production';

        const config = require('./config');

        expect(config.BCRYPT_WORK_FACTOR).toBe(12);
    });
});



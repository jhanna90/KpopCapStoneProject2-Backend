const db = require('../db');
const {
    getBoyGroups,
    getBoyGroupByName,
    getGirlGroups,
    getGirlGroupByName,
    addKpopGroup,
    updateKpopGroup
} = require('./groupsModel'); // Adjust the path as needed

jest.mock('../db'); // Mock the database module

describe('getBoyGroups', () => {
    test('should return an array of boy groups', async () => {
        // Mock the database query result
        const mockRows = [{ id: 1, group_name: 'Group A' }, { id: 2, group_name: 'Group B' }];
        db.query.mockResolvedValue({ rows: mockRows });

        // Call the function
        const result = await getBoyGroups();

        // Assert the result
        expect(result).toEqual(mockRows);
    });

    test('should return an empty array if no boy groups are found', async () => {
        // Mock the database query result
        const mockRows = [];
        db.query.mockResolvedValue({ rows: mockRows });

        // Call the function
        const result = await getBoyGroups();

        // Assert the result
        expect(result).toEqual(mockRows);
    });

    test('should handle database query error', async () => {
        // Mock the database query to throw an error
        db.query.mockRejectedValue(new Error('Database error'));

        try {
            // Call the function
            await getBoyGroups();
        } catch (error) {
            // Assert the error message
            expect(error.message).toBe('Database error');
        }
    });

    test('should handle unexpected result format', async () => {
        // Mock the database query result with unexpected format
        db.query.mockResolvedValue({ data: [{ id: 1, group_name: 'Group A' }, { id: 2, group_name: 'Group B' }] });

        try {
            // Call the function
            await getBoyGroups();
        } catch (error) {
            // Assert the error message
            expect(error.message).toBe('Unexpected result format');
        }
    });

});

describe('getBoyGroupByName', () => {
    test('should return an array of boy groups matching the provided name', async () => {
        // Mock the database query result
        const mockRows = [{ id: 1, group_name: 'Group A' }];
        db.query.mockResolvedValue({ rows: mockRows });

        // Call the function
        const result = await getBoyGroupByName('Group A');

        // Assert the result
        expect(result).toEqual(mockRows);
    });

    test('should return an empty array if no boy groups matching the provided name are found', async () => {
        // Mock the database query result
        const mockRows = [];
        db.query.mockResolvedValue({ rows: mockRows });

        // Call the function
        const result = await getBoyGroupByName('Non-existent Group');

        // Assert the result
        expect(result).toEqual(mockRows);
    });

    test('should handle database query error', async () => {
        // Mock the database query to throw an error
        db.query.mockRejectedValue(new Error('Database error'));

        try {
            // Call the function
            await getBoyGroupByName('Group A');
        } catch (error) {
            // Assert the error message
            expect(error.message).toBe('Database error');
        }
    });

    test('should handle unexpected result format', async () => {
        // Mock the database query result with unexpected format
        db.query.mockResolvedValue({ data: [{ id: 1, group_name: 'Group A' }] });

        try {
            // Call the function
            await getBoyGroupByName('Group A');
        } catch (error) {
            // Assert the error message
            expect(error.message).toBe('Unexpected result format');
        }
    });
});

describe('getGirlGroups', () => {
    test('should return an array of girl groups', async () => {
        // Mock the database query result
        const mockRows = [{ id: 1, group_name: 'Group X' }, { id: 2, group_name: 'Group Y' }];
        db.query.mockResolvedValue({ rows: mockRows });

        // Call the function
        const result = await getGirlGroups();

        // Assert the result
        expect(result).toEqual(mockRows);
    });

    test('should return an empty array if no girl groups are found', async () => {
        // Mock the database query result
        const mockRows = [];
        db.query.mockResolvedValue({ rows: mockRows });

        // Call the function
        const result = await getGirlGroups();

        // Assert the result
        expect(result).toEqual(mockRows);
    });

    test('should handle database query error', async () => {
        // Mock the database query to throw an error
        db.query.mockRejectedValue(new Error('Database error'));

        // Call the function and expect it to throw an error
        await expect(getGirlGroups()).rejects.toThrow('Database error');
    });

    test('should handle empty result from database', async () => {
        // Mock the database query result
        db.query.mockResolvedValue({ rows: null });

        // Call the function
        const result = await getGirlGroups();

        // Assert the result
        expect(result).toBeNull();
    });

});

describe('getGirlGroupByName', () => {
    test('should return an array of girl groups matching the provided name', async () => {
        // Mock the database query result
        const mockRows = [{ id: 1, group_name: 'Group X' }];
        db.query.mockResolvedValue({ rows: mockRows });

        // Call the function
        const result = await getGirlGroupByName('Group X');

        // Assert the result
        expect(result).toEqual(mockRows);
    });

    test('should return an empty array if no girl groups matching the provided name are found', async () => {
        // Mock the database query result
        const mockRows = [];
        db.query.mockResolvedValue({ rows: mockRows });

        // Call the function
        const result = await getGirlGroupByName('Non-existent Group');

        // Assert the result
        expect(result).toEqual(mockRows);
    });

    test('should handle database query error', async () => {
        // Mock the database query to throw an error
        db.query.mockRejectedValue(new Error('Database error'));

        // Call the function and expect it to throw an error
        await expect(getGirlGroupByName('Group X')).rejects.toThrow('Database error');
    });

    test('should handle empty result from database', async () => {
        // Mock the database query result
        db.query.mockResolvedValue({ rows: null });

        // Call the function
        const result = await getGirlGroupByName('Non-existent Group');

        // Assert the result
        expect(result).toBeNull();
    });

});


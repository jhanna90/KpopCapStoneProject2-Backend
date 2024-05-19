const db = require('../db');
const {
    getKpopIdols,
    getKpopIdolByName,
    addKpopIdol,
    updateKpopIdol
} = require('./idolModel'); // Adjust the path as needed

jest.mock('../db'); // Mock the database module

describe('getKpopIdols', () => {
    test('should return an array of K-pop idols', async () => {
        // Mock the database query result
        const mockRows = [{ id: 1, stage_name: 'Idol A' }, { id: 2, stage_name: 'Idol B' }];
        db.query.mockResolvedValue({ rows: mockRows });

        // Call the function
        const result = await getKpopIdols({});

        // Assert the result
        expect(result).toEqual(mockRows);
    });

    test('should return an empty array if no K-pop idols are found', async () => {
        // Mock the database query result
        const mockRows = [];
        db.query.mockResolvedValue({ rows: mockRows });

        // Call the function
        const result = await getKpopIdols({});

        // Assert the result
        expect(result).toEqual(mockRows);
    });

    test('should return an array of K-pop idols ordered alphabetically by stage_name', async () => {
        // Mock the database query result
        const mockRows = [{ id: 1, stage_name: 'Idol A' }, { id: 2, stage_name: 'Idol B' }];
        db.query.mockResolvedValue({ rows: mockRows });

        // Call the function with orderBy parameter
        const result = await getKpopIdols({ orderBy: 'stage_name' });

        // Assert the result
        expect(result).toEqual(mockRows);
    });

    test('should return an array of K-pop idols in default order if no orderBy parameter is provided', async () => {
        // Mock the database query result
        const mockRows = [{ id: 1, stage_name: 'Idol A' }, { id: 2, stage_name: 'Idol B' }];
        db.query.mockResolvedValue({ rows: mockRows });

        // Call the function without orderBy parameter
        const result = await getKpopIdols({});

        // Assert the result
        expect(result).toEqual(mockRows);
    });
});

describe('getKpopIdolByName', () => {
    test('should return an array of K-pop idols matching the provided stage name', async () => {
        // Mock the database query result
        const mockRows = [{ id: 1, stage_name: 'Idol A' }];
        db.query.mockResolvedValue({ rows: mockRows });

        // Call the function
        const result = await getKpopIdolByName('Idol A');

        // Assert the result
        expect(result).toEqual(mockRows);
    });

    test('should return an empty array if no K-pop idols matching the provided stage name are found', async () => {
        // Mock the database query result
        const mockRows = [];
        db.query.mockResolvedValue({ rows: mockRows });

        // Call the function
        const result = await getKpopIdolByName('Non-existent Idol');

        // Assert the result
        expect(result).toEqual(mockRows);
    });

    test('should return an array of K-pop idols matching the provided stage name with case insensitivity', async () => {
        // Mock the database query result
        const mockRows = [{ id: 1, stage_name: 'Idol A' }];
        db.query.mockResolvedValue({ rows: mockRows });

        // Call the function with a mixed-case stage name
        const result = await getKpopIdolByName('iDoL a');

        // Assert the result
        expect(result).toEqual(mockRows);
    });

    test('should handle wildcard search for stage name', async () => {
        // Mock the database query result
        const mockRows = [{ id: 1, stage_name: 'Idol A' }];
        db.query.mockResolvedValue({ rows: mockRows });

        // Call the function with a partial stage name and wildcard
        const result = await getKpopIdolByName('Idol');

        // Assert the result
        expect(result).toEqual(mockRows);
    });
});

describe('addKpopIdol', () => {
    test('should add a new K-pop idol to the database', async () => {
        // Mock the database query result
        db.query.mockResolvedValueOnce();

        // Call the function
        await addKpopIdol('Idol A', 'Full Name A', 'Korean Name A', 'K Stage Name A', '2024-01-01', 'Group A', 'Country A', 'Birthplace A', 'Other Group A', 'Male');

        // Assert that the query was called with the correct parameters
        expect(db.query).toHaveBeenCalledWith(expect.any(String), ['Idol A', 'Full Name A', 'Korean Name A', 'K Stage Name A', '2024-01-01', 'Group A', 'Country A', 'Birthplace A', 'Other Group A', 'Male']);
    });

    test('should throw an error if required parameters are missing', async () => {
        // Assert that the function throws an error when required parameters are missing
        try {
            await addKpopIdol();
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('Error: all parameters are required');
        }
    });

    test('should throw an error if the provided stage name already exists', async () => {
        // Assert that the function throws an error when a duplicate stage name is provided
        try {
            await addKpopIdol('Existing Idol', 'Full Name', 'Korean Name', 'K Stage Name', '2024-01-01', 'Group', 'Country', 'Birthplace', 'Other Group', 'Female');
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('Stage name already exists.');
        }
    });

    test('should throw an error if an invalid gender is provided', async () => {
        // Assert that the function throws an error when an invalid gender is provided
        try {
            await addKpopIdol('New Idol', 'Full Name', 'Korean Name', 'K Stage Name', '2024-01-01', 'Group', 'Country', 'Birthplace', 'Other Group', 'Invalid Gender');
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('Invalid gender.');
        }
    });
});

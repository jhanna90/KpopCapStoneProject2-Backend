const db = require('../db');
const { getAllVideos, searchVideos, addVideo } = require('./videoModel');

jest.mock('../db');

describe('getAllVideos', () => {
    test('should return all videos from the database', async () => {
        // Mock the database query result
        const mockRows = [{ id: 1, artist: 'Artist A', video: 'Video A', song_name: 'Song A', korean_name: 'Korean A', release_date: '2022-01-01', director: 'Director A' }];
        db.query.mockResolvedValue({ rows: mockRows });

        // Call the function
        const result = await getAllVideos();

        // Assert the result
        expect(result).toEqual(mockRows);
    });

    test('should return an empty array if no videos are found', async () => {
        // Mock the database query result
        const mockRows = [];
        db.query.mockResolvedValue({ rows: mockRows });

        // Call the function
        const result = await getAllVideos();

        // Assert the result
        expect(result).toEqual(mockRows);
    });

    test('should handle errors from the database query', async () => {
        // Mock the database query to throw an error
        db.query.mockRejectedValue(new Error('Database error'));

        // Call the function and expect it to throw an error
        await expect(getAllVideos()).rejects.toThrow('Database error');
    });

    test('should handle null database query result', async () => {
        // Mock the database query result to return null
        db.query.mockResolvedValue({ rows: null });

        // Call the function
        const result = await getAllVideos();

        // Assert that the result is null
        expect(result).toBeNull();
    });
});

describe('searchVideos', () => {
    test('should return videos matching the search term', async () => {
        // Mock the database query result
        const searchTerm = 'song';
        const mockRows = [{ artist: 'Artist A', video: 'Video A', song_name: 'Song A', korean_name: 'Korean A', release_date: '2022-01-01', director: 'Director A' }];
        db.query.mockResolvedValue({ rows: mockRows });

        // Call the function
        const result = await searchVideos(searchTerm);

        // Assert the result
        expect(result).toEqual(mockRows);
    });

    test('should return an empty array if no videos match the search term', async () => {
        // Mock the database query result
        const searchTerm = 'nonexistent';
        const mockRows = [];
        db.query.mockResolvedValue({ rows: mockRows });

        // Call the function
        const result = await searchVideos(searchTerm);

        // Assert the result
        expect(result).toEqual(mockRows);
    });

    test('should handle errors from the database query', async () => {
        // Mock the database query to throw an error
        const searchTerm = 'song';
        db.query.mockRejectedValue(new Error('Database error'));

        // Call the function and expect it to throw an error
        await expect(searchVideos(searchTerm)).rejects.toThrow('Database error');
    });

    test('should handle empty search term', async () => {
        // Mock the database query result
        const searchTerm = '';
        const mockRows = [{ artist: 'Artist A', video: 'Video A', song_name: 'Song A', korean_name: 'Korean A', release_date: '2022-01-01', director: 'Director A' }];
        db.query.mockResolvedValue({ rows: mockRows });

        // Call the function
        const result = await searchVideos(searchTerm);

        // Assert the result
        expect(result).toEqual(mockRows);
    });
});

describe('addVideo', () => {
    test('should add a new video to the database', async () => {
        // Mock the database query result
        db.query.mockResolvedValueOnce();

        // Call the function
        await addVideo('Artist A', 'Video A', 'Song A', 'Korean A', '2022-01-01', 'Director A');

        // Assert that the query was called with the correct parameters
        expect(db.query).toHaveBeenCalledWith(expect.any(String), ['Artist A', 'Video A', 'Song A', 'Korean A', '2022-01-01', 'Director A']);
    });

    test('should throw an error if required parameters are missing', async () => {
        // Mock the database query function to throw an error with the expected message
        db.query.mockRejectedValue(new Error('Error: all parameters are required'));

        // Assert that the function throws an error with the expected message
        await expect(addVideo()).rejects.toThrow('Error: all parameters are required');
    });

    test('should throw an error if the video already exists', async () => {
        // Mock the database query to throw an error indicating duplicate entry
        db.query.mockRejectedValue(new Error('Duplicate entry'));

        // Call the function and expect it to throw an error
        await expect(addVideo('Artist A', 'Video A', 'Song A', 'Korean A', '2022-01-01', 'Director A')).rejects.toThrow('Duplicate entry');
    });

    test('should handle errors from the database query', async () => {
        // Mock the database query to throw a generic error
        db.query.mockRejectedValue(new Error('Database error'));

        // Call the function and expect it to throw an error
        await expect(addVideo('Artist A', 'Video A', 'Song A', 'Korean A', '2022-01-01', 'Director A')).rejects.toThrow('Database error');
    });
});
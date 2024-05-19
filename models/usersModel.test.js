const db = require('../db');
const {
    register,
    login,
    getAllUsers,
    deleteUser,
    updateUserProfile,
    getUserByUsername
} = require('./usersModel');
const { ExpressError } = require('../expressError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

jest.mock('../db');
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

describe('register function', () => {
    test('should register a new user successfully', async () => {
        // Mock database query result
        db.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

        const userId = await register('testuser', 'test@example.com', 'password123', 'BTS', 'BLACKPINK', 'Jimin', 'Jennie', 'V', 'DDU-DU DDU-DU', 'Spring Day');
        expect(userId).toBe(1);
    });

    test('should throw error for duplicate username', async () => {
        // Mock database query result
        db.query.mockRejectedValueOnce({ code: '23505' });

        await expect(register('existinguser', 'test@example.com', 'password123', 'BTS', 'BLACKPINK', 'Jimin', 'Jennie', 'V', 'DDU-DU DDU-DU', 'Spring Day'))
            .rejects.toThrow('Username already taken. Please choose another Username.');
    });

    test('should throw error for database query error', async () => {
        // Mock database query error
        db.query.mockRejectedValueOnce(new Error('Database error'));

        await expect(register('testuser', 'test@example.com', 'password123', 'BTS', 'BLACKPINK', 'Jimin', 'Jennie', 'V', 'DDU-DU DDU-DU', 'Spring Day'))
            .rejects.toThrow('Database error');
    });
});

describe('login function', () => {
    test('should return the expected result when valid username and password are provided', async () => {
        // Arrange
        const username = 'validUsername';
        const password = 'validPassword';
        const expectedMessage = 'Logged in successfully';
        const expectedUserId = 'validUserId';
        const expectedToken = 'validToken';

        // Mock the database query result
        const queryResult = {
            rows: [
                {
                    id: expectedUserId,
                    password: 'hashedPassword',
                },
            ],
        };
        db.query.mockResolvedValue(queryResult);

        // Spy on the bcrypt compare method
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

        // Mock the jwt sign function
        jwt.sign.mockReturnValue(expectedToken);

        // Act
        const result = await login(username, password);

        // Assert
        expect(result.message).toBe(expectedMessage);
        expect(result.userId).toBe(expectedUserId);
        expect(result.token).toBe(expectedToken);
        expect(db.query).toHaveBeenCalledWith(expect.any(String), [username]);
        expect(bcrypt.compare).toHaveBeenCalledWith(password, 'hashedPassword');
        expect(jwt.sign).toHaveBeenCalledWith({ userId: expectedUserId, username }, SECRET_KEY);
    });

    test('should throw error for invalid username or password', async () => {
        // Mock database query result for invalid credentials
        db.query.mockResolvedValueOnce({ rows: [] });

        await expect(login('nonexistentuser', 'password123')).rejects.toThrow('Invalid username or password');
    });

    test('should throw error for database query error', async () => {
        // Mock database query error
        db.query.mockRejectedValueOnce(new Error('Database error'));

        await expect(login('testuser', 'password123')).rejects.toThrow('Database error');
    });
});

describe('getAllUsers function', () => {
    test('should return an array of users', async () => {
        // Mock database query result
        const mockUsers = [
            { id: 1, username: 'user1', fav_boy_group: 'BTS', fav_girl_group: 'BLACKPINK' },
            { id: 2, username: 'user2', fav_boy_group: 'EXO', fav_girl_group: 'TWICE' }
        ];
        db.query.mockResolvedValueOnce({ rows: mockUsers });

        const users = await getAllUsers();
        expect(users).toEqual(mockUsers);
    });

    test('should throw error for database query error', async () => {
        // Mock database query error
        db.query.mockRejectedValueOnce(new Error('Database error'));

        await expect(getAllUsers()).rejects.toThrow('Database error');
    });
});

describe('getUserByUsername function', () => {
    test('should return user object for existing username', async () => {
        // Mock database query result
        const mockUser = { id: 1, username: 'testuser', fav_boy_group: 'BTS', fav_girl_group: 'BLACKPINK' };
        db.query.mockResolvedValueOnce({ rows: [mockUser] });

        const user = await getUserByUsername('testuser');
        expect(user).toEqual(mockUser);
    });

    test('should return null for nonexistent username', async () => {
        // Mock database query result for nonexistent username
        db.query.mockResolvedValueOnce({ rows: [] });

        const user = await getUserByUsername('nonexistentuser');
        expect(user).toBeNull();
    });

    test('should throw error for database query error', async () => {
        // Mock database query error
        db.query.mockRejectedValueOnce(new Error('Database error'));

        await expect(getUserByUsername('testuser')).rejects.toThrow('Database error');
    });
});

describe('deleteUser function', () => {
    test('should delete user successfully', async () => {
        // Mock authenticated user
        const authenticatedUser = { username: 'testuser' };

        // Mock database query result
        db.query.mockResolvedValueOnce({});

        // Call deleteUser function
        const result = await deleteUser('testuser', authenticatedUser);
        expect(result).toBe(true);
    });

    test('should throw error for unauthorized user', async () => {
        // Mock authenticated user
        const authenticatedUser = { username: 'otheruser' };

        // Call deleteUser function
        await expect(deleteUser('testuser', authenticatedUser))
            .rejects.toThrow(ExpressError);
    });
    test('should throw error for database query error', async () => {
        // Mock authenticated user
        const authenticatedUser = { username: 'testuser' };

        // Mock database query error
        db.query.mockRejectedValueOnce(new Error('Database error'));

        // Call deleteUser function
        await expect(deleteUser('testuser', authenticatedUser)).rejects.toThrow('An error occurred while deleting user profile');
    });
});

describe('updateUserProfile function', () => {
    test('should update user profile successfully', async () => {
        // Mock authenticated user
        const authenticatedUser = { username: 'testuser', userId: 1 };

        // Mock updates
        const updates = {
            userId: 1,
            username: 'newusername',
            email: 'newemail@example.com',
            fav_boy_group: 'New BTS',
            fav_girl_group: 'New BLACKPINK'
            // Add more updates as needed
        };

        // Mock database query result
        db.query.mockResolvedValueOnce({});

        // Call updateUserProfile function
        const result = await updateUserProfile(1, updates);
        expect(result).toBe('Profile updated successfully');
    });
    test('should throw error for database query error', async () => {
        // Mock authenticated user
        const authenticatedUser = { username: 'testuser', userId: 1 };

        // Mock updates
        const updates = {
            userId: 1,
            username: 'newusername',
            email: 'newemail@example.com',
            fav_boy_group: 'New BTS',
            fav_girl_group: 'New BLACKPINK'
            // Add more updates as needed
        };

        // Mock database query error
        db.query.mockRejectedValueOnce(new Error('Database error'));

        // Call updateUserProfile function
        await expect(updateUserProfile(1, updates)).rejects.toThrow('Database error');
    });
});



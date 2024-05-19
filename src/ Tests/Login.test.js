import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Login from '../components/Login';

jest.mock('axios');
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Login component', () => {
    beforeEach(() => {
        jest.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the component correctly', () => {
        render(
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
        expect(screen.getByLabelText('Username:')).toBeInTheDocument();
        expect(screen.getByLabelText('Password:')).toBeInTheDocument();
        expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    });

    it('displays an error message when fields are empty', async () => {
        render(
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole('button', { name: /login/i }));
        await waitFor(() => expect(screen.getByText('Username and password are required')).toBeInTheDocument());
    });
    it('handles successful login', async () => {
        const mockResponse = {
            data: {
                token: 'mockToken',
                username: 'testUser',
            },
        };
        axios.post.mockResolvedValueOnce(mockResponse);

        render(
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'testUser' } });
        fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        // Wait for axios.post to be called
        await waitFor(() => expect(axios.post).toHaveBeenCalledWith('/api/login', { username: 'testUser', password: 'password123' }));

        // Wait for localStorage.setItem to be called
        await waitFor(() => {
            expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mockToken');
            expect(localStorage.setItem).toHaveBeenCalledWith('username', 'testUser');
        });

        // Wait for navigation to occur
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/profile/testUser'));
    });
    it('handles invalid login', async () => {
        axios.post.mockRejectedValueOnce(new Error('Invalid username or password'));

        render(
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'wrongUser' } });
        fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'wrongPassword' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => expect(screen.getByText('Invalid username or password. Please try again.')).toBeInTheDocument());
    });
});

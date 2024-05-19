import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Profile from '../components/Profile'; // Adjust the import path accordingly

jest.mock('axios');

describe('Profile component', () => {
    const userData = {
        username: 'testUser',
        fav_boy_group: 'Example Boy Group',
        fav_girl_group: 'Example Girl Group',
        bias: 'Example Bias',
        alt_bias: 'Example Alt Bias',
        bias_wrecker: 'Example Bias Wrecker',
        fav_girl_group_song: 'Example Girl Group Song',
        fav_boy_group_song: 'Example Boy Group Song',
    };

    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    it('redirects to login if not authenticated', async () => {
        render(
            <MemoryRouter initialEntries={['/profile/testUser']}>
                <Routes>
                    <Route path="/profile/:username" element={<Profile />} />
                    <Route path="/login" element={<div>Login Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText('Login Page')).toBeInTheDocument());
    });

    it('fetches user data and renders it correctly', async () => {
        localStorage.setItem('token', 'test-token');
        axios.get.mockResolvedValueOnce({ data: userData });

        render(
            <MemoryRouter initialEntries={['/profile/testUser']}>
                <Routes>
                    <Route path="/profile/:username" element={<Profile />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('User Profile')).toBeInTheDocument();
            expect(screen.getByText('Username: testUser')).toBeInTheDocument();
            expect(screen.getByText('Favorite Boy Group: Example Boy Group')).toBeInTheDocument();
            expect(screen.getByText('Favorite Girl Group: Example Girl Group')).toBeInTheDocument();
        });
    });

    it('handles errors during data fetching', async () => {
        localStorage.setItem('token', 'test-token');
        axios.get.mockRejectedValueOnce(new Error('Error fetching user data'));

        render(
            <MemoryRouter initialEntries={['/profile/testUser']}>
                <Routes>
                    <Route path="/profile/:username" element={<Profile />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Error fetching user data: Error fetching user data')).toBeInTheDocument();
        });
    });

    it('handles profile deletion', async () => {
        localStorage.setItem('token', 'test-token');
        axios.get.mockResolvedValueOnce({ data: userData });
        axios.delete = jest.fn().mockResolvedValueOnce({});

        render(
            <MemoryRouter initialEntries={['/profile/testUser']}>
                <Routes>
                    <Route path="/profile/:username" element={<Profile />} />
                    <Route path="/" element={<div>Home Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('User Profile')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Delete Your Profile'));

        await waitFor(() => {
            expect(screen.getByText('Home Page')).toBeInTheDocument();
        });
    });

    it('navigates to edit profile page', async () => {
        localStorage.setItem('token', 'test-token');
        axios.get.mockResolvedValueOnce({ data: userData });

        render(
            <MemoryRouter initialEntries={['/profile/testUser']}>
                <Routes>
                    <Route path="/profile/:username" element={<Profile />} />
                    <Route path="/profile/edit/:username" element={<div>Edit Profile Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('User Profile')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Edit Your Profile'));

        await waitFor(() => {
            expect(screen.getByText('Edit Profile Page')).toBeInTheDocument();
        });
    });
});

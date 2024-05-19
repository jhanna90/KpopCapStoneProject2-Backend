import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import ProfileEdit from '../components/ProfileEdit'; // Adjust the import path accordingly

jest.mock('axios');

describe('ProfileEdit component', () => {
    const userData = {
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
    });

    it('redirects to login if not authenticated', async () => {
        localStorage.removeItem('token');

        render(
            <MemoryRouter initialEntries={['/profile/edit/testUser']}>
                <Routes>
                    <Route path="/profile/edit/:username" element={<ProfileEdit />} />
                    <Route path="/login" element={<div>login</div>} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText('login')).toBeInTheDocument());
    });

    it('updates profile on form submission', async () => {
        localStorage.setItem('token', 'test-token');
        axios.get.mockResolvedValueOnce({ data: userData });
        axios.patch = jest.fn().mockResolvedValueOnce({});

        render(
            <MemoryRouter initialEntries={['/profile/edit/testUser']}>
                <Routes>
                    <Route path="/profile/edit/:username" element={<ProfileEdit />} />
                    <Route path="/profile/testUser" element={<div>Profile Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByDisplayValue('Example Boy Group')).toBeInTheDocument();
        });

        fireEvent.change(screen.getByRole('textbox', { name: 'Favorite Boy Group:' }), { target: { value: 'New Boy Group' } });
        fireEvent.submit(screen.getByText('Update Profile'));

        await waitFor(() => {
            expect(screen.getByText('Profile Page')).toBeInTheDocument();
        });
    });

    it('should render without crashing', () => {
        render(
            <MemoryRouter initialEntries={['/profile/edit/testUser']}>
                <Routes>
                    <Route path="/profile/edit/:username" element={<ProfileEdit />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should navigate to user profile after successful data update', async () => {
        localStorage.setItem('token', 'test-token');
        axios.get.mockResolvedValueOnce({ data: userData });
        axios.patch.mockResolvedValueOnce({});

        render(
            <MemoryRouter initialEntries={['/profile/edit/testUser']}>
                <Routes>
                    <Route path="/profile/edit/:username" element={<ProfileEdit />} />
                    <Route path="/profile/testUser" element={<div>Profile Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByDisplayValue('Example Boy Group')).toBeInTheDocument();
        });

        fireEvent.submit(screen.getByText('Update Profile'));

        await waitFor(() => {
            expect(screen.getByText('Profile Page')).toBeInTheDocument();
        });
    });
    it('should submit updated data correctly when form is submitted', async () => {
        localStorage.setItem('token', 'test-token');
        axios.get.mockResolvedValueOnce({ data: userData });
        axios.patch.mockResolvedValueOnce({});

        render(
            <MemoryRouter initialEntries={['/profile/edit/testUser']}>
                <Routes>
                    <Route path="/profile/edit/:username" element={<ProfileEdit />} />
                    <Route path="/profile/testUser" element={<div>Profile Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByDisplayValue('Example Boy Group')).toBeInTheDocument();
        });

        fireEvent.change(screen.getByRole('textbox', { name: 'Favorite Boy Group:' }), { target: { value: 'New Boy Group' } });
        fireEvent.submit(screen.getByText('Update Profile'));

        await waitFor(() => {
            expect(screen.getByText('Profile Page')).toBeInTheDocument();
        });
    });
});



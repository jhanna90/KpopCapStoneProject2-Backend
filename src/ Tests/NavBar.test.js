import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom'; // Import MemoryRouter and Router
import NavBar from '../components/NavBar';

describe('NavBar component', () => {
    it('renders navigation links', () => {
        const { getByText } = render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );

        expect(getByText('Videos')).toBeInTheDocument();
        expect(getByText('Idols')).toBeInTheDocument();
        expect(getByText('Groups')).toBeInTheDocument();
        expect(getByText('Profile')).toBeInTheDocument();
        expect(getByText('Create Account!')).toBeInTheDocument();
    });

    it('renders login button when not logged in', () => {
        const { getByText } = render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );

        expect(getByText('Login')).toBeInTheDocument();
    });

    it('renders logout button when logged in', () => {
        localStorage.setItem('token', 'some-token');

        const { getByText } = render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );

        expect(getByText('Logout')).toBeInTheDocument();
    });
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Router, useHistory } from 'react-router-dom';
import axios from 'axios';
import UserForm from '../components/UserForm';
import { createMemoryHistory } from 'history';


jest.mock('axios');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: jest.fn(),
}));


describe('UserForm component', () => {
    test('renders the form correctly', () => {
        render(<UserForm />, { wrapper: MemoryRouter });

        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Favorite Boy Group')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Favorite Girl Group')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Bias')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Alt Bias')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Bias Wrecker')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Favorite Girl Group Song')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Favorite Boy Group Song')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
    });

    test('registers user successfully', async () => {
        axios.post.mockResolvedValueOnce({ status: 201 });

        render(<UserForm />, { wrapper: MemoryRouter });

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'testpassword' } });
        fireEvent.change(screen.getByPlaceholderText('Favorite Boy Group'), { target: { value: 'BTS' } });
        fireEvent.change(screen.getByPlaceholderText('Favorite Girl Group'), { target: { value: 'BLACKPINK' } });
        fireEvent.change(screen.getByPlaceholderText('Bias'), { target: { value: 'Jimin' } });
        fireEvent.change(screen.getByPlaceholderText('Alt Bias'), { target: { value: 'Lisa' } });
        fireEvent.change(screen.getByPlaceholderText('Bias Wrecker'), { target: { value: 'V' } });
        fireEvent.change(screen.getByPlaceholderText('Favorite Girl Group Song'), { target: { value: 'DDU-DU DDU-DU' } });
        fireEvent.change(screen.getByPlaceholderText('Favorite Boy Group Song'), { target: { value: 'Dynamite' } });

        fireEvent.click(screen.getByRole('button', { name: 'Register' }));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith('/api/register', {
                username: 'testuser',
                email: 'test@example.com',
                password: 'testpassword',
                fav_boy_group: 'BTS',
                fav_girl_group: 'BLACKPINK',
                bias: 'Jimin',
                alt_bias: 'Lisa',
                bias_wrecker: 'V',
                fav_girl_group_song: 'DDU-DU DDU-DU',
                fav_boy_group_song: 'Dynamite'
            });
            expect(screen.getByText('User registered successfully!')).toBeInTheDocument();
        });
    });
});

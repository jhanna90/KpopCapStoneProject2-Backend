import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import IdolAdd from '../components/IdolAdd';

// Mocking axios post method
jest.mock('axios');

describe('IdolAdd Component', () => {
    test('renders form inputs', () => {
        render(<IdolAdd />);

        expect(screen.getByLabelText('Stage Name:')).toBeInTheDocument();
        expect(screen.getByLabelText('Full Name:')).toBeInTheDocument();
        expect(screen.getByLabelText('Korean Name:')).toBeInTheDocument();
        expect(screen.getByLabelText('Korean Stage Name:')).toBeInTheDocument();
        expect(screen.getByLabelText('Date of Birth:')).toBeInTheDocument();
        expect(screen.getByLabelText('Group Name:')).toBeInTheDocument();
        expect(screen.getByLabelText('Country:')).toBeInTheDocument();
        expect(screen.getByLabelText('Birthplace:')).toBeInTheDocument();
        expect(screen.getByLabelText('Other Group:')).toBeInTheDocument();
        expect(screen.getByLabelText('Gender:')).toBeInTheDocument();
    });

    test('submitting the form adds a new idol', async () => {
        render(<IdolAdd />);
        const mockResponse = { status: 201 }; // Mock successful response

        // Mock the axios post method to return the mockResponse
        axios.post.mockResolvedValueOnce(mockResponse);

        // Fill in the form inputs
        fireEvent.change(screen.getByLabelText('Stage Name:'), { target: { value: 'Test Idol' } });
        fireEvent.change(screen.getByLabelText('Full Name:'), { target: { value: 'Test Full Name' } });
        fireEvent.change(screen.getByLabelText('Korean Name:'), { target: { value: 'Test Korean Name' } });
        fireEvent.change(screen.getByLabelText('Korean Stage Name:'), { target: { value: 'Test Korean Stage Name' } });
        fireEvent.change(screen.getByLabelText('Date of Birth:'), { target: { value: '2022-01-01' } });
        fireEvent.change(screen.getByLabelText('Group Name:'), { target: { value: 'Test Group Name' } });
        fireEvent.change(screen.getByLabelText('Country:'), { target: { value: 'Test Country' } });
        fireEvent.change(screen.getByLabelText('Birthplace:'), { target: { value: 'Test Birthplace' } });
        fireEvent.change(screen.getByLabelText('Other Group:'), { target: { value: 'Test Other Group' } });
        fireEvent.change(screen.getByLabelText('Gender:'), { target: { value: 'Test Gender' } });

        // Submit the form
        fireEvent.click(screen.getByText('Add Idol'));

        // Wait for the axios call to resolve
        await waitFor(() => {
            // Expect the axios post method to be called with the correct data
            expect(axios.post).toHaveBeenCalledWith('/api/idols', {
                stage_name: 'Test Idol',
                full_name: 'Test Full Name',
                korean_name: 'Test Korean Name',
                k_stage_name: 'Test Korean Stage Name',
                date_of_birth: '2022-01-01',
                group_name: 'Test Group Name',
                country: 'Test Country',
                birthplace: 'Test Birthplace',
                other_group: 'Test Other Group',
                gender: 'Test Gender'
            });
        });
    });
});

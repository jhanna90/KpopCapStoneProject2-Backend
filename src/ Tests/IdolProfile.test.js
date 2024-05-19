import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import IdolProfile from '../components/IdolProfile';

jest.mock('axios');

describe('IdolProfile component', () => {
    const mockIdol = {
        stage_name: 'Test Idol',
        full_name: 'Full Test Idol',
        korean_name: '테스트 아이돌',
        k_stage_name: '테스트',
        date_of_birth: '2000-01-01',
        group_name: 'Test Group',
        country: 'Test Country',
        birthplace: 'Test City',
        other_group: 'Other Test Group',
        gender: 'Male'
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading state correctly', () => {
        axios.get.mockResolvedValueOnce({ data: { idols: [mockIdol] } });
        render(
            <MemoryRouter initialEntries={['/idols/Test Idol']}>
                <Routes>
                    <Route path="/idols/:name" element={<IdolProfile />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('fetches and displays idol data correctly', async () => {
        axios.get.mockResolvedValueOnce({ data: { idols: [mockIdol] } });
        render(
            <MemoryRouter initialEntries={['/idols/Test Idol']}>
                <Routes>
                    <Route path="/idols/:name" element={<IdolProfile />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText("Test Idol's Profile")).toBeInTheDocument());
        expect(screen.getByText('Full Name: Full Test Idol')).toBeInTheDocument();
        expect(screen.getByText('Korean Name: 테스트 아이돌')).toBeInTheDocument();
        expect(screen.getByText('Korean Stage Name: 테스트')).toBeInTheDocument();
        expect(screen.getByText('Date of Birth: 2000-01-01')).toBeInTheDocument();
        expect(screen.getByText('Group Name:')).toBeInTheDocument();
        expect(screen.getByText('Test Group')).toBeInTheDocument();
        expect(screen.getByText('Country: Test Country')).toBeInTheDocument();
        expect(screen.getByText('Birthplace: Test City')).toBeInTheDocument();
        expect(screen.getByText('Other Group: Other Test Group')).toBeInTheDocument();
        expect(screen.getByText('Gender: Male')).toBeInTheDocument();
    });

    it('handles idol not found error correctly', async () => {
        axios.get.mockResolvedValueOnce({ data: { idols: [] } });
        render(
            <MemoryRouter initialEntries={['/idols/NonExistentIdol']}>
                <Routes>
                    <Route path="/idols/:name" element={<IdolProfile />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText('Idol not found')).toBeInTheDocument());
    });

    it('handles API error correctly', async () => {
        axios.get.mockRejectedValueOnce(new Error('Network Error'));
        render(
            <MemoryRouter initialEntries={['/idols/Test Idol']}>
                <Routes>
                    <Route path="/idols/:name" element={<IdolProfile />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText('Error fetching idol profile: Network Error')).toBeInTheDocument());
    });
});

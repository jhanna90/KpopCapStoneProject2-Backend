import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import VideoList from '../components/VideoList';

jest.mock('axios');

describe('VideoList component', () => {
    test('renders video list correctly', async () => {
        const mockVideos = [
            {
                id: 1,
                song_name: 'Test Song 1',
                video: 'https://example.com/test1.mp4',
                artist: 'Test Artist 1',
                korean_name: '테스트 노래 1',
                release_date: '2024-05-20',
                director: 'Test Director 1'
            },
            {
                id: 2,
                song_name: 'Test Song 2',
                video: 'https://example.com/test2.mp4',
                artist: 'Test Artist 2',
                korean_name: '테스트 노래 2',
                release_date: '2024-05-21',
                director: 'Test Director 2'
            }
        ];
        axios.get.mockResolvedValueOnce({ data: { videos: mockVideos } });

        render(<MemoryRouter><VideoList /></MemoryRouter>);

        expect(screen.getByText('Video List')).toBeInTheDocument();

        // Wait for videos to load
        await waitFor(() => {
            expect(screen.getByText('Test Song 1')).toBeInTheDocument();
            expect(screen.getByText('Test Song 2')).toBeInTheDocument();
            expect(screen.getByText('Artist: Test Artist 1')).toBeInTheDocument();
            expect(screen.getByText('Artist: Test Artist 2')).toBeInTheDocument();
            expect(screen.getByText('Korean Name: 테스트 노래 1')).toBeInTheDocument();
            expect(screen.getByText('Korean Name: 테스트 노래 2')).toBeInTheDocument();
            expect(screen.getByText('Release Date: 2024-05-20')).toBeInTheDocument();
            expect(screen.getByText('Release Date: 2024-05-21')).toBeInTheDocument();
            expect(screen.getByText('Director: Test Director 1')).toBeInTheDocument();
            expect(screen.getByText('Director: Test Director 2')).toBeInTheDocument();
        });
    });

    test('displays loading message while fetching videos', async () => {
        axios.get.mockResolvedValueOnce({ data: { videos: [] } });

        render(<MemoryRouter><VideoList /></MemoryRouter>);

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        // Wait for videos to load
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).toBeNull();
        });
    });

    test('displays error message when fetching videos fails', async () => {
        const errorMessage = 'Error fetching videos';
        axios.get.mockRejectedValueOnce(new Error(errorMessage));

        render(<MemoryRouter><VideoList /></MemoryRouter>);

        expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    });
});

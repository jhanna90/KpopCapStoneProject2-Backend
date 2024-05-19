import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import VideoAdd from '../components/VideoAdd'; // Assuming the VideoAdd component is in the same directory

jest.mock('axios');

describe('VideoAdd component', () => {
    test('renders the form correctly', () => {
        render(<VideoAdd />);

        expect(screen.getByText('Add a New Video')).toBeInTheDocument();
        expect(screen.getByLabelText('Song Name:')).toBeInTheDocument();
        expect(screen.getByLabelText('Video URL:')).toBeInTheDocument();
        expect(screen.getByLabelText('Korean Name:')).toBeInTheDocument();
        expect(screen.getByLabelText('Artist:')).toBeInTheDocument();
        expect(screen.getByLabelText('Release Date:')).toBeInTheDocument();
        expect(screen.getByLabelText('Director:')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Add Video' })).toBeInTheDocument();
    });

    test('submits the form with correct data', async () => {
        const newVideo = {
            song_name: 'Test Song',
            video: 'https://example.com/test.mp4',
            artist: 'Test Artist',
            release_date: '2024-05-20',
            director: 'Test Director',
            korean_name: '테스트 노래'
        };
        axios.post.mockResolvedValueOnce({ status: 200 });

        render(<VideoAdd />);

        fireEvent.change(screen.getByLabelText('Song Name:'), { target: { value: newVideo.song_name } });
        fireEvent.change(screen.getByLabelText('Video URL:'), { target: { value: newVideo.video } });
        fireEvent.change(screen.getByLabelText('Korean Name:'), { target: { value: newVideo.korean_name } });
        fireEvent.change(screen.getByLabelText('Artist:'), { target: { value: newVideo.artist } });
        fireEvent.change(screen.getByLabelText('Release Date:'), { target: { value: newVideo.release_date } });
        fireEvent.change(screen.getByLabelText('Director:'), { target: { value: newVideo.director } });

        fireEvent.click(screen.getByRole('button', { name: 'Add Video' }));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('/api/videos', newVideo);
        });
    });
    test('logs an error if submission fails', async () => {
        const errorMessage = 'Test error message';
        axios.post.mockRejectedValueOnce(new Error(errorMessage));

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        render(<VideoAdd />);

        fireEvent.click(screen.getByRole('button', { name: 'Add Video' }));

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith('Error adding video:', expect.any(Error));
        });

        consoleSpy.mockRestore();
    });
});

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import IdolList from '../components/IdolList';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');

describe('IdolList component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        const { getByText } = render(
            <Router>
                <IdolList />
            </Router>
        );
        expect(getByText('Idol List')).toBeInTheDocument();
    });

    it('calls fetchIdols on mount', async () => {
        const fetchIdolsSpy = jest.spyOn(axios, 'get');
        render(
            <Router>
                <IdolList />
            </Router>
        );
        await waitFor(() => expect(fetchIdolsSpy).toHaveBeenCalledTimes(1));
    });

    it('handles search correctly', async () => {
        const searchTerm = 'test';
        const response = { data: { idols: [{ id: 1, stage_name: 'Test Idol' }] } };
        axios.get.mockResolvedValue(response);
        const { getByText, getByPlaceholderText, debug } = render(
            <Router>
                <IdolList />
            </Router>
        );

        const searchInput = getByPlaceholderText('Search by idol name');
        fireEvent.change(searchInput, { target: { value: searchTerm } });

        const searchButton = getByText('Search');
        fireEvent.click(searchButton);

        // Optionally debug the DOM after the click
        // debug();

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledTimes(2); // Once on mount, once on search
        });

        await waitFor(() => {
            expect(getByText('Test Idol')).toBeInTheDocument();
        });
    });

    it('renders error message correctly', async () => {
        const error = 'Error fetching idols';
        axios.get.mockRejectedValue(new Error(error));
        const { getByText } = render(
            <Router>
                <IdolList />
            </Router>
        );
        await waitFor(() => expect(getByText(error)).toBeInTheDocument());
    });
});

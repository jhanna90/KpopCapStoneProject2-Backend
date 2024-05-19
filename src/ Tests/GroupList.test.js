import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import GroupList from '../components/GroupList'; // Adjust the path as necessary

jest.mock('axios');

describe('GroupList Component', () => {
    test('displays error message when search returns no groups', async () => {
        axios.get.mockImplementation((url) => {
            if (url.includes('/api/groups/')) {
                return Promise.resolve({ data: { allGroups: [] } });
            }
            return Promise.resolve({ data: { boyGroups: [], girlGroups: [] } });
        });

        render(
            <BrowserRouter>
                <GroupList />
            </BrowserRouter>
        );

        const searchInput = screen.getByPlaceholderText('Search by group name');
        fireEvent.change(searchInput, { target: { value: 'NonExistentGroup' } });

        fireEvent.click(screen.getByText('Search'));

        await waitFor(() => {
            expect(screen.getByText(/Sorry! No groups found 😢. Our Team is hard at work adding new groups everyday!/i)).toBeInTheDocument();
        });
    });
    // Renders the GroupList component without any errors
    it('should render the GroupList component without crashing', () => {
        render(
            <BrowserRouter>
                <GroupList />
            </BrowserRouter>
        );
    });
});

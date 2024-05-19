import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import NavBar from './components/NavBar';

describe('App Component', () => {
  test('renders navigation buttons', () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );

    const videosButton = screen.getByText(/Videos/i);
    expect(videosButton).toBeInTheDocument();

    const idolsButton = screen.getByText(/Idols/i);
    expect(idolsButton).toBeInTheDocument();

    const groupsButton = screen.getByText(/Groups/i);
    expect(groupsButton).toBeInTheDocument();

    const profileButton = screen.getByText(/Profile/i);
    expect(profileButton).toBeInTheDocument();

    const loginButton = screen.getByText(/Login/i);
    expect(loginButton).toBeInTheDocument();

    const createAccountButton = screen.getByText(/Create Account!/i);
    expect(createAccountButton).toBeInTheDocument();
  });
});


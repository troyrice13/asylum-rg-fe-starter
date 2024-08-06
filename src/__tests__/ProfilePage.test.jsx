import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';
import ProfilePage from '../components/pages/Profile/ProfilePage';

// Mocking the Auth0 hook
jest.mock('@auth0/auth0-react');

describe('ProfilePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    useAuth0.mockReturnValue({
      isLoading: true,
      isAuthenticated: false,
      user: null,
    });

    render(<ProfilePage />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders profile when authenticated', () => {
    useAuth0.mockReturnValue({
      isLoading: false,
      isAuthenticated: true,
      user: {
        picture: 'http://example.com/picture.jpg',
        name: 'John Doe',
        nickname: 'johndoe',
        email: 'john.doe@example.com',
        email_verified: true,
      },
    });

    render(<ProfilePage />);

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByAltText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('johndoe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Email Verified')).toBeInTheDocument();
  });

  it('renders verification message when email is not verified', () => {
    useAuth0.mockReturnValue({
      isLoading: false,
      isAuthenticated: true,
      user: {
        picture: 'http://example.com/picture.jpg',
        name: 'John Doe',
        nickname: 'johndoe',
        email: 'john.doe@example.com',
        email_verified: false,
      },
    });

    render(<ProfilePage />);

    expect(screen.getByText('Email not verified')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /verify email/i })).toBeInTheDocument();
  });

  it('calls handleVerifyEmail when verify button is clicked', () => {
    useAuth0.mockReturnValue({
      isLoading: false,
      isAuthenticated: true,
      user: {
        picture: 'http://example.com/picture.jpg',
        name: 'John Doe',
        nickname: 'johndoe',
        email: 'john.doe@example.com',
        email_verified: false,
      },
    });

    window.alert = jest.fn();

    render(<ProfilePage />);

    fireEvent.click(screen.getByRole('button', { name: /verify email/i }));
    expect(window.alert).toHaveBeenCalledWith('Verification email sent! Please check your inbox.');
  }); 
});

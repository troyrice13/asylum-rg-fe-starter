import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RenderLandingPage from '../components/pages/Landing/RenderLandingPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

test('sanity check', () => {
    expect(false).toBe(false);
});

test('renders landing page correctly', () => {
    render(
        <MemoryRouter>
            <RenderLandingPage />
        </MemoryRouter>
    );

    expect(screen.getByRole('heading', {level: 1, name: /Asylum Office Grant Rate Tracker/i })).toBeInTheDocument();
    expect(screen.getByRole('button',{ name: /View the Data/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Download the Data/i })).toBeInTheDocument();
    expect(screen.getByText(/Systemic Disparity Insights/i)).toBeInTheDocument();
    expect(screen.getByText(/Back to Top/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Read More/i })).toBeInTheDocument();
});

test('navigates to graphs page on button click', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <RenderLandingPage />
      </Router>
    );
  
    const viewDataButton = screen.getByText(/View the Data/i);
    fireEvent.click(viewDataButton);
  
    expect(history.location.pathname).toEqual('/graphs');
  });
  

test('scrolls to top of page when back to top button is clicked', () => {
    render(
        <MemoryRouter>
            <RenderLandingPage />
        </MemoryRouter>
    );

    const backToTopBtn = screen.getByText(/Back To Top/i);
    backToTopBtn.click();

    expect(window.scrollY).toBe(0);
});
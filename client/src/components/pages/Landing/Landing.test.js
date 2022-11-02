import { render, screen } from '@testing-library/react';
import Landing from './Landing';
import { BrowserRouter as Router } from 'react-router-dom';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('Renders page title', () => {
    act(() => {
        render(<Router><Landing /></Router>);
    });
    expect(screen.getByText('Find the perfect job for you')).toBeInTheDocument();
});

it('Renders login / register link', () => {
    act(() => {
        render(<Router><Landing /></Router>);
    });
    expect(screen.getByText('Login / Register')).toBeInTheDocument();
});
it('Correct href link', () => {
    act(() => {
        render(<Router><Landing /></Router>);
    });
    expect(screen.getByRole('link')).toHaveAttribute('href', '/register');
});

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompletedBuilds from './page';

describe('CompletedBuilds Page', () => {
  it('renders the completed builds component', () => {
    render(<CompletedBuilds />);
    expect(screen.getByText('CompletedBuilds')).toBeInTheDocument();
  });

  it('returns a div element', () => {
    render(<CompletedBuilds />);
    const element = screen.getByText('CompletedBuilds');
    expect(element.tagName).toBe('DIV');
  });
});

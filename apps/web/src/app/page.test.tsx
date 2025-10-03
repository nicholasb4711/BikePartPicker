import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './page';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockedLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('BikePartPicker 🚴‍♂️');
  });

  it('renders the main description', () => {
    render(<Home />);
    expect(screen.getByText(/Professional-grade part selection, pricing, and compatibility/)).toBeInTheDocument();
    expect(screen.getByText(/guidance for performance-focused bicycle builders/)).toBeInTheDocument();
  });

  it('renders the call to action button', () => {
    render(<Home />);
    const button = screen.getByRole('button', { name: /start your build/i });
    expect(button).toBeInTheDocument();
  });

  it('links to the builder page', () => {
    render(<Home />);
    const link = screen.getByRole('button', { name: /start your build/i }).closest('a');
    expect(link).toHaveAttribute('href', '/builder');
  });

  it('renders the footer message', () => {
    render(<Home />);
    expect(screen.getByText(/Ready to build your dream machine/)).toBeInTheDocument();
    expect(screen.getByText(/Let's engineer your perfect setup/)).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<Home />);
    
    // Should have main content container
    const mainContainer = screen.getByText('BikePartPicker 🚴‍♂️').closest('div');
    expect(mainContainer).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    render(<Home />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('text-5xl', 'font-bold', 'text-black');
  });
});

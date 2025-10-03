import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Guides from './page';

// Mock the guides data
jest.mock('@/data/guides', () => ({
  getAllGuides: jest.fn(() => [
    {
      id: 'test-guide-1',
      title: 'Test Guide 1',
      description: 'Description for test guide 1',
      category: 'Essential',
      sections: []
    },
    {
      id: 'test-guide-2', 
      title: 'Test Guide 2',
      description: 'Description for test guide 2',
      category: 'Advanced',
      sections: []
    }
  ])
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockedLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe('Guides Page', () => {
  it('renders the main heading', () => {
    render(<Guides />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Build Guides');
  });

  it('renders the main description', () => {
    render(<Guides />);
    expect(screen.getByText(/Learn the essential compatibility rules/)).toBeInTheDocument();
    expect(screen.getByText(/Start with these core guides to avoid costly mistakes/)).toBeInTheDocument();
  });

  it('renders key compatibility rules section', () => {
    render(<Guides />);
    expect(screen.getByText('🚨 Key Compatibility Rules')).toBeInTheDocument();
    expect(screen.getByText('Drivetrain')).toBeInTheDocument();
    expect(screen.getByText('Wheels')).toBeInTheDocument();
    expect(screen.getByText('Frame')).toBeInTheDocument();
  });

  it('renders compatibility rule descriptions', () => {
    render(<Guides />);
    expect(screen.getByText(/Don't mix Shimano and SRAM/)).toBeInTheDocument();
    expect(screen.getByText(/Frame dropouts must match wheel axle standard/)).toBeInTheDocument();
    expect(screen.getByText(/Bottom bracket must match crankset standard/)).toBeInTheDocument();
  });

  it('renders guide cards from data', () => {
    render(<Guides />);
    expect(screen.getByText('Test Guide 1')).toBeInTheDocument();
    expect(screen.getByText('Description for test guide 1')).toBeInTheDocument();
    expect(screen.getByText('Test Guide 2')).toBeInTheDocument();
    expect(screen.getByText('Description for test guide 2')).toBeInTheDocument();
  });

  it('renders guide categories', () => {
    render(<Guides />);
    expect(screen.getAllByText('Essential')).toHaveLength(1);
    expect(screen.getAllByText('Advanced')).toHaveLength(1);
  });

  it('creates correct links for guides', () => {
    render(<Guides />);
    
    const guide1Link = screen.getByText('Test Guide 1').closest('a');
    const guide2Link = screen.getByText('Test Guide 2').closest('a');
    
    expect(guide1Link).toHaveAttribute('href', '/guides/test-guide-1');
    expect(guide2Link).toHaveAttribute('href', '/guides/test-guide-2');
  });

  it('renders call to action section', () => {
    render(<Guides />);
    expect(screen.getByText('Ready to Start Building?')).toBeInTheDocument();
    expect(screen.getByText(/Use our builder tool to select compatible components/)).toBeInTheDocument();
  });

  it('renders launch builder button', () => {
    render(<Guides />);
    const launchButton = screen.getByText('Launch Builder');
    expect(launchButton).toBeInTheDocument();
    
    const buttonLink = launchButton.closest('a');
    expect(buttonLink).toHaveAttribute('href', '/builder');
  });

  it('renders read guide links', () => {
    render(<Guides />);
    const readGuideLinks = screen.getAllByText('Read guide');
    expect(readGuideLinks).toHaveLength(2); // One for each guide
  });

  it('has proper semantic structure', () => {
    render(<Guides />);
    
    // Should have main headings
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent('Build Guides');
    
    // Should have section headings (there might be multiple h2s)
    const sectionHeadings = screen.getAllByRole('heading', { level: 2 });
    expect(sectionHeadings.length).toBeGreaterThan(0);
    expect(sectionHeadings[0]).toHaveTextContent('🚨 Key Compatibility Rules');
  });

  it('applies correct styling classes', () => {
    render(<Guides />);
    
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveClass('text-5xl', 'font-bold', 'text-black');
  });

  it('renders with proper layout structure', () => {
    render(<Guides />);
    
    // Check for main container structure
    const heading = screen.getByText('Build Guides');
    expect(heading).toBeInTheDocument();
    
    // The main wrapper should exist (test that it renders without errors)
    expect(screen.getByText(/Learn the essential compatibility rules/)).toBeInTheDocument();
  });
});

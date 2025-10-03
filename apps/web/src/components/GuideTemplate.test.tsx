import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GuideTemplate from './GuideTemplate';
import { Guide } from '@/data/guides';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockedLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

const simpleGuide: Guide = {
  id: 'test-guide',
  title: 'Test Guide',
  description: 'Simple test guide',
  category: 'Test',
  sections: [
    {
      id: 'basic-section',
      type: 'content',
      title: 'Basic Section',
      content: 'This is basic content'
    }
  ]
};

const complexGuide: Guide = {
  id: 'complex-guide',
  title: 'Complex Guide',
  description: 'Complex test guide',
  category: 'Advanced',
  sections: [
    {
      id: 'warning-section',
      type: 'warning',
      title: 'Warning Section',
      content: 'This is a warning',
      items: ['Warning item 1', 'Warning item 2']
    },
    {
      id: 'info-section',
      type: 'info',
      title: 'Info Section',
      content: 'This is info content',
      gridItems: [
        { title: 'Info Item 1', content: 'Info content 1' },
        { title: 'Info Item 2', content: 'Info content 2', badge: 'Test Badge', badgeColor: 'blue' }
      ]
    },
    {
      id: 'success-section',
      type: 'success',
      title: 'Success Section',
      content: 'Success message'
    },
    {
      id: 'table-section',
      type: 'table',
      title: 'Table Section',
      tableData: {
        headers: ['Component', 'Status'],
        rows: [
          { component: 'Test Component', status: '✅ Working' },
          { component: 'Another Component', status: '❌ Broken' }
        ]
      }
    },
    {
      id: 'grid-section',
      type: 'grid',
      title: 'Grid Section',
      gridItems: [
        { title: 'Grid Item 1', content: 'Grid content 1', badge: 'Active', badgeColor: 'green' },
        { title: 'Grid Item 2', content: 'Grid content 2' }
      ]
    }
  ],
  nextSteps: [
    { title: 'Next Step 1', description: 'First next step', href: '/next-1' },
    { title: 'Next Step 2', description: 'Second next step', href: '/next-2' }
  ]
};

describe('GuideTemplate', () => {
  it('renders guide title and description', () => {
    render(<GuideTemplate guide={simpleGuide} />);
    
    expect(screen.getByText('Test Guide')).toBeInTheDocument();
    expect(screen.getByText('Simple test guide')).toBeInTheDocument();
  });

  it('renders back to guides link', () => {
    render(<GuideTemplate guide={simpleGuide} />);
    
    const backLink = screen.getByText('Back to Guides');
    expect(backLink).toBeInTheDocument();
    expect(backLink.closest('a')).toHaveAttribute('href', '/guides');
  });

  it('renders section content', () => {
    render(<GuideTemplate guide={simpleGuide} />);
    
    expect(screen.getByText('Basic Section')).toBeInTheDocument();
    expect(screen.getByText('This is basic content')).toBeInTheDocument();
  });

  it('renders warning section', () => {
    render(<GuideTemplate guide={complexGuide} />);
    
    expect(screen.getByText('Warning Section')).toBeInTheDocument();
    expect(screen.getByText('This is a warning')).toBeInTheDocument();
    expect(screen.getByText('Warning item 1')).toBeInTheDocument();
    expect(screen.getByText('Warning item 2')).toBeInTheDocument();
  });

  it('renders info section with grid items', () => {
    render(<GuideTemplate guide={complexGuide} />);
    
    expect(screen.getByText('Info Section')).toBeInTheDocument();
    expect(screen.getByText('This is info content')).toBeInTheDocument();
    expect(screen.getByText('Info Item 1')).toBeInTheDocument();
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('renders success section', () => {
    render(<GuideTemplate guide={complexGuide} />);
    
    expect(screen.getByText('Success Section')).toBeInTheDocument();
    expect(screen.getByText('Success message')).toBeInTheDocument();
  });

  it('renders table section', () => {
    render(<GuideTemplate guide={complexGuide} />);
    
    expect(screen.getByText('Table Section')).toBeInTheDocument();
    expect(screen.getByText('Component')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Test Component')).toBeInTheDocument();
    expect(screen.getByText('✅ Working')).toBeInTheDocument();
  });

  it('renders grid section', () => {
    render(<GuideTemplate guide={complexGuide} />);
    
    expect(screen.getByText('Grid Section')).toBeInTheDocument();
    expect(screen.getByText('Grid Item 1')).toBeInTheDocument();
    expect(screen.getByText('Grid content 1')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders next steps when provided', () => {
    render(<GuideTemplate guide={complexGuide} />);
    
    expect(screen.getByText('Next Step 1')).toBeInTheDocument();
    expect(screen.getByText('First next step')).toBeInTheDocument();
    expect(screen.getByText('Next Step 2')).toBeInTheDocument();
    
    const nextStep1Link = screen.getByText('Next Step 1').closest('a');
    expect(nextStep1Link).toHaveAttribute('href', '/next-1');
  });

  it('renders without next steps', () => {
    render(<GuideTemplate guide={simpleGuide} />);
    
    expect(screen.queryByText('Next Step 1')).not.toBeInTheDocument();
    expect(screen.getByText('Test Guide')).toBeInTheDocument();
  });

  it('handles badge colors correctly', () => {
    render(<GuideTemplate guide={complexGuide} />);
    
    // Test that badges with different colors are rendered
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('handles sections without optional properties', () => {
    const minimalGuide: Guide = {
      id: 'minimal',
      title: 'Minimal',
      description: 'Minimal guide',
      category: 'Basic',
      sections: [
        {
          id: 'minimal-section',
          type: 'content',
          title: 'Minimal Section'
          // No content, items, or other optional properties
        }
      ]
    };

    render(<GuideTemplate guide={minimalGuide} />);
    expect(screen.getByText('Minimal Section')).toBeInTheDocument();
  });
});
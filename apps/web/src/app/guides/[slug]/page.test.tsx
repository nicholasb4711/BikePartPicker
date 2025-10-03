import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GuidePage, { generateStaticParams } from './page';

// Mock the dependencies
jest.mock('next/navigation', () => ({
  notFound: jest.fn()
}));

jest.mock('@/data/guides', () => ({
  getGuideBySlug: jest.fn(),
  getAllGuides: jest.fn(() => [
    { id: 'guide-1', title: 'Guide 1' },
    { id: 'guide-2', title: 'Guide 2' }
  ])
}));

jest.mock('@/components/GuideTemplate', () => {
  return function MockGuideTemplate({ guide }: { guide: any }) {
    return <div data-testid="guide-template">Guide Template: {guide?.title || 'Loading'}</div>;
  };
});

const { getGuideBySlug } = require('@/data/guides');

const mockGuide = {
  id: 'test-guide',
  title: 'Test Guide',
  description: 'Test description',
  category: 'Test',
  sections: []
};

describe('GuidePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders GuideTemplate when guide exists', () => {
    getGuideBySlug.mockReturnValue(mockGuide);
    
    render(<GuidePage params={{ slug: 'test-guide' }} />);
    
    expect(screen.getByTestId('guide-template')).toBeInTheDocument();
    expect(screen.getByText(/Test Guide/)).toBeInTheDocument();
  });

  it('passes correct slug to getGuideBySlug', () => {
    getGuideBySlug.mockReturnValue(mockGuide);
    
    render(<GuidePage params={{ slug: 'specific-slug' }} />);
    
    expect(getGuideBySlug).toHaveBeenCalledWith('specific-slug');
  });
});

describe('generateStaticParams', () => {
  it('returns array of slug objects', async () => {
    const result = await generateStaticParams();
    
    expect(result).toEqual([
      { slug: 'guide-1' },
      { slug: 'guide-2' }
    ]);
  });
});
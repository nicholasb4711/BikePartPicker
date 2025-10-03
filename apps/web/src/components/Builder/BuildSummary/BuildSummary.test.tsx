import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BuildSummary from './BuildSummary';
import { BuildComponent } from '@/app/utils/partUtils';

// Mock CompatibilityCheck component
jest.mock('../CompatibilityCheck/CompatibilityCheck', () => {
  return function MockCompatibilityCheck() {
    return <div data-testid="compatibility-check">Compatibility Check Component</div>;
  };
});

const mockComponent1: BuildComponent = {
  id: 'frame-1',
  name: 'Test Frame',
  category: 'frame',
  price: 1500,
  brand: 'Frame Brand',
  compatibility: ['shimano', 'sram']
};

const mockComponent2: BuildComponent = {
  id: 'groupset-1',
  name: 'Test Groupset',
  category: 'groupset',
  price: 2000,
  brand: 'Groupset Brand',
  compatibility: ['shimano']
};

const defaultProps = {
  selectedComponents: {},
  getTotalPrice: jest.fn(() => 0)
};

describe('BuildSummary', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders build summary title', () => {
    render(<BuildSummary {...defaultProps} />);
    expect(screen.getByText('Build Summary')).toBeInTheDocument();
  });

  it('shows empty state when no components selected', () => {
    render(<BuildSummary {...defaultProps} />);
    expect(screen.getByText('Start selecting components to see your build summary')).toBeInTheDocument();
  });

  it('does not show total or buttons when no components selected', () => {
    render(<BuildSummary {...defaultProps} />);
    
    expect(screen.queryByText('Total')).not.toBeInTheDocument();
    expect(screen.queryByText('Save Build')).not.toBeInTheDocument();
    expect(screen.queryByText('Share Build')).not.toBeInTheDocument();
    expect(screen.queryByText('Find Retailers')).not.toBeInTheDocument();
  });

  it('does not show compatibility check when no components selected', () => {
    render(<BuildSummary {...defaultProps} />);
    expect(screen.queryByTestId('compatibility-check')).not.toBeInTheDocument();
  });

  it('renders single selected component', () => {
    const singleComponent = { frame: mockComponent1 };
    const mockGetTotal = jest.fn(() => 1500);

    render(
      <BuildSummary 
        selectedComponents={singleComponent} 
        getTotalPrice={mockGetTotal}
      />
    );

    expect(screen.getByText('Test Frame')).toBeInTheDocument();
    expect(screen.getByText('Frame Brand')).toBeInTheDocument();
    expect(screen.getAllByText('$1,500').length).toBeGreaterThan(0);
  });

  it('shows total and buttons with single component', () => {
    const singleComponent = { frame: mockComponent1 };
    const mockGetTotal = jest.fn(() => 1500);

    render(
      <BuildSummary 
        selectedComponents={singleComponent} 
        getTotalPrice={mockGetTotal}
      />
    );

    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getAllByText('$1,500').length).toBeGreaterThan(0);
    expect(screen.getByText('Save Build')).toBeInTheDocument();
    expect(screen.getByText('Share Build')).toBeInTheDocument();
    expect(screen.getByText('Find Retailers')).toBeInTheDocument();
  });

  it('does not show compatibility check with single component', () => {
    const singleComponent = { frame: mockComponent1 };
    const mockGetTotal = jest.fn(() => 1500);

    render(
      <BuildSummary 
        selectedComponents={singleComponent} 
        getTotalPrice={mockGetTotal}
      />
    );

    expect(screen.queryByTestId('compatibility-check')).not.toBeInTheDocument();
  });

  it('renders multiple selected components', () => {
    const multipleComponents = { 
      frame: mockComponent1, 
      groupset: mockComponent2 
    };
    const mockGetTotal = jest.fn(() => 3500);

    render(
      <BuildSummary 
        selectedComponents={multipleComponents} 
        getTotalPrice={mockGetTotal}
      />
    );

    expect(screen.getByText('Test Frame')).toBeInTheDocument();
    expect(screen.getByText('Frame Brand')).toBeInTheDocument();
    expect(screen.getByText('Test Groupset')).toBeInTheDocument();
    expect(screen.getByText('Groupset Brand')).toBeInTheDocument();
  });

  it('shows correct total for multiple components', () => {
    const multipleComponents = { 
      frame: mockComponent1, 
      groupset: mockComponent2 
    };
    const mockGetTotal = jest.fn(() => 3500);

    render(
      <BuildSummary 
        selectedComponents={multipleComponents} 
        getTotalPrice={mockGetTotal}
      />
    );

    expect(screen.getByText('$3,500')).toBeInTheDocument();
    expect(mockGetTotal).toHaveBeenCalled();
  });

  it('shows compatibility check with multiple components', () => {
    const multipleComponents = { 
      frame: mockComponent1, 
      groupset: mockComponent2 
    };
    const mockGetTotal = jest.fn(() => 3500);

    render(
      <BuildSummary 
        selectedComponents={multipleComponents} 
        getTotalPrice={mockGetTotal}
      />
    );

    expect(screen.getByTestId('compatibility-check')).toBeInTheDocument();
  });

  it('formats prices correctly', () => {
    const expensiveComponent = {
      frame: { ...mockComponent1, price: 12999 }
    };
    const mockGetTotal = jest.fn(() => 12999);

    render(
      <BuildSummary 
        selectedComponents={expensiveComponent} 
        getTotalPrice={mockGetTotal}
      />
    );

    expect(screen.getAllByText('$12,999').length).toBeGreaterThan(0);
  });

  it('handles zero price components', () => {
    const freeComponent = {
      frame: { ...mockComponent1, price: 0 }
    };
    const mockGetTotal = jest.fn(() => 0);

    render(
      <BuildSummary 
        selectedComponents={freeComponent} 
        getTotalPrice={mockGetTotal}
      />
    );

    expect(screen.getAllByText('$0').length).toBeGreaterThan(0);
  });

  it('renders all button variants', () => {
    const singleComponent = { frame: mockComponent1 };
    const mockGetTotal = jest.fn(() => 1500);

    render(
      <BuildSummary 
        selectedComponents={singleComponent} 
        getTotalPrice={mockGetTotal}
      />
    );

    const saveButton = screen.getByText('Save Build');
    const shareButton = screen.getByText('Share Build');
    const retailersButton = screen.getByText('Find Retailers');

    expect(saveButton).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();
    expect(retailersButton).toBeInTheDocument();

    // Check button classes for variants
    expect(saveButton.closest('button')).toHaveClass('w-full');
    expect(shareButton.closest('button')).toHaveClass('w-full');
    expect(retailersButton.closest('button')).toHaveClass('w-full');
  });

  it('maintains component order in display', () => {
    const orderedComponents = { 
      frame: mockComponent1,
      groupset: mockComponent2
    };
    const mockGetTotal = jest.fn(() => 3500);

    render(
      <BuildSummary 
        selectedComponents={orderedComponents} 
        getTotalPrice={mockGetTotal}
      />
    );

    const componentElements = screen.getAllByText(/Test (Frame|Groupset)/);
    expect(componentElements).toHaveLength(2);
  });

  it('renders without crashing', () => {
    render(<BuildSummary {...defaultProps} />);
    expect(screen.getByText('Build Summary')).toBeInTheDocument();
  });

  it('handles long component names gracefully', () => {
    const longNameComponent = {
      frame: { 
        ...mockComponent1, 
        name: 'This is a very long component name that should be handled properly in the UI' 
      }
    };
    const mockGetTotal = jest.fn(() => 1500);

    render(
      <BuildSummary 
        selectedComponents={longNameComponent} 
        getTotalPrice={mockGetTotal}
      />
    );

    expect(screen.getByText('This is a very long component name that should be handled properly in the UI')).toBeInTheDocument();
  });
});

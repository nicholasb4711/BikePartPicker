import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Builder from './page';

// Mock child components
jest.mock('@/components/Builder/BuildProgress/BuildProgress', () => {
  return function MockBuildProgress(props: any) {
    return (
      <div data-testid="build-progress">
        <span>Current Step: {props.currentStep}</span>
        <button onClick={() => props.setCurrentStep(1)}>Set Step 1</button>
        <button onClick={() => props.handleComponentSelect({ id: 'test', category: 'frame', price: 100 })}>
          Select Component
        </button>
      </div>
    );
  };
});

jest.mock('@/components/Builder/BuildSummary/BuildSummary', () => {
  return function MockBuildSummary(props: any) {
    const componentCount = Object.keys(props.selectedComponents).length;
    return (
      <div data-testid="build-summary">
        <span>Components: {componentCount}</span>
        <span>Total: ${props.getTotalPrice()}</span>
      </div>
    );
  };
});

describe('Builder Page', () => {
  it('renders the main heading', () => {
    render(<Builder />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Build Your Dream Bike');
  });

  it('renders the description', () => {
    render(<Builder />);
    expect(screen.getByText(/Configure your perfect road bike/)).toBeInTheDocument();
  });

  it('renders BuildProgress component', () => {
    render(<Builder />);
    expect(screen.getByTestId('build-progress')).toBeInTheDocument();
  });

  it('renders BuildSummary component', () => {
    render(<Builder />);
    expect(screen.getByTestId('build-summary')).toBeInTheDocument();
  });

  it('initializes with step 0', () => {
    render(<Builder />);
    expect(screen.getByText('Current Step: 0')).toBeInTheDocument();
  });

  it('initializes with no components', () => {
    render(<Builder />);
    expect(screen.getByText('Components: 0')).toBeInTheDocument();
  });

  it('initializes with zero total price', () => {
    render(<Builder />);
    expect(screen.getByText('Total: $0')).toBeInTheDocument();
  });

  it('updates current step when setCurrentStep is called', () => {
    render(<Builder />);
    
    const setStepButton = screen.getByText('Set Step 1');
    fireEvent.click(setStepButton);
    
    expect(screen.getByText('Current Step: 1')).toBeInTheDocument();
  });

  it('handles component selection and updates state', () => {
    render(<Builder />);
    
    // Initially no components
    expect(screen.getByText('Components: 0')).toBeInTheDocument();
    expect(screen.getByText('Total: $0')).toBeInTheDocument();
    
    // Select a component
    const selectComponentButton = screen.getByText('Select Component');
    fireEvent.click(selectComponentButton);
    
    // Should now have 1 component and price of $100
    expect(screen.getByText('Components: 1')).toBeInTheDocument();
    expect(screen.getByText('Total: $100')).toBeInTheDocument();
  });

  it('calculates total price correctly with multiple components', () => {
    render(<Builder />);
    
    // Select multiple components by clicking multiple times
    const selectComponentButton = screen.getByText('Select Component');
    
    // First component
    fireEvent.click(selectComponentButton);
    expect(screen.getByText('Total: $100')).toBeInTheDocument();
    
    // Select another component (this will replace the first since they have the same category)
    fireEvent.click(selectComponentButton);
    expect(screen.getByText('Total: $100')).toBeInTheDocument(); // Still $100 since it replaces
  });

  it('has proper layout structure', () => {
    render(<Builder />);
    
    const heading = screen.getByText('Build Your Dream Bike');
    expect(heading).toBeInTheDocument();
    
    // Should have both main components
    expect(screen.getByTestId('build-progress')).toBeInTheDocument();
    expect(screen.getByTestId('build-summary')).toBeInTheDocument();
  });

  it('maintains state correctly across interactions', () => {
    render(<Builder />);
    
    // Change step
    const setStepButton = screen.getByText('Set Step 1');
    fireEvent.click(setStepButton);
    
    // Select component
    const selectComponentButton = screen.getByText('Select Component');
    fireEvent.click(selectComponentButton);
    
    // Both state changes should persist
    expect(screen.getByText('Current Step: 1')).toBeInTheDocument();
    expect(screen.getByText('Components: 1')).toBeInTheDocument();
    expect(screen.getByText('Total: $100')).toBeInTheDocument();
  });
});
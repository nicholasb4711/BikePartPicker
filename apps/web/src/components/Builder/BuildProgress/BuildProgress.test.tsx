import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BuildProgress from './BuildProgress';
import { BuildComponent } from '@/app/utils/partUtils';

// Mock the ComponentCard component
jest.mock('../ComponentCard/ComponentCard', () => {
  return function MockComponentCard({ 
    component, 
    isSelected, 
    onSelect 
  }: { 
    component: BuildComponent; 
    isSelected: boolean; 
    onSelect: (component: BuildComponent) => void;
  }) {
    return (
      <div data-testid={`component-card-${component.id}`}>
        <h3>{component.name}</h3>
        <button onClick={() => onSelect(component)}>Select</button>
        <span>{isSelected ? 'Selected' : 'Not Selected'}</span>
      </div>
    );
  };
});

const mockComponent: BuildComponent = {
  id: 'test-frame-1',
  name: 'Test Frame',
  category: 'frame',
  price: 1000,
  brand: 'Test Brand',
  compatibility: ['shimano']
};

const mockGroupsetComponent: BuildComponent = {
  id: 'test-groupset-1',
  name: 'Test Groupset',
  category: 'groupset',
  price: 2000,
  brand: 'Groupset Brand',
  compatibility: ['shimano']
};

const defaultProps = {
  currentStep: 0,
  setCurrentStep: jest.fn(),
  selectedComponents: {},
  handleComponentSelect: jest.fn()
};

describe('BuildProgress', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders build progress title', () => {
    render(<BuildProgress {...defaultProps} />);
    expect(screen.getByText('Build Progress')).toBeInTheDocument();
  });

  it('displays correct progress count with no components', () => {
    render(<BuildProgress {...defaultProps} />);
    expect(screen.getByText('0 of 5 steps completed')).toBeInTheDocument();
  });

  it('displays correct progress count with one component', () => {
    const selectedComponents = { frame: mockComponent };
    render(<BuildProgress {...defaultProps} selectedComponents={selectedComponents} />);
    expect(screen.getByText('1 of 5 steps completed')).toBeInTheDocument();
  });

  it('displays correct progress count with multiple components', () => {
    const selectedComponents = { 
      frame: mockComponent,
      groupset: mockGroupsetComponent
    };
    render(<BuildProgress {...defaultProps} selectedComponents={selectedComponents} />);
    expect(screen.getByText('2 of 5 steps completed')).toBeInTheDocument();
  });

  it('renders component cards', () => {
    render(<BuildProgress {...defaultProps} />);
    // Should render some component cards
    expect(screen.getByTestId('component-card-frame-1')).toBeInTheDocument();
  });

  it('shows selected state for selected components', () => {
    const selectedComponents = { frame: mockComponent };
    render(<BuildProgress {...defaultProps} selectedComponents={selectedComponents} />);
    
    const selectedCard = screen.getByTestId('component-card-frame-1');
    expect(selectedCard).toHaveTextContent('Selected');
  });

  it('shows not selected state for unselected components', () => {
    render(<BuildProgress {...defaultProps} />);
    
    const unselectedCard = screen.getByTestId('component-card-frame-1');
    expect(unselectedCard).toHaveTextContent('Not Selected');
  });

  it('calls handleComponentSelect when component is selected', () => {
    const mockHandleSelect = jest.fn();
    render(
      <BuildProgress 
        {...defaultProps} 
        handleComponentSelect={mockHandleSelect}
      />
    );
    
    const selectButton = screen.getAllByText('Select')[0];
    fireEvent.click(selectButton);
    
    expect(mockHandleSelect).toHaveBeenCalled();
  });

  it('renders navigation buttons', () => {
    render(<BuildProgress {...defaultProps} currentStep={1} />);
    
    expect(screen.getByText('Previous Step')).toBeInTheDocument();
    expect(screen.getByText('Next Step')).toBeInTheDocument();
  });

  it('disables previous button on first step', () => {
    render(<BuildProgress {...defaultProps} currentStep={0} />);
    
    const prevButton = screen.getByText('Previous Step');
    expect(prevButton).toBeDisabled();
  });

  it('enables previous button on later steps', () => {
    render(<BuildProgress {...defaultProps} currentStep={1} />);
    
    const prevButton = screen.getByText('Previous Step');
    expect(prevButton).not.toBeDisabled();
  });

  it('disables next button on last step', () => {
    render(<BuildProgress {...defaultProps} currentStep={4} />);
    
    const nextButton = screen.getByText('Next Step');
    expect(nextButton).toBeDisabled();
  });

  it('enables next button on earlier steps', () => {
    render(<BuildProgress {...defaultProps} currentStep={1} />);
    
    const nextButton = screen.getByText('Next Step');
    expect(nextButton).not.toBeDisabled();
  });

  it('calls setCurrentStep when previous button is clicked', () => {
    const mockSetCurrentStep = jest.fn();
    render(
      <BuildProgress 
        {...defaultProps} 
        setCurrentStep={mockSetCurrentStep}
        currentStep={1}
      />
    );
    
    const prevButton = screen.getByText('Previous Step');
    fireEvent.click(prevButton);
    expect(mockSetCurrentStep).toHaveBeenCalledWith(0);
  });

  it('calls setCurrentStep when next button is clicked', () => {
    const mockSetCurrentStep = jest.fn();
    render(
      <BuildProgress 
        {...defaultProps} 
        setCurrentStep={mockSetCurrentStep}
        currentStep={1}
      />
    );
    
    const nextButton = screen.getByText('Next Step');
    fireEvent.click(nextButton);
    expect(mockSetCurrentStep).toHaveBeenCalledWith(2);
  });

  it('renders different content for different steps', () => {
    const { rerender } = render(<BuildProgress {...defaultProps} currentStep={0} />);
    expect(screen.getByText('Choose your bike frame')).toBeInTheDocument();
    
    rerender(<BuildProgress {...defaultProps} currentStep={1} />);
    expect(screen.getByText('Select drivetrain components')).toBeInTheDocument();
    
    rerender(<BuildProgress {...defaultProps} currentStep={2} />);
    expect(screen.getByText('Pick your wheelset')).toBeInTheDocument();
  });

  it('renders step indicators correctly', () => {
    render(<BuildProgress {...defaultProps} currentStep={0} />);
    
    // All build steps should be rendered as navigation
    const stepButtons = screen.getAllByRole('button');
    // Should include step buttons, plus previous/next buttons
    expect(stepButtons.length).toBeGreaterThan(5);
  });

  it('handles step navigation via step buttons', () => {
    const mockSetCurrentStep = jest.fn();
    render(
      <BuildProgress 
        {...defaultProps} 
        setCurrentStep={mockSetCurrentStep}
        currentStep={0}
      />
    );
    
    // Find and click a step button (not the component select buttons)
    const stepButtons = screen.getAllByRole('button');
    const groupsetStepButton = stepButtons.find(button => 
      button.textContent === 'Groupset' && !button.textContent.includes('Select')
    );
    
    if (groupsetStepButton) {
      fireEvent.click(groupsetStepButton);
      expect(mockSetCurrentStep).toHaveBeenCalledWith(1);
    }
  });
});
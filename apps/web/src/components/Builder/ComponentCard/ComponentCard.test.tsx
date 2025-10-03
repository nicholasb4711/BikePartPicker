import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ComponentCard from './ComponentCard';
import { BuildComponent } from '@/app/utils/partUtils';

const mockComponent: BuildComponent = {
  id: 'test-component-1',
  name: 'Test Component',
  category: 'frame',
  price: 1299,
  brand: 'Test Brand',
  compatibility: ['shimano', 'sram', '12-speed']
};

const defaultProps = {
  component: mockComponent,
  isSelected: false,
  onSelect: jest.fn()
};

describe('ComponentCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders component name', () => {
    render(<ComponentCard {...defaultProps} />);
    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });

  it('renders component brand', () => {
    render(<ComponentCard {...defaultProps} />);
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
  });

  it('renders formatted price', () => {
    render(<ComponentCard {...defaultProps} />);
    expect(screen.getByText('$1,299')).toBeInTheDocument();
  });

  it('renders compatibility tags', () => {
    render(<ComponentCard {...defaultProps} />);
    
    expect(screen.getByText('shimano')).toBeInTheDocument();
    expect(screen.getByText('sram')).toBeInTheDocument();
    expect(screen.getByText('12-speed')).toBeInTheDocument();
  });

  it('shows selected state when isSelected is true', () => {
    render(<ComponentCard {...defaultProps} isSelected={true} />);
    
    expect(screen.getByText('Selected')).toBeInTheDocument();
  });

  it('does not show selected state when isSelected is false', () => {
    render(<ComponentCard {...defaultProps} isSelected={false} />);
    
    expect(screen.queryByText('Selected')).not.toBeInTheDocument();
  });

  it('calls onSelect when card is clicked', () => {
    const mockOnSelect = jest.fn();
    render(<ComponentCard {...defaultProps} onSelect={mockOnSelect} />);
    
    const card = screen.getByText('Test Component').closest('div');
    fireEvent.click(card!);
    
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(mockComponent);
  });

  it('handles zero price', () => {
    const freeComponent = { ...mockComponent, price: 0 };
    render(<ComponentCard {...defaultProps} component={freeComponent} />);
    
    expect(screen.getByText('$0')).toBeInTheDocument();
  });
});
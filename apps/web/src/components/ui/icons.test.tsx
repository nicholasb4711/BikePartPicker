import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CheckIcon } from './icons';

describe('CheckIcon', () => {
  it('renders without crashing', () => {
    render(<CheckIcon />);
  });

  it('applies default className', () => {
    const { container } = render(<CheckIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('w-4', 'h-4');
  });

  it('applies custom className', () => {
    const { container } = render(<CheckIcon className="w-8 h-8 text-green-500" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('w-8', 'h-8', 'text-green-500');
  });

  it('renders as SVG element', () => {
    const { container } = render(<CheckIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.tagName).toBe('svg');
  });

  it('has correct viewBox', () => {
    const { container } = render(<CheckIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 20 20');
  });

  it('has currentColor fill', () => {
    const { container } = render(<CheckIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('fill', 'currentColor');
  });

  it('contains a path element', () => {
    const { container } = render(<CheckIcon />);
    const path = container.querySelector('path');
    expect(path).toBeInTheDocument();
  });
});

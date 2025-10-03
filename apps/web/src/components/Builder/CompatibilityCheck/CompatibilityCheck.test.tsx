import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompatibilityCheck from './CompatibilityCheck';

describe('CompatibilityCheck', () => {
  it('renders compatibility check title', () => {
    render(<CompatibilityCheck />);
    expect(screen.getByText('Compatibility Check')).toBeInTheDocument();
  });

  it('shows compatible message', () => {
    render(<CompatibilityCheck />);
    expect(screen.getByText('All components compatible')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    render(<CompatibilityCheck />);
    expect(screen.getByText('Your selected components work perfectly together')).toBeInTheDocument();
  });
});

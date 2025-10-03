import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ComponentSelector from './ComponentSelector';

describe('ComponentSelector', () => {
  it('renders component selector placeholder', () => {
    render(<ComponentSelector />);
    expect(screen.getByText('ComponentSelector')).toBeInTheDocument();
  });
});

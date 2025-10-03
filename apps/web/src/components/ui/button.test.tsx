import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './button'

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-primary-600', 'text-white', 'h-10')
  })

  it('renders with primary variant', () => {
    render(<Button variant="primary">Primary Button</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-primary-600', 'text-white')
  })

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-secondary-100', 'text-secondary-900')
  })

  it('renders with outline variant', () => {
    render(<Button variant="outline">Outline Button</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('border', 'border-secondary-300', 'bg-transparent')
  })

  it('renders with small size', () => {
    render(<Button size="sm">Small Button</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('h-8', 'px-3', 'text-sm')
  })

  it('renders with medium size (default)', () => {
    render(<Button size="md">Medium Button</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('h-10', 'px-4', 'py-2')
  })

  it('renders with large size', () => {
    render(<Button size="lg">Large Button</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('h-12', 'px-6', 'text-lg')
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    
    render(<Button onClick={handleClick}>Clickable Button</Button>)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50')
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Ref Button</Button>)
    
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('supports all button HTML attributes', () => {
    render(
      <Button 
        type="submit" 
        form="test-form" 
        aria-label="Submit form"
        data-testid="submit-button"
      >
        Submit
      </Button>
    )
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'submit')
    expect(button).toHaveAttribute('form', 'test-form')
    expect(button).toHaveAttribute('aria-label', 'Submit form')
    expect(button).toHaveAttribute('data-testid', 'submit-button')
  })
})

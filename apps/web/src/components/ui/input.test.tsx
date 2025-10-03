import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './input'

describe('Input Component', () => {
  it('renders with default props', () => {
    render(<Input />)
    
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass(
      'flex', 'h-10', 'w-full', 'rounded-md', 'border', 'border-secondary-300', 'bg-white'
    )
  })

  it('renders with label', () => {
    render(<Input label="Email Address" />)
    
    const label = screen.getByText('Email Address')
    const input = screen.getByRole('textbox')
    
    expect(label).toBeInTheDocument()
    expect(input).toBeInTheDocument()
  })

  it('renders with error message', () => {
    render(<Input error="This field is required" />)
    
    const input = screen.getByRole('textbox')
    const errorMessage = screen.getByText('This field is required')
    
    expect(input).toHaveClass('border-red-500', 'focus-visible:ring-red-500')
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveClass('text-sm', 'text-red-600')
  })

  it('renders with both label and error', () => {
    render(<Input label="Password" error="Password is too short" />)
    
    const label = screen.getByText('Password')
    const input = screen.getByRole('textbox')
    const errorMessage = screen.getByText('Password is too short')
    
    expect(label).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(errorMessage).toBeInTheDocument()
  })

  it('handles user input', async () => {
    const user = userEvent.setup()
    render(<Input placeholder="Enter text" />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, 'Hello World')
    
    expect(input).toHaveValue('Hello World')
  })

  it('handles onChange events', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    
    render(<Input onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, 'test')
    
    expect(handleChange).toHaveBeenCalledTimes(4) // Once for each character
  })

  it('supports different input types', () => {
    render(<Input type="email" placeholder="email@example.com" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('supports password type', () => {
    render(<Input type="password" data-testid="password-input" />)
    
    const input = screen.getByTestId('password-input')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'password')
  })

  it('applies custom className', () => {
    render(<Input className="custom-input" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('custom-input')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} />)
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('supports all input HTML attributes', () => {
    render(
      <Input 
        placeholder="Enter value"
        required
        maxLength={50}
        aria-describedby="help-text"
        data-testid="test-input"
      />
    )
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('placeholder', 'Enter value')
    expect(input).toHaveAttribute('required')
    expect(input).toHaveAttribute('maxLength', '50')
    expect(input).toHaveAttribute('aria-describedby', 'help-text')
    expect(input).toHaveAttribute('data-testid', 'test-input')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled />)
    
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
  })

  it('has proper focus styles', async () => {
    const user = userEvent.setup()
    render(<Input />)
    
    const input = screen.getByRole('textbox')
    await user.click(input)
    
    expect(input).toHaveFocus()
  })

  it('renders without error styles when no error', () => {
    render(<Input />)
    
    const input = screen.getByRole('textbox')
    expect(input).not.toHaveClass('border-red-500')
    expect(input).toHaveClass('border-secondary-300')
  })
})

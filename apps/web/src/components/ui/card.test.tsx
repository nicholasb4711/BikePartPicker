import React from 'react'
import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardContent } from './card'

describe('Card Component', () => {
  it('renders with default variant', () => {
    render(<Card data-testid="card">Card content</Card>)
    
    const card = screen.getByTestId('card')
    expect(card).toBeInTheDocument()
    expect(card).toHaveTextContent('Card content')
  })

  it('renders with different variants', () => {
    render(
      <div>
        <Card variant="default" data-testid="default-card">Default content</Card>
        <Card variant="outlined" data-testid="outlined-card">Outlined content</Card>
        <Card variant="elevated" data-testid="elevated-card">Elevated content</Card>
      </div>
    )
    
    expect(screen.getByTestId('default-card')).toHaveTextContent('Default content')
    expect(screen.getByTestId('outlined-card')).toHaveTextContent('Outlined content')
    expect(screen.getByTestId('elevated-card')).toHaveTextContent('Elevated content')
  })

  it('applies custom className', () => {
    render(<Card className="custom-class" data-testid="card">Card content</Card>)
    
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Card ref={ref}>Card content</Card>)
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('supports all div HTML attributes', () => {
    render(
      <Card 
        role="region" 
        aria-label="Card region"
        data-testid="card"
      >
        Card content
      </Card>
    )
    
    const card = screen.getByTestId('card')
    expect(card).toHaveAttribute('role', 'region')
    expect(card).toHaveAttribute('aria-label', 'Card region')
  })
})

describe('CardHeader Component', () => {
  it('renders header content', () => {
    render(<CardHeader data-testid="card-header">Header content</CardHeader>)
    
    const header = screen.getByTestId('card-header')
    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent('Header content')
  })

  it('applies custom className', () => {
    render(<CardHeader className="custom-header" data-testid="card-header">Header</CardHeader>)
    
    const header = screen.getByTestId('card-header')
    expect(header).toHaveClass('custom-header')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<CardHeader ref={ref}>Header content</CardHeader>)
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})

describe('CardContent Component', () => {
  it('renders with default styling', () => {
    render(<CardContent data-testid="card-content">Content</CardContent>)
    
    const content = screen.getByTestId('card-content')
    expect(content).toBeInTheDocument()
    expect(content).toHaveClass('p-6', 'pt-0')
  })

  it('applies custom className', () => {
    render(<CardContent className="custom-content" data-testid="card-content">Content</CardContent>)
    
    const content = screen.getByTestId('card-content')
    expect(content).toHaveClass('custom-content')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<CardContent ref={ref}>Content</CardContent>)
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})

describe('Card Components Integration', () => {
  it('renders complete card with header and content', () => {
    render(
      <Card variant="elevated" data-testid="complete-card">
        <CardHeader data-testid="header">
          <h2>Card Title</h2>
          <p>Card description</p>
        </CardHeader>
        <CardContent data-testid="content">
          <p>Card body content</p>
        </CardContent>
      </Card>
    )
    
    const card = screen.getByTestId('complete-card')
    const header = screen.getByTestId('header')
    const content = screen.getByTestId('content')
    
    expect(card).toBeInTheDocument()
    expect(header).toBeInTheDocument()
    expect(content).toBeInTheDocument()
    
    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card description')).toBeInTheDocument()
    expect(screen.getByText('Card body content')).toBeInTheDocument()
  })
})

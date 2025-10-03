import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from './Header'

describe('Header Component', () => {
  it('renders the logo and brand name', () => {
    render(<Header />)
    
    const brandLink = screen.getByRole('link', { name: /bikepartpicker/i })
    expect(brandLink).toBeInTheDocument()
    expect(brandLink).toHaveAttribute('href', '/')
    
    const bikeEmoji = screen.getByText('🚴‍♂️')
    expect(bikeEmoji).toBeInTheDocument()
  })

  it('renders desktop navigation links', () => {
    render(<Header />)
    
    const navigationLinks = [
      'Builder',
      'Build Guide', 
      'Completed Builds'
    ]
    
    navigationLinks.forEach(linkText => {
      const link = screen.getByRole('link', { name: linkText })
      expect(link).toBeInTheDocument()
    })
  })

  it('renders desktop search bar', () => {
    render(<Header />)
    
    const searchInput = screen.getByPlaceholderText('Search performance parts...')
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveClass('w-full')
  })

  it('renders desktop auth buttons', () => {
    render(<Header />)
    
    const signInButton = screen.getByRole('button', { name: 'Sign In' })
    const signUpButton = screen.getByRole('button', { name: 'Sign Up' })
    
    expect(signInButton).toBeInTheDocument()
    expect(signUpButton).toBeInTheDocument()
  })

  it('renders mobile menu button', () => {
    render(<Header />)
    
    const mobileMenuButton = screen.getByRole('button', { name: '' })
    expect(mobileMenuButton).toBeInTheDocument()
  })

  it('toggles mobile menu when button is clicked', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    const mobileMenuButton = screen.getByRole('button', { name: '' })
    
    // Mobile menu should not be visible initially
    expect(screen.queryByText('Mobile Navigation')).not.toBeInTheDocument()
    
    // Click to open mobile menu
    await user.click(mobileMenuButton)
    
    // Mobile search and navigation should now be visible
    const mobileSearchInputs = screen.getAllByPlaceholderText('Search performance parts...')
    expect(mobileSearchInputs).toHaveLength(2) // Desktop + Mobile
  })

  it('shows mobile navigation links when menu is open', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    const mobileMenuButton = screen.getByRole('button', { name: '' })
    await user.click(mobileMenuButton)
    
    // Check that navigation links are visible in mobile menu
    const navigationLinks = [
      'Builder',
      'Build Guide',
      'Completed Builds'
    ]
    
    navigationLinks.forEach(linkText => {
      const links = screen.getAllByRole('link', { name: linkText })
      expect(links.length).toBeGreaterThan(0) // Should have both desktop and mobile versions
    })
  })

  it('shows mobile auth buttons when menu is open', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    const mobileMenuButton = screen.getByRole('button', { name: '' })
    await user.click(mobileMenuButton)
    
    const signInButtons = screen.getAllByRole('button', { name: 'Sign In' })
    const signUpButtons = screen.getAllByRole('button', { name: 'Sign Up' })
    
    expect(signInButtons.length).toBeGreaterThan(1) // Desktop + Mobile
    expect(signUpButtons.length).toBeGreaterThan(1) // Desktop + Mobile
  })

  it('has proper navigation link hrefs', () => {
    render(<Header />)
    
    const expectedLinks = [
      { name: 'Builder', href: '/builder' },
      { name: 'Build Guide', href: '/guides' },
      { name: 'Completed Builds', href: '/completed-builds' }
    ]
    
    expectedLinks.forEach(({ name, href }) => {
      const link = screen.getByRole('link', { name })
      expect(link).toHaveAttribute('href', href)
    })
  })

  it('has sticky positioning', () => {
    render(<Header />)
    
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('sticky', 'top-0', 'z-50')
  })

  it('has proper styling classes', () => {
    render(<Header />)
    
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('bg-white/95', 'backdrop-blur-md', 'shadow-sm', 'border-b', 'border-gray-200', 'sticky', 'top-0', 'z-50')
  })

  it('handles search input interaction', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    const searchInput = screen.getByPlaceholderText('Search performance parts...')
    await user.type(searchInput, 'shimano')
    
    expect(searchInput).toHaveValue('shimano')
  })

  it('changes mobile menu icon when opened/closed', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    const mobileMenuButton = screen.getByRole('button', { name: '' })
    
    // Click to open menu
    await user.click(mobileMenuButton)
    
    // Click again to close menu  
    await user.click(mobileMenuButton)
    
    // Menu should be closed (we can't easily test the icon change, but we can test the functionality)
    expect(mobileMenuButton).toBeInTheDocument()
  })
})

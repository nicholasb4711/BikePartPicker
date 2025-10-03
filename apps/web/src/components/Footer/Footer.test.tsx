import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Footer from './Footer'

describe('Footer Component', () => {
  it('renders the brand section with logo and description', () => {
    render(<Footer />)
    
    const brandName = screen.getByText('BikePartPicker')
    const bikeEmoji = screen.getByText('🚴‍♂️')
    const description = screen.getByText(/Build your perfect road bike with compatible parts/i)
    
    expect(brandName).toBeInTheDocument()
    expect(bikeEmoji).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('renders newsletter signup section', () => {
    render(<Footer />)
    
    const newsletterHeading = screen.getByText('Stay Updated')
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const subscribeButton = screen.getByRole('button', { name: 'Subscribe' })
    
    expect(newsletterHeading).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(subscribeButton).toBeInTheDocument()
  })

  it('renders product links section', () => {
    render(<Footer />)
    
    const productsHeading = screen.getByText('Products')
    expect(productsHeading).toBeInTheDocument()
    
    const productLinks = [
      'Browse Parts',
      'Frame Builder',
      'Wheelsets',
      'Drivetrains',
      'Components'
    ]
    
    productLinks.forEach(linkText => {
      const link = screen.getByRole('link', { name: linkText })
      expect(link).toBeInTheDocument()
    })
  })

  it('renders support links section', () => {
    render(<Footer />)
    
    const supportHeading = screen.getByText('Support')
    expect(supportHeading).toBeInTheDocument()
    
    const supportLinks = [
      'Build Guide',
      'Compatibility Check',
      'Help Center',
      'Contact Us',
      'Community Forum'
    ]
    
    supportLinks.forEach(linkText => {
      const link = screen.getByRole('link', { name: linkText })
      expect(link).toBeInTheDocument()
    })
  })

  it('renders company links section', () => {
    render(<Footer />)
    
    const companyHeading = screen.getByText('Company')
    expect(companyHeading).toBeInTheDocument()
    
    const companyLinks = [
      'About Us',
      'Careers',
      'Press',
      'Blog',
      'Partners'
    ]
    
    companyLinks.forEach(linkText => {
      const link = screen.getByRole('link', { name: linkText })
      expect(link).toBeInTheDocument()
    })
  })

  it('renders legal links in bottom section', () => {
    render(<Footer />)
    
    const legalLinks = [
      'Privacy Policy',
      'Terms of Service',
      'Cookie Policy'
    ]
    
    legalLinks.forEach(linkText => {
      const link = screen.getByRole('link', { name: linkText })
      expect(link).toBeInTheDocument()
    })
  })

  it('renders copyright notice', () => {
    render(<Footer />)
    
    const copyright = screen.getByText('© 2024 BikePartPicker. All rights reserved.')
    expect(copyright).toBeInTheDocument()
  })

  it('renders social media links', () => {
    render(<Footer />)
    
    const githubLink = screen.getByLabelText('GitHub')
    const twitterLink = screen.getByLabelText('Twitter')
    const discordLink = screen.getByLabelText('Discord')
    
    expect(githubLink).toBeInTheDocument()
    expect(twitterLink).toBeInTheDocument()
    expect(discordLink).toBeInTheDocument()
    
    expect(githubLink).toHaveAttribute('href', 'https://github.com')
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com')
    expect(discordLink).toHaveAttribute('href', 'https://discord.com')
  })

  it('has proper link hrefs for product links', () => {
    render(<Footer />)
    
    const expectedProductLinks = [
      { name: 'Browse Parts', href: '/parts' },
      { name: 'Frame Builder', href: '/frames' },
      { name: 'Wheelsets', href: '/wheels' },
      { name: 'Drivetrains', href: '/drivetrains' },
      { name: 'Components', href: '/components' }
    ]
    
    expectedProductLinks.forEach(({ name, href }) => {
      const link = screen.getByRole('link', { name })
      expect(link).toHaveAttribute('href', href)
    })
  })

  it('has proper link hrefs for support links', () => {
    render(<Footer />)
    
    const expectedSupportLinks = [
      { name: 'Build Guide', href: '/guide' },
      { name: 'Compatibility Check', href: '/compatibility' },
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Community Forum', href: '/community' }
    ]
    
    expectedSupportLinks.forEach(({ name, href }) => {
      const link = screen.getByRole('link', { name })
      expect(link).toHaveAttribute('href', href)
    })
  })

  it('handles newsletter email input', async () => {
    const user = userEvent.setup()
    render(<Footer />)
    
    const emailInput = screen.getByPlaceholderText('Enter your email')
    await user.type(emailInput, 'test@example.com')
    
    expect(emailInput).toHaveValue('test@example.com')
  })

  it('handles newsletter subscribe button click', async () => {
    const user = userEvent.setup()
    render(<Footer />)
    
    const subscribeButton = screen.getByRole('button', { name: 'Subscribe' })
    await user.click(subscribeButton)
    
    // Button should be clickable (we're not testing actual subscription logic)
    expect(subscribeButton).toBeInTheDocument()
  })

  it('has proper dark theme styling', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('bg-gray-900', 'text-white')
  })

  it('has responsive grid layout', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    const gridContainer = footer.querySelector('.grid')
    
    expect(gridContainer).toHaveClass(
      'grid',
      'grid-cols-1',
      'md:grid-cols-2', 
      'lg:grid-cols-5',
      'gap-8'
    )
  })

  it('has proper section headings styling', () => {
    render(<Footer />)
    
    const sectionHeadings = [
      'Stay Updated',
      'Products',
      'Support',
      'Company'
    ]
    
    sectionHeadings.forEach(headingText => {
      const heading = screen.getByText(headingText)
      expect(heading).toHaveClass(
        'text-sm',
        'font-semibold',
        'text-gray-300',
        'uppercase',
        'tracking-wider'
      )
    })
  })

  it('has hover effects on links', () => {
    render(<Footer />)
    
    const firstProductLink = screen.getByRole('link', { name: 'Browse Parts' })
    expect(firstProductLink).toHaveClass('text-gray-400', 'hover:text-white')
  })
})

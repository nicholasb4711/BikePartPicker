# BikePartPicker Web App 🚴‍♂️

The main Next.js application for BikePartPicker - a modern bike building platform inspired by PCPartPicker.

## 🏗️ Architecture

This is the primary web application within the BikePartPicker monorepo, built with Next.js 14 and the App Router.

### Key Features
- **Component Builder**: Interactive bike component selection interface
- **Real-time Compatibility**: Live compatibility checking between components
- **Modern UI**: Professional design system with Tailwind CSS
- **Responsive Design**: Mobile-first approach with flexbox layouts
- **Type Safety**: Full TypeScript implementation with strict typing

## 🚀 Development

### Prerequisites
- Node.js 18+
- pnpm 8+
- Run from the monorepo root for best experience

### Getting Started

From the **monorepo root**:
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Or run just this app
cd apps/web
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript checks

# Testing
pnpm test         # Run Jest tests
pnpm test:watch   # Run tests in watch mode
pnpm test:coverage # Generate coverage report
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── builder/           # Build configuration page
│   │   └── page.tsx       # Main builder interface
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Homepage
│   └── utils/            # Utility functions
│       └── partUtils.ts  # Component data and types
│
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── button.tsx    # Button component
│   │   ├── card.tsx      # Card component
│   │   ├── input.tsx     # Input component
│   │   ├── icons.tsx     # Icon components
│   │   └── index.ts      # Component exports
│   │
│   ├── Header/           # Site header
│   │   ├── Header.tsx
│   │   └── Header.test.tsx
│   │
│   ├── Footer/           # Site footer
│   │   ├── Footer.tsx
│   │   └── Footer.test.tsx
│   │
│   └── Builder/          # Build-specific components
│       ├── BuildProgress/      # Step navigation
│       ├── BuildSummary/       # Build cost summary
│       ├── ComponentCard/      # Individual component cards
│       └── CompatibilityCheck/ # Compatibility validation
│
└── types/                # TypeScript declarations
    └── jest-dom.d.ts     # Jest DOM type extensions
```

## 🎨 Design System

### Theme
- **Primary Colors**: Monochrome (black, white, grays)
- **Accent Color**: Electric Blue (#0066ff)
- **Typography**: Inter font family
- **Layout**: Flexbox-based responsive design

### Components
- **Button**: Primary, secondary, and outline variants
- **Card**: Default, outlined, and elevated variants
- **Input**: Form inputs with labels and error states
- **Icons**: Reusable SVG icon components

## 🧪 Testing

The app includes comprehensive unit tests using Jest and React Testing Library:

```bash
# Run all tests
pnpm test

# Watch mode for development
pnpm test:watch

# Coverage report
pnpm test:coverage
```

### Test Coverage
- ✅ UI component functionality
- ✅ User interactions and form handling
- ✅ Build logic and state management
- ✅ Component compatibility validation
- ❌ Styling tests (intentionally excluded)

## 🔧 Configuration

### Key Config Files
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS with custom theme
- `jest.config.js` - Jest testing configuration
- `tsconfig.json` - TypeScript configuration
- `.eslintrc.js` - ESLint rules

### Environment
- **Development**: Hot reloading, source maps, detailed errors
- **Production**: Optimized builds, static generation where possible
- **Testing**: JSDOM environment with React Testing Library

## 🚀 Deployment

This app is designed to be deployed on Vercel with zero configuration:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Next.js app
3. Build and deployment happen automatically on push

### Build Output
- Static pages are pre-rendered at build time
- Dynamic routes use server-side rendering
- Assets are optimized and cached

## 🔄 State Management

### Current Approach
- Local React state for build configuration
- Props drilling for component communication
- No global state management yet

### Planned Improvements
- Zustand store for build state persistence
- Local storage integration for build saving
- Context providers for shared state

## 🌐 Routing

### Current Routes
- `/` - Homepage with project introduction
- `/builder` - Interactive bike builder interface

### Route Structure
```
app/
├── page.tsx           # Homepage (/)
├── layout.tsx         # Root layout
└── builder/
    └── page.tsx       # Builder page (/builder)
```

## 🤝 Contributing

When contributing to this app:

1. **Follow the established patterns** - Use existing component structure
2. **Add tests** - All new components should have corresponding tests
3. **Type everything** - Maintain strict TypeScript typing
4. **Test locally** - Run the full test suite before submitting
5. **Update documentation** - Keep this README current

### Common Development Tasks

**Adding a new UI component:**
```bash
# Create component file
touch src/components/ui/new-component.tsx

# Add tests
touch src/components/ui/new-component.test.tsx

# Export from index
# Add to src/components/ui/index.ts
```

**Adding a new page:**
```bash
# Create page directory
mkdir src/app/new-page

# Add page component
touch src/app/new-page/page.tsx
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Testing utilities
- [TypeScript](https://www.typescriptlang.org/docs/) - Type system documentation

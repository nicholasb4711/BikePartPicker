# BikePartPicker 🚴‍♂️

A modern web application for building custom road bikes and sourcing parts from across the internet, inspired by PCPartPicker. Build your dream bike with professional-grade component selection, compatibility checking, and pricing guidance.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand (planned)
- **Forms**: React Hook Form + Zod (planned)
- **Testing**: Jest + React Testing Library
- **Monorepo**: Turborepo + pnpm
- **Database**: Supabase (planned)
- **Deployment**: Vercel (planned)

## 🏗️ Project Structure

```
BikePartPicker/
├── apps/
│   └── web/                 # Main Next.js application
│       ├── src/
│       │   ├── app/         # Next.js App Router pages
│       │   │   ├── builder/ # Build configuration page
│       │   │   └── utils/   # Utility functions and data
│       │   └── components/  # UI components
│       │       ├── ui/      # Reusable UI components (Button, Card, Input)
│       │       ├── Header/  # Navigation header
│       │       ├── Footer/  # Site footer
│       │       └── Builder/ # Build-specific components
│       └── ...config files
├── packages/                # (Ready for future shared packages)
└── docs/                    # Documentation (planned)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/BikePartPicker.git
   cd BikePartPicker
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

### Development
- `pnpm dev` - Start development server
- `pnpm build` - Build all packages and apps
- `pnpm start` - Start production server

### Code Quality
- `pnpm lint` - Run ESLint across all packages
- `pnpm format` - Format code with Prettier
- `pnpm type-check` - Run TypeScript type checking

### Testing
- `pnpm test` - Run all tests
- `pnpm test:jest` - Run Jest tests specifically
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Generate test coverage report

## ✨ Current Features

### 🎯 Implemented
- **Modern UI**: Clean, professional design with monochrome + Electric Blue theme
- **Component Builder**: Step-by-step bike component selection
- **Build Progress**: Visual progress tracking with step navigation
- **Component Cards**: Interactive component selection with pricing
- **Build Summary**: Real-time build cost calculation and component list
- **Compatibility Check**: Basic compatibility validation between components
- **Responsive Design**: Mobile-first responsive layout
- **Component Library**: Reusable UI components (Button, Card, Input, Icons)

### 🔧 Component Categories
- **Frames**: Road bike frames from major manufacturers
- **Groupsets**: Shimano and SRAM drivetrain components
- **Wheels**: Performance wheelsets from premium brands
- **Cockpit**: Handlebars, stems, and seatposts
- **Accessories**: Pedals, saddles, and essential components

### 📊 Data & Compatibility
- **Sample Data**: Curated component database with real specifications
- **Compatibility Rules**: Shimano vs SRAM compatibility checking
- **Pricing**: Real-world pricing from manual research
- **Component Specs**: Detailed specifications and compatibility information

## 🎯 Planned Features

### 🚀 Next Phase
- **State Persistence**: Zustand store for build state management
- **Enhanced Compatibility**: Advanced compatibility rules and validation
- **Real Data Integration**: API integration with bike component databases
- **User Authentication**: Save and manage multiple builds

### 🌟 Future Enhancements
- **Price Comparison**: Compare prices across multiple retailers
- **Build Sharing**: Share and discuss custom builds with the community
- **Build Guides**: Educational content about compatibility and selection
- **Community Features**: User reviews, ratings, and recommendations

## 🧪 Testing

The project includes comprehensive unit tests focusing on functionality:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

Tests cover:
- UI component functionality
- User interactions and form handling
- Build logic and state management
- Component compatibility validation

## 🎨 Design System

- **Colors**: Monochrome base (black, white, grays) with Electric Blue highlights
- **Typography**: Inter font family for clean, modern text
- **Components**: Consistent design language across all UI elements
- **Responsive**: Mobile-first approach with flexbox layouts

## 🤝 Contributing

This is a learning project inspired by WHOOP's tech stack. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

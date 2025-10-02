# BikePartPicker 🚴‍♂️

A modern web application for building custom road bikes and sourcing parts from across the internet, inspired by PCPartPicker.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
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
│       │   └── components/  # UI components
│       │       └── ui/      # Reusable UI components
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

- `pnpm dev` - Start development server
- `pnpm build` - Build all packages and apps
- `pnpm lint` - Run ESLint across all packages
- `pnpm format` - Format code with Prettier
- `pnpm type-check` - Run TypeScript type checking

## 🎯 Features (Planned)

- **Component Selection**: Browse frames, wheels, drivetrains, brakes, and more
- **Compatibility Engine**: Ensure all parts work together
- **Price Comparison**: Compare prices across multiple retailers
- **Build Sharing**: Share and discuss custom builds with the community
- **Build Guides**: Learn about compatibility and make informed choices

## 🤝 Contributing

This is a learning project inspired by WHOOP's tech stack. Contributions are welcome!

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

# Test Coverage Requirements

This project enforces a **90% test coverage threshold** across all metrics:

- **Statements**: 90%
- **Branches**: 90%
- **Functions**: 90%
- **Lines**: 90%

## Running Coverage Tests

```bash
# Run tests with coverage report
npm run test:coverage

# Run coverage check (fails if below threshold)
npm run test:coverage:check

# At repo root level
pnpm test:coverage
```

## Coverage Configuration

Coverage is configured in `jest.config.js`:

```javascript
coverageThreshold: {
  global: {
    branches: 90,
    functions: 90,
    lines: 90,
    statements: 90,
  },
}
```

## Coverage Reports

Coverage reports are generated in multiple formats:
- **Text**: Console output
- **LCOV**: For CI/CD integration (`coverage/lcov.info`)
- **HTML**: Interactive report (`coverage/lcov-report/index.html`)
- **JSON**: Machine-readable summary (`coverage/coverage-summary.json`)

## Excluded Files

The following files are excluded from coverage requirements:
- Type definitions (`*.d.ts`)
- App layout file (`src/app/layout.tsx`)
- Global CSS (`src/app/globals.css`)
- Storybook files (`*.stories.*`)
- Config files (`*.config.*`)

## CI/CD Integration

- Coverage is enforced in CI/CD pipeline
- Coverage reports are uploaded to Codecov
- Build fails if coverage threshold is not met
- Coverage reports are generated for all pull requests

## Writing Tests

When adding new code:
1. Write comprehensive unit tests
2. Aim for 95%+ coverage on new code
3. Test both happy path and error cases
4. Include edge cases and boundary conditions
5. Use meaningful test descriptions

## Current Coverage Status

Run `npm run test:coverage` to see current coverage levels and identify areas that need more tests.

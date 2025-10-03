#!/bin/bash

# Pre-commit coverage check script
# This script checks if test coverage meets the 90% threshold

echo "🧪 Running test coverage check..."

cd apps/web

# Run tests with coverage
npm run test:coverage

# Check exit code
if [ $? -eq 0 ]; then
    echo "✅ Coverage threshold met (90%)"
    exit 0
else
    echo "❌ Coverage threshold not met (90% required)"
    echo ""
    echo "Please add more tests to increase coverage before committing."
    echo "Run 'npm run test:coverage' to see detailed coverage report."
    exit 1
fi

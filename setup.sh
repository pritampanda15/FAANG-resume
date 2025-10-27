#!/bin/bash

echo "======================================"
echo "FAANG Resume Sprint - Quick Setup"
echo "======================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version is too old (found v$NODE_VERSION)"
    echo "Please upgrade to Node.js 18+ from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

echo "✅ npm $(npm -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation complete!"
    echo ""
    echo "======================================"
    echo "🚀 Quick Start Commands:"
    echo "======================================"
    echo ""
    echo "  npm run dev      - Start development server"
    echo "  npm run build    - Build for production"
    echo "  npm start        - Start production server"
    echo "  npm run lint     - Run code linting"
    echo ""
    echo "======================================"
    echo "📚 Documentation:"
    echo "======================================"
    echo ""
    echo "  README.md        - Main documentation"
    echo "  SETUP.md         - Detailed setup guide"
    echo "  DEPLOYMENT.md    - Deployment instructions"
    echo ""
    echo "======================================"
    echo "Ready to start!"
    echo "Run: npm run dev"
    echo "Then visit: http://localhost:3000"
    echo "======================================"
else
    echo ""
    echo "❌ Installation failed"
    echo "Please check the error messages above"
    exit 1
fi

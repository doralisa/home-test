# Automation Test Suite

A comprehensive test automation suite built with Playwright and TypeScript, implementing Page Object Model and supporting multiple platforms.

## 🚀 Features

- **Cross-Browser Testing**: Chrome, Firefox, Safari
- **Multi-Platform Testing**: Desktop (Windows, macOS, Linux) + Mobile (Android, iOS)
- **Page Object Model**: Clean, maintainable test structure
- **Centralized Test Data**: Secure data management
- **Comprehensive Test Coverage**: Login, Checkout, Cart, Grid, Search

## 📋 Prerequisites

- Node.js (v16 or higher)
- Git
- Docker (for running the demo app)

## 🛠️ Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd home-test
```

### 2. Install dependencies
```bash
npm install
```

### 3. Install Playwright browsers
```bash
npm run install-browsers
```

### 4. Start the demo application
```bash
# Pull and run the demo app
docker pull automaticbytes/demo-app
docker run -d -p 3100:3100 --name demo-app automaticbytes/demo-app
```

## 🧪 Running Tests

### Run all tests (default browsers)
```bash
npm test
```

### Run tests on specific platforms

#### Desktop browsers only
```bash
npm run test:desktop
```

#### Mobile devices only
```bash
npm run test:mobile
```

#### All platforms (Desktop + Mobile)
```bash
npm run test:all-platforms
```

### Run specific test suites
```bash
# Login tests
npm test tests/login.spec.ts

# Checkout tests
npm test tests/checkout.spec.ts

# Cart tests
npm test tests/cart.spec.ts

# Grid tests
npm test tests/grid.spec.ts

# Search tests
npm test tests/search.spec.ts
```

### Debug mode
```bash
npm run test:debug
```

### UI mode
```bash
npm run test:ui
```

## 📱 Multi-Platform Support

This test suite supports the following platforms:

### Desktop
- **Chrome** (Chromium)
- **Firefox**
- **Safari** (WebKit)

### Mobile
- **Android Chrome** (Pixel 5)
- **iOS Safari** (iPhone 12)
- **Tablet** (iPad Pro 11)

## 🏗️ Project Structure

```
├── pages/                 # Page Object Models
│   ├── LoginPage.ts
│   ├── CheckoutPage.ts
│   ├── CartPage.ts
│   ├── GridPage.ts
│   └── SearchPage.ts
├── tests/                 # Test specifications
│   ├── login.spec.ts
│   ├── checkout.spec.ts
│   ├── cart.spec.ts
│   ├── grid.spec.ts
│   └── search.spec.ts
├── utils/                 # Test data
│   ├── loginData.ts
│   ├── checkoutData.ts
│   ├── gridData.ts
│   └── searchData.ts
├── playwright.config.ts   # Playwright configuration
└── package.json
```

## 🧪 Test Scenarios

### Login Tests
- ✅ Login with valid credentials
- ✅ Login with invalid credentials
- ✅ Login with empty credentials

### Checkout Tests
- ✅ Complete checkout form successfully
- ✅ Handle shipping address alert

### Cart Tests
- ✅ Validate cart total calculation

### Grid Tests
- ✅ Verify specific product in position 7
- ✅ Validate all grid items have required elements

### Search Tests
- ✅ Search with valid term
- ✅ Search with empty term

## 🔧 Configuration

### Playwright Config
- **Base URL**: http://localhost:3100
- **Timeout**: 30 seconds
- **Retries**: 2 (in CI)
- **Parallel execution**: Enabled
- **Screenshots**: On failure
- **Traces**: On first retry

### Test Data Management
- Centralized test data in separate files
- No hardcoded values in tests
- Secure credential management

## 📊 Reports

### View HTML Report
```bash
npm run report
```

### Generate Report
```bash
npx playwright show-report
```

## 🐳 Docker Support

The demo application runs in Docker:
```bash
# Start the app
docker run -d -p 3100:3100 --name demo-app automaticbytes/demo-app

# Stop the app
docker stop demo-app

# Remove the container
docker rm demo-app
```

## 🚀 CI/CD Ready

This test suite is ready for CI/CD integration with:
- GitHub Actions
- Jenkins
- GitLab CI
- Azure DevOps

## 📝 Best Practices Implemented

- **Page Object Model**: Separation of concerns
- **Centralized Test Data**: Security and maintainability
- **Semantic Selectors**: Best Playwright practices
- **Proper Waits**: No hardcoded timeouts
- **Comprehensive Logging**: Debug-friendly
- **Multi-Platform Support**: Cross-device testing

## 🤝 Contributing

1. Create a feature branch
2. Write tests following the existing patterns
3. Ensure all platforms pass
4. Submit a pull request

## 📄 License

This project is for demonstration purposes.
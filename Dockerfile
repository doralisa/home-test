# Use official Playwright image as base
FROM mcr.microsoft.com/playwright:v1.40.0-focal

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Install Playwright browsers
RUN npx playwright install

# Set environment variable for base URL
ENV BASE_URL=http://demo-app:3100

# Default command to run tests
CMD ["npx", "playwright", "test"]

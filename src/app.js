require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Environment-specific configuration
const envConfig = {
  development: {
    dbUrl: 'localhost:5432/demo_dev',
    features: ['debug', 'hot-reload'],
    version: '1.0.0-dev'
  },
  test: {
    dbUrl: 'localhost:5432/demo_test',
    features: ['testing', 'mocking'],
    version: '1.0.0-test'
  },
  staging: {
    dbUrl: 'staging-db.example.com:5432/demo_staging',
    features: ['monitoring', 'analytics'],
    version: '1.0.0-staging'
  },
  production: {
    dbUrl: 'prod-db.example.com:5432/demo_prod',
    features: ['monitoring', 'analytics', 'caching'],
    version: '1.0.0'
  }
};

// Routes
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Backstage Demo Application',
    environment: ENV,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    ...envConfig[ENV]
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  const currentConfig = envConfig[ENV] || envConfig.development;
  res.json({
    status: 'healthy',
    message: '🚀 Backstage Demo Application',
    environment: ENV,
    timestamp: new Date().toISOString(),
    dbUrl: currentConfig.dbUrl,
    features: currentConfig.features,
    version: currentConfig.version,
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

app.get('/api/users', (req, res) => {
  // Simulated user data
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'developer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'designer' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'manager' }
  ];
  
  res.json({
    users,
    total: users.length,
    environment: ENV
  });
});

app.post('/api/deploy', (req, res) => {
  const { version, environment } = req.body;
  
  // Simulate deployment process
  setTimeout(() => {
    res.json({
      message: `🎉 Deployment successful!`,
      version: version || '1.0.0',
      environment: environment || ENV,
      deployedAt: new Date().toISOString(),
      status: 'success'
    });
  }, 1000);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    environment: ENV,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    environment: ENV
  });
});

// Start server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Demo app running on port ${PORT}`);
    console.log(`📊 Environment: ${ENV}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('👋 SIGTERM received, shutting down gracefully');
    server.close(() => {
      console.log('✅ Process terminated');
    });
  });
}

module.exports = app;

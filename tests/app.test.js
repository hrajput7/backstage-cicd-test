const request = require('supertest');
const app = require('../src/app');

describe('Demo Application API Tests', () => {
  
  describe('GET /', () => {
    it('should return application info', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);
      
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('environment');
      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);
      
      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('memory');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /api/users', () => {
    it('should return list of users', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200);
      
      expect(response.body).toHaveProperty('users');
      expect(response.body).toHaveProperty('total');
      expect(Array.isArray(response.body.users)).toBe(true);
      expect(response.body.users.length).toBeGreaterThan(0);
    });

    it('should return users with correct structure', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200);
      
      const user = response.body.users[0];
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('role');
    });
  });

  describe('POST /api/deploy', () => {
    it('should simulate deployment successfully', async () => {
      const deployData = {
        version: '1.2.3',
        environment: 'staging'
      };

      const response = await request(app)
        .post('/api/deploy')
        .send(deployData)
        .expect(200);
      
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('version', '1.2.3');
      expect(response.body).toHaveProperty('environment', 'staging');
      expect(response.body).toHaveProperty('status', 'success');
      expect(response.body).toHaveProperty('deployedAt');
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/non-existent-route')
        .expect(404);
      
      expect(response.body).toHaveProperty('error', 'Route not found');
      expect(response.body).toHaveProperty('path', '/non-existent-route');
    });
  });

  describe('Environment Configuration', () => {
    it('should include environment-specific config', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);
      
      expect(response.body).toHaveProperty('dbUrl');
      expect(response.body).toHaveProperty('features');
      expect(response.body).toHaveProperty('version');
      expect(Array.isArray(response.body.features)).toBe(true);
    });
  });
});

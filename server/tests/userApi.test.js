const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('User API', () => {
  // Run before each test
  beforeEach(async () => {
    // Clear the users collection in the database
    await User.deleteMany();
  });

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/customer/signup')
      .send({ email: 'test@example.com', password: 'testpassword' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('email', 'test@example.com');
  });
});

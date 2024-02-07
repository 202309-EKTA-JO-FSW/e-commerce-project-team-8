const { createUser } = require('../models/userModel');

describe('User Model', () => {
  it('should create a new user', async () => {
    const user = await createUser({ email: 'test@example.com', password: 'testpassword' });

    expect(user).toHaveProperty('email', 'test@example.com');
    expect(user.password).toBeDefined(); // Password should be hashed
  });
});

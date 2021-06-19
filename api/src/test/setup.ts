import dotenv from 'dotenv';

beforeAll(async () => {
  dotenv.config();
  process.env.NODE_ENV = 'test';
});

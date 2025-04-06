import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  uri:
    process.env.MONGODB_URI ||
    'mongodb://admin:password@localhost:27017/code-reviewer?authSource=admin',
  options: {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  },
}));

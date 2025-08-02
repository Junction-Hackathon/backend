import { AppConfig } from './interfaces/app-config.interface';

export default (): AppConfig => ({
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT!, 10) || 6379,
  },
  mail: {
    port: parseInt(process.env.MAIL_PORT!, 10) || 587,
    host: process.env.MAIL_HOST || 'smtp.example.com',
    secure: process.env.MAIL_SECURE === 'true',
    auth: {
      user: process.env.MAIL_USER!,
      pass: process.env.MAIL_PASS!,
    },
  },

  auth: {
    jwt: {
      accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET!,
      refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET!,
      accessTokenExpiresIn: parseInt(
        process.env.JWT_ACCESS_TOKEN_EXPRES_IN || '86400',
      ), // 1 day
      refreshTokenExpiresIn: parseInt(
        process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || (86400 * 7).toString(),
      ), // 7 day
    },
  },
  cloudinary: {
    cloudName: 'dtgfobbl5',
    apiKey: process.env.CLOUDINARY_API_KEY!,
    apiSecret: process.env.CLOUDINARY_API_SECRET!,
  },
  kafka: {
    brokers: process.env.KAFKA_BROKERS?.split(',') || ['kafka:9092'],
    clientId: process.env.KAFKA_CLIENT_ID || 'qurbani-core-api',
    producer: {
      allowAutoTopicCreation:
        process.env.KAFKA_ALLOW_AUTO_TOPIC_CREATION === 'true',
    },
    sasl: {
      mechanism: process.env.KAFKA_SASL_MECHANISM || 'plain',
      username: process.env.KAFKA_SASL_USERNAME || '',
      password: process.env.KAFKA_SASL_PASSWORD || '',
    },
    ssl: process.env.KAFKA_SSL === 'true',
    consumer: {
      groupId: process.env.KAFKA_GROUP_ID || 'qurbani-core-group',
    },
  },
});

import envSchema from 'env-schema';
import zod from 'zod';

const schema = zod.object({
  PORT: zod.number(),
  ENV: zod.string(),
  APP_HOME: zod.string(),
  JWT_ACCESS_TOKEN_PRIVATE_KEY: zod.string(),
  JWT_REFRESH_TOKEN_PRIVATE_KEY: zod.string(),
});

type Env = zod.infer<typeof schema>;

const config = envSchema<Env>({
  schema: {
    type: 'object',
    required: [],
    properties: {
      PORT: {
        type: 'number',
        default: 4000,
      },
      ENV: {
        type: 'string',
        default: 'development',
      },
      APP_HOME: {
        type: 'string',
      },
      JWT_ACCESS_TOKEN_PRIVATE_KEY: {
        type: 'string',
      },
      JWT_REFRESH_TOKEN_PRIVATE_KEY: {
        type: 'string',
      },
    },
  },
  dotenv: true,
});

export default config;

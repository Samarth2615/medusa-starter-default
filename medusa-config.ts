import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS,
      adminCors: process.env.ADMIN_CORS,
      authCors: process.env.AUTH_CORS,
      jwtSecret: process.env.JWT_SECRET || 'supersecret',
      cookieSecret: process.env.COOKIE_SECRET || 'supersecret',
    },
    workerMode: process.env.MEDUSA_WORKER_MODE as 'shared' | 'worker' | 'server',
  },
  admin: {
    backendUrl: process.env.MEDUSA_BACKEND_URL,
    disable: process.env.DISABLE_MEDUSA_ADMIN === 'true',
  },

  modules: [
    {
      resolve: "@medusajs/medusa/cache-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/event-bus-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/workflow-engine-redis",
      options: {
        redis: {
          url: process.env.REDIS_URL,
        },
      },
    },
    // Optional: Add file and notification modules if needed
    // {
    //   resolve: "@medusajs/file-s3",
    //   options: {
    //     config: {
    //       endpoint: process.env.S3_ENDPOINT,
    //       bucket: process.env.S3_BUCKET,
    //       region: process.env.S3_REGION,
    //       access_key_id: process.env.S3_ACCESS_KEY_ID,
    //       secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
    //     },
    //   },
    // },
  ],
})

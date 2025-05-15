// lib/auth0-config.ts
import { ConfigParameters } from '@auth0/nextjs-auth0';

export const auth0Config: ConfigParameters = {
  secret: process.env.AUTH0_SECRET,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  routes: {
    callback: '/api/auth/callback',
    // Remove logout property as it's causing a TypeScript error
    postLogoutRedirect: '/',
  },
  authorizationParams: {
    response_type: 'code',
    scope: 'openid profile email',
  },
  session: {
    absoluteDuration: 60 * 60 * 24 * 7, // 1 week
  }
};
// app/api/auth/callback/route.js
import { handleAuth } from '@auth0/nextjs-auth0';

export const GET = handleAuth();
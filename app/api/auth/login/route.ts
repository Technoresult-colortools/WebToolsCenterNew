import { handleLogin } from "@auth0/nextjs-auth0";
import { NextRequest } from "next/server";

// app/api/auth/login/route.ts
export const GET = async (req: NextRequest) => {
  const connection = req.nextUrl.searchParams.get('connection');
  const returnTo = req.nextUrl.searchParams.get('returnTo') || '/';
  
  try {
    // Provide an empty context object as the second argument, and options as the third argument
    return handleLogin(
      req,
      { params: {} }, // AppRouteHandlerFnContext, adjust if you need to pass params
      {
        returnTo,
        authorizationParams: connection ? { connection } : undefined
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
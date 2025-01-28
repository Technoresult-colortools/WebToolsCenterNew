'use client';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import { AnalyticsProvider } from '@/providers/analytics-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AnalyticsProvider>
    <UserProvider>
      {children}
    </UserProvider>
    </AnalyticsProvider>
  );
}
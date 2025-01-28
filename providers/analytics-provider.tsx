// providers/analytics-provider.tsx
'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const { consent } = useCookieConsent();

  useEffect(() => {
    if (window.gtag && GA_TRACKING_ID) {
      window.gtag('consent', 'update', {
        analytics_storage: consent.analytics ? 'granted' : 'denied',
        functionality_storage: consent.functional ? 'granted' : 'denied',
        personalization_storage: consent.marketing ? 'granted' : 'denied',
      });
    }
  }, [consent]);

  return (
    <>
      {GA_TRACKING_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
      {children}
    </>
  );
}
// hooks/useCookieConsent.ts
import { useState, useEffect } from 'react';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
const COOKIE_CONSENT_KEY = 'cookieConsent';

export interface CookieConsent {
  analytics: boolean;
  functional: boolean;
  necessary: boolean;
  marketing: boolean;
}

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<CookieConsent>({
    analytics: false,
    functional: false,
    necessary: true,
    marketing: false,
  });
  
  const [showBanner, setShowBanner] = useState(false);

  const initializeBasicAnalytics = () => {
    if (!GA_TRACKING_ID || !window.gtag) return;

    window.gtag('config', GA_TRACKING_ID, {
      'consent_mode': 'default',
      'restricted_data_processing': true,
      'anonymize_ip': true,
      'client_storage': 'none',
      'allow_google_signals': false,
      'allow_ad_personalization_signals': false,
      'custom_map': {
        'dimension1': 'page_path',
        'dimension2': 'client_id',
        'dimension3': 'consent_status'
      }
    });
  };

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    
    if (!savedConsent) {
      setShowBanner(true);
      initializeBasicAnalytics();
    } else {
      try {
        const parsedConsent = JSON.parse(savedConsent);
        if (parsedConsent === 'accepted') {
          // Handle legacy format
          setConsent({
            analytics: true,
            functional: true,
            necessary: true,
            marketing: true,
          });
        } else if (parsedConsent === 'declined') {
          // Handle legacy format
          setConsent({
            analytics: false,
            functional: false,
            necessary: true,
            marketing: false,
          });
        } else {
          // Handle new format
          setConsent(parsedConsent);
        }
      } catch (e) {
        setShowBanner(true);
        initializeBasicAnalytics();
      }
    }
  }, []);

  const updateAnalytics = (accepted: boolean) => {
    if (!GA_TRACKING_ID || !window.gtag) return;

    window.gtag('consent', 'update', {
      'analytics_storage': accepted ? 'granted' : 'denied',
      'personalization_storage': accepted ? 'granted' : 'denied',
      'functionality_storage': accepted ? 'granted' : 'denied'
    });

    if (accepted) {
      window.gtag('set', {
        'restricted_data_processing': false,
        'allow_google_signals': true,
        'allow_ad_personalization_signals': true
      });
    }

    window.gtag('event', 'consent_update', {
      'consent_status': accepted ? 'accepted' : 'declined'
    });
  };

  const updateConsent = (newConsent: Partial<CookieConsent>) => {
    const updatedConsent = { ...consent, ...newConsent };
    setConsent(updatedConsent);
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(updatedConsent));
    setShowBanner(false);

    // Update analytics based on analytics consent
    updateAnalytics(updatedConsent.analytics);
  };

  const acceptAll = () => {
    const fullConsent: CookieConsent = {
      analytics: true,
      functional: true,
      necessary: true,
      marketing: true,
    };
    setConsent(fullConsent);
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(fullConsent));
    setShowBanner(false);
    updateAnalytics(true);
  };

  const declineAll = () => {
    const minimalConsent: CookieConsent = {
      analytics: false,
      functional: false,
      necessary: true,
      marketing: false,
    };
    setConsent(minimalConsent);
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(minimalConsent));
    setShowBanner(false);
    updateAnalytics(false);
  };

  return {
    consent,
    showBanner,
    updateConsent,
    acceptAll,
    declineAll,
  };
};
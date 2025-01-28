// types/cookies.ts
export interface CookieConsent {
    analytics: boolean;
    functional: boolean;
    necessary: boolean;
    marketing: boolean;
  }
  
  export interface CookieSettings {
    id: string;
    type: keyof CookieConsent;
    title: string;
    description: string;
    required?: boolean;
  }
interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
  
  declare function gtag(...args: any[]): void;
  
  interface GtagConfig {
    page_path?: string;
    consent_mode?: string;
    restricted_data_processing?: boolean;
    anonymize_ip?: boolean;
    client_storage?: string;
    allow_google_signals?: boolean;
    allow_ad_personalization_signals?: boolean;
    custom_map?: {
      [key: string]: string;
    };
  }
  
  interface ConsentUpdate {
    analytics_storage?: 'granted' | 'denied';
    functionality_storage?: 'granted' | 'denied';
    personalization_storage?: 'granted' | 'denied';
    security_storage?: 'granted' | 'denied';
  }
// WorldMap.tsx
'use client';

import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';

interface WorldMapProps {
  availability: {
    [key: string]: { available: boolean; lastChecked: string };
  } | null;
  userLocation: string | null; // e.g., "IN" for India
}

interface GeoFeature {
  properties: {
    name?: string;
    NAME?: string;
    iso_a2?: string;
    ISO_A2?: string;
    ISO_A2_EH?: string;
    iso_a3?: string;
    ISO_A3?: string;
    id?: string;
    adm0_a3?: string;
    ADM0_A3?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Colors matching the legend in your main component
const COLOR_USER_LOCATION = "#10B981"; // Your location (emerald-500)
const COLOR_AVAILABLE = "#34D399";     // Available (emerald-400)
const COLOR_UNAVAILABLE = "#EF4444";   // Unavailable (red-500)
const COLOR_DEFAULT = "#D1D5DB";       // Unknown/Default (gray-300)
const STROKE_COLOR = "#4B5563";        // Border (gray-600)

const WorldMap: React.FC<WorldMapProps> = ({ availability, userLocation }) => {
  const getCountryCode = (geo: GeoFeature): string | null => {
    const properties = geo.properties || {};
    return properties.iso_a2 || 
           properties.ISO_A2 || 
           properties.ISO_A2_EH || 
           properties.id ||
           (properties.iso_a3 && properties.iso_a3.substring(0, 2)) ||
           (properties.ISO_A3 && properties.ISO_A3.substring(0, 2)) ||
           (properties.adm0_a3 && properties.adm0_a3.substring(0, 2)) ||
           (properties.ADM0_A3 && properties.ADM0_A3.substring(0, 2)) ||
           null;
  };

  const getCountryName = (geo: GeoFeature): string | null => {
    const properties = geo.properties || {};
    return properties.name || properties.NAME || null;
  };

  const getFillColor = (geo: GeoFeature): string => {
    const countryCode = getCountryCode(geo);
    const countryName = getCountryName(geo);
    
    // First priority: Check if it's the user's location
    if (countryCode && userLocation && 
        countryCode.toUpperCase() === userLocation.toUpperCase()) {
      return COLOR_USER_LOCATION;
    }
    
    // Alternative check for user location by name
    if (countryName && userLocation) {
      const codeToName: Record<string, string[]> = {
        'US': ['United States', 'USA', 'United States of America'],
        'IN': ['India'],
        'GB': ['United Kingdom', 'UK', 'Great Britain'],
        // Add more as needed for common user locations
      };
      
      if (codeToName[userLocation] && 
          codeToName[userLocation].includes(countryName)) {
        return COLOR_USER_LOCATION;
      }
    }
    
    // Second priority: Check availability data
    if (availability && countryCode) {
      const countryData = availability[countryCode];
      if (countryData) {
        return countryData.available ? COLOR_AVAILABLE : COLOR_UNAVAILABLE;
      }
    }
    
    // Default color if no availability data or country code not found
    return COLOR_DEFAULT;
  };

  return (
    <ComposableMap
      projection="geoMercator"
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#111827' // Dark background
      }}
    >
      <ZoomableGroup center={[0, 20]} zoom={1}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: getFillColor(geo),
                    stroke: STROKE_COLOR,
                    strokeWidth: 0.5,
                    outline: 'none',
                  },
                  hover: {
                    fill: getFillColor(geo),
                    stroke: "#FFFFFF",
                    strokeWidth: 0.6,
                    outline: 'none',
                    cursor: 'pointer'
                  },
                  pressed: {
                    fill: getFillColor(geo),
                    stroke: STROKE_COLOR,
                    strokeWidth: 0.6,
                    outline: 'none',
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default React.memo(WorldMap);
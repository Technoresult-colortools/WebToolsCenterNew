import {
    JetBrains_Mono,
    Fira_Code,
    Source_Code_Pro,
    IBM_Plex_Mono,
    Roboto_Mono,
    Ubuntu_Mono,
    Inconsolata,
    Anonymous_Pro,
    Space_Mono,
    Share_Tech_Mono,
    Cutive_Mono,
    Overpass_Mono,
  } from 'next/font/google';
  
  export const jetbrainsMono = JetBrains_Mono({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-jetbrains-mono',
  });
  
  export const firaCode = Fira_Code({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-fira-code',
  });
  
  export const sourceCodePro = Source_Code_Pro({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-source-code-pro',
  });
  
  export const ibmPlexMono = IBM_Plex_Mono({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-ibm-plex-mono',
  });
  
  export const robotoMono = Roboto_Mono({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto-mono',
  });
  
  export const ubuntuMono = Ubuntu_Mono({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-ubuntu-mono',
  });
  
  export const inconsolata = Inconsolata({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inconsolata',
  });
  
  export const anonymousPro = Anonymous_Pro({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-anonymous-pro',
  });
  
  export const spaceMono = Space_Mono({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-space-mono',
  });
  
  export const shareTechMono = Share_Tech_Mono({
    weight: ['400'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-share-tech-mono',
  });
  
  export const cutiveMono = Cutive_Mono({
    weight: ['400'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-cutive-mono',
  });
  
  export const overpassMono = Overpass_Mono({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-overpass-mono',
  });

  export const codingFonts = [
    { label: 'JetBrains Mono', value: 'jetbrains-mono' },
    { label: 'Fira Code', value: 'fira-code' },
    { label: 'Source Code Pro', value: 'source-code-pro' },
    { label: 'IBM Plex Mono', value: 'ibm-plex-mono' },
    { label: 'Roboto Mono', value: 'roboto-mono' },
    { label: 'Ubuntu Mono', value: 'ubuntu-mono' },
    { label: 'Inconsolata', value: 'inconsolata' },
    { label: 'Anonymous Pro', value: 'anonymous-pro' },
    { label: 'Space Mono', value: 'space-mono' },
    { label: 'Share Tech Mono', value: 'share-tech-mono' },
    { label: 'Cutive Mono', value: 'cutive-mono' },
    { label: 'Overpass Mono', value: 'overpass-mono' },
  ];
  
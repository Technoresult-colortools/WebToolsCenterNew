import React from 'react';
import { Link, Button, Divider } from "@nextui-org/react";
import NextLink from 'next/link';
import { categories } from '@/data/tools';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGithub, 
  faTwitter, 
  faFacebook,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';
import { Heart, Coffee } from 'lucide-react';

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/categories" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms and Conditions", href: "/terms" },
  { name: "Cookie Policy", href: "/cookies" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", icon: faGithub, href: "https://github.com/Technoresult-colortools/WebToolsCenterNew" },
    { name: "Twitter", icon: faTwitter, href: "https://x.com/webtoolscenter" },
    { name: "Facebook", icon: faFacebook, href: "https://www.facebook.com/people/Webtoolscenter/61567103137363/" },
    { name: "Instagram", icon: faInstagram, href: "https://www.instagram.com/webtoolscenter/" }
  ];

  return (
    <footer className="w-full border-t border-divider bg-background">
      <div className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-content1/50 to-background" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <div className="relative w-full pt-10 pb-6 md:pt-16 md:pb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
              {/* Brand Section */}
              <div className="lg:col-span-1 space-y-4 md:space-y-6">
                <div>
                  <NextLink href="/" className="font-bold text-inherit flex items-center">
                    <span className="text-xl md:text-2xl">
                      <span className="dark:text-white text-black">Web</span>
                      <span className="text-primary">Tools</span>
                      <span className="dark:text-white text-black">Center</span>
                    </span>
                  </NextLink>
                  <p className="mt-2 md:mt-4 text-xs md:text-sm text-default-500 max-w-md">
                    Your comprehensive web development toolkit. Access powerful tools and resources to streamline your workflow.
                  </p>
                </div>
                
                {/* Social Links */}
                <div className="flex flex-wrap gap-3 md:gap-4">
                  {socialLinks.map((social) => (
                    <Button
                      key={social.name}
                      as="a"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      isIconOnly
                      variant="light"
                      className="text-default-500 hover:text-primary w-8 h-8 md:w-10 md:h-10"
                      aria-label={social.name}
                    >
                      <FontAwesomeIcon icon={social.icon} className="w-4 h-4 md:w-5 md:h-5" />
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quick Links Section */}
              <div className="space-y-3 md:space-y-4">
                <h4 className="text-base md:text-lg font-semibold text-primary">
                  Quick Links
                </h4>
                <nav className="flex flex-col gap-1 md:gap-2">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.name}
                      as={NextLink}
                      href={link.href}
                      color="foreground"
                      className="text-sm md:text-base w-fit hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Categories Section */}
              <div className="space-y-3 md:space-y-4">
                <h4 className="text-base md:text-lg font-semibold text-primary">
                  Categories
                </h4>
                <nav className="flex flex-col gap-1 md:gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      as={NextLink}
                      href={`/tools/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                      color="foreground"
                      className="text-sm md:text-base w-fit hover:text-primary flex items-center gap-1 md:gap-2"
                    >
                      <FontAwesomeIcon icon={category.icon} className="w-3 h-3 md:w-4 md:h-4" />
                      {category.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Support Our Work Section */}
              <div className="space-y-3 md:space-y-4">
                <h4 className="text-base md:text-lg font-semibold text-primary">
                  Support Our Work
                </h4>
                <div className="space-y-3 md:space-y-4">
                  <p className="text-xs md:text-sm text-default-500">
                    Help us keep creating amazing tools for the developer community!
                  </p>
                  <Button
                    as="a"
                    href="https://buymeacoffee.com/webtoolscenter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-black font-semibold text-sm md:text-base py-1 px-3 md:py-2 md:px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-1 md:gap-2">
                      <Coffee 
                        className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-500 group-hover:animate-bounce" 
                      />
                      <span className="relative">
                        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-px">
                          Buy me a coffee
                        </span>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                      </span>
                    </div>
                  </Button>
                </div>
              </div>
            </div>

            <Divider className="my-4 md:my-8" />

            {/* Bottom Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 md:gap-4">
              <p className="text-xs md:text-small text-center sm:text-left text-default-500">
                © {currentYear} WebToolsCenter. All rights reserved.
              </p>
              
              {/* Legal Links */}
              <nav className="flex flex-wrap justify-center gap-3 md:gap-4">
                {legalLinks.map((link) => (
                  <Link
                    key={link.name}
                    as={NextLink}
                    href={link.href}
                    color="foreground"
                    className="text-xs md:text-small hover:text-primary"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* Made with Love */}
              <div className="flex items-center gap-1 text-xs md:text-small text-default-500">
                Made with <Heart size={12} className="text-danger" fill="currentColor" /> by WebToolsCenter Team
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
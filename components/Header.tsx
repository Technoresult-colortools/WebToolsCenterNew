'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar
} from "@nextui-org/react";
import { usePathname, useRouter } from 'next/navigation';
import NextLink from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { categories, allTools } from '@/data/tools';
import { Search, ChevronDown, X, LogOut, UserIcon } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from '@/providers/theme-provider';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { } = useTheme();
  const { user, isLoading } = useUser();


  const menuItems = [

    { name: "Tools", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allTools.filter(tool =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [searchQuery]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setIsSearchOpen(!!value.trim());
  };

  const handleToolSelect = (href: string) => {
    router.push(href);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const SearchResults = () => (
    <div className="absolute top-full left-0 right-0 bg-background border border-divider rounded-lg mt-1 shadow-lg z-50">
      <div className="p-2">
        {filteredTools.map((tool) => (
          <Button
            key={tool.name}
            className="w-full justify-start text-left mb-1 p-4 h-auto"
            variant="light"
            onClick={() => handleToolSelect(tool.href)}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={tool.icon} className="text-primary" />
              </div>
              <div>
                <p className="font-medium">{tool.name}</p>
                <p className="text-tiny text-default-500 line-clamp-1">{tool.description}</p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <Navbar 
      isBordered 
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className="bg-background dark:bg-background border-b border-divider"
    >

      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-gray-800 dark:text-gray-200  px-4 py-2 rounded-md transition-colors"
        />
      </NavbarContent>



      <NavbarBrand>
        <NextLink href="/" className="font-bold text-inherit flex items-center gap-1">
        <div className="relative w-8 h-8 sm:w-10 sm:h-10">
            <Image
              src="/logo.svg"
              alt="WebToolsCenter Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl sm:text-2xl">
            <span className="dark:text-white text-black">Web</span>
            <span className="text-primary">Tools</span>
            <span className="dark:text-white text-black">Center</span>
          </span>
        </NextLink>
      </NavbarBrand>

      <NavbarContent className="hidden lg:flex gap-4 flex-1 justify-center max-w-xl">
        <div className="search-container w-full relative" ref={searchRef}>
          <Input
            classNames={{
              base: "max-w-full h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20"
            }}
            placeholder="Search tools..."
            size="sm"
            startContent={<Search size={18} />}
            endContent={
              searchQuery && (
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onClick={clearSearch}
                >
                  <X size={16} />
                </Button>
              )
            }
            type="search"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {isSearchOpen && filteredTools.length > 0 && <SearchResults />}
        </div>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.name} isActive={pathname === item.href}>
            <Link
              as={NextLink}
              color={pathname === item.href ? "primary" : "foreground"}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className="w-full hover:text-primary"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-default-700 font-medium hover:text-primary"
                endContent={<ChevronDown className="text-default-500 hover:text-primary" size={16} />}
                radius="sm"
                variant="light"
              >
                Categories
              </Button>
            </DropdownTrigger>
          </NavbarItem>

          <DropdownMenu
            aria-label="Categories"
            className="w-[260px]" // Reduced from w-[340px]
            itemClasses={{
              base: "gap-2", // Reduced from gap-4
              title: "text-default-700 font-medium text-sm", // Added text-sm
              description: "text-default-500 text-xs", // Added text-xs
            }}
          >
            {categories.map((category) => (
              <DropdownItem
                key={category.name}
                className="data-[hover=true]:bg-default-100 py-2" // Added py-2 for slight padding reduction
              >
                <Link
                  as={NextLink}
                  href={`/tools/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center gap-4 w-full text-default-700 hover:text-primary"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={category.icon} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{category.name}</div>
                    <div className="text-default-500 text-xs">
                      {`${allTools.filter((tool) => tool.category === category.name).length} tools`}
                    </div>
                  </div>
                </Link>
              </DropdownItem>
            ))}
          </DropdownMenu>

        </Dropdown>
      </NavbarContent>

      <NavbarContent justify="end">
        {isLoading ? (
          <NavbarItem>
            <Button isLoading variant="flat" color="primary" size="sm">
              Loading...
            </Button>
          </NavbarItem>
        ) : !user ? (
          <NavbarItem>
            <Button 
              as={Link}
              href="/login"
              variant="flat" 
              color="primary"
              size="sm"
              className="font-medium"
            >
              Login
            </Button>
          </NavbarItem>
        ) : (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                isBordered
                size="sm"
                src={user.picture || undefined}
                fallback={<UserIcon className="w-4 h-4" />}
                className="transition-transform cursor-pointer"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User menu" variant="flat">
              <DropdownItem 
                key="profile" 
                className="h-14 gap-2"
                isReadOnly
              >
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold text-black dark:text-white">{user.name || "User"}</p>
                  <p className="text-xs text-default-500 ">{user.email || "No email provided"}</p>
                </div>
              </DropdownItem>
              <DropdownItem key="dashboard" href="/dashboard" className='text-black dark:text-white'>
                Dashboard
              </DropdownItem>
              <DropdownItem key="toolrequest" href="/tool-request" className='text-black dark:text-white'>
                Request a Tool
              </DropdownItem>
              <DropdownItem 
                key="logout" 
                href="/api/auth/logout" 
                className="text-danger" 
                color="danger"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-background/70 backdrop-blur-md pt-6">
        <NavbarMenuItem className="mb-4">
          <div className="relative w-full">
            <Input
              classNames={{
                base: "max-w-full h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20"
              }}
              placeholder="Search tools..."
              size="sm"
              startContent={<Search size={18} />}
              endContent={
                searchQuery && (
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onClick={clearSearch}
                  >
                    <X size={16} />
                  </Button>
                )
              }
              type="search"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {isSearchOpen && filteredTools.length > 0 && <SearchResults />}
          </div>
        </NavbarMenuItem>
        
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.name}>
            <Link
              as={NextLink}
              color={pathname === item.href ? "primary" : "foreground"}
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        
        {categories.map((category) => (
          <NavbarMenuItem key={category.name}>
            <Link
              as={NextLink}
              className="w-full flex items-center gap-2"
              href={`/tools/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              size="lg"
            >
              <FontAwesomeIcon icon={category.icon} className="text-primary" />
              {category.name}
            </Link>
          </NavbarMenuItem>
        ))}
        
        {user && (
          <NavbarMenuItem className="mb-4">
            <div 
              className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-default-100"
              role="button"
              onClick={() => router.push('/dashboard')}
            >
              <Avatar
                isBordered
                size="sm"
                src={user.picture || undefined}
                fallback={<UserIcon className="w-4 h-4" />}
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-black dark:text-white">{user.name || "User"}</p>
                <p className="text-xs text-default-500">{user.email || "No email provided"}</p>
              </div>
            </div>
          </NavbarMenuItem>
        )}

          {user ? (
            <NavbarMenuItem>
              <Link
                href="/api/auth/logout"
                size="lg"
                className="text-danger w-full"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Link>
            </NavbarMenuItem>
          ) : null}
        
      </NavbarMenu>
    </Navbar>
  );
}


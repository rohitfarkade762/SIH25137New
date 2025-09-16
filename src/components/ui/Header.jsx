import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇮🇳' }
  ];

  const navigationItems = [
    {
      label: 'Explore India',
      path: '/ai-itinerary-planner',
      icon: 'MapPin',
      children: [
        { label: 'AI Itinerary Planner', path: '/ai-itinerary-planner', icon: 'Route' },
        { label: 'Heritage Sites', path: '/interactive-heritage-sites', icon: 'Landmark' }
      ]
    },
    {
      label: 'Plan Journey',
      path: '/plan-journey',
      icon: 'Calendar',
      authRequired: true
    },
    {
      label: 'Marketplace',
      path: '/marketplace',
      icon: 'ShoppingBag'
    },
    {
      label: 'About India',
      path: '/about-india',
      icon: 'Info'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event?.target?.closest('.language-dropdown')) {
        setIsLanguageOpen(false);
      }
      if (!event?.target?.closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
      if (!event?.target?.closest('.search-container')) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    setIsLanguageOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      console.log('Searching for:', searchQuery);
      setIsSearchOpen(false);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsUserMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
      isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-soft' : 'bg-background'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <Link to="/public-landing-page" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="MapPin" size={24} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-semibold text-foreground">
                Incredible India
              </h1>
              <p className="text-xs font-caption text-muted-foreground -mt-1">
                Tourism Hub
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems?.map((item) => {
              if (item?.authRequired && !isAuthenticated) return null;
              
              return (
                <div key={item?.label} className="relative group">
                  <Link
                    to={item?.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                      isActivePath(item?.path) || (item?.children && item?.children?.some(child => isActivePath(child?.path)))
                        ? 'text-primary bg-primary/10' :'text-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                    {item?.children && <Icon name="ChevronDown" size={14} />}
                  </Link>
                  {item?.children && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-card border border-border rounded-lg shadow-soft opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-smooth">
                      <div className="py-2">
                        {item?.children?.map((child) => (
                          <Link
                            key={child?.path}
                            to={child?.path}
                            className={`flex items-center space-x-3 px-4 py-2 text-sm transition-smooth ${
                              isActivePath(child?.path)
                                ? 'text-primary bg-primary/10' :'text-foreground hover:text-primary hover:bg-primary/5'
                            }`}
                          >
                            <Icon name={child?.icon} size={16} />
                            <span>{child?.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Search, Language, Auth */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="search-container relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    placeholder="Search destinations..."
                    className="w-64 px-4 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-2"
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden md:flex"
                >
                  <Icon name="Search" size={18} />
                </Button>
              )}
            </div>

            {/* Language Selector */}
            <div className="language-dropdown relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2"
              >
                <span className="text-lg">
                  {languages?.find(lang => lang?.code === selectedLanguage)?.flag}
                </span>
                <Icon name="ChevronDown" size={14} />
              </Button>
              
              {isLanguageOpen && (
                <div className="absolute top-full right-0 mt-1 w-40 bg-card border border-border rounded-lg shadow-soft">
                  <div className="py-2">
                    {languages?.map((lang) => (
                      <button
                        key={lang?.code}
                        onClick={() => handleLanguageChange(lang?.code)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-sm text-left transition-smooth ${
                          selectedLanguage === lang?.code
                            ? 'text-primary bg-primary/10' :'text-foreground hover:bg-muted'
                        }`}
                      >
                        <span>{lang?.flag}</span>
                        <span>{lang?.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Authentication */}
            {isAuthenticated ? (
              <div className="user-menu relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="white" />
                  </div>
                  <Icon name="ChevronDown" size={14} />
                </Button>
                
                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-card border border-border rounded-lg shadow-soft">
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                      >
                        <Icon name="User" size={16} />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/bookings"
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                      >
                        <Icon name="Calendar" size={16} />
                        <span>My Bookings</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                      >
                        <Icon name="Settings" size={16} />
                        <span>Settings</span>
                      </Link>
                      <hr className="my-2 border-border" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-error hover:bg-error/10 transition-smooth"
                      >
                        <Icon name="LogOut" size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/tourist-login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/tourist-registration">
                  <Button variant="default" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border">
            <div className="px-4 py-4 space-y-2">
              {/* Mobile Search */}
              <div className="mb-4">
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    placeholder="Search destinations..."
                    className="flex-1 px-4 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <Button variant="ghost" size="sm" className="ml-2">
                    <Icon name="Search" size={16} />
                  </Button>
                </form>
              </div>

              {/* Mobile Navigation */}
              {navigationItems?.map((item) => {
                if (item?.authRequired && !isAuthenticated) return null;
                
                return (
                  <div key={item?.label}>
                    <Link
                      to={item?.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                        isActivePath(item?.path)
                          ? 'text-primary bg-primary/10' :'text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={item?.icon} size={18} />
                      <span>{item?.label}</span>
                    </Link>
                    {item?.children && (
                      <div className="ml-6 mt-2 space-y-1">
                        {item?.children?.map((child) => (
                          <Link
                            key={child?.path}
                            to={child?.path}
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center space-x-3 px-4 py-2 rounded-lg text-sm transition-smooth ${
                              isActivePath(child?.path)
                                ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                            }`}
                          >
                            <Icon name={child?.icon} size={16} />
                            <span>{child?.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Mobile Auth */}
              {!isAuthenticated && (
                <div className="pt-4 border-t border-border">
                  <div className="space-y-2">
                    <Link to="/tourist-login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" fullWidth className="justify-start">
                        <Icon name="LogIn" size={18} className="mr-3" />
                        Login
                      </Button>
                    </Link>
                    <Link to="/tourist-registration" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="default" fullWidth className="justify-start">
                        <Icon name="UserPlus" size={18} className="mr-3" />
                        Register
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LanguageToggle = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिंदी' },
    { code: 'ta', name: 'Tamil', flag: '🇮🇳', nativeName: 'தமிழ்' },
    { code: 'bn', name: 'Bengali', flag: '🇮🇳', nativeName: 'বাংলা' },
    { code: 'mr', name: 'Marathi', flag: '🇮🇳', nativeName: 'मराठी' },
    { code: 'kn', name: 'Kannada', flag: '🇮🇳', nativeName: 'ಕನ್ನಡ' }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('selectedLanguage', langCode);
    setIsOpen(false);
    
    // Trigger language change event for other components
    window.dispatchEvent(new CustomEvent('languageChange', { detail: langCode }));
  };

  const getCurrentLanguage = () => {
    return languages?.find(lang => lang?.code === currentLanguage) || languages?.[0];
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event?.target?.closest('.language-dropdown')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="language-dropdown relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 h-10"
      >
        <span className="text-lg">{getCurrentLanguage()?.flag}</span>
        <span className="text-sm font-medium">{getCurrentLanguage()?.nativeName}</span>
        <Icon name="ChevronDown" size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-soft z-50">
          <div className="py-2">
            {languages?.map((lang) => (
              <button
                key={lang?.code}
                onClick={() => handleLanguageChange(lang?.code)}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-sm text-left transition-smooth ${
                  currentLanguage === lang?.code
                    ? 'text-primary bg-primary/10' :'text-foreground hover:bg-muted'
                }`}
              >
                <span className="text-lg">{lang?.flag}</span>
                <div className="flex-1">
                  <div className="font-medium">{lang?.nativeName}</div>
                  <div className="text-xs text-muted-foreground">{lang?.name}</div>
                </div>
                {currentLanguage === lang?.code && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;
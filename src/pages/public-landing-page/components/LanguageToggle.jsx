import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LanguageToggle = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { 
      code: 'en', 
      name: 'English', 
      nativeName: 'English',
      flag: '🇺🇸',
      greeting: 'Welcome to Incredible India'
    },
    { 
      code: 'hi', 
      name: 'Hindi', 
      nativeName: 'हिंदी',
      flag: '🇮🇳',
      greeting: 'अतुल्य भारत में आपका स्वागत है'
    },
    { 
      code: 'ta', 
      name: 'Tamil', 
      nativeName: 'தமிழ்',
      flag: '🇮🇳',
      greeting: 'அற்புதமான இந்தியாவிற்கு வரவேற்கிறோம்'
    },
    { 
      code: 'bn', 
      name: 'Bengali', 
      nativeName: 'বাংলা',
      flag: '🇮🇳',
      greeting: 'অবিশ্বাস্য ভারতে আপনাকে স্বাগতম'
    },
    { 
      code: 'mr', 
      name: 'Marathi', 
      nativeName: 'मराठी',
      flag: '🇮🇳',
      greeting: 'अविश्वसनीय भारतात आपले स्वागत आहे'
    },
    { 
      code: 'kn', 
      name: 'Kannada', 
      nativeName: 'ಕನ್ನಡ',
      flag: '🇮🇳',
      greeting: 'ಅದ್ಭುತ ಭಾರತಕ್ಕೆ ಸ್ವಾಗತ'
    }
  ];

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && languages?.find(lang => lang?.code === savedLanguage)) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (!event?.target?.closest('.language-toggle')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    localStorage.setItem('selectedLanguage', langCode);
    setIsOpen(false);
    
    // Dispatch custom event for other components to listen to
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: langCode } 
    }));
  };

  const currentLanguage = languages?.find(lang => lang?.code === selectedLanguage);

  return (
    <div className="language-toggle relative">
      {/* Language Selector Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 border-border hover:border-primary/50 transition-smooth"
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="hidden sm:inline text-sm font-medium">
          {currentLanguage?.nativeName}
        </span>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={14} 
          className="transition-smooth"
        />
      </Button>
      {/* Language Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-soft z-50 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border bg-muted/30">
            <div className="flex items-center space-x-2">
              <Icon name="Languages" size={16} className="text-primary" />
              <span className="text-sm font-semibold text-foreground">
                Choose Language
              </span>
            </div>
          </div>

          {/* Language Options */}
          <div className="py-2 max-h-80 overflow-y-auto">
            {languages?.map((lang) => (
              <button
                key={lang?.code}
                onClick={() => handleLanguageChange(lang?.code)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-smooth hover:bg-muted/50 ${
                  selectedLanguage === lang?.code
                    ? 'bg-primary/10 text-primary border-r-2 border-primary' :'text-foreground'
                }`}
              >
                <span className="text-xl">{lang?.flag}</span>
                <div className="flex-1">
                  <div className="font-medium text-sm">
                    {lang?.nativeName}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {lang?.name}
                  </div>
                </div>
                {selectedLanguage === lang?.code && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-border bg-muted/30">
            <div className="text-xs text-muted-foreground text-center">
              <Icon name="Globe" size={12} className="inline mr-1" />
              More languages coming soon
            </div>
          </div>
        </div>
      )}
      {/* Floating Language Greeting */}
      {currentLanguage && selectedLanguage !== 'en' && (
        <div className="fixed bottom-4 right-4 z-40 bg-card border border-border rounded-lg shadow-soft p-4 max-w-xs">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">{currentLanguage?.flag}</span>
            <div>
              <div className="text-sm font-medium text-foreground mb-1">
                {currentLanguage?.greeting}
              </div>
              <div className="text-xs text-muted-foreground">
                Content is now in {currentLanguage?.nativeName}
              </div>
            </div>
            <button
              onClick={() => setSelectedLanguage('en')}
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name="X" size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;
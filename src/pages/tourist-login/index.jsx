import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import LoginForm from './components/LoginForm';
import LanguageToggle from './components/LanguageToggle';
import CulturalBackground from './components/CulturalBackground';

const TouristLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const handleLogin = async (loginData) => {
    setIsLoading(true);
    
    try {
      // Mock authentication process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user session
      const userSession = {
        email: loginData?.email,
        isAuthenticated: true,
        loginTime: new Date()?.toISOString(),
        rememberMe: loginData?.rememberMe || false,
        socialProvider: loginData?.socialProvider || null
      };
      
      localStorage.setItem('userSession', JSON.stringify(userSession));
      localStorage.setItem('isAuthenticated', 'true');
      
      // Redirect to dashboard or intended destination
      const intendedDestination = sessionStorage.getItem('intendedDestination') || '/ai-itinerary-planner';
      sessionStorage.removeItem('intendedDestination');
      navigate(intendedDestination);
      
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLocalizedContent = () => {
    const content = {
      en: {
        pageTitle: 'Tourist Login - Incredible India',
        breadcrumbItems: [
          { label: 'Home', path: '/public-landing-page' },
          { label: 'Login', path: '/tourist-login' }
        ]
      },
      hi: {
        pageTitle: 'पर्यटक लॉगिन - अतुल्य भारत',
        breadcrumbItems: [
          { label: 'होम', path: '/public-landing-page' },
          { label: 'लॉगिन', path: '/tourist-login' }
        ]
      },
      ta: {
        pageTitle: 'சுற்றுலா உள்நுழைவு - நம்பமுடியாத இந்தியா',
        breadcrumbItems: [
          { label: 'முகப்பு', path: '/public-landing-page' },
          { label: 'உள்நுழைவு', path: '/tourist-login' }
        ]
      },
      bn: {
        pageTitle: 'পর্যটক লগইন - অবিশ্বাস্য ভারত',
        breadcrumbItems: [
          { label: 'হোম', path: '/public-landing-page' },
          { label: 'লগইন', path: '/tourist-login' }
        ]
      },
      mr: {
        pageTitle: 'पर्यटक लॉगिन - अविश्वसनीय भारत',
        breadcrumbItems: [
          { label: 'होम', path: '/public-landing-page' },
          { label: 'लॉगिन', path: '/tourist-login' }
        ]
      },
      kn: {
        pageTitle: 'ಪ್ರವಾಸಿ ಲಾಗಿನ್ - ನಂಬಲಾಗದ ಭಾರತ',
        breadcrumbItems: [
          { label: 'ಮುಖ್ಯ', path: '/public-landing-page' },
          { label: 'ಲಾಗಿನ್', path: '/tourist-login' }
        ]
      }
    };

    return content?.[currentLanguage] || content?.en;
  };

  const localizedContent = getLocalizedContent();

  // Set page title
  useEffect(() => {
    document.title = localizedContent?.pageTitle;
  }, [localizedContent?.pageTitle]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Cultural Background */}
      <CulturalBackground />
      <main className="relative z-20 pt-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Breadcrumb customItems={localizedContent?.breadcrumbItems} />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-12rem)]">
            {/* Language Toggle - Mobile */}
            <div className="lg:hidden mb-6 self-end">
              <LanguageToggle />
            </div>

            {/* Main Content */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <LoginForm onLogin={handleLogin} isLoading={isLoading} />
            </div>

            {/* Language Toggle - Desktop */}
            <div className="hidden lg:block absolute top-8 right-8">
              <LanguageToggle />
            </div>
          </div>
        </div>
      </main>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card rounded-xl p-8 shadow-soft border border-border">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <p className="text-sm text-muted-foreground">Signing you in...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TouristLogin;
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FeaturesGrid from './components/FeaturesGrid';
import RouteHighlights from './components/RouteHighlights';
import TrustSignals from './components/TrustSignals';
import LanguageToggle from './components/LanguageToggle';
import Footer from './components/Footer';

const PublicLandingPage = () => {
  useEffect(() => {
    // Load saved language preference on page load
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    
    // Dispatch language change event for components to listen to
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: savedLanguage } 
    }));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Incredible India Tourism Hub - Discover Authentic Indian Experiences</title>
        <meta 
          name="description" 
          content="Explore India with AI-powered itinerary planning, authentic cultural experiences, and trusted local partnerships. From Golden Triangle to Char Dham Yatra - your gateway to Incredible India." 
        />
        <meta name="keywords" content="India tourism, travel India, Golden Triangle, Char Dham, Kerala backwaters, AI itinerary planner, Indian culture, heritage sites" />
        <meta property="og:title" content="Incredible India Tourism Hub - Discover Authentic Indian Experiences" />
        <meta property="og:description" content="Your trusted partner for exploring India's diverse landscapes, rich heritage, and vibrant culture with AI-powered planning." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://incredibleindia.com" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&h=630&fit=crop" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Incredible India Tourism Hub" />
        <meta name="twitter:description" content="Discover authentic Indian experiences with AI-powered travel planning" />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&h=630&fit=crop" />
        <link rel="canonical" href="https://incredibleindia.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "Incredible India Tourism Hub",
            "description": "AI-powered tourism platform for exploring India",
            "url": "https://incredibleindia.com",
            "logo": "https://incredibleindia.com/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-1800-123-4567",
              "contactType": "customer service"
            },
            "areaServed": "India",
            "serviceType": "Tourism and Travel Planning"
          })}
        </script>
      </Helmet>

      {/* Header */}
      <Header />

      {/* Language Toggle - Fixed Position */}
      <div className="fixed top-20 right-4 z-40">
        <LanguageToggle />
      </div>

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Grid */}
        <FeaturesGrid />

        {/* Route Highlights */}
        <RouteHighlights />

        {/* Trust Signals */}
        <TrustSignals />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PublicLandingPage;
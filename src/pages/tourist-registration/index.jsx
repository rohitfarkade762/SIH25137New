import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';

import Icon from '../../components/AppIcon';
import SocialAuthSection from './components/SocialAuthSection';
import RegistrationForm from './components/RegistrationForm';
import ProgressIndicator from './components/ProgressIndicator';
import CulturalImagery from './components/CulturalImagery';
import SuccessModal from './components/SuccessModal';

const TouristRegistration = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const steps = [
    { id: 1, label: 'Account' },
    { id: 2, label: 'Verify' },
    { id: 3, label: 'Profile' }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleSocialAuth = async (provider) => {
    setIsLoading(true);
    try {
      // Mock social authentication
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockUserData = {
        email: provider === 'google' ? 'user@gmail.com' : 'user@facebook.com',
        name: 'Social User',
        provider: provider
      };
      
      setRegisteredEmail(mockUserData?.email);
      setCurrentStep(2);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Social auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    try {
      // Mock registration API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save language preference
      localStorage.setItem('preferredLanguage', formData?.preferredLanguage);
      
      // Mock successful registration
      const mockResponse = {
        success: true,
        user: {
          id: 'user_123',
          email: formData?.email,
          name: `${formData?.firstName} ${formData?.lastName}`,
          phone: formData?.phone,
          preferredLanguage: formData?.preferredLanguage,
          travelInterests: formData?.travelInterests
        },
        verificationRequired: true
      };
      
      if (mockResponse?.success) {
        setRegisteredEmail(formData?.email);
        setCurrentStep(2);
        setShowSuccessModal(true);
        
        // Store user data for verification process
        localStorage.setItem('pendingUser', JSON.stringify(mockResponse?.user));
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  const handleContinueSetup = () => {
    setShowSuccessModal(false);
    navigate('/ai-itinerary-planner');
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/public-landing-page' },
    { label: 'Register', path: '/tourist-registration' }
  ];

  return (
    <>
      <Helmet>
        <title>Register - Incredible India Tourism Hub</title>
        <meta name="description" content="Create your account to access personalized travel planning, AI-powered itineraries, and authentic Indian experiences. Join thousands of travelers exploring India." />
        <meta name="keywords" content="India tourism registration, travel account, Indian destinations, travel planning" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb customItems={breadcrumbItems} className="mb-6" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Form */}
              <div className="order-2 lg:order-1">
                <div className="max-w-md mx-auto lg:mx-0">
                  <ProgressIndicator 
                    currentStep={currentStep} 
                    totalSteps={3} 
                    steps={steps} 
                  />
                  
                  <div className="bg-card border border-border rounded-lg shadow-soft p-6 lg:p-8">
                    <SocialAuthSection 
                      onSocialAuth={handleSocialAuth}
                      isLoading={isLoading}
                    />
                    
                    <RegistrationForm 
                      onSubmit={handleFormSubmit}
                      isLoading={isLoading}
                    />
                  </div>
                  
                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{' '}
                      <Link 
                        to="/tourist-login" 
                        className="text-primary hover:underline font-medium"
                      >
                        Sign in here
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Cultural Imagery */}
              <div className="order-1 lg:order-2">
                <div className="sticky top-24">
                  <CulturalImagery />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Success Modal */}
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={handleSuccessModalClose}
          userEmail={registeredEmail}
          onContinue={handleContinueSetup}
        />

        {/* Trust Indicators */}
        <section className="bg-muted/30 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Trusted by Travelers Worldwide
              </h2>
              <p className="text-muted-foreground">
                Join our community of verified travelers and local experts
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Shield" size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Secure Platform</h3>
                <p className="text-sm text-muted-foreground">Bank-level security</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Users" size={24} className="text-secondary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Verified Reviews</h3>
                <p className="text-sm text-muted-foreground">Authentic feedback</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Headphones" size={24} className="text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">Always here to help</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Award" size={24} className="text-warning" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Award Winning</h3>
                <p className="text-sm text-muted-foreground">Industry recognized</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-foreground text-background py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="MapPin" size={20} color="white" />
                </div>
                <h3 className="text-lg font-semibold">Incredible India Tourism Hub</h3>
              </div>
              <p className="text-sm opacity-80 mb-4">
                Discover the beauty, culture, and heritage of India with personalized travel experiences
              </p>
              <p className="text-xs opacity-60">
                © {new Date()?.getFullYear()} Incredible India Tourism Hub. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default TouristRegistration;
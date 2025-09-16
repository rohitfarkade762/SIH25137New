import React, { useState, useEffect } from 'react';

import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';

// Import components
import PreferenceCard from './components/PreferenceCard';
import RouteCard from './components/RouteCard';
import ItineraryTimeline from './components/ItineraryTimeline';
import BudgetSlider from './components/BudgetSlider';
import DateRangePicker from './components/DateRangePicker';
import ChatBot from './components/ChatBot';
import ItineraryMap from './components/ItineraryMap';

const AIItineraryPlanner = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [budget, setBudget] = useState(50000);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock data for preferences
  const preferences = [
    {
      id: 'heritage',
      title: 'Heritage & Culture',
      description: 'Explore ancient monuments and cultural sites',
      icon: 'Landmark',
      examples: ['Taj Mahal', 'Red Fort', 'Hampi Ruins']
    },
    {
      id: 'adventure',
      title: 'Adventure Sports',
      description: 'Thrilling outdoor activities and sports',
      icon: 'Mountain',
      examples: ['Trekking', 'River Rafting', 'Paragliding']
    },
    {
      id: 'spiritual',
      title: 'Spiritual Journey',
      description: 'Sacred temples and meditation retreats',
      icon: 'Heart',
      examples: ['Varanasi Ghats', 'Rishikesh', 'Golden Temple']
    },
    {
      id: 'food',
      title: 'Food & Cuisine',
      description: 'Authentic local flavors and cooking classes',
      icon: 'ChefHat',
      examples: ['Street Food Tours', 'Cooking Classes', 'Food Festivals']
    },
    {
      id: 'shopping',
      title: 'Shopping & Crafts',
      description: 'Local markets and traditional handicrafts',
      icon: 'ShoppingBag',
      examples: ['Jaipur Bazaars', 'Silk Sarees', 'Handicrafts']
    },
    {
      id: 'nature',
      title: 'Nature & Wildlife',
      description: 'National parks and scenic landscapes',
      icon: 'Trees',
      examples: ['Tiger Safari', 'Hill Stations', 'Backwaters']
    }
  ];

  // Mock data for pre-configured routes
  const featuredRoutes = [
    {
      id: 'golden-triangle',
      name: 'Golden Triangle',
      subtitle: 'Delhi • Agra • Jaipur',
      description: 'Experience India\'s most iconic destinations with rich history, magnificent architecture, and vibrant culture in this classic 7-day journey.',
      duration: '7 Days',
      destinations: 3,
      budgetRange: '25,000 - 75,000',
      rating: 4.8,
      reviews: 2847,
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500',
      highlights: ['Taj Mahal', 'Red Fort', 'Hawa Mahal', 'Amber Fort']
    },
    {
      id: 'char-dham',
      name: 'Char Dham Yatra',
      subtitle: 'Yamunotri • Gangotri • Kedarnath • Badrinath',
      description: 'Sacred pilgrimage to the four holy shrines in Uttarakhand, offering spiritual enlightenment amidst breathtaking Himalayan landscapes.',
      duration: '12 Days',
      destinations: 4,
      budgetRange: '40,000 - 80,000',
      rating: 4.9,
      reviews: 1523,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
      highlights: ['Sacred Temples', 'Himalayan Views', 'Spiritual Journey', 'Holy Rivers']
    },
    {
      id: 'northeast-trail',
      name: 'North-East Trails',
      subtitle: 'Assam • Meghalaya • Arunachal Pradesh',
      description: 'Discover India\'s hidden gems with pristine landscapes, unique cultures, and untouched natural beauty in the northeastern states.',
      duration: '10 Days',
      destinations: 6,
      budgetRange: '35,000 - 65,000',
      rating: 4.7,
      reviews: 892,
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500',
      highlights: ['Living Root Bridges', 'Tea Gardens', 'Tribal Culture', 'Waterfalls']
    },
    {
      id: 'kerala-backwaters',
      name: 'Kerala Backwaters',
      subtitle: 'Kochi • Alleppey • Munnar • Thekkady',
      description: 'Experience God\'s Own Country with serene backwaters, lush hill stations, spice plantations, and Ayurvedic wellness treatments.',
      duration: '8 Days',
      destinations: 4,
      budgetRange: '30,000 - 70,000',
      rating: 4.8,
      reviews: 1967,
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500',
      highlights: ['Houseboat Stay', 'Tea Plantations', 'Ayurveda', 'Spice Gardens']
    }
  ];

  // Mock generated itinerary
  const mockItinerary = {
    title: 'Golden Triangle Adventure',
    duration: '7 Days',
    totalCost: 52000,
    destinations: [
      { name: 'Delhi', state: 'Delhi', lat: 28.6139, lng: 77.2090, duration: '2 days', distance: '0 km' },
      { name: 'Agra', state: 'Uttar Pradesh', lat: 27.1767, lng: 78.0081, duration: '2 days', distance: '233 km' },
      { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873, duration: '3 days', distance: '238 km' }
    ],
    days: [
      {
        date: '2025-01-15',
        location: 'Delhi',
        activities: [
          {
            name: 'Red Fort Visit',
            description: 'Explore the magnificent Mughal architecture and learn about India\'s rich history',
            time: '9:00 AM',
            duration: '2 hours',
            cost: 500,
            rating: 4.6,
            icon: 'Landmark',
            bookable: true
          },
          {
            name: 'Chandni Chowk Food Tour',
            description: 'Taste authentic Delhi street food and traditional sweets',
            time: '12:00 PM',
            duration: '3 hours',
            cost: 1200,
            rating: 4.8,
            icon: 'ChefHat',
            bookable: true
          },
          {
            name: 'India Gate Evening Walk',
            description: 'Peaceful evening stroll around the iconic war memorial',
            time: '6:00 PM',
            duration: '1 hour',
            cost: 0,
            rating: 4.5,
            icon: 'MapPin',
            bookable: false
          }
        ],
        transport: {
          type: 'Train to Agra',
          details: 'Gatimaan Express - 8:10 AM departure',
          cost: 1500,
          duration: '1h 40m',
          icon: 'Train'
        },
        accommodation: {
          name: 'Hotel Taj Resorts',
          type: 'Luxury Hotel',
          cost: 8500,
          rating: 4.7
        }
      },
      {
        date: '2025-01-16',
        location: 'Agra',
        activities: [
          {
            name: 'Taj Mahal Sunrise Visit',
            description: 'Witness the breathtaking beauty of Taj Mahal at sunrise',
            time: '6:00 AM',
            duration: '3 hours',
            cost: 1100,
            rating: 4.9,
            icon: 'Sunrise',
            bookable: true
          },
          {
            name: 'Agra Fort Exploration',
            description: 'Discover the red sandstone fortress with stunning Yamuna views',
            time: '11:00 AM',
            duration: '2 hours',
            cost: 650,
            rating: 4.7,
            icon: 'Castle',
            bookable: true
          },
          {
            name: 'Mehtab Bagh Sunset',
            description: 'Perfect sunset view of Taj Mahal from across the river',
            time: '5:30 PM',
            duration: '1.5 hours',
            cost: 300,
            rating: 4.6,
            icon: 'Sunset',
            bookable: false
          }
        ],
        transport: {
          type: 'Private Car to Jaipur',
          details: 'AC Sedan - 9:00 AM departure via Fatehpur Sikri',
          cost: 3500,
          duration: '4h 30m',
          icon: 'Car'
        },
        accommodation: {
          name: 'Heritage Haveli',
          type: 'Heritage Hotel',
          cost: 6500,
          rating: 4.5
        }
      }
    ]
  };

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handlePreferenceToggle = (preferenceId) => {
    setSelectedPreferences(prev => 
      prev?.includes(preferenceId)
        ? prev?.filter(id => id !== preferenceId)
        : [...prev, preferenceId]
    );
  };

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
    setCurrentStep(4);
  };

  const generateItinerary = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setGeneratedItinerary(mockItinerary);
      setIsGenerating(false);
      setCurrentStep(5);
    }, 3000);
  };

  const handleBookActivity = (activity) => {
    console.log('Booking activity:', activity);
    // Implement booking logic
  };

  const handleModifyDay = (dayIndex) => {
    console.log('Modifying day:', dayIndex);
    // Implement day modification logic
  };

  const steps = [
    { number: 1, title: 'Preferences', description: 'Choose your interests' },
    { number: 2, title: 'Details', description: 'Budget, dates & travelers' },
    { number: 3, title: 'Routes', description: 'Select or customize route' },
    { number: 4, title: 'Generate', description: 'AI creates your itinerary' },
    { number: 5, title: 'Review', description: 'Your personalized plan' }
  ];

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {steps?.map((step, index) => (
        <div key={step?.number} className="flex items-center">
          <div className={`flex flex-col items-center ${
            currentStep >= step?.number ? 'text-primary' : 'text-muted-foreground'
          }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm border-2 ${
              currentStep >= step?.number 
                ? 'bg-primary text-white border-primary' :'bg-background border-muted-foreground'
            }`}>
              {currentStep > step?.number ? (
                <Icon name="Check" size={16} />
              ) : (
                step?.number
              )}
            </div>
            <div className="mt-2 text-center">
              <p className="text-xs font-medium">{step?.title}</p>
              <p className="text-xs opacity-70">{step?.description}</p>
            </div>
          </div>
          {index < steps?.length - 1 && (
            <div className={`w-16 h-0.5 mx-4 ${
              currentStep > step?.number ? 'bg-primary' : 'bg-muted'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          What interests you most?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select your travel preferences to help our AI create the perfect itinerary tailored to your interests and desires.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {preferences?.map((preference) => (
          <PreferenceCard
            key={preference?.id}
            preference={preference}
            isSelected={selectedPreferences?.includes(preference?.id)}
            onToggle={handlePreferenceToggle}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          variant="default"
          size="lg"
          onClick={() => setCurrentStep(2)}
          disabled={selectedPreferences?.length === 0}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Details
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Plan your journey details
        </h2>
        <p className="text-muted-foreground">
          Help us customize your perfect itinerary with your budget, travel dates, and group size.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Budget Section */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Icon name="IndianRupee" size={24} className="text-primary" />
            <div>
              <h3 className="text-xl font-semibold text-foreground">Budget Range</h3>
              <p className="text-sm text-muted-foreground">Set your preferred budget per person</p>
            </div>
          </div>
          <BudgetSlider value={budget} onChange={setBudget} />
        </div>

        {/* Travel Dates Section */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Icon name="Calendar" size={24} className="text-primary" />
            <div>
              <h3 className="text-xl font-semibold text-foreground">Travel Dates</h3>
              <p className="text-sm text-muted-foreground">When do you want to travel?</p>
            </div>
          </div>
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
        </div>
      </div>

      {/* Travelers Section */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Users" size={24} className="text-primary" />
          <div>
            <h3 className="text-xl font-semibold text-foreground">Number of Travelers</h3>
            <p className="text-sm text-muted-foreground">How many people will be traveling?</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTravelers(Math.max(1, travelers - 1))}
            disabled={travelers <= 1}
          >
            <Icon name="Minus" size={16} />
          </Button>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-foreground">{travelers}</span>
            <span className="text-muted-foreground">
              {travelers === 1 ? 'traveler' : 'travelers'}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTravelers(travelers + 1)}
            disabled={travelers >= 10}
          >
            <Icon name="Plus" size={16} />
          </Button>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          size="lg"
          onClick={() => setCurrentStep(1)}
          iconName="ArrowLeft"
        >
          Back
        </Button>
        <Button
          variant="default"
          size="lg"
          onClick={() => setCurrentStep(3)}
          disabled={!startDate || !endDate}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Routes
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Choose your route
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select from our curated routes or let our AI create a custom itinerary based on your preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredRoutes?.map((route) => (
          <RouteCard
            key={route?.id}
            route={route}
            onSelect={handleRouteSelect}
          />
        ))}
      </div>

      <div className="text-center">
        <div className="inline-flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
          <Icon name="Sparkles" size={24} className="text-primary" />
          <div className="text-left">
            <p className="font-medium text-foreground">Want something unique?</p>
            <p className="text-sm text-muted-foreground">Let our AI create a custom route just for you</p>
          </div>
          <Button
            variant="default"
            onClick={() => setCurrentStep(4)}
            iconName="Wand2"
          >
            Create Custom
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          variant="outline"
          size="lg"
          onClick={() => setCurrentStep(2)}
          iconName="ArrowLeft"
        >
          Back to Details
        </Button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Generating your perfect itinerary
        </h2>
        <p className="text-muted-foreground">
          Our AI is analyzing your preferences and creating a personalized travel experience just for you.
        </p>
      </div>

      {isGenerating ? (
        <div className="space-y-6">
          <div className="w-24 h-24 mx-auto">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Sparkles" size={32} className="text-primary" />
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-lg font-medium text-foreground">Processing your preferences...</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>✓ Analyzing {selectedPreferences?.length} selected interests</p>
              <p>✓ Finding best destinations for your budget</p>
              <p>✓ Optimizing routes and transportation</p>
              <p>✓ Selecting accommodations and activities</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Check" size={48} className="text-primary" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Ready to generate!</h3>
            <p className="text-muted-foreground">
              Click below to create your personalized itinerary
            </p>
          </div>
          
          <Button
            variant="default"
            size="lg"
            onClick={generateItinerary}
            iconName="Sparkles"
            iconPosition="right"
          >
            Generate My Itinerary
          </Button>
        </div>
      )}

      {!isGenerating && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setCurrentStep(3)}
            iconName="ArrowLeft"
          >
            Back to Routes
          </Button>
        </div>
      )}
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Your personalized itinerary is ready!
        </h2>
        <p className="text-muted-foreground">
          Review your custom travel plan and make any adjustments before booking.
        </p>
      </div>

      {generatedItinerary && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Itinerary Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{generatedItinerary?.title}</h3>
                  <p className="text-muted-foreground">{generatedItinerary?.duration} • ₹{generatedItinerary?.totalCost?.toLocaleString('en-IN')} per person</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" iconName="Download">
                    Export PDF
                  </Button>
                  <Button variant="outline" size="sm" iconName="Share">
                    Share
                  </Button>
                </div>
              </div>
              
              <ItineraryTimeline
                itinerary={generatedItinerary}
                onBookActivity={handleBookActivity}
                onModifyDay={handleModifyDay}
              />
            </div>
          </div>

          {/* Map and Summary */}
          <div className="space-y-6">
            <ItineraryMap
              destinations={generatedItinerary?.destinations}
              selectedDay={0}
              onDaySelect={(day) => console.log('Selected day:', day)}
            />
            
            <div className="bg-card border border-border rounded-xl p-6">
              <h4 className="font-semibold text-foreground mb-4">Trip Summary</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{generatedItinerary?.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Destinations</span>
                  <span className="font-medium">{generatedItinerary?.destinations?.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Cost</span>
                  <span className="font-medium">₹{generatedItinerary?.totalCost?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Per Person</span>
                  <span className="font-medium">₹{Math.round(generatedItinerary?.totalCost / travelers)?.toLocaleString('en-IN')}</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <Button variant="default" fullWidth iconName="CreditCard">
                  Book Complete Package
                </Button>
                <Button variant="outline" fullWidth iconName="Edit">
                  Customize Itinerary
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <Button
          variant="outline"
          size="lg"
          onClick={() => setCurrentStep(1)}
          iconName="RotateCcw"
        >
          Start Over
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Breadcrumb />
          </div>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Icon name="Sparkles" size={16} />
              <span>AI-Powered Travel Planning</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Create Your Perfect
              <span className="text-primary"> Indian Adventure</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Let our intelligent AI craft personalized itineraries based on your preferences, budget, and travel style. 
              Discover hidden gems and authentic experiences across incredible India.
            </p>
          </div>

          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Step Content */}
          <div className="bg-background">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
          </div>
        </div>
      </main>

      {/* Chat Bot */}
      <ChatBot
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default AIItineraryPlanner;
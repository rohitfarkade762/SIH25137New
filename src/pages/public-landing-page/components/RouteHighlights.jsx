import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RouteHighlights = () => {
  const [activeRoute, setActiveRoute] = useState(0);

  const routes = [
    {
      id: 1,
      name: "Golden Triangle",
      duration: "7 Days",
      cities: ["Delhi", "Agra", "Jaipur"],
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
      description: "Experience India's most iconic destinations including the Taj Mahal, Red Fort, and Hawa Mahal in this classic route.",
      highlights: ["Taj Mahal at Sunrise", "Red Fort & India Gate", "Amber Fort & City Palace", "Local Markets & Cuisine"],
      price: "₹25,000",
      rating: 4.8,
      travelers: "15,000+"
    },
    {
      id: 2,
      name: "Char Dham Yatra",
      duration: "12 Days",
      cities: ["Yamunotri", "Gangotri", "Kedarnath", "Badrinath"],
      image: "https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?w=800&h=600&fit=crop",
      description: "Embark on a spiritual journey to the four sacred Hindu pilgrimage sites nestled in the Himalayas.",
      highlights: ["Sacred Temple Visits", "Himalayan Landscapes", "Spiritual Ceremonies", "Mountain Trekking"],
      price: "₹45,000",
      rating: 4.9,
      travelers: "8,000+"
    },
    {
      id: 3,
      name: "North-East Trails",
      duration: "10 Days",
      cities: ["Guwahati", "Shillong", "Kaziranga", "Tawang"],
      image: "https://images.pixabay.com/photo/2019/11/16/20/28/landscape-4630581_1280.jpg?w=800&h=600&fit=crop",
      description: "Discover India's hidden gem with pristine landscapes, unique cultures, and diverse wildlife in the Seven Sister States.",
      highlights: ["Kaziranga National Park", "Living Root Bridges", "Monastery Visits", "Tribal Culture Experience"],
      price: "₹35,000",
      rating: 4.7,
      travelers: "5,000+"
    },
    {
      id: 4,
      name: "Kerala Backwaters",
      duration: "6 Days",
      cities: ["Kochi", "Alleppey", "Kumarakom", "Munnar"],
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",
      description: "Cruise through serene backwaters, explore spice plantations, and experience Kerala's rich cultural heritage.",
      highlights: ["Houseboat Experience", "Spice Plantation Tours", "Kathakali Performances", "Ayurvedic Treatments"],
      price: "₹30,000",
      rating: 4.8,
      travelers: "12,000+"
    }
  ];

  const nextRoute = () => {
    setActiveRoute((prev) => (prev + 1) % routes?.length);
  };

  const prevRoute = () => {
    setActiveRoute((prev) => (prev - 1 + routes?.length) % routes?.length);
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Route" size={16} />
            <span>Popular Routes</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Pre-Configured
            <span className="text-secondary"> Journey Routes</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Choose from our carefully curated travel routes that showcase India's diverse beauty, 
            from spiritual pilgrimages to cultural expeditions and natural wonders.
          </p>
        </div>

        {/* Route Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevRoute}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-soft rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-smooth -ml-6"
            aria-label="Previous route"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          
          <button
            onClick={nextRoute}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-soft rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-smooth -mr-6"
            aria-label="Next route"
          >
            <Icon name="ChevronRight" size={20} />
          </button>

          {/* Route Cards */}
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeRoute * 100}%)` }}
            >
              {routes?.map((route) => (
                <div key={route?.id} className="w-full flex-shrink-0">
                  <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-soft">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      {/* Image Section */}
                      <div className="relative h-64 lg:h-full">
                        <Image
                          src={route?.image}
                          alt={route?.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        
                        {/* Price Badge */}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                          <span className="text-lg font-bold text-foreground">{route?.price}</span>
                          <span className="text-sm text-muted-foreground ml-1">per person</span>
                        </div>

                        {/* Rating Badge */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full flex items-center space-x-1">
                          <Icon name="Star" size={14} className="text-warning fill-current" />
                          <span className="text-sm font-medium text-foreground">{route?.rating}</span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-8 lg:p-12">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex items-center space-x-2 text-primary">
                            <Icon name="Clock" size={16} />
                            <span className="text-sm font-medium">{route?.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-secondary">
                            <Icon name="Users" size={16} />
                            <span className="text-sm font-medium">{route?.travelers} travelers</span>
                          </div>
                        </div>

                        <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-4">
                          {route?.name}
                        </h3>

                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {route?.description}
                        </p>

                        {/* Cities */}
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-foreground mb-3">Route Cities:</h4>
                          <div className="flex flex-wrap gap-2">
                            {route?.cities?.map((city, index) => (
                              <span
                                key={city}
                                className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-medium"
                              >
                                {city}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Highlights */}
                        <div className="mb-8">
                          <h4 className="text-sm font-semibold text-foreground mb-3">Key Highlights:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {route?.highlights?.map((highlight, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <Icon name="Check" size={14} className="text-success" />
                                <span className="text-sm text-muted-foreground">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Link to="/ai-itinerary-planner" className="flex-1">
                            <Button 
                              variant="default" 
                              size="lg"
                              iconName="Calendar"
                              iconPosition="left"
                              className="w-full"
                            >
                              Plan This Route
                            </Button>
                          </Link>
                          
                          <Link to="/interactive-heritage-sites" className="flex-1">
                            <Button 
                              variant="outline" 
                              size="lg"
                              iconName="Info"
                              iconPosition="left"
                              className="w-full"
                            >
                              Learn More
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Route Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {routes?.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveRoute(index)}
                className={`w-3 h-3 rounded-full transition-smooth ${
                  index === activeRoute ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
                aria-label={`Go to route ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RouteHighlights;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1920&h=1080&fit=crop",
      title: "Discover the Taj Mahal",
      subtitle: "Experience the eternal symbol of love in Agra",
      location: "Agra, Uttar Pradesh"
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?w=1920&h=1080&fit=crop",
      title: "Kerala Backwaters",
      subtitle: "Cruise through serene waters and lush landscapes",
      location: "Alleppey, Kerala"
    },
    {
      id: 3,
      image: "https://images.pixabay.com/photo/2020/02/02/17/24/hawa-mahal-4813723_1280.jpg?w=1920&h=1080&fit=crop",
      title: "Hawa Mahal Palace",
      subtitle: "Marvel at the Pink City\'s architectural wonder",
      location: "Jaipur, Rajasthan"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
      title: "Himalayan Peaks",
      subtitle: "Adventure awaits in the world\'s highest mountains",
      location: "Himachal Pradesh"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides?.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides?.length) % heroSlides?.length);
  };

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
      {/* Background Slides */}
      <div className="absolute inset-0">
        {heroSlides?.map((slide, index) => (
          <div
            key={slide?.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide?.image}
              alt={slide?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
          </div>
        ))}
      </div>
      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-smooth"
        aria-label="Previous slide"
      >
        <Icon name="ChevronLeft" size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-smooth"
        aria-label="Next slide"
      >
        <Icon name="ChevronRight" size={24} />
      </button>
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {heroSlides?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-smooth ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 w-full">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center space-x-2 text-white/90">
              <Icon name="MapPin" size={16} />
              <span className="text-sm font-medium">
                {heroSlides?.[currentSlide]?.location}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
              {heroSlides?.[currentSlide]?.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {heroSlides?.[currentSlide]?.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/ai-itinerary-planner">
                <Button 
                  variant="default" 
                  size="lg"
                  iconName="Compass"
                  iconPosition="left"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold"
                >
                  Explore India
                </Button>
              </Link>
              
              <Link to="/tourist-registration">
                <Button 
                  variant="outline" 
                  size="lg"
                  iconName="Users"
                  iconPosition="left"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-foreground px-8 py-4 text-lg font-semibold"
                >
                  Partner With Us
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 text-white/80">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} />
                <span className="text-sm">50,000+ Happy Travelers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} />
                <span className="text-sm">500+ Destinations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={16} />
                <span className="text-sm">4.8/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturesGrid = () => {
  const features = [
    {
      id: 1,
      icon: "Brain",
      title: "AI-Powered Itinerary",
      description: "Get personalized travel plans crafted by artificial intelligence based on your preferences, budget, and time constraints.",
      color: "from-primary to-primary/80",
      link: "/ai-itinerary-planner",
      stats: "10,000+ Plans Created"
    },
    {
      id: 2,
      icon: "Palette",
      title: "Cultural Workshops",
      description: "Immerse yourself in authentic Indian culture through yoga sessions in Rishikesh, classical dance in Kerala, and pottery in Rajasthan.",
      color: "from-secondary to-secondary/80",
      link: "/interactive-heritage-sites",
      stats: "500+ Workshops Available"
    },
    {
      id: 3,
      icon: "ShoppingBag",
      title: "Local Marketplace",
      description: "Discover authentic handicrafts including Jaipur blue pottery, Banarasi sarees, Kerala spices, and Kashmiri carpets.",
      color: "from-accent to-accent/80",
      link: "/marketplace",
      stats: "2,000+ Artisan Products"
    },
    {
      id: 4,
      icon: "MapPin",
      title: "Heritage Sites Explorer",
      description: "Experience India's rich history through interactive AR views of Red Fort, Hampi ruins, Ajanta Caves, and more UNESCO sites.",
      color: "from-warning to-warning/80",
      link: "/interactive-heritage-sites",
      stats: "100+ Heritage Sites"
    },
    {
      id: 5,
      icon: "Languages",
      title: "Multilingual Support",
      description: "Navigate seamlessly in Hindi, Tamil, Bengali, Marathi, and English with real-time translation and local language guides.",
      color: "from-success to-success/80",
      link: "/tourist-registration",
      stats: "8 Languages Supported"
    },
    {
      id: 6,
      icon: "Leaf",
      title: "Eco-Tourism Rewards",
      description: "Earn eco-points for choosing sustainable travel options and exploring lesser-known destinations to preserve India\'s natural beauty.",
      color: "from-secondary to-accent",
      link: "/ai-itinerary-planner",
      stats: "Green Travel Certified"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Sparkles" size={16} />
            <span>Discover India's Wonders</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Your Gateway to
            <span className="text-primary"> Incredible India</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From AI-powered travel planning to authentic cultural experiences, discover everything you need 
            to explore India's diverse landscapes, rich heritage, and vibrant traditions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map((feature) => (
            <div
              key={feature?.id}
              className="group relative bg-card border border-border rounded-2xl p-8 hover:shadow-soft transition-smooth overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature?.color} opacity-0 group-hover:opacity-5 transition-smooth`}></div>
              
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature?.color} rounded-2xl mb-6 relative z-10`}>
                <Icon name={feature?.icon} size={28} color="white" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                  {feature?.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {feature?.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {feature?.stats}
                  </span>
                  <Icon name="ArrowUpRight" size={16} className="text-muted-foreground group-hover:text-primary transition-smooth" />
                </div>

                {/* CTA Link */}
                <Link to={feature?.link}>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="w-full justify-between text-left p-0 h-auto font-medium text-foreground hover:text-primary"
                  >
                    Explore Feature
                  </Button>
                </Link>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-smooth"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link to="/ai-itinerary-planner">
            <Button 
              variant="default" 
              size="lg"
              iconName="Compass"
              iconPosition="left"
              className="px-8 py-4 text-lg font-semibold"
            >
              Start Your Journey Today
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const certifications = [
    {
      id: 1,
      name: "Ministry of Tourism",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120&h=80&fit=crop",
      description: "Government of India Approved"
    },
    {
      id: 2,
      name: "IATO Certified",
      logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=120&h=80&fit=crop",
      description: "Indian Association of Tour Operators"
    },
    {
      id: 3,
      name: "ISO 9001:2015",
      logo: "https://images.pixabay.com/photo/2017/06/10/07/18/list-2389219_1280.png?w=120&h=80&fit=crop",
      description: "Quality Management System"
    },
    {
      id: 4,
      name: "Travel Safe",
      logo: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=120&h=80&fit=crop",
      description: "COVID-19 Safety Certified"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      text: "The AI itinerary planner created the perfect Golden Triangle tour for our family. Every detail was thoughtfully planned, and we discovered hidden gems we never would have found on our own.",
      trip: "Golden Triangle Tour"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Bangalore, Karnataka",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 5,
      text: "Incredible India Tourism Hub made our Char Dham Yatra seamless and spiritual. The local guides were knowledgeable, and the cultural workshops in Rishikesh were transformative.",
      trip: "Char Dham Yatra"
    },
    {
      id: 3,
      name: "Sarah Johnson",
      location: "London, UK",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
      text: "As a first-time visitor to India, this platform was invaluable. The multilingual support and authentic marketplace helped me experience the real India safely and comfortably.",
      trip: "Kerala Backwaters"
    }
  ];

  const stats = [
    {
      id: 1,
      icon: "Users",
      number: "50,000+",
      label: "Happy Travelers",
      color: "text-primary"
    },
    {
      id: 2,
      icon: "MapPin",
      number: "500+",
      label: "Destinations Covered",
      color: "text-secondary"
    },
    {
      id: 3,
      icon: "Star",
      number: "4.8/5",
      label: "Average Rating",
      color: "text-warning"
    },
    {
      id: 4,
      icon: "Award",
      number: "25+",
      label: "Industry Awards",
      color: "text-success"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Shield" size={16} />
            <span>Trusted & Certified</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Why Travelers
            <span className="text-success"> Trust Us</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            With government certifications, industry recognition, and thousands of satisfied travelers, 
            we're your trusted partner for exploring Incredible India.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats?.map((stat) => (
            <div key={stat?.id} className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 ${stat?.color} bg-current/10 rounded-2xl mb-4`}>
                <Icon name={stat?.icon} size={28} className={stat?.color} />
              </div>
              <div className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
                {stat?.number}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="text-xl font-heading font-semibold text-foreground text-center mb-8">
            Official Certifications & Partnerships
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications?.map((cert) => (
              <div key={cert?.id} className="text-center group">
                <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-soft transition-smooth">
                  <div className="w-20 h-16 mx-auto mb-4 bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={cert?.logo}
                      alt={cert?.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    />
                  </div>
                  <h4 className="font-semibold text-foreground text-sm mb-2">
                    {cert?.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {cert?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="text-xl font-heading font-semibold text-foreground text-center mb-8">
            What Our Travelers Say
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials?.map((testimonial) => (
              <div key={testimonial?.id} className="bg-card border border-border rounded-2xl p-8 hover:shadow-soft transition-smooth">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial?.rating)]?.map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial?.text}"
                </p>

                {/* Trip Badge */}
                <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-6">
                  <Icon name="MapPin" size={12} />
                  <span>{testimonial?.trip}</span>
                </div>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={testimonial?.avatar}
                      alt={testimonial?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      {testimonial?.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial?.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Badge */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-muted/50 px-8 py-4 rounded-2xl">
            <Icon name="Shield" size={24} className="text-success" />
            <div className="text-left">
              <div className="font-semibold text-foreground text-sm">
                Secure & Protected
              </div>
              <div className="text-xs text-muted-foreground">
                Your data and payments are fully encrypted and secure
              </div>
            </div>
            <Icon name="Lock" size={20} className="text-success" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
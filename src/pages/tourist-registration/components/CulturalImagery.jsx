import React from 'react';
import Image from '../../../components/AppImage';

const CulturalImagery = () => {
  const culturalImages = [
    {
      src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop",
      alt: "Taj Mahal at sunrise",
      title: "Heritage Wonders",
      description: "Explore India's magnificent monuments"
    },
    {
      src: "https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?w=400&h=300&fit=crop",
      alt: "Kerala backwaters with traditional houseboat",
      title: "Natural Beauty",
      description: "Discover serene landscapes"
    },
    {
      src: "https://images.pixabay.com/photo/2017/12/10/17/40/prague-3010407_1280.jpg?w=400&h=300&fit=crop",
      alt: "Traditional Indian dance performance",
      title: "Cultural Experiences",
      description: "Immerse in rich traditions"
    },
    {
      src: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=300&fit=crop",
      alt: "Colorful Indian spices in market",
      title: "Culinary Journey",
      description: "Taste authentic flavors"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Join Millions of Travelers
        </h2>
        <p className="text-muted-foreground">
          Discover authentic Indian experiences tailored just for you
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {culturalImages?.map((image, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg shadow-soft">
            <div className="aspect-[4/3] overflow-hidden">
              <Image
                src={image?.src}
                alt={image?.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-semibold text-sm mb-1">{image?.title}</h3>
              <p className="text-xs opacity-90">{image?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 text-center">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <h3 className="font-semibold text-foreground">AI-Powered Planning</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Get personalized itineraries based on your interests, budget, and travel style
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="space-y-2">
          <div className="text-2xl font-bold text-primary">500+</div>
          <div className="text-xs text-muted-foreground">Destinations</div>
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-secondary">50K+</div>
          <div className="text-xs text-muted-foreground">Happy Travelers</div>
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-accent">24/7</div>
          <div className="text-xs text-muted-foreground">Support</div>
        </div>
      </div>
    </div>
  );
};

export default CulturalImagery;
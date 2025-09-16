import React from 'react';
import Image from '../../../components/AppImage';

const CulturalBackground = () => {
  const backgroundImages = [
    {
      src: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&h=800&fit=crop",
      alt: "Taj Mahal at sunrise",
      position: "top-right"
    },
    {
      src: "https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?w=1200&h=800&fit=crop",
      alt: "Kerala backwaters",
      position: "bottom-left"
    },
    {
      src: "https://images.pixabay.com/photo/2017/10/11/10/03/jaipur-2840159_1280.jpg?w=1200&h=800&fit=crop",
      alt: "Hawa Mahal Jaipur",
      position: "center-left"
    }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95 z-10"></div>
      {/* Background Images */}
      <div className="relative w-full h-full">
        {backgroundImages?.map((image, index) => (
          <div
            key={index}
            className={`absolute w-64 h-48 opacity-10 ${
              image?.position === 'top-right' ? 'top-10 right-10' :
              image?.position === 'bottom-left'? 'bottom-10 left-10' : 'top-1/2 left-10 transform -translate-y-1/2'
            }`}
          >
            <div className="w-full h-full rounded-xl overflow-hidden">
              <Image
                src={image?.src}
                alt={image?.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 border-2 border-primary/20 rounded-full opacity-30"></div>
      <div className="absolute bottom-32 right-32 w-24 h-24 border-2 border-secondary/20 rounded-full opacity-30"></div>
      {/* Cultural Pattern */}
      <div className="absolute top-1/4 right-1/4 opacity-10">
        <svg width="120" height="120" viewBox="0 0 120 120" className="text-primary">
          <pattern id="cultural-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="3" fill="currentColor" />
            <path d="M20 10 L30 20 L20 30 L10 20 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="120" height="120" fill="url(#cultural-pattern)" />
        </svg>
      </div>
    </div>
  );
};

export default CulturalBackground;
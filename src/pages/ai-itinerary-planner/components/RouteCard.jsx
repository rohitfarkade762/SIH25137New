import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RouteCard = ({ route, onSelect }) => {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={route?.image}
          alt={route?.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/assets/images/no_image.png';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-semibold">{route?.name}</h3>
          <p className="text-sm opacity-90">{route?.subtitle}</p>
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-foreground">{route?.duration}</span>
        </div>
      </div>
      <div className="p-6">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {route?.description}
        </p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} className="text-primary" />
              <span className="text-sm font-medium">Destinations</span>
            </div>
            <span className="text-sm text-muted-foreground">{route?.destinations} places</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="IndianRupee" size={16} className="text-primary" />
              <span className="text-sm font-medium">Budget Range</span>
            </div>
            <span className="text-sm text-muted-foreground">₹{route?.budgetRange}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} className="text-primary" />
              <span className="text-sm font-medium">Rating</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium">{route?.rating}</span>
              <span className="text-xs text-muted-foreground">({route?.reviews} reviews)</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {route?.highlights?.map((highlight, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
            >
              {highlight}
            </span>
          ))}
        </div>
        
        <Button
          variant="default"
          fullWidth
          onClick={() => onSelect(route)}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Select Route
        </Button>
      </div>
    </div>
  );
};

export default RouteCard;
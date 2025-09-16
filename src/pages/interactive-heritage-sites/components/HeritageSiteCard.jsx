import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeritageSiteCard = ({ site, onSelect, isSelected }) => {
  return (
    <div 
      className={`bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-smooth hover:shadow-soft ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={() => onSelect(site)}
    >
      <div className="relative h-48">
        <Image 
          src={site?.image} 
          alt={site?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          {site?.isUNESCO && (
            <div className="bg-warning text-warning-foreground px-2 py-1 rounded-full text-xs font-medium">
              UNESCO
            </div>
          )}
          {site?.hasAR && (
            <div className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
              AR
            </div>
          )}
        </div>
        <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <div className="flex items-center space-x-1 text-xs">
            <Icon name="MapPin" size={12} />
            <span>{site?.location}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
          {site?.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {site?.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>{site?.period}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="Star" size={14} />
            <span>{site?.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-primary font-semibold">₹{site?.ticketPrice}</span>
            <span className="text-muted-foreground ml-1">per person</span>
          </div>
          <Button variant="outline" size="sm">
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeritageSiteCard;
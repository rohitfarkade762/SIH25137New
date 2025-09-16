import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ItineraryMap = ({ destinations, selectedDay, onDaySelect, className = "" }) => {
  const [mapView, setMapView] = useState('satellite');
  
  // Mock coordinates for demonstration
  const mapCenter = destinations?.length > 0 
    ? { lat: destinations?.[0]?.lat, lng: destinations?.[0]?.lng }
    : { lat: 28.6139, lng: 77.2090 }; // Delhi as default

  const generateMapUrl = () => {
    const markers = destinations?.map(dest => `${dest?.lat},${dest?.lng}`)?.join('|');
    return `https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=8&output=embed`;
  };

  return (
    <div className={`bg-card border border-border rounded-xl overflow-hidden ${className}`}>
      {/* Map Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Map" size={20} className="text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">Route Map</h3>
              <p className="text-sm text-muted-foreground">
                {destinations?.length} destinations planned
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={mapView === 'roadmap' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMapView('roadmap')}
            >
              <Icon name="Map" size={16} />
            </Button>
            <Button
              variant={mapView === 'satellite' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMapView('satellite')}
            >
              <Icon name="Satellite" size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-96">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Itinerary Route Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={generateMapUrl()}
          className="border-0"
        />
        
        {/* Map Overlay Controls */}
        <div className="absolute top-4 left-4 space-y-2">
          <Button
            variant="secondary"
            size="sm"
            className="bg-white/90 backdrop-blur-sm"
          >
            <Icon name="ZoomIn" size={16} />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="bg-white/90 backdrop-blur-sm"
          >
            <Icon name="ZoomOut" size={16} />
          </Button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-xs text-foreground">Current Location</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <span className="text-xs text-foreground">Planned Destination</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-accent rounded-full"></div>
            <span className="text-xs text-foreground">Route Path</span>
          </div>
        </div>
      </div>
      {/* Destination List */}
      <div className="p-4 space-y-3 max-h-48 overflow-y-auto">
        {destinations?.map((destination, index) => (
          <div
            key={index}
            onClick={() => onDaySelect && onDaySelect(index)}
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedDay === index
                ? 'bg-primary/10 border border-primary/20' :'bg-muted/50 hover:bg-muted'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
              selectedDay === index ? 'bg-primary' : 'bg-muted-foreground'
            }`}>
              {index + 1}
            </div>
            
            <div className="flex-1">
              <h4 className="font-medium text-foreground">{destination?.name}</h4>
              <p className="text-sm text-muted-foreground">{destination?.state}</p>
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{destination?.duration}</span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <Icon name="MapPin" size={14} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{destination?.distance}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Map Actions */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Route" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Total Distance: {destinations?.reduce((total, dest) => total + parseInt(dest?.distance || 0), 0)} km
            </span>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
            <Button variant="default" size="sm" iconName="Navigation">
              Navigate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryMap;
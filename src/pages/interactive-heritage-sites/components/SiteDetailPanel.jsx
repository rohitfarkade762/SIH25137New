import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SiteDetailPanel = ({ site, onClose, onAddToItinerary }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isPlaying, setIsPlaying] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'history', label: 'History', icon: 'BookOpen' },
    { id: 'architecture', label: 'Architecture', icon: 'Building' },
    { id: 'visit', label: 'Visit Info', icon: 'MapPin' }
  ];

  const handleAudioToggle = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft max-h-[80vh] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="relative">
        <div className="h-64 relative">
          <Image 
            src={site?.detailImage || site?.image} 
            alt={site?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background"
          >
            <Icon name="X" size={18} />
          </Button>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="font-heading font-bold text-2xl mb-2">{site?.name}</h2>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} />
                <span>{site?.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>{site?.period}</span>
              </div>
              {site?.isUNESCO && (
                <div className="bg-warning text-warning-foreground px-2 py-1 rounded-full text-xs font-medium">
                  UNESCO World Heritage
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Audio Guide */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant={isPlaying ? "default" : "outline"}
              size="sm"
              onClick={handleAudioToggle}
            >
              <Icon name={isPlaying ? "Pause" : "Play"} size={16} />
            </Button>
            <div>
              <p className="font-medium text-sm">Audio Guide Available</p>
              <p className="text-xs text-muted-foreground">
                Hindi, English, {site?.localLanguage}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Volume2" size={16} className="text-muted-foreground" />
            <div className="w-16 h-1 bg-border rounded-full">
              <div className="w-8 h-1 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-smooth ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">{site?.fullDescription}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Star" size={16} className="text-warning" />
                  <span className="font-medium text-sm">Rating</span>
                </div>
                <p className="text-lg font-semibold">{site?.rating}/5</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Users" size={16} className="text-accent" />
                  <span className="font-medium text-sm">Visitors/Year</span>
                </div>
                <p className="text-lg font-semibold">{site?.annualVisitors}</p>
              </div>
            </div>

            {site?.highlights && (
              <div>
                <h4 className="font-heading font-semibold mb-3">Key Highlights</h4>
                <div className="space-y-2">
                  {site?.highlights?.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                      <span className="text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-heading font-semibold mb-3">Historical Timeline</h4>
              <div className="space-y-4">
                {site?.timeline?.map((event, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      {index < site?.timeline?.length - 1 && (
                        <div className="w-0.5 h-8 bg-border mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-medium text-sm text-primary">{event?.year}</p>
                      <p className="text-sm text-foreground mt-1">{event?.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-heading font-semibold mb-3">Architectural Style</h4>
              <p className="text-sm text-foreground mb-4">{site?.architecturalStyle}</p>
            </div>

            {site?.architecturalFeatures && (
              <div>
                <h4 className="font-heading font-semibold mb-3">Key Features</h4>
                <div className="grid grid-cols-1 gap-3">
                  {site?.architecturalFeatures?.map((feature, index) => (
                    <div key={index} className="bg-muted/50 p-3 rounded-lg">
                      <h5 className="font-medium text-sm mb-1">{feature?.name}</h5>
                      <p className="text-xs text-muted-foreground">{feature?.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {site?.hasAR && (
              <div className="bg-accent/10 border border-accent/20 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Smartphone" size={16} className="text-accent" />
                  <span className="font-medium text-sm">AR Experience Available</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  View historical reconstructions and architectural details in augmented reality
                </p>
                <Button variant="outline" size="sm">
                  <Icon name="Camera" size={14} className="mr-2" />
                  Launch AR View
                </Button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'visit' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-heading font-semibold mb-2">Opening Hours</h4>
                <p className="text-sm text-foreground">{site?.openingHours}</p>
              </div>
              <div>
                <h4 className="font-heading font-semibold mb-2">Entry Fee</h4>
                <p className="text-sm text-foreground">₹{site?.ticketPrice} per person</p>
              </div>
            </div>

            <div>
              <h4 className="font-heading font-semibold mb-2">Best Time to Visit</h4>
              <p className="text-sm text-foreground">{site?.bestTime}</p>
            </div>

            <div>
              <h4 className="font-heading font-semibold mb-2">How to Reach</h4>
              <div className="space-y-2">
                {site?.transport?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <Icon name={option?.icon} size={14} className="text-muted-foreground" />
                    <span>{option?.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-heading font-semibold mb-2">Nearby Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {site?.amenities?.map((amenity, index) => (
                  <div key={index} className="bg-muted/50 px-2 py-1 rounded-full text-xs">
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-warning/10 border border-warning/20 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Users" size={14} className="text-warning" />
                <span className="font-medium text-sm">Current Crowd Level</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {site?.crowdLevel} - {site?.crowdDescription}
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Actions */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex space-x-3">
          <Button 
            variant="default" 
            onClick={() => onAddToItinerary(site)}
            className="flex-1"
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Add to Itinerary
          </Button>
          <Button variant="outline">
            <Icon name="Heart" size={16} />
          </Button>
          <Button variant="outline">
            <Icon name="Share" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SiteDetailPanel;
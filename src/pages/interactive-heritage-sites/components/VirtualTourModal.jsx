import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const VirtualTourModal = ({ site, isOpen, onClose }) => {
  const [currentView, setCurrentView] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);

  if (!isOpen || !site) return null;

  const virtualViews = [
    {
      id: 1,
      title: "Main Entrance",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
      description: "The grand entrance showcasing intricate architectural details",
      hotspots: [
        { x: 30, y: 40, title: "Carved Pillars", info: "Ancient stone carvings depicting mythological scenes" },
        { x: 70, y: 60, title: "Entrance Gate", info: "Original wooden doors with brass fittings" }
      ]
    },
    {
      id: 2,
      title: "Central Courtyard",
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=800&h=600&fit=crop",
      description: "The heart of the complex with ceremonial spaces",
      hotspots: [
        { x: 50, y: 30, title: "Central Dome", info: "Architectural marvel with acoustic properties" },
        { x: 25, y: 70, title: "Prayer Hall", info: "Sacred space for religious ceremonies" }
      ]
    },
    {
      id: 3,
      title: "Royal Chambers",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
      description: "Private quarters of the royal family",
      hotspots: [
        { x: 60, y: 45, title: "Throne Room", info: "Where royal audiences were held" },
        { x: 20, y: 55, title: "Royal Balcony", info: "Overlooking the main courtyard" }
      ]
    }
  ];

  const handleViewChange = (index) => {
    setCurrentView(index);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const currentViewData = virtualViews?.[currentView];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`bg-card rounded-lg shadow-soft overflow-hidden transition-smooth ${
        isFullscreen ? 'w-full h-full' : 'w-full max-w-6xl h-[80vh]'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h2 className="font-heading font-bold text-xl">{site?.name}</h2>
            <p className="text-sm text-muted-foreground">Virtual 360° Tour</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHotspots(!showHotspots)}
              className={showHotspots ? 'bg-primary/10 text-primary' : ''}
            >
              <Icon name="Info" size={16} className="mr-2" />
              Hotspots
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFullscreen}
            >
              <Icon name={isFullscreen ? "Minimize2" : "Maximize2"} size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>

        <div className="flex h-full">
          {/* Main View */}
          <div className="flex-1 relative">
            <div className="relative h-full">
              <Image
                src={currentViewData?.image}
                alt={currentViewData?.title}
                className="w-full h-full object-cover"
              />
              
              {/* 360° Indicator */}
              <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                360° View
              </div>

              {/* Navigation Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-black/60 text-white hover:bg-black/80"
                  onClick={() => handleViewChange(currentView > 0 ? currentView - 1 : virtualViews?.length - 1)}
                >
                  <Icon name="ChevronLeft" size={16} />
                </Button>
                <div className="bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {currentView + 1} / {virtualViews?.length}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-black/60 text-white hover:bg-black/80"
                  onClick={() => handleViewChange(currentView < virtualViews?.length - 1 ? currentView + 1 : 0)}
                >
                  <Icon name="ChevronRight" size={16} />
                </Button>
              </div>

              {/* Hotspots */}
              {showHotspots && currentViewData?.hotspots?.map((hotspot, index) => (
                <div
                  key={index}
                  className="absolute cursor-pointer group"
                  style={{ left: `${hotspot?.x}%`, top: `${hotspot?.y}%` }}
                >
                  <div className="w-6 h-6 bg-primary rounded-full border-2 border-white shadow-soft animate-pulse hover:animate-none hover:scale-110 transition-smooth">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon name="Info" size={12} color="white" />
                    </div>
                  </div>
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-smooth whitespace-nowrap">
                    <p className="font-medium text-sm">{hotspot?.title}</p>
                    <p className="text-xs text-gray-300">{hotspot?.info}</p>
                  </div>
                </div>
              ))}

              {/* View Controls */}
              <div className="absolute top-4 right-4 space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-black/60 text-white hover:bg-black/80"
                  title="Zoom In"
                >
                  <Icon name="ZoomIn" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-black/60 text-white hover:bg-black/80"
                  title="Zoom Out"
                >
                  <Icon name="ZoomOut" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-black/60 text-white hover:bg-black/80"
                  title="Reset View"
                >
                  <Icon name="RotateCcw" size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          {!isFullscreen && (
            <div className="w-80 border-l border-border bg-muted/30 overflow-y-auto">
              {/* Current View Info */}
              <div className="p-4 border-b border-border">
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {currentViewData?.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {currentViewData?.description}
                </p>
                
                {/* Audio Guide */}
                <div className="bg-card p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">Audio Guide</span>
                    <Button variant="ghost" size="sm">
                      <Icon name="Play" size={14} />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Icon name="Clock" size={12} />
                    <span>2:30 mins</span>
                  </div>
                </div>
              </div>

              {/* View Thumbnails */}
              <div className="p-4">
                <h4 className="font-medium text-sm mb-3">Tour Views</h4>
                <div className="space-y-2">
                  {virtualViews?.map((view, index) => (
                    <button
                      key={view?.id}
                      onClick={() => handleViewChange(index)}
                      className={`w-full flex items-center space-x-3 p-2 rounded-lg text-left transition-smooth ${
                        currentView === index
                          ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={view?.image}
                          alt={view?.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{view?.title}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {view?.hotspots?.length} hotspots
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tour Controls */}
              <div className="p-4 border-t border-border">
                <div className="space-y-3">
                  <Button variant="outline" fullWidth>
                    <Icon name="Download" size={16} className="mr-2" />
                    Download Tour
                  </Button>
                  <Button variant="outline" fullWidth>
                    <Icon name="Share" size={16} className="mr-2" />
                    Share Tour
                  </Button>
                  <Button variant="outline" fullWidth>
                    <Icon name="Bookmark" size={16} className="mr-2" />
                    Save to Favorites
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VirtualTourModal;
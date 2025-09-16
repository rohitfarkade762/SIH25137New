import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveMap = ({ sites, selectedSite, onSiteSelect, mapCenter, onMapCenterChange }) => {
  const [mapView, setMapView] = useState('satellite');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    unesco: false,
    ar: false,
    period: 'all',
    rating: 'all'
  });

  const mapViews = [
    { id: 'satellite', label: 'Satellite', icon: 'Satellite' },
    { id: 'terrain', label: 'Terrain', icon: 'Mountain' },
    { id: 'roadmap', label: 'Roadmap', icon: 'Map' }
  ];

  const periods = [
    { value: 'all', label: 'All Periods' },
    { value: 'ancient', label: 'Ancient (Before 500 CE)' },
    { value: 'medieval', label: 'Medieval (500-1500 CE)' },
    { value: 'mughal', label: 'Mughal (1500-1800 CE)' },
    { value: 'colonial', label: 'Colonial (1800-1947 CE)' }
  ];

  const filteredSites = sites?.filter(site => {
    if (activeFilters?.unesco && !site?.isUNESCO) return false;
    if (activeFilters?.ar && !site?.hasAR) return false;
    if (activeFilters?.period !== 'all' && site?.periodCategory !== activeFilters?.period) return false;
    if (activeFilters?.rating !== 'all') {
      const minRating = parseFloat(activeFilters?.rating);
      if (site?.rating < minRating) return false;
    }
    return true;
  });

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      unesco: false,
      ar: false,
      period: 'all',
      rating: 'all'
    });
  };

  const getMarkerColor = (site) => {
    if (site?.id === selectedSite?.id) return '#FF6B35';
    if (site?.isUNESCO) return '#FFC107';
    return '#4A90E2';
  };

  return (
    <div className="relative h-full bg-muted rounded-lg overflow-hidden">
      {/* Map Container */}
      <div className="h-full relative">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Heritage Sites Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=6&output=embed&maptype=${mapView}`}
          className="w-full h-full"
        />

        {/* Map Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Site Markers */}
          {filteredSites?.map((site, index) => (
            <div
              key={site?.id}
              className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${20 + (index % 5) * 15}%`,
                top: `${30 + Math.floor(index / 5) * 20}%`
              }}
              onClick={() => onSiteSelect(site)}
            >
              <div className="relative">
                <div 
                  className={`w-6 h-6 rounded-full border-2 border-white shadow-soft transition-smooth hover:scale-110 ${
                    site?.id === selectedSite?.id ? 'bg-primary' : 'bg-accent'
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon 
                      name="MapPin" 
                      size={12} 
                      color="white" 
                    />
                  </div>
                </div>
                {site?.id === selectedSite?.id && (
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg px-2 py-1 shadow-soft whitespace-nowrap">
                    <p className="text-xs font-medium">{site?.name}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        {/* View Toggle */}
        <div className="bg-card border border-border rounded-lg shadow-soft">
          <div className="flex">
            {mapViews?.map((view) => (
              <button
                key={view?.id}
                onClick={() => setMapView(view?.id)}
                className={`p-2 text-xs font-medium transition-smooth first:rounded-l-lg last:rounded-r-lg ${
                  mapView === view?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={view?.label}
              >
                <Icon name={view?.icon} size={14} />
              </button>
            ))}
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="bg-card border border-border rounded-lg shadow-soft">
          <div className="flex flex-col">
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth rounded-t-lg">
              <Icon name="Plus" size={14} />
            </button>
            <div className="border-t border-border"></div>
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth rounded-b-lg">
              <Icon name="Minus" size={14} />
            </button>
          </div>
        </div>

        {/* My Location */}
        <Button
          variant="outline"
          size="sm"
          className="bg-card shadow-soft"
          title="My Location"
        >
          <Icon name="Navigation" size={14} />
        </Button>
      </div>
      {/* Filter Toggle */}
      <div className="absolute top-4 left-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="bg-card shadow-soft"
        >
          <Icon name="Filter" size={14} className="mr-2" />
          Filters
          {Object.values(activeFilters)?.some(f => f !== false && f !== 'all') && (
            <div className="w-2 h-2 bg-primary rounded-full ml-2"></div>
          )}
        </Button>
      </div>
      {/* Filter Panel */}
      {showFilters && (
        <div className="absolute top-16 left-4 w-72 bg-card border border-border rounded-lg shadow-soft p-4 max-h-80 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold">Filter Sites</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(false)}
            >
              <Icon name="X" size={14} />
            </Button>
          </div>

          <div className="space-y-4">
            {/* Special Categories */}
            <div>
              <h4 className="font-medium text-sm mb-2">Special Categories</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={activeFilters?.unesco}
                    onChange={(e) => handleFilterChange('unesco', e?.target?.checked)}
                    className="rounded border-border"
                  />
                  <span className="text-sm">UNESCO World Heritage</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={activeFilters?.ar}
                    onChange={(e) => handleFilterChange('ar', e?.target?.checked)}
                    className="rounded border-border"
                  />
                  <span className="text-sm">AR Experience Available</span>
                </label>
              </div>
            </div>

            {/* Historical Period */}
            <div>
              <h4 className="font-medium text-sm mb-2">Historical Period</h4>
              <select
                value={activeFilters?.period}
                onChange={(e) => handleFilterChange('period', e?.target?.value)}
                className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {periods?.map((period) => (
                  <option key={period?.value} value={period?.value}>
                    {period?.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating */}
            <div>
              <h4 className="font-medium text-sm mb-2">Minimum Rating</h4>
              <select
                value={activeFilters?.rating}
                onChange={(e) => handleFilterChange('rating', e?.target?.value)}
                className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">All Ratings</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
                <option value="3.0">3.0+ Stars</option>
              </select>
            </div>

            {/* Clear Filters */}
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="w-full"
            >
              Clear All Filters
            </Button>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Showing {filteredSites?.length} of {sites?.length} sites
            </p>
          </div>
        </div>
      )}
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg shadow-soft p-3">
        <h4 className="font-medium text-sm mb-2">Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-xs">Selected Site</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-xs">UNESCO Site</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-xs">Heritage Site</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
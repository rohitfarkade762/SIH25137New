import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const HeritageFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  totalSites, 
  filteredCount 
}) => {
  const stateOptions = [
    { value: 'all', label: 'All States' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'kerala', label: 'Kerala' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'delhi', label: 'Delhi' }
  ];

  const periodOptions = [
    { value: 'all', label: 'All Periods' },
    { value: 'ancient', label: 'Ancient (Before 500 CE)' },
    { value: 'medieval', label: 'Medieval (500-1500 CE)' },
    { value: 'mughal', label: 'Mughal Era (1500-1800 CE)' },
    { value: 'colonial', label: 'Colonial (1800-1947 CE)' },
    { value: 'modern', label: 'Modern (After 1947)' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'fort', label: 'Forts & Palaces' },
    { value: 'temple', label: 'Temples' },
    { value: 'monument', label: 'Monuments' },
    { value: 'cave', label: 'Caves' },
    { value: 'tomb', label: 'Tombs & Mausoleums' },
    { value: 'archaeological', label: 'Archaeological Sites' }
  ];

  const ratingOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '4.5', label: '4.5+ Stars' },
    { value: '4.0', label: '4.0+ Stars' },
    { value: '3.5', label: '3.5+ Stars' },
    { value: '3.0', label: '3.0+ Stars' }
  ];

  const hasActiveFilters = Object.values(filters)?.some(value => 
    value !== 'all' && value !== false && value !== ''
  );

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} className="text-muted-foreground" />
          <h3 className="font-heading font-semibold">Filter Heritage Sites</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={14} className="mr-1" />
            Clear All
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* State Filter */}
        <Select
          label="State/Region"
          options={stateOptions}
          value={filters?.state}
          onChange={(value) => onFilterChange('state', value)}
          placeholder="Select state"
        />

        {/* Historical Period */}
        <Select
          label="Historical Period"
          options={periodOptions}
          value={filters?.period}
          onChange={(value) => onFilterChange('period', value)}
          placeholder="Select period"
        />

        {/* Site Type */}
        <Select
          label="Site Type"
          options={typeOptions}
          value={filters?.type}
          onChange={(value) => onFilterChange('type', value)}
          placeholder="Select type"
        />

        {/* Rating */}
        <Select
          label="Minimum Rating"
          options={ratingOptions}
          value={filters?.rating}
          onChange={(value) => onFilterChange('rating', value)}
          placeholder="Select rating"
        />
      </div>
      {/* Special Filters */}
      <div className="space-y-3 mb-4">
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters?.unesco}
              onChange={(e) => onFilterChange('unesco', e?.target?.checked)}
              className="rounded border-border text-primary focus:ring-primary/20"
            />
            <span className="text-sm font-medium">UNESCO World Heritage</span>
          </label>


       

          
        </div>
      </div>
      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search sites by name, location, or description..."
            value={filters?.search}
            onChange={(e) => onFilterChange('search', e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>
      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {filteredCount} of {totalSites} heritage sites
        </span>
        {hasActiveFilters && (
          <div className="flex items-center space-x-1">
            <Icon name="Filter" size={12} />
            <span>Filters applied</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeritageFilters;
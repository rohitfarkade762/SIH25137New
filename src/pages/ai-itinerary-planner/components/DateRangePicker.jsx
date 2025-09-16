import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const DateRangePicker = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDuration = () => {
    if (!startDate || !endDate) return '';
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'}`;
  };

  const getMinEndDate = () => {
    if (!startDate) return '';
    const start = new Date(startDate);
    start?.setDate(start?.getDate() + 1);
    return start?.toISOString()?.split('T')?.[0];
  };

  const getTodayDate = () => {
    return new Date()?.toISOString()?.split('T')?.[0];
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Departure Date</label>
          <div className="relative">
            <Input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e?.target?.value)}
              min={getTodayDate()}
              className="pl-10"
            />
            <Icon 
              name="Calendar" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Return Date</label>
          <div className="relative">
            <Input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e?.target?.value)}
              min={getMinEndDate()}
              className="pl-10"
              disabled={!startDate}
            />
            <Icon 
              name="Calendar" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
            />
          </div>
        </div>
      </div>
      {startDate && endDate && (
        <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center space-x-3">
            <Icon name="Clock" size={20} className="text-primary" />
            <div>
              <p className="font-medium text-foreground">Trip Duration</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(startDate)} - {formatDate(endDate)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{getDuration()}</p>
            <p className="text-xs text-muted-foreground">total duration</p>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <Icon name="Sunrise" size={16} className="mx-auto mb-1 text-orange-500" />
          <span className="text-muted-foreground">Best: Oct-Mar</span>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <Icon name="Sun" size={16} className="mx-auto mb-1 text-yellow-500" />
          <span className="text-muted-foreground">Peak: Dec-Jan</span>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <Icon name="Cloud" size={16} className="mx-auto mb-1 text-blue-500" />
          <span className="text-muted-foreground">Monsoon: Jun-Sep</span>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <Icon name="Thermometer" size={16} className="mx-auto mb-1 text-red-500" />
          <span className="text-muted-foreground">Hot: Apr-May</span>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
import React from 'react';
import Icon from '../../../components/AppIcon';

const BudgetSlider = ({ value, onChange, min = 5000, max = 200000 }) => {
  const formatCurrency = (amount) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000)?.toFixed(1)}L`;
    }
    return `₹${(amount / 1000)?.toFixed(0)}K`;
  };

  const getBudgetCategory = (amount) => {
    if (amount < 20000) return { label: 'Budget', color: 'text-green-600', icon: 'Wallet' };
    if (amount < 50000) return { label: 'Mid-Range', color: 'text-blue-600', icon: 'CreditCard' };
    if (amount < 100000) return { label: 'Premium', color: 'text-purple-600', icon: 'Gem' };
    return { label: 'Luxury', color: 'text-yellow-600', icon: 'Crown' };
  };

  const category = getBudgetCategory(value);
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name={category?.icon} size={20} className={category?.color} />
          <span className={`font-medium ${category?.color}`}>{category?.label}</span>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-foreground">{formatCurrency(value)}</span>
          <p className="text-xs text-muted-foreground">per person</p>
        </div>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={1000}
          value={value}
          onChange={(e) => onChange(parseInt(e?.target?.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${percentage}%, var(--color-muted) ${percentage}%, var(--color-muted) 100%)`
          }}
        />
        
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>{formatCurrency(min)}</span>
          <span>{formatCurrency(max)}</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 text-xs">
        <div className={`text-center p-2 rounded ${value < 20000 ? 'bg-green-100 text-green-700' : 'text-muted-foreground'}`}>
          <Icon name="Wallet" size={16} className="mx-auto mb-1" />
          <span>Budget</span>
        </div>
        <div className={`text-center p-2 rounded ${value >= 20000 && value < 50000 ? 'bg-blue-100 text-blue-700' : 'text-muted-foreground'}`}>
          <Icon name="CreditCard" size={16} className="mx-auto mb-1" />
          <span>Mid-Range</span>
        </div>
        <div className={`text-center p-2 rounded ${value >= 50000 && value < 100000 ? 'bg-purple-100 text-purple-700' : 'text-muted-foreground'}`}>
          <Icon name="Gem" size={16} className="mx-auto mb-1" />
          <span>Premium</span>
        </div>
        <div className={`text-center p-2 rounded ${value >= 100000 ? 'bg-yellow-100 text-yellow-700' : 'text-muted-foreground'}`}>
          <Icon name="Crown" size={16} className="mx-auto mb-1" />
          <span>Luxury</span>
        </div>
      </div>
    </div>
  );
};

export default BudgetSlider;
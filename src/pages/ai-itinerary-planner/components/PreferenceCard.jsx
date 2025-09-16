import React from 'react';
import Icon from '../../../components/AppIcon';

const PreferenceCard = ({ preference, isSelected, onToggle }) => {
  return (
    <div
      onClick={() => onToggle(preference?.id)}
      className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isSelected
          ? 'border-primary bg-primary/10 shadow-md'
          : 'border-border bg-card hover:border-primary/50'
      }`}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
          isSelected ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
        }`}>
          <Icon name={preference?.icon} size={32} />
        </div>
        
        <div>
          <h3 className={`font-semibold text-lg ${
            isSelected ? 'text-primary' : 'text-foreground'
          }`}>
            {preference?.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {preference?.description}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          {preference?.examples?.map((example, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                isSelected
                  ? 'bg-primary/20 text-primary' :'bg-muted text-muted-foreground'
              }`}
            >
              {example}
            </span>
          ))}
        </div>
      </div>
      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
          <Icon name="Check" size={16} color="white" />
        </div>
      )}
    </div>
  );
};

export default PreferenceCard;
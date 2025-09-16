import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ItineraryTimeline = ({ itinerary, onBookActivity, onModifyDay }) => {
  return (
    <div className="space-y-6">
      {itinerary?.days?.map((day, dayIndex) => (
        <div key={dayIndex} className="relative">
          {/* Timeline Line */}
          {dayIndex < itinerary?.days?.length - 1 && (
            <div className="absolute left-6 top-16 w-0.5 h-full bg-border" />
          )}
          
          <div className="flex items-start space-x-4">
            {/* Day Number */}
            <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
              {dayIndex + 1}
            </div>
            
            {/* Day Content */}
            <div className="flex-1 bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Day {dayIndex + 1} - {day?.location}
                  </h3>
                  <p className="text-sm text-muted-foreground">{day?.date}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onModifyDay(dayIndex)}
                  iconName="Edit"
                >
                  Modify
                </Button>
              </div>
              
              <div className="space-y-4">
                {day?.activities?.map((activity, activityIndex) => (
                  <div
                    key={activityIndex}
                    className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Icon name={activity?.icon} size={20} className="text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-foreground">{activity?.name}</h4>
                        <span className="text-sm text-muted-foreground">{activity?.time}</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {activity?.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Icon name="Clock" size={14} className="text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{activity?.duration}</span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <Icon name="IndianRupee" size={14} className="text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">₹{activity?.cost}</span>
                          </div>
                          
                          {activity?.rating && (
                            <div className="flex items-center space-x-1">
                              <Icon name="Star" size={14} className="text-yellow-500" />
                              <span className="text-xs text-muted-foreground">{activity?.rating}</span>
                            </div>
                          )}
                        </div>
                        
                        {activity?.bookable && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onBookActivity(activity)}
                            iconName="Calendar"
                          >
                            Book Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Transportation */}
              {day?.transport && (
                <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="flex items-center space-x-3">
                    <Icon name={day?.transport?.icon} size={20} className="text-accent" />
                    <div className="flex-1">
                      <h5 className="font-medium text-foreground">{day?.transport?.type}</h5>
                      <p className="text-sm text-muted-foreground">{day?.transport?.details}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">₹{day?.transport?.cost}</p>
                      <p className="text-xs text-muted-foreground">{day?.transport?.duration}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Accommodation */}
              {day?.accommodation && (
                <div className="mt-4 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                  <div className="flex items-center space-x-3">
                    <Icon name="Bed" size={20} className="text-secondary" />
                    <div className="flex-1">
                      <h5 className="font-medium text-foreground">{day?.accommodation?.name}</h5>
                      <p className="text-sm text-muted-foreground">{day?.accommodation?.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">₹{day?.accommodation?.cost}/night</p>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} className="text-yellow-500" />
                        <span className="text-xs text-muted-foreground">{day?.accommodation?.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryTimeline;
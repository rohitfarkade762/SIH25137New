import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialAuthSection = ({ onSocialAuth, isLoading }) => {
  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-white'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Quick Registration</h3>
        <p className="text-sm text-muted-foreground">Sign up with your social account</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.name}
            variant="outline"
            onClick={() => onSocialAuth(provider?.name?.toLowerCase())}
            disabled={isLoading}
            className="flex items-center justify-center space-x-2 py-3"
          >
            <Icon name={provider?.icon} size={20} />
            <span>Continue with {provider?.name}</span>
          </Button>
        ))}
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">Or register with email</span>
        </div>
      </div>
    </div>
  );
};

export default SocialAuthSection;
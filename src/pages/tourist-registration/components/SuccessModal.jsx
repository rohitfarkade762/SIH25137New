import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SuccessModal = ({ isOpen, onClose, userEmail, onContinue }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-soft max-w-md w-full p-6 space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Welcome to Incredible India!
          </h2>
          <p className="text-muted-foreground">
            Your account has been created successfully
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <Icon name="Mail" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Verification Email Sent</p>
              <p className="text-xs text-muted-foreground">{userEmail}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Icon name="Smartphone" size={20} className="text-accent" />
            <div>
              <p className="text-sm font-medium text-foreground">Mobile Verification</p>
              <p className="text-xs text-muted-foreground">Check your SMS for verification code</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <h3 className="font-semibold text-foreground mb-2">What's Next?</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Verify your email and phone number</li>
              <li>• Complete your travel profile</li>
              <li>• Start planning your dream trip</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              I'll verify later
            </Button>
            <Button
              variant="default"
              onClick={onContinue}
              iconName="ArrowRight"
              iconPosition="right"
              className="flex-1"
            >
              Continue Setup
            </Button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Didn't receive the email? Check your spam folder or{' '}
            <button className="text-primary hover:underline">
              resend verification
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
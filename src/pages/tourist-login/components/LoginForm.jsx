import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onLogin, isLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const mockCredentials = {
    email: 'tourist@incredibleindia.com',
    password: 'india123'
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    // Check mock credentials
    if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
      onLogin(formData);
      navigate('/ai-itinerary-planner');
    } else {
      setErrors({
        general: `Invalid credentials. Use ${mockCredentials?.email} and ${mockCredentials?.password}`
      });
    }
  };

  const handleSocialLogin = (provider) => {
    // Mock social login
    onLogin({ email: `user@${provider}.com`, socialProvider: provider });
    navigate('/ai-itinerary-planner');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-xl shadow-soft p-8 border border-border">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MapPin" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Sign in to continue your incredible journey
          </p>
        </div>

        {/* Social Login Options */}
        <div className="space-y-3 mb-6">
          <Button
            variant="outline"
            fullWidth
            onClick={() => handleSocialLogin('google')}
            className="flex items-center justify-center space-x-3 h-12"
          >
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            <span>Continue with Google</span>
          </Button>
          
          <Button
            variant="outline"
            fullWidth
            onClick={() => handleSocialLogin('facebook')}
            className="flex items-center justify-center space-x-3 h-12"
          >
            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">f</span>
            </div>
            <span>Continue with Facebook</span>
          </Button>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-card text-muted-foreground">Or continue with email</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors?.general && (
            <div className="bg-error/10 border border-error/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-error" />
                <p className="text-sm text-error">{errors?.general}</p>
              </div>
            </div>
          )}

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
          />

          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
            />
            
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:text-primary/80 transition-smooth"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isLoading}
            className="h-12"
          >
            Sign In
          </Button>
        </form>

        {/* Registration Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            New to Incredible India?{' '}
            <Link
              to="/tourist-registration"
              className="text-primary hover:text-primary/80 font-medium transition-smooth"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground text-center mb-2">Demo Credentials:</p>
          <div className="text-xs text-center space-y-1">
            <p><span className="font-medium">Email:</span> {mockCredentials?.email}</p>
            <p><span className="font-medium">Password:</span> {mockCredentials?.password}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
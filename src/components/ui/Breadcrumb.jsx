import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null, className = "" }) => {
  const location = useLocation();
  
  const pathMap = {
    '/public-landing-page': 'Home',
    '/tourist-registration': 'Register',
    '/tourist-login': 'Login',
    '/ai-itinerary-planner': 'AI Itinerary Planner',
    '/interactive-heritage-sites': 'Heritage Sites',
    '/plan-journey': 'Plan Journey',
    '/marketplace': 'Marketplace',
    '/about-india': 'About India',
    '/profile': 'Profile',
    '/bookings': 'My Bookings',
    '/settings': 'Settings'
  };

  const generateBreadcrumbs = () => {
    if (customItems) return customItems;
    
    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', path: '/public-landing-page' }];
    
    if (pathSegments?.length > 0) {
      let currentPath = '';
      pathSegments?.forEach((segment) => {
        currentPath += `/${segment}`;
        const label = pathMap?.[currentPath] || segment?.replace(/-/g, ' ')?.replace(/\b\w/g, l => l?.toUpperCase());
        breadcrumbs?.push({ label, path: currentPath });
      });
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  
  if (breadcrumbs?.length <= 1) return null;

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((crumb, index) => (
          <li key={crumb?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="text-muted-foreground mx-2" 
              />
            )}
            {index === breadcrumbs?.length - 1 ? (
              <span className="text-foreground font-medium" aria-current="page">
                {crumb?.label}
              </span>
            ) : (
              <Link
                to={crumb?.path}
                className="text-muted-foreground hover:text-primary transition-smooth"
              >
                {crumb?.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
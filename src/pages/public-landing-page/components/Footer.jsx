import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: "Explore India",
      links: [
        { label: "AI Itinerary Planner", path: "/ai-itinerary-planner" },
        { label: "Heritage Sites", path: "/interactive-heritage-sites" },
        { label: "Cultural Workshops", path: "/cultural-workshops" },
        { label: "Local Marketplace", path: "/marketplace" }
      ]
    },
    {
      title: "Popular Routes",
      links: [
        { label: "Golden Triangle", path: "/routes/golden-triangle" },
        { label: "Char Dham Yatra", path: "/routes/char-dham" },
        { label: "North-East Trails", path: "/routes/northeast" },
        { label: "Kerala Backwaters", path: "/routes/kerala" }
      ]
    },
    {
      title: "For Business",
      links: [
        { label: "Partner With Us", path: "/business-registration" },
        { label: "Hotel Listings", path: "/hotel-dashboard" },
        { label: "Vendor Portal", path: "/vendor-portal" },
        { label: "Business Analytics", path: "/business-analytics" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", path: "/help" },
        { label: "Contact Us", path: "/contact" },
        { label: "Travel Guidelines", path: "/guidelines" },
        { label: "Safety Tips", path: "/safety" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", url: "https://facebook.com" },
    { name: "Twitter", icon: "Twitter", url: "https://twitter.com" },
    { name: "Instagram", icon: "Instagram", url: "https://instagram.com" },
    { name: "YouTube", icon: "Youtube", url: "https://youtube.com" },
    { name: "LinkedIn", icon: "Linkedin", url: "https://linkedin.com" }
  ];

  const certifications = [
    "Ministry of Tourism Approved",
    "IATO Certified",
    "ISO 9001:2015",
    "Travel Safe Certified"
  ];

  return (
    <footer className="bg-foreground text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/public-landing-page" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Icon name="MapPin" size={28} color="white" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-white">
                  Incredible India
                </h3>
                <p className="text-sm text-white/70 -mt-1">
                  Tourism Hub
                </p>
              </div>
            </Link>
            
            <p className="text-white/80 mb-6 leading-relaxed">
              Your trusted partner for exploring India's diverse landscapes, rich heritage, 
              and vibrant culture. From AI-powered itineraries to authentic local experiences.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4 mb-6">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-smooth"
                  aria-label={social?.name}
                >
                  <Icon name={social?.icon} size={18} />
                </a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="bg-white/5 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2">Stay Updated</h4>
              <p className="text-sm text-white/70 mb-4">
                Get travel tips and exclusive offers
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-sm focus:outline-none focus:border-primary"
                />
                <Button variant="default" size="sm">
                  <Icon name="Send" size={14} />
                </Button>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections?.map((section) => (
            <div key={section?.title}>
              <h4 className="font-heading font-semibold text-white mb-4">
                {section?.title}
              </h4>
              <ul className="space-y-3">
                {section?.links?.map((link) => (
                  <li key={link?.label}>
                    <Link
                      to={link?.path}
                      className="text-white/70 hover:text-primary transition-smooth text-sm"
                    >
                      {link?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <h4 className="font-semibold text-white mb-4 text-center">
            Trusted & Certified
          </h4>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications?.map((cert) => (
              <div
                key={cert}
                className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-lg"
              >
                <Icon name="Shield" size={14} className="text-success" />
                <span className="text-sm text-white/80">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Icon name="Phone" size={16} className="text-primary" />
              <div>
                <div className="text-sm text-white/70">24/7 Support</div>
                <div className="text-white font-medium">+91 1800-123-4567</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Icon name="Mail" size={16} className="text-primary" />
              <div>
                <div className="text-sm text-white/70">Email Us</div>
                <div className="text-white font-medium">support@incredibleindia.com</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Icon name="MapPin" size={16} className="text-primary" />
              <div>
                <div className="text-sm text-white/70">Head Office</div>
                <div className="text-white font-medium">New Delhi, India</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-white/70">
              © {currentYear} Incredible India Tourism Hub. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-white/70 hover:text-primary transition-smooth">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-white/70 hover:text-primary transition-smooth">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-white/70 hover:text-primary transition-smooth">
                Cookie Policy
              </Link>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-white/70">
              <Icon name="Heart" size={14} className="text-error" />
              <span>Made in India</span>
              <span className="text-lg">🇮🇳</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
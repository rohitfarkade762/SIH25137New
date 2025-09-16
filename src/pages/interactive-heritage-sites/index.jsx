import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import HeritageSiteCard from './components/HeritageSiteCard';
import SiteDetailPanel from './components/SiteDetailPanel';
import InteractiveMap from './components/InteractiveMap';
import VirtualTourModal from './components/VirtualTourModal';
import HeritageFilters from './components/HeritageFilters';

const InteractiveHeritageSites = () => {
  const [selectedSite, setSelectedSite] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'map'
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [favorites, setFavorites] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Center of India
  const [filters, setFilters] = useState({
    state: 'all',
    period: 'all',
    type: 'all',
    rating: 'all',
    unesco: false,
    arEnabled: false,
    virtualTour: false,
    audioGuide: false,
    search: ''
  });

  // Mock heritage sites data
  const heritageSites = [
    {
      id: 1,
      name: "Red Fort (Lal Qila)",
      location: "Delhi",
      state: "delhi",
      description: "A historic fortified palace of the Mughal emperors, showcasing Indo-Islamic architecture.",
      fullDescription: `The Red Fort, also known as Lal Qila, is a historic fortified palace of the Mughal emperors for nearly 200 years, until 1857. It is located in the center of Delhi and houses a number of museums. In addition to accommodating the emperors and their households, it was the ceremonial and political center of the Mughal state and the setting for events critically impacting the region.`,
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=400&fit=crop",
      detailImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
      period: "1648 CE",
      periodCategory: "mughal",
      type: "fort",
      rating: 4.5,
      ticketPrice: 35,
      openingHours: "9:30 AM - 4:30 PM (Closed on Mondays)",
      bestTime: "October to March",
      isUNESCO: true,
      hasAR: true,
      hasVirtualTour: true,
      hasAudioGuide: true,
      annualVisitors: "2.5 Million",
      localLanguage: "Hindi",
      crowdLevel: "Moderate",
      crowdDescription: "Best visited early morning or late afternoon",
      architecturalStyle: "Indo-Islamic architecture with Persian, Timurid and Indian architectural elements",
      highlights: [
        "Diwan-i-Aam (Hall of Public Audience)",
        "Diwan-i-Khas (Hall of Private Audience)",
        "Rang Mahal (Palace of Colors)",
        "Mumtaz Mahal Museum",
        "Hayat Baksh Bagh (Life-Bestowing Garden)"
      ],
      timeline: [
        { year: "1638", event: "Construction began under Shah Jahan" },
        { year: "1648", event: "Fort completed and became Mughal capital" },
        { year: "1857", event: "Last Mughal emperor Bahadur Shah II captured here" },
        { year: "2007", event: "Designated as UNESCO World Heritage Site" }
      ],
      architecturalFeatures: [
        {
          name: "Lahori Gate",
          description: "Main entrance gate facing Lahore, with intricate Mughal design"
        },
        {
          name: "Chhatta Chowk",
          description: "Covered bazaar leading to the main palace complex"
        },
        {
          name: "Naqqar Khana",
          description: "Drum house where musicians played for the emperor"
        }
      ],
      transport: [
        { icon: "Train", description: "Chandni Chowk Metro Station (1 km)" },
        { icon: "Bus", description: "Red Fort Bus Stop (200m)" },
        { icon: "Car", description: "Parking available at Meena Bazaar" }
      ],
      amenities: ["Parking", "Cafeteria", "Souvenir Shop", "Guided Tours", "Wheelchair Access"]
    },
    {
      id: 2,
      name: "Hampi",
      location: "Karnataka",
      state: "karnataka",
      description: "Ruins of the Vijayanagara Empire, showcasing magnificent temples and royal complexes.",
      fullDescription: `Hampi is a UNESCO World Heritage Site located in east-central Karnataka. It became the centre of the Hindu Vijayanagara Empire capital in the 14th century. Chronicles left by Persian and European travellers, particularly the Portuguese, say that Hampi was one of the richest and largest cities in the world during its prime.`,
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=600&h=400&fit=crop",
      detailImage: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=800&h=600&fit=crop",
      period: "14th Century CE",
      periodCategory: "medieval",
      type: "archaeological",
      rating: 4.7,
      ticketPrice: 40,
      openingHours: "6:00 AM - 6:00 PM (Daily)",
      bestTime: "October to February",
      isUNESCO: true,
      hasAR: true,
      hasVirtualTour: true,
      hasAudioGuide: true,
      annualVisitors: "500,000",
      localLanguage: "Kannada",
      crowdLevel: "Low",
      crowdDescription: "Peaceful exploration possible throughout the day",
      architecturalStyle: "Vijayanagara architecture with Dravidian influences",
      highlights: [
        "Virupaksha Temple",
        "Vittala Temple Complex",
        "Stone Chariot",
        "Elephant Stables",
        "Lotus Mahal"
      ],
      timeline: [
        { year: "1336", event: "Vijayanagara Empire established" },
        { year: "1565", event: "Battle of Talikota, city abandoned" },
        { year: "1986", event: "Declared UNESCO World Heritage Site" },
        { year: "2019", event: "Major restoration projects completed" }
      ],
      architecturalFeatures: [
        {
          name: "Stone Chariot",
          description: "Iconic stone sculpture representing the chariot of Garuda"
        },
        {
          name: "Musical Pillars",
          description: "Pillars in Vittala Temple that produce musical notes when struck"
        },
        {
          name: "Stepped Tank",
          description: "Ancient water management system with geometric precision"
        }
      ],
      transport: [
        { icon: "Train", description: "Hospet Railway Station (13 km)" },
        { icon: "Bus", description: "Regular buses from Hospet and Bangalore" },
        { icon: "Car", description: "Well-connected by road, parking available" }
      ],
      amenities: ["Parking", "Rest House", "Local Guides", "Bicycle Rental", "Food Stalls"]
    },
    {
      id: 3,
      name: "Ajanta Caves",
      location: "Maharashtra",
      state: "maharashtra",
      description: "Ancient Buddhist cave monuments with exquisite paintings and sculptures.",
      fullDescription: `The Ajanta Caves are approximately 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE in the Aurangabad district of Maharashtra state in India. The caves include paintings and rock-cut sculptures described as among the finest surviving examples of ancient Indian art.`,
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop",
      detailImage: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
      period: "2nd Century BCE - 6th Century CE",
      periodCategory: "ancient",
      type: "cave",
      rating: 4.6,
      ticketPrice: 40,
      openingHours: "9:00 AM - 5:30 PM (Closed on Mondays)",
      bestTime: "November to March",
      isUNESCO: true,
      hasAR: true,
      hasVirtualTour: true,
      hasAudioGuide: true,
      annualVisitors: "800,000",
      localLanguage: "Marathi",
      crowdLevel: "Moderate",
      crowdDescription: "Early morning visits recommended for better lighting",
      architecturalStyle: "Buddhist rock-cut architecture with Gupta period influences",
      highlights: [
        "Cave 1 - Bodhisattva Padmapani",
        "Cave 2 - Jataka Tales Paintings",
        "Cave 16 - The Great Miracle",
        "Cave 17 - Wheel of Life",
        "Cave 26 - Parinirvana of Buddha"
      ],
      timeline: [
        { year: "2nd Century BCE", event: "First phase of cave construction" },
        { year: "5th Century CE", event: "Second phase with elaborate paintings" },
        { year: "1819", event: "Rediscovered by British officer John Smith" },
        { year: "1983", event: "Designated as UNESCO World Heritage Site" }
      ],
      architecturalFeatures: [
        {
          name: "Chaitya Halls",
          description: "Prayer halls with elaborate facades and interior columns"
        },
        {
          name: "Viharas",
          description: "Monastery halls with cells for monks"
        },
        {
          name: "Frescoes",
          description: "Ancient paintings depicting Buddhist themes and court life"
        }
      ],
      transport: [
        { icon: "Train", description: "Aurangabad Railway Station (100 km)" },
        { icon: "Bus", description: "State transport buses from Aurangabad" },
        { icon: "Car", description: "Well-maintained road, parking available" }
      ],
      amenities: ["Parking", "Museum", "Cafeteria", "Guided Tours", "Photography Allowed"]
    },
    {
      id: 4,
      name: "Hawa Mahal",
      location: "Jaipur, Rajasthan",
      state: "rajasthan",
      description: "Palace of Winds with distinctive pink sandstone facade and intricate lattice work.",
      fullDescription: `Hawa Mahal is a palace in the city of Jaipur, India. Built from red and pink sandstone, it is on the edge of the City Palace, Jaipur, and extends to the Zenana, or women's chambers. The structure was built in 1799 by the Maharaja Sawai Pratap Singh, and designed by Lal Chand Ustad in the form of the crown of Krishna, the Hindu god.`,
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&h=400&fit=crop",
      detailImage: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop",
      period: "1799 CE",
      periodCategory: "medieval",
      type: "monument",
      rating: 4.4,
      ticketPrice: 50,
      openingHours: "9:00 AM - 4:30 PM (Daily)",
      bestTime: "October to March",
      isUNESCO: false,
      hasAR: true,
      hasVirtualTour: true,
      hasAudioGuide: true,
      annualVisitors: "1.2 Million",
      localLanguage: "Hindi",
      crowdLevel: "High",
      crowdDescription: "Very crowded during peak tourist season",
      architecturalStyle: "Rajputana architecture with Islamic influences",
      highlights: [
        "953 small windows (Jharokhas)",
        "Five-story pyramidal structure",
        "Pink sandstone facade",
        "Intricate lattice work",
        "Archaeological Museum"
      ],
      timeline: [
        { year: "1799", event: "Built by Maharaja Sawai Pratap Singh" },
        { year: "1951", event: "Converted into a museum" },
        { year: "2006", event: "Major restoration work completed" },
        { year: "2018", event: "Digital preservation project launched" }
      ],
      architecturalFeatures: [
        {
          name: "Jharokhas",
          description: "Small windows with intricate latticework for ventilation"
        },
        {
          name: "Pyramidal Shape",
          description: "Unique five-story structure resembling Krishna\'s crown"
        },
        {
          name: "Pink Sandstone",
          description: "Local Rajasthani sandstone giving the palace its distinctive color"
        }
      ],
      transport: [
        { icon: "Train", description: "Jaipur Railway Station (3 km)" },
        { icon: "Bus", description: "City bus service to Hawa Mahal" },
        { icon: "Car", description: "Limited parking, walking distance from City Palace" }
      ],
      amenities: ["Museum", "Photography", "Souvenir Shop", "Nearby Restaurants", "City Palace Access"]
    },
    {
      id: 5,
      name: "Konark Sun Temple",
      location: "Odisha",
      state: "odisha",
      description: "13th-century temple dedicated to the Sun God, designed as a colossal chariot.",
      fullDescription: `The Konark Sun Temple is a 13th-century CE Hindu Sun temple at Konark about 35 kilometres northeast of Puri on the coastline in Puri district, Odisha, India. The temple is attributed to king Narasimhadeva I of the Eastern Ganga dynasty about 1250 CE. Dedicated to the Hindu Sun god Surya, what remains of the temple complex has the appearance of a 100-foot high chariot with immense wheels and horses.`,
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop",
      detailImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
      period: "13th Century CE",
      periodCategory: "medieval",
      type: "temple",
      rating: 4.8,
      ticketPrice: 40,
      openingHours: "6:00 AM - 8:00 PM (Daily)",
      bestTime: "October to February",
      isUNESCO: true,
      hasAR: true,
      hasVirtualTour: true,
      hasAudioGuide: true,
      annualVisitors: "1.5 Million",
      localLanguage: "Odia",
      crowdLevel: "Moderate",
      crowdDescription: "Sunrise and sunset times are most crowded",
      architecturalStyle: "Kalinga architecture with intricate stone carvings",
      highlights: [
        "Chariot-shaped temple design",
        "24 carved wheels",
        "Seven horses pulling the chariot",
        "Erotic sculptures",
        "Sun dial functionality"
      ],
      timeline: [
        { year: "1250", event: "Built by King Narasimhadeva I" },
        { year: "1627", event: "Temple damaged by Mughal invasion" },
        { year: "1984", event: "Declared UNESCO World Heritage Site" },
        { year: "2010", event: "Conservation project initiated by ASI" }
      ],
      architecturalFeatures: [
        {
          name: "Stone Wheels",
          description: "24 intricately carved wheels functioning as sundials"
        },
        {
          name: "Horse Sculptures",
          description: "Seven horses representing days of the week"
        },
        {
          name: "Erotic Carvings",
          description: "Detailed sculptures depicting various aspects of life"
        }
      ],
      transport: [
        { icon: "Train", description: "Puri Railway Station (35 km)" },
        { icon: "Bus", description: "Regular buses from Puri and Bhubaneswar" },
        { icon: "Car", description: "Well-connected by road, ample parking" }
      ],
      amenities: ["Parking", "Museum", "Light & Sound Show", "Cafeteria", "Souvenir Shop"]
    },
    {
      id: 6,
      name: "Meenakshi Temple",
      location: "Madurai, Tamil Nadu",
      state: "tamil-nadu",
      description: "Historic Hindu temple with towering gopurams and intricate Dravidian architecture.",
      fullDescription: `Meenakshi Temple, also referred to as Meenakshi Amman or Minakshi-Sundareshwara Temple, is a historic Hindu temple located on the southern bank of the Vaigai River in the temple city of Madurai, Tamil Nadu, India. It is dedicated to the goddess Meenakshi, a form of Parvati, and her consort, Sundareshwar, a form of Shiva.`,
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop",
      detailImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
      period: "6th Century CE (Current structure 17th Century)",
      periodCategory: "medieval",
      type: "temple",
      rating: 4.9,
      ticketPrice: 50,
      openingHours: "5:00 AM - 12:30 PM, 4:00 PM - 9:30 PM",
      bestTime: "October to March",
      isUNESCO: false,
      hasAR: false,
      hasVirtualTour: true,
      hasAudioGuide: true,
      annualVisitors: "15 Million",
      localLanguage: "Tamil",
      crowdLevel: "Very High",
      crowdDescription: "Extremely crowded during festivals and weekends",
      architecturalStyle: "Dravidian architecture with elaborate gopurams",
      highlights: [
        "14 colorful gopurams",
        "Hall of Thousand Pillars",
        "Golden Lotus Tank",
        "Meenakshi shrine",
        "Musical pillars"
      ],
      timeline: [
        { year: "6th Century", event: "Original temple established" },
        { year: "14th Century", event: "Destroyed by Malik Kafur" },
        { year: "1623-1655", event: "Current structure built by Nayak rulers" },
        { year: "1995", event: "Major renovation completed" }
      ],
      architecturalFeatures: [
        {
          name: "Gopurams",
          description: "Towering temple gates with colorful sculptures"
        },
        {
          name: "Mandapams",
          description: "Pillared halls with intricate carvings"
        },
        {
          name: "Golden Lotus Tank",
          description: "Sacred tank for ritual purification"
        }
      ],
      transport: [
        { icon: "Train", description: "Madurai Junction (2 km)" },
        { icon: "Bus", description: "City buses and auto-rickshaws" },
        { icon: "Plane", description: "Madurai Airport (12 km)" }
      ],
      amenities: ["Shoe Stand", "Photography Restrictions", "Prasadam Counter", "Temple Shop", "Guided Tours"]
    }
  ];

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Filter sites based on current filters
  const filteredSites = heritageSites?.filter(site => {
    // State filter
    if (filters?.state !== 'all' && site?.state !== filters?.state) return false;
    
    // Period filter
    if (filters?.period !== 'all' && site?.periodCategory !== filters?.period) return false;
    
    // Type filter
    if (filters?.type !== 'all' && site?.type !== filters?.type) return false;
    
    // Rating filter
    if (filters?.rating !== 'all') {
      const minRating = parseFloat(filters?.rating);
      if (site?.rating < minRating) return false;
    }
    
    // Special filters
    if (filters?.unesco && !site?.isUNESCO) return false;
    if (filters?.arEnabled && !site?.hasAR) return false;
    if (filters?.virtualTour && !site?.hasVirtualTour) return false;
    if (filters?.audioGuide && !site?.hasAudioGuide) return false;
    
    // Search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      const searchableText = `${site?.name} ${site?.location} ${site?.description} ${site?.fullDescription}`?.toLowerCase();
      if (!searchableText?.includes(searchTerm)) return false;
    }
    
    return true;
  });

  const handleSiteSelect = (site) => {
    setSelectedSite(site);
    setShowDetailPanel(true);
  };

  const handleCloseDetailPanel = () => {
    setShowDetailPanel(false);
    setSelectedSite(null);
  };

  const handleAddToItinerary = (site) => {
    console.log('Adding to itinerary:', site?.name);
    // Integration with itinerary planner would go here
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      state: 'all',
      period: 'all',
      type: 'all',
      rating: 'all',
      unesco: false,
      arEnabled: false,
      virtualTour: false,
      audioGuide: false,
      search: ''
    });
  };

  const handleToggleFavorite = (siteId) => {
    setFavorites(prev => 
      prev?.includes(siteId) 
        ? prev?.filter(id => id !== siteId)
        : [...prev, siteId]
    );
  };

  const handleVirtualTour = (site) => {
    setSelectedSite(site);
    setShowVirtualTour(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <Breadcrumb className="mb-6" />
            
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-4">
                Interactive Heritage Sites
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Explore India's magnificent heritage through immersive AR experiences, virtual tours, 
                and detailed cultural insights. Discover the stories behind our ancient monuments.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-card border border-border rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} className="text-primary" />
                    <span className="text-sm font-medium">{heritageSites?.length} Heritage Sites</span>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="Award" size={16} className="text-warning" />
                    <span className="text-sm font-medium">
                      {heritageSites?.filter(site => site?.isUNESCO)?.length} UNESCO Sites
                    </span>
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <HeritageFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              totalSites={heritageSites?.length}
              filteredCount={filteredSites?.length}
            />
          </div>
        </section>

        {/* View Mode Toggle */}
        <section className="py-4">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-muted-foreground">View:</span>
                <div className="flex items-center bg-muted rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm font-medium transition-smooth ${
                      viewMode === 'grid' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name="Grid3X3" size={14} />
                    <span>Grid</span>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm font-medium transition-smooth ${
                      viewMode === 'list' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name="List" size={14} />
                    <span>List</span>
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm font-medium transition-smooth ${
                      viewMode === 'map' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name="Map" size={14} />
                    <span>Map</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {filteredSites?.length} sites found
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            {viewMode === 'map' ? (
              <div className="h-[600px] relative">
                <InteractiveMap
                  sites={filteredSites}
                  selectedSite={selectedSite}
                  onSiteSelect={handleSiteSelect}
                  mapCenter={mapCenter}
                  onMapCenterChange={setMapCenter}
                />
              </div>
            ) : (
              <div className="flex gap-6">
                {/* Sites List/Grid */}
                <div className="flex-1">
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredSites?.map((site) => (
                        <HeritageSiteCard
                          key={site?.id}
                          site={site}
                          onSelect={handleSiteSelect}
                          isSelected={selectedSite?.id === site?.id}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredSites?.map((site) => (
                        <div
                          key={site?.id}
                          className={`bg-card border border-border rounded-lg p-4 cursor-pointer transition-smooth hover:shadow-soft ${
                            selectedSite?.id === site?.id ? 'ring-2 ring-primary' : ''
                          }`}
                          onClick={() => handleSiteSelect(site)}
                        >
                          <div className="flex space-x-4">
                            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={site?.image}
                                alt={site?.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-heading font-semibold text-lg text-foreground">
                                  {site?.name}
                                </h3>
                                <div className="flex items-center space-x-2">
                                  {site?.isUNESCO && (
                                    <div className="bg-warning text-warning-foreground px-2 py-1 rounded-full text-xs font-medium">
                                      UNESCO
                                    </div>
                                  )}
                                  {site?.hasAR && (
                                    <div className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                                      AR
                                    </div>
                                  )}
                                </div>
                              </div>
                              <p className="text-muted-foreground text-sm mb-3">
                                {site?.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                  <div className="flex items-center space-x-1">
                                    <Icon name="MapPin" size={14} />
                                    <span>{site?.location}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Icon name="Star" size={14} />
                                    <span>{site?.rating}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Icon name="Clock" size={14} />
                                    <span>{site?.period}</span>
                                  </div>
                                </div>
                                <div className="text-sm">
                                  <span className="text-primary font-semibold">₹{site?.ticketPrice}</span>
                                  <span className="text-muted-foreground ml-1">per person</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {filteredSites?.length === 0 && (
                    <div className="text-center py-12">
                      <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                        No heritage sites found
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your filters or search terms to find more sites.
                      </p>
                      <Button variant="outline" onClick={handleClearFilters}>
                        Clear All Filters
                      </Button>
                    </div>
                  )}
                </div>

                {/* Detail Panel */}
                {showDetailPanel && selectedSite && (
                  <div className="w-96 flex-shrink-0">
                    <SiteDetailPanel
                      site={selectedSite}
                      onClose={handleCloseDetailPanel}
                      onAddToItinerary={handleAddToItinerary}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="text-center mb-8">
              <h2 className="font-heading font-bold text-2xl text-foreground mb-4">
                Plan Your Heritage Journey
              </h2>
              <p className="text-muted-foreground">
                Create personalized itineraries and explore India's cultural treasures
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="Route" size={24} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">AI Itinerary Planner</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Let AI create personalized heritage trails based on your interests
                </p>
                <Link to="/ai-itinerary-planner">
                  <Button variant="outline" size="sm">
                    Plan Journey
                  </Button>
                </Link>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="Heart" size={24} className="text-secondary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Save Favorites</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Create your personal collection of must-visit heritage sites
                </p>
                <Button variant="outline" size="sm">
                  View Favorites
                </Button>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="Share" size={24} className="text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Share Experiences</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Share your heritage discoveries with fellow travelers
                </p>
                <Button variant="outline" size="sm">
                  Share Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Virtual Tour Modal */}
      <VirtualTourModal
        site={selectedSite}
        isOpen={showVirtualTour}
        onClose={() => setShowVirtualTour(false)}
      />
      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
          <p className="text-sm">
            © {new Date()?.getFullYear()} Incredible India Tourism Hub. Preserving heritage for future generations.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default InteractiveHeritageSites;
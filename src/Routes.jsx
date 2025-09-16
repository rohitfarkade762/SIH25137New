import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import InteractiveHeritageSites from './pages/interactive-heritage-sites';
import AIItineraryPlanner from './pages/ai-itinerary-planner';
import TouristLogin from './pages/tourist-login';
import PublicLandingPage from './pages/public-landing-page';
import TouristRegistration from './pages/tourist-registration';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AIItineraryPlanner />} />
        <Route path="/interactive-heritage-sites" element={<InteractiveHeritageSites />} />
        <Route path="/ai-itinerary-planner" element={<AIItineraryPlanner />} />
        <Route path="/tourist-login" element={<TouristLogin />} />
        <Route path="/public-landing-page" element={<PublicLandingPage />} />
        <Route path="/tourist-registration" element={<TouristRegistration />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

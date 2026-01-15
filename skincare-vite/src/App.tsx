import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import About from './pages/About';
import Contact from './pages/Contact';
import Therapies from './pages/Therapies';
import Rituals from './pages/Rituals';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import BookMe from './pages/BookMe';
import BookMeTest from './pages/BookMeTest';
import BookMeCalendly from './pages/BookMeCalendly';
import Locations from './pages/Locations';
import LocationTemplate from './pages/LocationTemplate';
import Blog from './pages/Blog';
import Landing1 from './pages/Landing1';
import Landing2 from './pages/Landing2';
import TherapiesBeta from './pages/TherapiesBeta';
import LoadingScreen from './components/LoadingScreen';

// Import i18next configuration
import './i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

// This component handles the actual route matching and animation orchestration
const AnimatedRoutes = ({ showApp }: { showApp: boolean }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  const handleTransitionEnd = () => {
    if (transitionStage === 'fadeOut') {
      setDisplayLocation(location);
      window.scrollTo(0, 0);
      setTransitionStage('fadeIn');
    }
  };

  return (
    <>
      {showApp && <Navbar />}
      <div
        style={{
          opacity: transitionStage === 'fadeIn' ? 1 : 0,
          transform: transitionStage === 'fadeIn' ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          minHeight: '100vh',
          backgroundColor: '#fdf9f5',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <Routes location={displayLocation}>
          <Route path="/" element={<Landing />} />
          <Route path="/test" element={<div style={{ padding: '100px 20px', textAlign: 'center', fontFamily: 'Inter, Arial, sans-serif' }}><h1>Test Page</h1><p>This is where we'll test new pages and features.</p></div>} />
          <Route path="/test/landing1" element={<Landing1 />} />
          <Route path="/test/landing2" element={<Landing2 />} />
          <Route path="/navbar/test" element={<BookMeTest />} />
          <Route path="/book-calendly" element={<BookMeCalendly />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/therapies" element={<Therapies />} />
          <Route path="/therapies/test" element={<TherapiesBeta />} />
          <Route path="/therapies-beta" element={<TherapiesBeta />} />
          <Route path="/rituals" element={<Rituals />} />
          <Route path="/book" element={<BookMe />} />
          <Route path="/book-calendly/test" element={<BookMe />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/:locationId" element={<LocationTemplate />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
      {showApp && <Footer />}
    </>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    // Force Spanish as default language
    if (!localStorage.getItem('i18nextLng')) {
      i18n.changeLanguage('es');
      localStorage.setItem('i18nextLng', 'es');
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowApp(true), 100);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <ScrollToTop />
        <AnimatedRoutes showApp={showApp} />
      </Router>
    </I18nextProvider>
  );
}

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import OpeningBanner, { BannerContext } from './components/OpeningBanner';
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

// Import i18next configuration
import './i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

const services = [
  {
    title: 'Facial Treatments',
    description: 'Personalized facial treatments to rejuvenate and refresh your skin.'
  },
  {
    title: 'Skin Analysis',
    description: 'Professional skin analysis to understand your unique needs.'
  },
  {
    title: 'Product Recommendations',
    description: 'Expert advice on the best skincare products for you.'
  }
];

export default function App() {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    const handleBannerVisibilityChange = (event: CustomEvent) => {
      setIsBannerVisible(event.detail.isVisible);
    };

    window.addEventListener('bannerVisibilityChange', handleBannerVisibilityChange as EventListener);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
      window.removeEventListener('bannerVisibilityChange', handleBannerVisibilityChange as EventListener);
    };
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <BannerContext.Provider value={{ isBannerVisible, setIsBannerVisible }}>
        <Router>
          <ScrollToTop />
          <OpeningBanner />
          <Navbar />
          <Routes>
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
        <Footer />
      </Router>
        </BannerContext.Provider>
    </I18nextProvider>
  );
}

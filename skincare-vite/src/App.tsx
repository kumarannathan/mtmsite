import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import About from './pages/About';
import Contact from './pages/Contact';
import Therapies from './pages/Therapies';
import Rituals from './pages/Rituals';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import BookMe from './pages/BookMe';
import Locations from './pages/Locations';
import LocationTemplate from './pages/LocationTemplate';
import Blog from './pages/Blog';

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
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/therapies" element={<Therapies />} />
          <Route path="/rituals" element={<Rituals />} />
          <Route path="/book" element={<BookMe />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/:locationId" element={<LocationTemplate />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
        <Footer />
      </Router>
    </I18nextProvider>
  );
}

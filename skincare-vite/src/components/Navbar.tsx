import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useLanguage } from '../LanguageContext';
import i18n from '../i18n';

// Location data for dropdown
const locations = [
  {
    id: 1,
    name: 'CDMX - Polanco',
    address: 'Av. Presidente Masaryk 123, Polanco, CDMX',
    path: '/locations/polanco'
  },
  {
    id: 2,
    name: 'CDMX - Roma',
    address: 'Calle Colima 456, Roma Norte, CDMX',
    path: '/locations/roma'
  },
  {
    id: 3,
    name: 'CDMX - Condesa',
    address: 'Av. Michoacán 75, Condesa, CDMX',
    path: '/locations/condesa'
  },
  {
    id: 4,
    name: 'CDMX - Santa Fe',
    address: 'Av. Vasco de Quiroga 3800, Santa Fe, CDMX',
    path: '/locations/santa-fe'
  },
  {
    id: 5,
    name: 'CDMX - San Ángel',
    address: 'Av. de la Paz 44, San Ángel, CDMX',
    path: '/locations/san-angel'
  }
];

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const { lang, setLang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  let aboutTimeout = useRef<number | null>(null);
  let servicesTimeout = useRef<number | null>(null);
  let locationsTimeout = useRef<number | null>(null);

  // Handle responsive behavior
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    
    // Check on initial render
    checkIfMobile();
    
    // Set up event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isAtTop = currentScrollPos < 10;
      
      // Only show navbar if at the top
      setIsVisible(isAtTop);
      
      // Update previous scroll position
      setPrevScrollPos(currentScrollPos);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  // Toggle dark mode by adding/removing a class on the body
  const handleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      document.body.classList.toggle('dark', next);
      return next;
    });
  };

  // Toggle language
  const handleLang = () => setLang(lang === 'en' ? 'es' : 'en');

  // Toggle mobile menu
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 24px',
      background: 'transparent',
      boxShadow: 'none',
      position: 'fixed',
      top: isVisible ? 0 : '-80px',
      left: 0,
      width: '100%',
      zIndex: 1000,
      borderBottom: 'none',
      fontFamily: 'Inter, Arial, sans-serif',
      fontWeight: 400,
      transition: 'top 0.3s ease-in-out',
      backdropFilter: 'none',
    }}>
      {/* Logo on the left */}
      <div style={{ width: '120px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/logo.png" 
            alt="MTM Logo" 
            style={{ 
              height: '35px', 
              width: 'auto',
              borderRadius: '20px',
            }} 
          />
        </Link>
      </div>

      {/* Navigation links in the center */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '48px',
        justifyContent: 'center',
        padding: '8px 0',
        flex: '1 1 auto',
      }}>
        <Link to="/" style={{ color: '#111', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 380, letterSpacing: 0, padding: '0 8px' }}>Home</Link>
        {/* Services dropdown - like About */}
        <div
          style={{ position: 'relative', display: 'inline-block' }}
          onMouseEnter={() => {
            if (servicesTimeout.current) window.clearTimeout(servicesTimeout.current);
            setServicesOpen(true);
          }}
          onMouseLeave={() => {
            servicesTimeout.current = window.setTimeout(() => setServicesOpen(false), 80);
          }}
        >
          <span
            style={{
              color: '#111',
              textDecoration: 'none',
              fontSize: '1.05rem',
              fontWeight: 380,
              letterSpacing: 0,
              padding: '0 18px',
              borderRadius: '999px',
              background: servicesOpen ? 'rgba(0,0,0,0.07)' : 'none',
              transition: 'background 0.18s',
              cursor: 'pointer',
              height: '36px',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >Services</span>
          {servicesOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgb(255, 255, 255)',
                borderRadius: '18px',
                boxShadow: '0 8px 32px rgba(44,44,84,0.13)',
                padding: '0 20px',
                minWidth: '180px',
                zIndex: 1001,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontFamily: 'Inter, Arial, sans-serif',
                fontWeight: 400,
                fontSize: '0.85rem',
                opacity: servicesOpen ? 1 : 0,
                maxHeight: servicesOpen ? '500px' : '0px',
                transition: 'opacity 0.5s cubic-bezier(.4,2,.6,1), max-height 0.5s cubic-bezier(.4,2,.6,1)',
                overflow: 'hidden',
                paddingTop: servicesOpen ? '18px' : '0',
                paddingBottom: servicesOpen ? '14px' : '0',
              }}
            >
              <Link to="/therapies" style={{ color: '#111', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', marginBottom: '2px' }} onClick={() => setServicesOpen(false)}>Therapies</Link>
            </div>
          )}
        </div>
        {/* Locations dropdown - new */}
        <div
          style={{ position: 'relative', display: 'inline-block' }}
          onMouseEnter={() => {
            if (locationsTimeout.current) window.clearTimeout(locationsTimeout.current);
            setLocationsOpen(true);
          }}
          onMouseLeave={() => {
            locationsTimeout.current = window.setTimeout(() => setLocationsOpen(false), 80);
          }}
        >
          <span
            style={{
              color: '#111',
              textDecoration: 'none',
              fontSize: '1.05rem',
              fontWeight: 380,
              letterSpacing: 0,
              padding: '0 18px',
              borderRadius: '999px',
              background: locationsOpen ? 'rgba(0,0,0,0.07)' : 'none',
              transition: 'background 0.18s',
              cursor: 'pointer',
              height: '36px',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >Locations</span>
          {locationsOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#fff',
                borderRadius: '18px',
                boxShadow: '0 8px 32px rgba(44,44,84,0.13)',
                padding: '0 20px',
                minWidth: '260px',
                zIndex: 1001,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontFamily: 'Inter, Arial, sans-serif',
                fontWeight: 400,
                fontSize: '0.85rem',
                opacity: locationsOpen ? 1 : 0,
                maxHeight: locationsOpen ? '500px' : '0px',
                transition: 'opacity 0.5s cubic-bezier(.4,2,.6,1), max-height 0.5s cubic-bezier(.4,2,.6,1)',
                overflow: 'hidden',
                paddingTop: locationsOpen ? '18px' : '0',
                paddingBottom: locationsOpen ? '14px' : '0',
              }}
            >
              {locations.map(location => (
                <Link 
                  key={location.id}
                  to={location.path} 
                  style={{ 
                    color: '#111', 
                    textDecoration: 'none', 
                    marginBottom: '10px', 
                    padding: '5px 0',
                  }} 
                  onClick={() => setLocationsOpen(false)}
                >
                  <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>{location.name.split(' - ')[1]}, CDMX</span>
                </Link>
              ))}
              <Link 
                to="/locations" 
                style={{ 
                  color: '#ec1c24', 
                  textDecoration: 'none', 
                  fontWeight: 600, 
                  fontSize: '0.9rem', 
                  marginTop: '8px',
                  borderTop: '1px solid rgba(0,0,0,0.05)',
                  paddingTop: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }} 
                onClick={() => setLocationsOpen(false)}
              >
                <span>View All Locations</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="#ec1c24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L19 12L12 19" stroke="#ec1c24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          )}
        </div>
        {/* About dropdown - parent handles hover */}
        <div
          style={{ position: 'relative', display: 'inline-block' }}
          onMouseEnter={() => {
            if (aboutTimeout.current) window.clearTimeout(aboutTimeout.current);
            setAboutOpen(true);
          }}
          onMouseLeave={() => {
            aboutTimeout.current = window.setTimeout(() => setAboutOpen(false), 80);
          }}
        >
          <span
            style={{
              color: '#111',
              textDecoration: 'none',
              fontSize: '1.05rem',
              fontWeight: 380,
              letterSpacing: 0,
              padding: '0 18px',
              borderRadius: '999px',
              background: aboutOpen ? 'rgba(0,0,0,0.07)' : 'none',
              transition: 'background 0.18s',
              cursor: 'pointer',
              height: '36px',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >About</span>
          {aboutOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#fff',
                borderRadius: '18px',
                boxShadow: '0 8px 32px rgba(44,44,84,0.13)',
                padding: '0 20px',
                minWidth: '180px',
                zIndex: 1001,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontFamily: 'Inter, Arial, sans-serif',
                fontWeight: 400,
                fontSize: '0.85rem',
                opacity: aboutOpen ? 1 : 0,
                maxHeight: aboutOpen ? '500px' : '0px',
                transition: 'opacity 0.5s cubic-bezier(.4,2,.6,1), max-height 0.5s cubic-bezier(.4,2,.6,1)',
                overflow: 'hidden',
                paddingTop: aboutOpen ? '18px' : '0',
                paddingBottom: aboutOpen ? '14px' : '0',
              }}
            >
              <Link to="/about" style={{ color: '#111', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', marginBottom: '2px' }} onClick={() => setAboutOpen(false)}>About</Link>
              <Link to="/contact" style={{ color: '#111', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', marginBottom: '2px' }} onClick={() => setAboutOpen(false)}>Contact</Link>
              <Link to="/blog" style={{ color: '#111', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', marginBottom: '2px' }} onClick={() => setAboutOpen(false)}>Blog</Link>
            </div>
          )}
        </div>
        <Link to="/book" style={{ color: '#111', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 380, letterSpacing: 0, padding: '0 8px' }}>Book</Link>
      </div>
      
      {/* Empty div for balancing the layout */}
      <div style={{ width: '120px' }}></div>
    </nav>
  );
} 
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useTranslation } from 'react-i18next';

// Location data for dropdown
const locations = [
  {
    id: 1,
    name: 'San Luis Potosi',
    address: 'Joaquin Meade 136, Lomas 1er Secc, CP 78290, San Luis Potosi, SLP, Mexico',
    path: '/locations/san-luis-potosi'
  }
];

// Add a media query for mobile styles
const mobileNavStyles = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  alignItems: 'flex-start',
  padding: '10px 16px',
  background: 'white',
  position: 'fixed' as 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 1000,
  borderBottom: '1px solid #eee',
  fontFamily: 'Inter, Arial, sans-serif',
  fontWeight: 400,
  transition: 'top 0.3s ease-in-out',
  boxShadow: '0 2px 8px rgba(44,44,84,0.05)',
};

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const { t, i18n } = useTranslation();
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
  const handleLang = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  // Toggle mobile menu
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <>
      {isMobile ? (
        <nav style={{
          display: 'flex',
          flexDirection: 'row' as 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          background: 'white',
          position: 'fixed' as 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          borderBottom: '1px solid #eee',
          fontFamily: 'Inter, Arial, sans-serif',
          fontWeight: 400,
          transition: 'top 0.3s ease-in-out',
          boxShadow: '0 2px 8px rgba(44,44,84,0.05)',
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="MTM Logo" style={{ height: '32px', width: 'auto', borderRadius: '10px' }} />
          </Link>
          <button onClick={toggleMenu} style={{ background: 'none', border: 'none', fontSize: '2rem', color: '#111', cursor: 'pointer' }}>
            {menuOpen ? '✕' : '☰'}
          </button>
          {/* Drawer menu */}
          <div style={{
            position: 'fixed' as 'fixed',
            top: 0,
            right: menuOpen ? 0 : '-80vw',
            width: '80vw',
            height: '100vh',
            background: '#fff',
            boxShadow: menuOpen ? '-2px 0 16px rgba(44,44,84,0.10)' : 'none',
            transition: 'right 0.3s cubic-bezier(.4,2,.6,1)',
            zIndex: 2000,
            display: 'flex',
            flexDirection: 'column' as 'column',
            padding: '32px 24px',
            gap: '22px',
            alignItems: 'flex-start',
            pointerEvents: menuOpen ? 'auto' : 'none',
          }}>
            <Link to="/" style={{ color: '#111', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500 }} onClick={toggleMenu}>{t('nav_home')}</Link>
            <Link to="/therapies" style={{ color: '#111', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500 }} onClick={toggleMenu}>{t('nav_services')}</Link>
            <Link to="/book" style={{ color: '#111', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500 }} onClick={toggleMenu}>{t('nav_book')}</Link>
            <Link to="/locations" style={{ color: '#111', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500 }} onClick={toggleMenu}>{t('nav_locations')}</Link>
            <Link to="/about" style={{ color: '#111', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500 }} onClick={toggleMenu}>{t('nav_about')}</Link>
            <Link to="/blog" style={{ color: '#111', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500 }} onClick={toggleMenu}>{t('nav_blog')}</Link>
            <button onClick={handleLang} style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '7px 12px', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600, color: '#111', marginTop: '10px' }}>{i18n.language === 'en' ? 'ES' : 'EN'}</button>
          </div>
          {/* Overlay for closing drawer */}
          {menuOpen && (
            <div onClick={toggleMenu} style={{
              position: 'fixed' as 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.18)',
              zIndex: 1500,
            }} />
          )}
        </nav>
      ) : (
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
        <Link to="/" style={{ color: '#111', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 380, letterSpacing: 0, padding: '0 8px' }}>{t('nav_home')}</Link>
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
          >{t('nav_services')}</span>
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
              <Link to="/therapies" style={{ color: '#111', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', marginBottom: '2px' }} onClick={() => setServicesOpen(false)}>{t('nav_therapies')}</Link>
            </div>
          )}
        </div>
            <Link to="/book" style={{ color: '#111', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 380, letterSpacing: 0, padding: '0 8px' }}>{t('nav_book')}</Link>
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
          >{t('nav_locations')}</span>
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
                  <div style={{ fontWeight: 500, fontSize: '0.95rem', marginBottom: '4px' }}>{location.name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>{location.address}</div>
                </Link>
              ))}
              <Link 
                to="/locations" 
                style={{ 
                      color: '#19934c', 
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
                <span>{t('common_viewAllLocations')}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19" stroke="#19934c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 5L19 12L12 19" stroke="#19934c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
          >{t('nav_about')}</span>
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
              <Link to="/about" style={{ color: '#111', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', marginBottom: '2px' }} onClick={() => setAboutOpen(false)}>{t('nav_about')}</Link>
              <Link to="/contact" style={{ color: '#111', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', marginBottom: '2px' }} onClick={() => setAboutOpen(false)}>{t('nav_contact')}</Link>
              <Link to="/blog" style={{ color: '#111', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', marginBottom: '2px' }} onClick={() => setAboutOpen(false)}>{t('nav_blog')}</Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Language selector on the right */}
      <div style={{ width: '120px', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          onClick={handleLang}
          style={{
                background: '#fff',
                border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '7px 12px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
            color: '#111',
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.06)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.03)';
          }}
        >
          <div style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: '#ec1c24',
            opacity: i18n.language === 'en' ? 0.2 : 1,
            marginRight: '2px'
          }}></div>
              <span style={{ color: i18n.language === 'en' ? '#333' : '#19934c' }}>{i18n.language === 'en' ? 'ES' : 'EN'}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </nav>
      )}
    </>
  );
} 
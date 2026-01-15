import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);

  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const location = useLocation();

  // Check if we're on the landing page
  const isLandingPage = location.pathname === '/';

  let aboutTimeout = useRef<number | null>(null);
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
        <>
          {/* Solid background behind navbar for flat top edge */}
          <div
            style={{
              position: 'fixed',
              top: '0px',
              left: 0,
              width: '100%',
              height: '64px',
              background: '#F5F7FA',
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              zIndex: 999,
              pointerEvents: 'none',
              transition: 'top 0.3s ease-in-out',
            }}
          />
          <nav
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 18px',
              background: '#F5F7FA',
              position: 'fixed',
              top: '0px',
              left: 0,
              width: '100%',
              zIndex: 1000,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              boxShadow: '0 2px 8px rgba(44,44,84,0.05)',
              borderBottom: '1px solid #e5e7eb',
              minHeight: '56px',
              transition: 'top 0.3s ease-in-out',
              fontFamily: 'Inter, Arial, sans-serif',
            }}
          >
            {/* Left: Hamburger Icon */}
            <button
              onClick={toggleMenu}
              aria-label="Open menu"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                height: '32px',
                width: '36px',
                cursor: 'pointer',
              }}
            >
              {/* Hamburger: three staggered lines */}
              <span style={{
                display: 'block',
                height: '3px',
                width: '22px',
                background: '#222',
                borderRadius: '2px',
                marginBottom: '5px',
                transition: 'width 0.2s',
              }} />
              <span style={{
                display: 'block',
                height: '3px',
                width: '16px',
                background: '#222',
                borderRadius: '2px',
                marginBottom: '5px',
                marginLeft: '6px',
                transition: 'width 0.2s',
              }} />
              <span style={{
                display: 'block',
                height: '3px',
                width: '10px',
                background: '#222',
                borderRadius: '2px',
                marginLeft: '12px',
                transition: 'width 0.2s',
              }} />
            </button>

            {/* Center: Logo */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <Link to="/" style={{ display: 'flex', alignItems: 'center', pointerEvents: 'auto' }}>
                <img src="/mtm.png" alt="MTM Logo" style={{ height: '28px', width: 'auto' }} />
              </Link>
            </div>

            {/* Right: Language Toggle Button */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={handleLang}
                style={{
                  background: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#1B4D3E',
                  fontFamily: 'Inter, Arial, sans-serif',
                  letterSpacing: '0.5px',
                  boxShadow: '0 2px 8px rgba(44,44,84,0.08)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  outline: 'none',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = '#f3f4f6';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {i18n.language === 'en' ? 'ES' : 'EN'}
              </button>
            </div>
          </nav>
          {/* Drawer menu */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Menu"
            style={{
              position: 'fixed' as 'fixed',
              top: 0,
              right: menuOpen ? 0 : '-80vw',
              width: '80vw',
              height: '100dvh',
              background: '#fff',
              boxShadow: menuOpen ? '-2px 0 16px rgba(44,44,84,0.10)' : 'none',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              zIndex: 2000,
              display: 'flex',
              flexDirection: 'column' as 'column',
              padding: '18px 12px 18px 18px',
              gap: '22px',
              alignItems: 'flex-start',
              pointerEvents: menuOpen ? 'auto' : 'none',
              overflowY: 'auto',
              transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
              opacity: menuOpen ? 1 : 0,
              fontFamily: 'Inter, Arial, sans-serif',
            }}>
            <Link to="/" style={{ color: '#111', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500 }} onClick={() => { toggleMenu(); window.scrollTo(0, 0); }}>{t('nav_home')}</Link>
            <Link to="/therapies" style={{ color: '#111', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500 }} onClick={() => { toggleMenu(); window.scrollTo(0, 0); }}>{t('nav_services')}</Link>
            <Link to="/book-calendly" style={{ color: '#111', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500 }} onClick={() => { toggleMenu(); window.scrollTo(0, 0); }}>{t('nav_book')}</Link>
            <Link to="/locations" style={{ color: '#111', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500 }} onClick={() => { toggleMenu(); window.scrollTo(0, 0); }}>{t('nav_locations')}</Link>
            <Link to="/about" style={{ color: '#111', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500 }} onClick={() => { toggleMenu(); window.scrollTo(0, 0); }}>{t('nav_about')}</Link>
            <Link to="/blog" style={{ color: '#111', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500 }} onClick={() => { toggleMenu(); window.scrollTo(0, 0); }}>{t('nav_blog')}</Link>
            <button onClick={handleLang} style={{
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#1B4D3E',
              marginTop: '10px',
              fontFamily: 'Inter, Arial, sans-serif',
              letterSpacing: '0.5px',
            }}>
              {i18n.language === 'en' ? 'Español' : 'English'}
            </button>
          </div>
          {/* Overlay for closing drawer */}
          <div onClick={toggleMenu} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: menuOpen ? 'rgba(0,0,0,0.18)' : 'transparent',
            zIndex: 1500,
            pointerEvents: menuOpen ? 'auto' : 'none',
            transition: 'background 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }} />
        </>
      ) : (
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 40px',
          background: 'transparent',
          boxShadow: 'none',
          position: 'fixed',
          top: isVisible ? '0px' : '-80px',
          left: 0,
          width: '100%',
          zIndex: 1000,
          borderBottom: 'none',
          fontFamily: 'Inter, Arial, sans-serif',
          fontWeight: 400,
          transition: 'top 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          backdropFilter: 'none',
          marginBottom: '40px',
        }}>
          {/* Logo on the left */}
          <div style={{ width: '120px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '50px',
                padding: '1px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img
                  src="/logo.png"
                  alt="MTM Logo"
                  style={{
                    height: '35px',
                    width: 'auto'
                  }}
                />
              </div>
            </Link>
          </div>

          {/* Navigation links in the center - wrapped in pill container */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: '1 1 auto',
            }}
            role="navigation"
            aria-label="Main Navigation"
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 8px',
              backgroundColor: isLandingPage ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.95)',
              borderRadius: '999px',
              boxShadow: isLandingPage ? '0 4px 16px rgba(0,0,0,0.2)' : '0 2px 12px rgba(0,0,0,0.08)',
              backdropFilter: 'blur(12px)',
              border: isLandingPage ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(0,0,0,0.06)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              <Link to="/" style={{
                color: isLandingPage ? '#fff' : '#111',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                letterSpacing: '0.3px',
                padding: '8px 18px',
                borderRadius: '999px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                backgroundColor: location.pathname === '/' ? (isLandingPage ? 'rgba(255,255,255,0.22)' : 'rgba(27,77,62,0.1)') : 'transparent',
                fontFamily: 'Inter, Arial, sans-serif',
              }}
                onMouseOver={(e) => {
                  if (location.pathname !== '/') {
                    e.currentTarget.style.backgroundColor = isLandingPage ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.04)';
                  }
                }}
                onMouseOut={(e) => {
                  if (location.pathname !== '/') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >{t('nav_home')}</Link>

              {/* Services link */}
              <Link to="/therapies" style={{
                color: isLandingPage ? '#fff' : '#111',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                letterSpacing: '0.3px',
                padding: '8px 18px',
                borderRadius: '999px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                backgroundColor: location.pathname.includes('/therapies') ? (isLandingPage ? 'rgba(255,255,255,0.22)' : 'rgba(27,77,62,0.1)') : 'transparent',
                fontFamily: 'Inter, Arial, sans-serif',
              }}
                onMouseOver={(e) => {
                  if (!location.pathname.includes('/therapies')) {
                    e.currentTarget.style.backgroundColor = isLandingPage ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.04)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!location.pathname.includes('/therapies')) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >{t('nav_services')}</Link>

              {/* Booking link */}
              <Link to="/book-calendly" style={{
                color: isLandingPage ? '#fff' : '#111',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                letterSpacing: '0.3px',
                padding: '8px 18px',
                borderRadius: '999px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                backgroundColor: (location.pathname === '/book-calendly' || location.pathname === '/book' || location.pathname === '/book-calendly/test') ? (isLandingPage ? 'rgba(255,255,255,0.22)' : 'rgba(27,77,62,0.1)') : 'transparent',
                fontFamily: 'Inter, Arial, sans-serif',
              }}
                onMouseOver={(e) => {
                  if (!(location.pathname === '/book-calendly' || location.pathname === '/book' || location.pathname === '/book-calendly/test')) {
                    e.currentTarget.style.backgroundColor = isLandingPage ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.04)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!(location.pathname === '/book-calendly' || location.pathname === '/book' || location.pathname === '/book-calendly/test')) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >{t('nav_book')}</Link>

              {/* Locations dropdown */}
              <div
                style={{ position: 'relative', display: 'inline-block' }}
                onMouseEnter={() => {
                  if (locationsTimeout.current) window.clearTimeout(locationsTimeout.current);
                  setLocationsOpen(true);
                }}
                onMouseLeave={() => {
                  locationsTimeout.current = window.setTimeout(() => setLocationsOpen(false), 150);
                }}
              >
                <span
                  role="button"
                  aria-haspopup="true"
                  aria-expanded={locationsOpen}
                  style={{
                    color: isLandingPage ? '#fff' : '#111',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    letterSpacing: '0.3px',
                    padding: '8px 18px',
                    borderRadius: '999px',
                    backgroundColor: location.pathname.startsWith('/locations') ? (isLandingPage ? 'rgba(255,255,255,0.22)' : 'rgba(27,77,62,0.1)') : (locationsOpen ? (isLandingPage ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.04)') : 'transparent'),
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontFamily: 'Inter, Arial, sans-serif',
                  }}
                >{t('nav_locations')}</span>
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 12px)',
                    left: '50%',
                    transform: `translateX(-50%) translateY(${locationsOpen ? '0' : '-8px'})`,
                    background: '#fff',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    padding: locationsOpen ? '18px 20px 14px 20px' : '0 20px',
                    minWidth: '280px',
                    zIndex: 1001,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    fontFamily: 'Inter, Arial, sans-serif',
                    fontWeight: 400,
                    fontSize: '0.85rem',
                    opacity: locationsOpen ? 1 : 0,
                    maxHeight: locationsOpen ? '500px' : '0px',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    overflow: 'hidden',
                    pointerEvents: locationsOpen ? 'auto' : 'none',
                  }}
                >
                  {locations.map(loc => (
                    <Link
                      key={loc.id}
                      to={loc.path}
                      style={{
                        color: '#111',
                        textDecoration: 'none',
                        marginBottom: '10px',
                        padding: '8px 0',
                        transition: 'all 0.2s ease',
                      }}
                      onClick={() => setLocationsOpen(false)}
                      onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                      onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px' }}>{loc.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#666', lineHeight: '1.4' }}>{loc.address}</div>
                    </Link>
                  ))}
                  <Link
                    to="/locations"
                    style={{
                      color: '#1B4D3E',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      marginTop: '8px',
                      borderTop: '1px solid rgba(0,0,0,0.08)',
                      paddingTop: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s ease',
                    }}
                    onClick={() => setLocationsOpen(false)}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = '#2A6B57';
                      e.currentTarget.style.gap = '8px';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = '#1B4D3E';
                      e.currentTarget.style.gap = '6px';
                    }}
                  >
                    <span>{t('common_viewAllLocations')}</span>
                    <span style={{ fontSize: '1.1rem' }}>→</span>
                  </Link>
                </div>
              </div>

              {/* About dropdown */}
              <div
                style={{ position: 'relative', display: 'inline-block' }}
                onMouseEnter={() => {
                  if (aboutTimeout.current) window.clearTimeout(aboutTimeout.current);
                  setAboutOpen(true);
                }}
                onMouseLeave={() => {
                  aboutTimeout.current = window.setTimeout(() => setAboutOpen(false), 150);
                }}
              >
                <span
                  role="button"
                  aria-haspopup="true"
                  aria-expanded={aboutOpen}
                  style={{
                    color: isLandingPage ? '#fff' : '#111',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    letterSpacing: '0.3px',
                    padding: '8px 18px',
                    borderRadius: '999px',
                    backgroundColor: (location.pathname === '/about' || location.pathname === '/contact' || location.pathname === '/blog') ? (isLandingPage ? 'rgba(255,255,255,0.22)' : 'rgba(27,77,62,0.1)') : (aboutOpen ? (isLandingPage ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.04)') : 'transparent'),
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontFamily: 'Inter, Arial, sans-serif',
                  }}
                >{t('nav_about')}</span>
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 12px)',
                    left: '50%',
                    transform: `translateX(-50%) translateY(${aboutOpen ? '0' : '-8px'})`,
                    background: '#fff',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    padding: aboutOpen ? '18px 20px 14px 20px' : '0 20px',
                    minWidth: '180px',
                    zIndex: 1001,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    fontFamily: 'Inter, Arial, sans-serif',
                    fontWeight: 400,
                    fontSize: '0.85rem',
                    opacity: aboutOpen ? 1 : 0,
                    maxHeight: aboutOpen ? '500px' : '0px',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    overflow: 'hidden',
                    pointerEvents: aboutOpen ? 'auto' : 'none',
                  }}
                >
                  <Link to="/about" style={{ color: '#111', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.2s ease' }} onClick={() => setAboutOpen(false)} onMouseOver={(e) => e.currentTarget.style.color = '#1B4D3E'} onMouseOut={(e) => e.currentTarget.style.color = '#111'}>{t('nav_about')}</Link>
                  <Link to="/contact" style={{ color: '#111', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.2s ease' }} onClick={() => setAboutOpen(false)} onMouseOver={(e) => e.currentTarget.style.color = '#1B4D3E'} onMouseOut={(e) => e.currentTarget.style.color = '#111'}>{t('nav_contact')}</Link>
                  <Link to="/blog" style={{ color: '#111', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.2s ease' }} onClick={() => setAboutOpen(false)} onMouseOver={(e) => e.currentTarget.style.color = '#1B4D3E'} onMouseOut={(e) => e.currentTarget.style.color = '#111'}>{t('nav_blog')}</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Language selector on the right */}
          <div style={{ width: '120px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleLang}
              style={{
                background: isLandingPage ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.95)',
                border: `1px solid ${isLandingPage ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0,0,0,0.08)'}`,
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: isLandingPage ? '#fff' : '#1B4D3E',
                fontFamily: 'Inter, Arial, sans-serif',
                letterSpacing: '0.5px',
                backdropFilter: 'blur(12px)',
                boxShadow: isLandingPage ? '0 2px 8px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = isLandingPage ? '0 4px 12px rgba(0,0,0,0.25)' : '0 4px 12px rgba(0,0,0,0.1)';
                e.currentTarget.style.background = isLandingPage ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = isLandingPage ? '0 2px 8px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.06)';
                e.currentTarget.style.background = isLandingPage ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.95)';
              }}
            >
              {i18n.language === 'en' ? 'ES' : 'EN'}
            </button>
          </div>
        </nav>
      )}
    </>
  );
}
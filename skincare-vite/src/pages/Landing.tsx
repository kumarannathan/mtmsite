import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../App.module.css';
import { useTranslation } from 'react-i18next';

export default function Landing() {
  const { t, i18n } = useTranslation();
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ['/img4.jpeg', '/img5.jpeg', '/img6.jpeg', '/img7.jpeg', '/chinese.jpeg'];

  // Responsive: detect mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;

  // Logo fade on scroll (desktop only)
  const [logoOpacity, setLogoOpacity] = useState(1);
  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Fade out between 0 and 120px scroll
      const fadeStart = 0;
      const fadeEnd = 120;
      let opacity = 1;
      if (scrollY > fadeStart) {
        opacity = 1 - Math.min((scrollY - fadeStart) / (fadeEnd - fadeStart), 1);
      }
      setLogoOpacity(opacity);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  useEffect(() => {
    // Trigger animation when component mounts
    setAnimate(true);
  }, []);

  // Add auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'white',
        fontFamily: 'Inter, Arial, sans-serif',
      }}
    >
      {/* Main background - Use background.png */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        // backgroundImage: 'url(/background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: -1,
        pointerEvents: 'none',
      }}></div>
      
      {/* Hero Section */}
      <section style={{ 
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        color: '#111',
        paddingTop: '40px',
        fontFamily: 'Inter, Arial, sans-serif',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '0 6vw' : '0 24px',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          fontFamily: 'Inter, Arial, sans-serif',
        }}>
          <div style={{
            maxWidth: '850px',
          }}>
            {/* Logo above header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              marginBottom: isMobile ? '16px' : '24px',
              opacity: isMobile ? (animate ? 1 : 0) : logoOpacity * (animate ? 1 : 0),
              transform: animate ? `scale(${isMobile ? 1 : 0.9 + 0.1 * logoOpacity})` : 'scale(1.5)',
              transition: 'opacity 0.5s cubic-bezier(.4,2,.6,1), transform 0.7s ease-out',
              transitionDelay: '0.1s'
            }}>
              <img src="/logo.png" alt="MTM Logo" style={{ 
                height: isMobile ? '64px' : '96px', 
                width: 'auto', 
                display: 'block',
                transform: animate ? `scale(${isMobile ? 1 : 0.9 + 0.1 * logoOpacity})` : 'scale(1.5)',
                transition: 'transform 0.7s ease-out',
                transitionDelay: '0.1s'
              }} />
            </div>
            <h1 style={{ 
              fontFamily: 'Inter, Arial, sans-serif',
              fontWeight: 380,
              fontSize: isMobile ? '2.1rem' : 'clamp(2.5rem, 8vw, 5.5rem)',
              marginBottom: isMobile ? '18px' : '24px',
              color: '#111',
              lineHeight: 1.08,
              letterSpacing: '-0.01em',
              textShadow: '0 2px 8px rgba(0,0,0,0.10)',
              opacity: animate ? 1 : 0,
              transform: animate ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
              transitionDelay: '0.2s'
            }}>
              {t('home_heroTitle')}
            </h1>
            
            <div style={{
              width: isMobile ? '48px' : '80px',
              height: '4px',
              background: '#19934c',
              margin: isMobile ? '0 auto 24px' : '0 auto 40px',
              borderRadius: '2px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
              opacity: animate ? 1 : 0,
              transform: animate ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
              transitionDelay: '0.3s'
            }}></div>
            
            <p style={{ 
              fontFamily: 'Inter, Arial, sans-serif',
              fontWeight: 400,
              fontSize: isMobile ? '1.05rem' : '1.35rem',
              color: '#222',
              lineHeight: 1.5,
              maxWidth: '720px',
              margin: isMobile ? '0 auto 32px' : '0 auto 60px',
              textShadow: '0 2px 8px rgba(255,255,255,0.10)',
              opacity: animate ? 1 : 0,
              transform: animate ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
              transitionDelay: '0.4s'
            }}>
              {t('home_heroSubheading')}
            </p>
            
            <div style={{
              display: 'flex',
              gap: isMobile ? '12px' : '24px',
              justifyContent: 'center',
              marginTop: isMobile ? '24px' : '40px',
              opacity: animate ? 1 : 0,
              transform: animate ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
              transitionDelay: '0.5s'
            }}>
              <Link to="/book" style={{ textDecoration: 'none' }}>
                <button style={{ 
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontWeight: 500,
                  background: 'rgba(34,197,94,0.85)',
                  color: '#fff',
                  border: 'none',
                  padding: isMobile ? '12px 18px' : '16px 32px',
                  borderRadius: '8px',
                  fontSize: isMobile ? '1rem' : '1.15rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(34, 197, 94, 0.15)',
                  backdropFilter: 'blur(2px)',
                }}>
                  {t('home_bookAppointment')} <span>→</span>
                </button>
              </Link>
              <Link to="/therapies" style={{ textDecoration: 'none' }}>
                <button style={{ 
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontWeight: 500,
                  background: 'rgba(255,255,255,0.18)',
                  color: '#111',
                  border: '1.5px solid #fff',
                  padding: isMobile ? '12px 18px' : '16px 32px',
                  borderRadius: '8px',
                  fontSize: isMobile ? '1rem' : '1.15rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(34, 197, 94, 0.08)',
                  backdropFilter: 'blur(2px)',
                }}>
                  {t('home_explorePhilosophy')} <span>→</span>
                </button>
              </Link>
            </div>
            {/* Scroll Down Indicator */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '48px',
              transition: 'opacity 0.4s',
              opacity: showScrollIndicator ? (animate ? 1 : 0) : 0,
              pointerEvents: showScrollIndicator ? 'auto' : 'none',
              transform: animate ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '0.6s'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                animation: 'bounceDown 1.6s infinite',
                opacity: 0.7,
              }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 14L16 22L24 14" stroke="#19934c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section - Highnote Style */}
      <section style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '32px 0 40px 0' : '48px 0 64px 0',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: isMobile ? '16px' : '32px',
        justifyItems: 'center',
      }}>
        {/* Card 1 - Treatments */}
        <div
          style={{
            background: 'rgba(255,255,255,0.92)',
            borderRadius: '22px',
            boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
            padding: isMobile ? '24px 12px' : '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            fontFamily: 'Inter, Arial, sans-serif',
            transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), opacity 0.8s ease-out',
            cursor: 'pointer',
            opacity: animate ? 1 : 0,
            transform: animate ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(30px)',
            transitionDelay: '0.3s',
            height: '100%',
            position: 'relative',
            paddingBottom: isMobile ? '48px' : '70px',
            width: isMobile ? '100%' : undefined,
            margin: isMobile ? '0 auto' : undefined,
            boxSizing: 'border-box',
            maxWidth: isMobile ? '95vw' : undefined,
          }}
          onMouseOver={e => animate && (e.currentTarget.style.transform = 'scale(1.045)')}
          onMouseOut={e => animate && (e.currentTarget.style.transform = 'scale(1)')}
        >
          <div style={{ marginBottom: '22px' }}>
            <svg width="55" height="55" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#19934c" strokeWidth="1.5" fillOpacity="0.1" fill="#f0fdf4" />
              <path d="M7.5 12H16.5" stroke="#19934c" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M12 7.5V16.5" stroke="#19934c" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ fontWeight: 700, fontSize: '1.35rem', marginBottom: 12 }}>{t('home_signatureTherapies')}</div>
          <div style={{ color: '#7a6e6e', fontSize: '1.05rem', fontWeight: 400, lineHeight: '1.6' }}>
            {t('home_signatureTherapiesDesc')}
          </div>
          <div style={{ 
            position: 'absolute',
            bottom: '28px',
            left: '28px',
            display: 'flex', 
            alignItems: 'center', 
            color: '#19934c', 
            fontWeight: 500, 
            fontSize: '0.9rem'
          }}>
            <Link to="/therapies" style={{ display: 'flex', alignItems: 'center', color: '#19934c', textDecoration: 'none' }}>
              <span>{t('home_viewTreatments')}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '6px' }}>
                <path d="M5 12H19" stroke="#19934c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5L19 12L12 19" stroke="#19934c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
        
        {/* Card 2 - About */}
        <div
          style={{
            background: 'rgba(255,255,255,0.92)',
            borderRadius: '22px',
            boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
            padding: isMobile ? '24px 12px' : '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            fontFamily: 'Inter, Arial, sans-serif',
            transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), opacity 0.8s ease-out',
            cursor: 'pointer',
            opacity: animate ? 1 : 0,
            transform: animate ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(30px)',
            transitionDelay: '0.4s',
            height: '100%',
            position: 'relative',
            paddingBottom: isMobile ? '48px' : '70px',
            width: isMobile ? '100%' : undefined,
            margin: isMobile ? '0 auto' : undefined,
            boxSizing: 'border-box',
            maxWidth: isMobile ? '95vw' : undefined,
          }}
          onMouseOver={e => animate && (e.currentTarget.style.transform = 'scale(1.045)')}
          onMouseOut={e => animate && (e.currentTarget.style.transform = 'scale(1)')}
        >
          <div style={{ marginBottom: '22px' }}>
            <svg width="55" height="55" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z" fill="#19934c"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V12C12.75 12.4142 12.4142 12.75 12 12.75C11.5858 12.75 11.25 12.4142 11.25 12V8C11.25 7.58579 11.5858 7.25 12 7.25Z" fill="#19934c"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16Z" fill="#19934c"/>
            </svg>
          </div>
          <div style={{ fontWeight: 700, fontSize: '1.35rem', marginBottom: 12 }}>{t('home_ourPhilosophy')}</div>
          <div style={{ color: '#7a6e6e', fontSize: '1.05rem', fontWeight: 400, lineHeight: '1.6' }}>
            {t('home_ourPhilosophyDesc')}
          </div>
          <div style={{ 
            position: 'absolute',
            bottom: '28px',
            left: '28px',
            display: 'flex', 
            alignItems: 'center', 
            color: '#19934c', 
            fontWeight: 500, 
            fontSize: '0.9rem'
          }}>
            <Link to="/about" style={{ display: 'flex', alignItems: 'center', color: '#19934c', textDecoration: 'none' }}>
              <span>{t('home_learnMore')}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '6px' }}>
                <path d="M5 12H19" stroke="#19934c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5L19 12L12 19" stroke="#19934c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
        
        {/* Card 3 - Booking */}
        <div
          style={{
            background: 'rgba(255,255,255,0.92)',
            borderRadius: '22px',
            boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
            padding: isMobile ? '24px 12px' : '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            fontFamily: 'Inter, Arial, sans-serif',
            transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), opacity 0.8s ease-out',
            cursor: 'pointer',
            opacity: animate ? 1 : 0,
            transform: animate ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(30px)',
            transitionDelay: '0.5s',
            height: '100%',
            position: 'relative',
            paddingBottom: isMobile ? '48px' : '70px',
            width: isMobile ? '100%' : undefined,
            margin: isMobile ? '0 auto' : undefined,
            boxSizing: 'border-box',
            maxWidth: isMobile ? '95vw' : undefined,
          }}
          onMouseOver={e => animate && (e.currentTarget.style.transform = 'scale(1.045)')}
          onMouseOut={e => animate && (e.currentTarget.style.transform = 'scale(1)')}
        >
          <div style={{ marginBottom: '22px' }}>
            <svg width="55" height="55" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="#19934c" strokeWidth="1.5" fillOpacity="0.1" fill="#f0fdf4" />
              <path d="M16 2V6" stroke="#19934c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 2V6" stroke="#19934c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 10H21" stroke="#19934c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 14H8.01" stroke="#19934c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 14H12.01" stroke="#19934c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 14H16.01" stroke="#19934c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 18H8.01" stroke="#19934c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 18H12.01" stroke="#19934c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 18H16.01" stroke="#19934c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ fontWeight: 700, fontSize: '1.35rem', marginBottom: 12 }}>{t('home_bookYourVisit')}</div>
          <div style={{ color: '#7a6e6e', fontSize: '1.05rem', fontWeight: 400, lineHeight: '1.6' }}>
            {t('home_bookYourVisitDesc')}
          </div>
          <div style={{ 
            position: 'absolute',
            bottom: '28px',
            left: '28px',
            display: 'flex', 
            alignItems: 'center', 
            color: '#19934c', 
            fontWeight: 500, 
            fontSize: '0.9rem'
          }}>
            <Link to="/book" style={{ display: 'flex', alignItems: 'center', color: '#19934c', textDecoration: 'none' }}>
              <span>{t('home_bookNowButton')}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '6px' }}>
                <path d="M5 12H19" stroke="#19934c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5L19 12L12 19" stroke="#19934c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      {!isMobile && (
      <section style={{
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#111',
            marginBottom: '40px',
            textAlign: 'center',
          }}>
            Our Gallery
          </h2>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '600px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
          }}>
            <img 
              src={images[currentImageIndex]} 
              alt="MTM Gallery" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                  transition: 'opacity 0.5s ease-in-out',
              }}
              />
              <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '8px',
            }}>
              {images.map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                      background: index === currentImageIndex ? '#19934c' : 'rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Two-row image/text section */}
      <section style={{
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto 160px auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px',
        background: 'none',
        boxShadow: 'none',
        borderRadius: 0,
        padding: '0 20px',
      }}>
        {/* Main card (two columns) */}
        <div style={{
          width: '100%',
          background: 'rgba(255,255,255,0.92)',
          borderRadius: '22px',
          boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
          display: 'flex',
          flexDirection: 'column',
          padding: '48px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '36px',
          }}>
            <div style={{
              width: '42px',
              height: '3px',
              background: '#19934c',
              marginRight: '16px',
              borderRadius: '2px',
            }}></div>
            <h2 style={{
              fontWeight: 700,
              fontSize: '1.8rem',
              margin: 0,
              color: '#111',
            }}>{t('home_mtmExperience')}</h2>
          </div>
          
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: '48px',
          }}>
            {/* Left column */}
            <div style={{
              flex: '1 1 360px',
              minWidth: '280px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '32px',
              }}>
                <div style={{ marginRight: '20px', marginTop: '4px' }}>
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#19934c" strokeWidth="1.5" fillOpacity="0.1" fill="#f0fdf4" />
                    <path d="M9 12L10.6828 13.6828V13.6828C10.858 13.858 11.142 13.858 11.3172 13.6828V13.6828L15 10" stroke="#19934c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: '1.25rem', marginBottom: '10px', color: '#111' }}>
                    {t('home_personalizedApproach')}
                  </h3>
                  <p style={{ fontSize: '1.08rem', lineHeight: '1.6', color: '#7a6e6e', margin: 0 }}>
                    {t('home_personalizedApproachDesc')}
                  </p>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '32px',
              }}>
                <div style={{ marginRight: '20px', marginTop: '4px' }}>
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#19934c" strokeWidth="1.5" fillOpacity="0.1" fill="#f0fdf4" />
                    <path d="M9 12L10.6828 13.6828V13.6828C10.858 13.858 11.142 13.858 11.3172 13.6828V13.6828L15 10" stroke="#19934c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: '1.25rem', marginBottom: '10px', color: '#111' }}>
                    {t('home_premiumProducts')}
                  </h3>
                  <p style={{ fontSize: '1.08rem', lineHeight: '1.6', color: '#7a6e6e', margin: 0 }}>
                    {t('home_premiumProductsDesc')}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right column */}
            <div style={{
              flex: '1 1 360px',
              minWidth: '280px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '32px',
              }}>
                <div style={{ marginRight: '20px', marginTop: '4px' }}>
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#19934c" strokeWidth="1.5" fillOpacity="0.1" fill="#f0fdf4" />
                    <path d="M9 12L10.6828 13.6828V13.6828C10.858 13.858 11.142 13.858 11.3172 13.6828V13.6828L15 10" stroke="#19934c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: '1.25rem', marginBottom: '10px', color: '#111' }}>
                    {t('home_expertTherapists')}
                  </h3>
                  <p style={{ fontSize: '1.08rem', lineHeight: '1.6', color: '#7a6e6e', margin: 0 }}>
                    {t('home_expertTherapistsDesc')}
                  </p>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
              }}>
                <div style={{ marginRight: '20px', marginTop: '4px' }}>
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#19934c" strokeWidth="1.5" fillOpacity="0.1" fill="#f0fdf4" />
                    <path d="M9 12L10.6828 13.6828V13.6828C10.858 13.858 11.142 13.858 11.3172 13.6828V13.6828L15 10" stroke="#19934c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: '1.25rem', marginBottom: '10px', color: '#111' }}>
                    {t('home_sereneEnvironment')}
                  </h3>
                  <p style={{ fontSize: '1.08rem', lineHeight: '1.6', color: '#7a6e6e', margin: 0 }}>
                    {t('home_sereneEnvironmentDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonial Card */}
        <div style={{
          width: '100%',
          background: 'rgba(255,255,255,0.92)',
          borderRadius: '22px',
          boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
          padding: '48px',
          textAlign: 'center',
        }}>
          <div style={{
            width: '52px',
            height: '52px',
            margin: '0 auto 24px',
          }}>
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.39999 6.32L15.89 3.49C19.7 2.22 21.77 4.3 20.51 8.11L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23 7.39999 6.32Z" stroke="#19934c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fillOpacity="0.1" fill="#f0fdf4"/>
              <path d="M10.11 13.65L13.69 10.06" stroke="#19934c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <blockquote style={{
            fontSize: '1.3rem',
            lineHeight: '1.8',
            color: '#333',
            maxWidth: '700px',
            margin: '0 auto 28px',
            fontStyle: 'italic',
            position: 'relative',
          }}>
            {t('home_testimonialText')}
          </blockquote>
          
          <div style={{
            fontWeight: 600,
            color: '#111',
            fontSize: '1.1rem',
          }}>
            {t('home_testimonialName')}
          </div>
          
          <div style={{
            fontSize: '0.9rem',
            color: '#7a6e6e',
            marginTop: '4px',
          }}>
            {t('home_testimonialTitle')}
          </div>
        </div>
      </section>
    </div>
  );
} 
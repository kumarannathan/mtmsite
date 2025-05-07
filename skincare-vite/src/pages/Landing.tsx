import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../App.module.css';

export default function Landing() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Trigger animation when component mounts
    setAnimate(true);
  }, []);

  return (
    <div
      className={`${styles.root} ${animate ? styles.pageAnimation : ''}`}
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingBottom: '50px',
        backgroundColor: 'hsla(0,100%,50%,1)',
        backgroundImage: `
          radial-gradient(at 40% 20%, hsla(27,0%,100%,1) 0px, transparent 50%),
          radial-gradient(at 80% 0%, hsla(186,0%,100%,1) 0px, transparent 50%),
          radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%),
          radial-gradient(at 80% 50%, hsla(340,0%,100%,1) 0px, transparent 50%),
          radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%),
          radial-gradient(at 84% 62%, hsla(132,100%,70%,1) 0px, transparent 50%),
          radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%)`,
        opacity: animate ? 1 : 0,
        transform: animate ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
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
          padding: '0 24px',
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
              marginBottom: '24px',
              opacity: animate ? 1 : 0,
              transform: animate ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
              transitionDelay: '0.1s'
            }}>
              <img src="/logo.png" alt="MTM Logo" style={{ height: '96px', width: 'auto', display: 'block' }} />
            </div>
            <h1 style={{ 
              fontFamily: 'Inter, Arial, sans-serif',
              fontWeight: 380,
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
              marginBottom: '24px',
              color: '#111',
              lineHeight: 1.08,
              letterSpacing: '-0.01em',
              textShadow: '0 2px 8px rgba(0,0,0,0.10)',
              opacity: animate ? 1 : 0,
              transform: animate ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
              transitionDelay: '0.2s'
            }}>
              Personalized Scalp<br />& Mind Therapy
            </h1>
            
            <div style={{
              width: '80px',
              height: '4px',
              background: '#ec1c24',
              margin: '0 auto 40px',
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
              fontSize: '1.35rem',
              color: '#222',
              lineHeight: 1.5,
              maxWidth: '720px',
              margin: '0 auto 60px',
              textShadow: '0 2px 8px rgba(255,255,255,0.10)',
              opacity: animate ? 1 : 0,
              transform: animate ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
              transitionDelay: '0.4s'
            }}>
              MTM offers holistic, evidence-based scalp and relaxation<br />
              experiences rooted in ritual, culture, and innovation.
            </p>
            
            <div style={{
              display: 'flex',
              gap: '24px',
              justifyContent: 'center',
              marginTop: '40px',
              opacity: animate ? 1 : 0,
              transform: animate ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
              transitionDelay: '0.5s'
            }}>
              <Link to="/book" style={{ textDecoration: 'none' }}>
                <button style={{ 
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontWeight: 500,
                  background: 'rgba(236,28,36,0.85)',
                  color: '#fff',
                  border: 'none',
                  padding: '16px 32px',
                  borderRadius: '8px',
                  fontSize: '1.15rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(236, 28, 36, 0.15)',
                  backdropFilter: 'blur(2px)',
                }}>
                  Book an Appointment <span>→</span>
                </button>
              </Link>
              <Link to="/therapies" style={{ textDecoration: 'none' }}>
                <button style={{ 
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontWeight: 500,
                  background: 'rgba(255,255,255,0.18)',
                  color: '#111',
                  border: '1.5px solid #fff',
                  padding: '16px 32px',
                  borderRadius: '8px',
                  fontSize: '1.15rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.10)',
                  backdropFilter: 'blur(2px)',
                }}>
                  Explore Our Philosophy <span>→</span>
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
                  <path d="M8 14L16 22L24 14" stroke="#ec1c24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
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
        padding: '48px 0 64px 0',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '32px',
      }}>
        {/* Card 1 - Treatments */}
        <div
          style={{
            background: 'rgba(255,255,255,0.92)',
            borderRadius: '22px',
            boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
            padding: '32px 28px',
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
            paddingBottom: '70px'
          }}
          onMouseOver={e => animate && (e.currentTarget.style.transform = 'scale(1.045)')}
          onMouseOut={e => animate && (e.currentTarget.style.transform = 'scale(1)')}
        >
          <div style={{ marginBottom: '22px' }}>
            <svg width="55" height="55" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ec1c24" strokeWidth="1.5" fillOpacity="0.1" fill="#ffeded" />
              <path d="M7.5 12H16.5" stroke="#ec1c24" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M12 7.5V16.5" stroke="#ec1c24" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ fontWeight: 700, fontSize: '1.35rem', marginBottom: 12 }}>Signature Therapies</div>
          <div style={{ color: '#7a6e6e', fontSize: '1.05rem', fontWeight: 400, lineHeight: '1.6' }}>
            Experience our specialized scalp and mind treatments designed to relieve tension, promote circulation, and restore balance to both body and mind.
          </div>
          <div style={{ 
            position: 'absolute',
            bottom: '28px',
            left: '28px',
            display: 'flex', 
            alignItems: 'center', 
            color: '#ec1c24', 
            fontWeight: 500, 
            fontSize: '0.9rem'
          }}>
            <Link to="/therapies" style={{ display: 'flex', alignItems: 'center', color: '#ec1c24', textDecoration: 'none' }}>
              <span>View Treatments</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '6px' }}>
                <path d="M5 12H19" stroke="#ec1c24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5L19 12L12 19" stroke="#ec1c24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
            padding: '32px 28px',
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
            paddingBottom: '70px'
          }}
          onMouseOver={e => animate && (e.currentTarget.style.transform = 'scale(1.045)')}
          onMouseOut={e => animate && (e.currentTarget.style.transform = 'scale(1)')}
        >
          <div style={{ marginBottom: '22px' }}>
            <svg width="55" height="55" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z" fill="#ec1c24"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V12C12.75 12.4142 12.4142 12.75 12 12.75C11.5858 12.75 11.25 12.4142 11.25 12V8C11.25 7.58579 11.5858 7.25 12 7.25Z" fill="#ec1c24"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16Z" fill="#ec1c24"/>
            </svg>
          </div>
          <div style={{ fontWeight: 700, fontSize: '1.35rem', marginBottom: 12 }}>Our Philosophy</div>
          <div style={{ color: '#7a6e6e', fontSize: '1.05rem', fontWeight: 400, lineHeight: '1.6' }}>
            Discover our approach to holistic wellness that combines ancient rituals with modern techniques to create transformative experiences for mind and body.
          </div>
          <div style={{ 
            position: 'absolute',
            bottom: '28px',
            left: '28px',
            display: 'flex', 
            alignItems: 'center', 
            color: '#ec1c24', 
            fontWeight: 500, 
            fontSize: '0.9rem'
          }}>
            <Link to="/about" style={{ display: 'flex', alignItems: 'center', color: '#ec1c24', textDecoration: 'none' }}>
              <span>Learn More</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '6px' }}>
                <path d="M5 12H19" stroke="#ec1c24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5L19 12L12 19" stroke="#ec1c24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
            padding: '32px 28px',
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
            paddingBottom: '70px'
          }}
          onMouseOver={e => animate && (e.currentTarget.style.transform = 'scale(1.045)')}
          onMouseOut={e => animate && (e.currentTarget.style.transform = 'scale(1)')}
        >
          <div style={{ marginBottom: '22px' }}>
            <svg width="55" height="55" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="#ec1c24" strokeWidth="1.5" fillOpacity="0.1" fill="#ffeded" />
              <path d="M16 2V6" stroke="#ec1c24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 2V6" stroke="#ec1c24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 10H21" stroke="#ec1c24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 14H8.01" stroke="#ec1c24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 14H12.01" stroke="#ec1c24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 14H16.01" stroke="#ec1c24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 18H8.01" stroke="#ec1c24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 18H12.01" stroke="#ec1c24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 18H16.01" stroke="#ec1c24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ fontWeight: 700, fontSize: '1.35rem', marginBottom: 12 }}>Book Your Visit</div>
          <div style={{ color: '#7a6e6e', fontSize: '1.05rem', fontWeight: 400, lineHeight: '1.6' }}>
            Schedule your personalized therapy session with our expert practitioners. Choose from our signature treatments and find the perfect time for your visit.
          </div>
          <div style={{ 
            position: 'absolute',
            bottom: '28px',
            left: '28px',
            display: 'flex', 
            alignItems: 'center', 
            color: '#ec1c24', 
            fontWeight: 500, 
            fontSize: '0.9rem'
          }}>
            <Link to="/book" style={{ display: 'flex', alignItems: 'center', color: '#ec1c24', textDecoration: 'none' }}>
              <span>Book Now</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '6px' }}>
                <path d="M5 12H19" stroke="#ec1c24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5L19 12L12 19" stroke="#ec1c24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

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
              background: '#ec1c24',
              marginRight: '16px',
              borderRadius: '2px',
            }}></div>
            <h2 style={{
              fontWeight: 700,
              fontSize: '1.8rem',
              margin: 0,
              color: '#111',
            }}>The MTM Experience</h2>
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
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#ec1c24" strokeWidth="1.5" fillOpacity="0.1" fill="#ffeded" />
                    <path d="M9 12L10.6828 13.6828V13.6828C10.858 13.858 11.142 13.858 11.3172 13.6828V13.6828L15 10" stroke="#ec1c24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: '1.25rem', marginBottom: '10px', color: '#111' }}>
                    Personalized Approach
                  </h3>
                  <p style={{ fontSize: '1.08rem', lineHeight: '1.6', color: '#7a6e6e', margin: 0 }}>
                    Our therapists create customized treatments tailored to your specific needs, ensuring a truly personalized experience.
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
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#ec1c24" strokeWidth="1.5" fillOpacity="0.1" fill="#ffeded" />
                    <path d="M9 12L10.6828 13.6828V13.6828C10.858 13.858 11.142 13.858 11.3172 13.6828V13.6828L15 10" stroke="#ec1c24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: '1.25rem', marginBottom: '10px', color: '#111' }}>
                    Premium Products
                  </h3>
                  <p style={{ fontSize: '1.08rem', lineHeight: '1.6', color: '#7a6e6e', margin: 0 }}>
                    We use only the highest quality, natural ingredients in our treatments, sourced from sustainable and ethical producers.
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
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#ec1c24" strokeWidth="1.5" fillOpacity="0.1" fill="#ffeded" />
                    <path d="M9 12L10.6828 13.6828V13.6828C10.858 13.858 11.142 13.858 11.3172 13.6828V13.6828L15 10" stroke="#ec1c24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: '1.25rem', marginBottom: '10px', color: '#111' }}>
                    Expert Therapists
                  </h3>
                  <p style={{ fontSize: '1.08rem', lineHeight: '1.6', color: '#7a6e6e', margin: 0 }}>
                    Our highly trained professionals combine traditional techniques with modern innovations for optimal results.
                  </p>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
              }}>
                <div style={{ marginRight: '20px', marginTop: '4px' }}>
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#ec1c24" strokeWidth="1.5" fillOpacity="0.1" fill="#ffeded" />
                    <path d="M9 12L10.6828 13.6828V13.6828C10.858 13.858 11.142 13.858 11.3172 13.6828V13.6828L15 10" stroke="#ec1c24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: '1.25rem', marginBottom: '10px', color: '#111' }}>
                    Serene Environment
                  </h3>
                  <p style={{ fontSize: '1.08rem', lineHeight: '1.6', color: '#7a6e6e', margin: 0 }}>
                    Our tranquil spaces are designed to promote relaxation and wellness from the moment you step inside.
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
              <path d="M7.39999 6.32L15.89 3.49C19.7 2.22 21.77 4.3 20.51 8.11L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23 7.39999 6.32Z" stroke="#ec1c24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fillOpacity="0.1" fill="#ffeded"/>
              <path d="M10.11 13.65L13.69 10.06" stroke="#ec1c24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
            "MTM provided me with the most rejuvenating scalp treatment I've ever experienced. Their expert therapists and personalized approach completely transformed my wellness routine."
          </blockquote>
          
          <div style={{
            fontWeight: 600,
            color: '#111',
            fontSize: '1.1rem',
          }}>
            Maria Rodriguez
          </div>
          
          <div style={{
            fontSize: '0.9rem',
            color: '#7a6e6e',
            marginTop: '4px',
          }}>
            Regular Client
          </div>
        </div>
      </section>
    </div>
  );
} 
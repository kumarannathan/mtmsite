import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Design system
const theme = {
  primary: '#1B4D3E',
  secondary: '#0F3D1F',
  accent: '#D1B981',
  background: '#fdf9f5',
  text: '#222',
  textLight: '#666',
  white: '#FFFFFF',
  cardBg: '#F8FFF9'
};

export default function About() {
  const { t, i18n } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  // Handle responsive behavior
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Listen for banner visibility changes
  useEffect(() => {
    const handleBannerVisibilityChange = (event: CustomEvent) => {
      setIsBannerVisible(event.detail.isVisible);
    };

    window.addEventListener('bannerVisibilityChange', handleBannerVisibilityChange as EventListener);

    return () => {
      window.removeEventListener('bannerVisibilityChange', handleBannerVisibilityChange as EventListener);
    };
  }, []);

  // Intersection Observer for parallax effects
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px'
      }
    );

    const sections = document.querySelectorAll('.about-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: theme.background, 
      fontFamily: 'Inter, Arial, sans-serif',
      overflowX: 'hidden',
      overflowY: 'auto',
      scrollSnapType: 'y mandatory',
    }}>
      {/* Hero Section */}
      <section style={{ 
        maxWidth: 1400, 
        margin: '0 auto', 
        padding: isMobile ? '20px 20px 40px 20px' : '35px 20px 52px 20px', 
        textAlign: 'center',
        // marginTop: isMobile ? '100px' : '0px',
        paddingTop: isMobile ? '140px' : (isBannerVisible ? '48px' : '0px'),
        background: theme.background,
        scrollSnapAlign: 'start',
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: 32, 
          marginTop: '2%' 
        }}>
          <span style={{
            background: 'rgba(27,77,62,0.08)',
            color: '#d1b981',
            fontWeight: 600,
            fontSize: isMobile ? '0.9rem' : '1rem',
            borderRadius: 999,
            padding: isMobile ? '6px 20px' : '8px 24px',
            letterSpacing: '0.04em',
            fontFamily: 'Inter, Arial, sans-serif',
            display: 'inline-block',
            paddingTop: '5px',
            marginTop: isMobile ? '2%' : '5%',
            marginBottom: isMobile ? '-1%' : '-2%'
          }}>
            Our Story
          </span>
        </div>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontWeight: 600,
          fontSize: isMobile ? '2.2rem' : '3.5rem',
          color: theme.primary,
          marginBottom: 24,
          letterSpacing: '-1px',
          lineHeight: 1.1,
        }}>
          {t('about_mtm')}
        </h1>
        <p style={{
          fontSize: isMobile ? '1rem' : '1.2rem',
          color: theme.textLight,
          maxWidth: isMobile ? '100%' : 700,
          margin: '0 auto 40px',
          fontFamily: 'Inter, Arial, sans-serif',
          lineHeight: 1.6,
        }}>
          {t('about_mtm_description')}
        </p>
        
        {/* 16:9 Hero Image */}
        <div style={{
          maxWidth: isMobile ? '100%' : 800,
          margin: '0 auto 60px',
          aspectRatio: '16/9',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `url('mtm1.jpg') center center/cover no-repeat`,
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          />
        </div>
      </section>

      {/* Our Story Section */}
      <section
        className="about-section"
        style={{
          minHeight: isMobile ? 'auto' : 'auto',
          height: isMobile ? 'auto' : 'auto',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: isMobile ? '40px 20px' : '80px 40px',
          background: theme.background,
          scrollSnapAlign: 'start',
        }}
      >
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: isMobile ? 40 : 80,
          alignItems: 'center'
        }}>
          {/* Text Content */}
          <div style={{
            order: 1,
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          className="animate-in"
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 24
            }}>
              <span style={{
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: 600,
                color: theme.accent,
                letterSpacing: '2px',
                marginRight: 16
              }}>
                01
              </span>
              <div style={{
                flex: 1,
                height: '1px',
                background: 'rgba(209, 185, 129, 0.3)'
              }} />
            </div>
            
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 800,
              fontSize: isMobile ? '1.8rem' : '3rem',
              color: theme.primary,
              marginBottom: 20,
              letterSpacing: '-1px',
              lineHeight: 1.1
            }}>
              {t('our_story')}
            </h2>
            
            <p style={{
              fontSize: isMobile ? '1rem' : '1.1rem',
              color: theme.textLight,
              marginBottom: 32,
              lineHeight: 1.7,
              fontFamily: 'Inter, Arial, sans-serif'
            }}>
              {t('our_story_description')}
            </p>
            
            <p style={{
              fontSize: isMobile ? '0.95rem' : '1rem',
              color: theme.textLight,
              marginBottom: 40,
              lineHeight: 1.6,
              fontFamily: 'Inter, Arial, sans-serif'
            }}>
              {t('our_story_second')}
            </p>
          </div>

          {/* Image with Parallax */}
          <div style={{
            order: 2,
            position: 'relative',
            height: isMobile ? '250px' : '500px',
            borderRadius: '20px',
            overflow: 'hidden',
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
          }}
          className="animate-in"
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `url('/chinGong.jpeg') center center/cover no-repeat`,
              transform: 'scale(1.1)',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            />
          </div>
        </div>
      </section>

      {/* Story Continued Section */}
      <section
        className="about-section"
        style={{
          minHeight: isMobile ? 'auto' : 'auto',
          height: isMobile ? 'auto' : 'auto',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: isMobile ? '40px 20px' : '80px 40px',
          background: theme.background,
          scrollSnapAlign: 'start',
        }}
      >
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: isMobile ? 40 : 80,
          alignItems: 'center'
        }}>
          {/* Image with Parallax */}
          <div style={{
            order: 1,
            position: 'relative',
            height: isMobile ? '250px' : '500px',
            borderRadius: '20px',
            overflow: 'hidden',
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
          }}
          className="animate-in"
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `url('/hairhead.jpeg') center center/cover no-repeat`,
              transform: 'scale(1.1)',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            />
          </div>

          {/* Text Content */}
          <div style={{
            order: 2,
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          className="animate-in"
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 24
            }}>
              <span style={{
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: 600,
                color: theme.accent,
                letterSpacing: '2px',
                marginRight: 16
              }}>
                02
              </span>
              <div style={{
                flex: 1,
                height: '1px',
                background: 'rgba(209, 185, 129, 0.3)'
              }} />
            </div>
            
            <p style={{
              fontSize: isMobile ? '1rem' : '1.1rem',
              color: theme.textLight,
              marginBottom: 32,
              lineHeight: 1.7,
              fontFamily: 'Inter, Arial, sans-serif'
            }}>
              {t('our_story_fourth')}
            </p>
            
            <p style={{
              fontSize: isMobile ? '0.95rem' : '1rem',
              color: theme.textLight,
              marginBottom: 40,
              lineHeight: 1.6,
              fontFamily: 'Inter, Arial, sans-serif'
            }}>
              {t('our_story_fifth')}
            </p>

            <p style={{
              fontSize: isMobile ? '0.95rem' : '1rem',
              color: theme.textLight,
              marginBottom: 40,
              lineHeight: 1.6,
              fontFamily: 'Inter, Arial, sans-serif',
              fontStyle: 'italic'
            }}>
              {t('our_story_seventh')}
            </p>
          </div>
        </div>
      </section>

      {/* Why MTM Section */}
      <section
        className="about-section"
        style={{
          minHeight: isMobile ? 'auto' : 'auto',
          height: isMobile ? 'auto' : 'auto',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: isMobile ? '40px 20px' : '80px 40px',
          background: theme.background,
          scrollSnapAlign: 'start',
        }}
      >
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: isMobile ? 40 : 80,
          alignItems: 'center'
        }}>
          {/* Text Content */}
          <div style={{
            order: 1,
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          className="animate-in"
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 24
            }}>
              <span style={{
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: 600,
                color: theme.accent,
                letterSpacing: '2px',
                marginRight: 16
              }}>
                03
              </span>
              <div style={{
                flex: 1,
                height: '1px',
                background: 'rgba(209, 185, 129, 0.3)'
              }} />
            </div>
            
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 800,
              fontSize: isMobile ? '1.8rem' : '3rem',
              color: theme.primary,
              marginBottom: 20,
              letterSpacing: '-1px',
              lineHeight: 1.1
            }}>
              {t('why_mtm')}
            </h2>
            
            <p style={{
              fontSize: isMobile ? '1rem' : '1.1rem',
              color: theme.textLight,
              marginBottom: 32,
              lineHeight: 1.7,
              fontFamily: 'Inter, Arial, sans-serif'
            }}>
              {t('why_mtm_description')}
            </p>

            <div style={{
              background: 'rgba(17,96,58,0.05)',
              borderRadius: '16px',
              padding: isMobile ? '24px' : '32px',
              marginBottom: '32px',
            }}>
              <p style={{
                fontSize: isMobile ? '0.95rem' : '1rem',
                lineHeight: 1.6,
                color: theme.textLight,
                marginBottom: '16px',
              }}>
                {t('why_mtm_ming')}
              </p>
              <p style={{
                fontSize: isMobile ? '0.95rem' : '1rem',
                lineHeight: 1.6,
                color: theme.textLight,
                marginBottom: '16px',
              }}>
                {t('why_mtm_tian')}
              </p>
              <p style={{
                fontSize: isMobile ? '0.95rem' : '1rem',
                lineHeight: 1.6,
                color: theme.textLight,
                marginBottom: '16px',
              }}>
                {t('why_mtm_ming_tian')}
              </p>
              <p style={{
                fontSize: isMobile ? '0.95rem' : '1rem',
                lineHeight: 1.6,
                color: theme.textLight,
                marginBottom: '16px',
              }}>
                {t('why_mtm_ming_tian_ming')}
              </p>
            </div>
          </div>

          {/* Image with Parallax */}
          <div style={{
            order: 2,
            position: 'relative',
            height: isMobile ? '250px' : '500px',
            borderRadius: '20px',
            overflow: 'hidden',
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
          }}
          className="animate-in"
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `url('/chinese.jpeg') center center/cover no-repeat`,
              transform: 'scale(1.1)',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            />
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section
        className="about-section"
        style={{
          minHeight: isMobile ? 'auto' : 'auto',
          height: isMobile ? 'auto' : 'auto',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: isMobile ? '40px 20px' : '80px 40px',
          background: theme.background,
          scrollSnapAlign: 'start',
        }}
      >
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: isMobile ? 40 : 80,
          alignItems: 'center'
        }}>
          {/* Image with Parallax */}
          <div style={{
            order: 1,
            position: 'relative',
            height: isMobile ? '250px' : '500px',
            borderRadius: '20px',
            overflow: 'hidden',
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
          }}
          className="animate-in"
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `url('/locationMTM.jpg') center center/cover no-repeat`,
              transform: 'scale(1.1)',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            />
          </div>

          {/* Text Content */}
          <div style={{
            order: 2,
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          className="animate-in"
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 24
            }}>
              <span style={{
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: 600,
                color: theme.accent,
                letterSpacing: '2px',
                marginRight: 16
              }}>
                04
              </span>
              <div style={{
                flex: 1,
                height: '1px',
                background: 'rgba(209, 185, 129, 0.3)'
              }} />
            </div>
            
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 800,
              fontSize: isMobile ? '1.8rem' : '3rem',
              color: theme.primary,
              marginBottom: 20,
              letterSpacing: '-1px',
              lineHeight: 1.1
            }}>
              {t('about_visit_us')}
            </h2>
            
            <p style={{
              fontSize: isMobile ? '1rem' : '1.1rem',
              color: theme.textLight,
              marginBottom: 32,
              lineHeight: 1.7,
              fontFamily: 'Inter, Arial, sans-serif'
            }}>
              MTM - San Luis Potosi
            </p>

            <p style={{
              fontSize: isMobile ? '0.95rem' : '1rem',
              color: theme.textLight,
              marginBottom: 16,
              lineHeight: 1.6,
              fontFamily: 'Inter, Arial, sans-serif'
            }}>
              Joaquin Meade 136, Lomas 1er Secc,<br />
              CP 78290, San Luis Potosi, SLP, Mexico
            </p>

            <p style={{
              fontSize: isMobile ? '0.95rem' : '1rem',
              color: theme.textLight,
              marginBottom: 24,
              lineHeight: 1.6,
              fontFamily: 'Inter, Arial, sans-serif'
            }}>
              Phone: +52 56 6156 7879
            </p>

            <a 
              href="https://maps.app.goo.gl/gtKcAsqH7hd87hQD8"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                backgroundColor: theme.primary,
                color: theme.white,
                padding: isMobile ? '10px 20px' : '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: isMobile ? '0.9rem' : '1rem',
                transition: 'all 0.2s ease',
              }}
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        @media (max-width: 768px) {
          .about-section {
            padding: 40px 20px !important;
            min-height: auto !important;
            height: auto !important;
          }
        }
      `}</style>
    </div>
  );
} 
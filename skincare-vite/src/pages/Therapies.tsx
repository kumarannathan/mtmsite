import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import CallToActionBanner from '../components/CallToActionBanner';
import AddOnPillCta from '../components/AddOnPillCta';

// Service data with enhanced descriptions
const MAIN_SERVICES = [
  {
    id: 'health-scalp',
    titleKey: 'therapies_mind_scalp_title',
    subtitleKey: 'therapies_mind_scalp_subtitle',
    descriptionKey: 'therapies_mind_scalp_description',
    longDescriptionKey: 'therapies_mind_scalp_long_description',
    benefitsKey: 'therapies_mind_scalp_benefits',
    image: '/mindScalp.jpg',
    sectionNumber: '01',
    durationKey: 'service_mind_duration',
    priceKey: 'service_mind_price',
  },
  {
    id: 'hair-growth',
    titleKey: 'therapies_hair_growth_title',
    subtitleKey: 'therapies_hair_growth_subtitle',
    descriptionKey: 'therapies_hair_growth_description',
    longDescriptionKey: 'therapies_hair_growth_long_description',
    benefitsKey: 'therapies_hair_growth_benefits',
    image: '/growth.jpg',
    sectionNumber: '02',
    durationKey: 'service_growth_duration',
    priceKey: 'service_growth_price',
  },
  {
    id: 'hair-rejuvenation',
    titleKey: 'therapies_hair_rejuvenation_title',
    subtitleKey: 'therapies_hair_rejuvenation_subtitle',
    descriptionKey: 'therapies_hair_rejuvenation_description',
    longDescriptionKey: 'therapies_hair_rejuvenation_long_description',
    benefitsKey: 'therapies_hair_rejuvenation_benefits',
    image: '/rejuvenation.jpg',
    sectionNumber: '03',
    durationKey: 'service_rejuvenation_duration',
    priceKey: 'service_rejuvenation_price',
  },
];

// Add-on services data
const ADDON_SERVICES = [
  {
    id: 'gong-therapy',
    titleKey: 'therapies_addon_gong_title',
    subtitleKey: 'therapies_addon_gong_subtitle',
    descriptionKey: 'therapies_addon_gong_description',
    longDescriptionKey: 'therapies_addon_gong_long_description',
    benefitsKey: 'therapies_addon_gong_benefits',
    image: '/gongTherapy.jpg',
    sectionNumber: '01',
    durationKey: 'addon_gong_duration',
    priceKey: 'addon_gong_price',
  },
  {
    id: 'hair-styling',
    titleKey: 'therapies_addon_styling_title',
    subtitleKey: 'therapies_addon_styling_subtitle',
    descriptionKey: 'therapies_addon_styling_description',
    longDescriptionKey: 'therapies_addon_styling_long_description',
    benefitsKey: 'therapies_addon_styling_benefits',
    image: '/styling.jpg',
    sectionNumber: '02',
    durationKey: 'addon_styling_duration',
    priceKey: 'addon_styling_price',
  },
  {
    id: 'facial-massage',
    titleKey: 'therapies_addon_facial_title',
    subtitleKey: 'therapies_addon_facial_subtitle',
    descriptionKey: 'therapies_addon_facial_description',
    longDescriptionKey: 'therapies_addon_facial_long_description',
    benefitsKey: 'therapies_addon_facial_benefits',
    image: '/facialmassage.jpg',
    sectionNumber: '03',
    durationKey: 'addon_facial_duration',
    priceKey: 'addon_facial_price',
  },
];

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

export default function Therapies() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('health-scalp');
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const addOnSectionRef = useRef<HTMLDivElement | null>(null);

  // Handle responsive behavior
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSection(sectionId);
    }
  };

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

    const sections = document.querySelectorAll('.service-section');
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
      paddingTop: isMobile ? '10vh' : 0
    }}>
      {/* Hero Section with Service Cards */}
      <section style={{ 
        maxWidth: isMobile ? '100%' : 1400, 
        margin: '0 auto', 
        padding: isMobile ? '40px 16px 60px 16px' : '80px 20px 120px 20px', 
        textAlign: 'center' 
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: isMobile ? 20 : 32, 
          marginTop: isMobile ? '8px' : '2%',
          paddingTop: isMobile ? '100px' : '0%',

        }}>
          <span style={{
            background: 'rgba(27,77,62,0.08)',
            color: '#d1b981',
            fontWeight: 600,
            fontSize: isMobile ? '0.9rem' : '1rem',
            borderRadius: 999,
            padding: isMobile ? '6px 16px' : '8px 24px',
            letterSpacing: '0.04em',
            fontFamily: 'Inter, Arial, sans-serif',
            display: 'inline-block',
          }}>
            {t('therapies_hero_title')}
          </span>
        </div>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontWeight: 600,
          fontSize: isMobile ? '2rem' : '3.5rem',
          color: theme.primary,
          marginBottom: isMobile ? 16 : 24,
          letterSpacing: '-1px',
          lineHeight: 1.1,
        }}>
          {t('therapies_signature_healing_treatments')}
        </h1>
        <p style={{
          fontSize: isMobile ? '1rem' : '1.2rem',
          color: theme.textLight,
          maxWidth: isMobile ? '100%' : 700,
          margin: isMobile ? '0 auto 40px' : '0 auto 60px',
          fontFamily: 'Inter, Arial, sans-serif',
          lineHeight: 1.6,
        }}>
          {t('therapies_hero_subtitle')}
        </p>


        <div style={{ margin: isMobile ? '0px 20px 40px 20px' : '0px 0 40px 0', display: 'flex', justifyContent: 'center' }}>
        <AddOnPillCta onClick={() => {
          if (addOnSectionRef.current) {
            addOnSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }} />
      </div>

        {/* Service Cards Grid - FULL IMAGE CARDS WITH OVERLAY TEXT ONLY */}
        <div style={{
            display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? 20 : 32,
          maxWidth: isMobile ? '100%' : 1200,
          margin: '0 auto',
          padding: isMobile ? '0 8px' : '0'
        }}>
          {MAIN_SERVICES.map((service) => (
            <div
              key={service.id}
              onClick={() => scrollToSection(service.id)}
              style={{
                position: 'relative',
                borderRadius: isMobile ? 16 : 20,
                overflow: 'hidden',
                minHeight: isMobile ? 180 : 500,
                height: isMobile ? 180 : 320,
                boxShadow: '0 8px 32px rgba(27,77,62,0.08)',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                background: `url(${service.image}) center center/cover no-repeat`,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'scale(1.03) translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(27,77,62,0.15)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(27,77,62,0.08)';
              }}
            >
              {/* Gradient overlay for readability */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(120deg, rgba(27,77,62,0.10) 30%, rgba(0,0,0,0.38) 100%)',
                zIndex: 1,
              }} />
              {/* Text Overlay */}
              <div style={{
                position: 'relative',
                zIndex: 2,
                padding: isMobile ? '16px' : '32px',
                color: '#fff',
                textAlign: 'left',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                minHeight: isMobile ? 100 : 160,
                background: 'none',
              }}>
                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontWeight: 700,
                  fontSize: isMobile ? '1.1rem' : '1.5rem',
                  marginBottom: isMobile ? 6 : 8,
                  color: '#fff',
                  textShadow: '0 2px 12px rgba(0,0,0,0.25)',
                  letterSpacing: '-0.5px',
                  lineHeight: 1.2
                }}>{t(service.titleKey)}</h3>
                <p style={{
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontSize: isMobile ? '0.9rem' : '1.08rem',
                  color: '#fff',
                  textShadow: '0 2px 8px rgba(0,0,0,0.18)',
                  marginBottom: 0,
                  lineHeight: 1.5,
                  fontWeight: 400,
                  maxWidth: isMobile ? '95%' : '90%'
                }}>{t(service.subtitleKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Service Sections with Parallax */}
      {MAIN_SERVICES.map((service, index) => (
        <section
          key={service.id}
          ref={(el) => {
            sectionRefs.current[service.id] = el;
          }}
          className="service-section"
          style={{
            minHeight: isMobile ? 'auto' : '100vh',
            height: isMobile ? 'auto' : '100vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: isMobile ? '40px 16px 80px 16px' : '120px 40px',
            background: index % 2 === 1 ? theme.background : theme.white,
            scrollSnapAlign: 'start',
            borderRadius: isMobile ? '16px' : '20px',
            margin: isMobile ? '16px' : '20px',
          }}
        >
          <div style={{
            maxWidth: isMobile ? '100%' : 1400,
            margin: '0 auto',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 32 : 80,
            alignItems: 'center'
          }}>
            {/* Text Content */}
            <div style={{
              order: index % 2 === 0 ? 1 : 2,
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
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: theme.accent,
                  letterSpacing: '2px',
                  marginRight: 16
                }}>
                  {service.sectionNumber}
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
                fontSize: isMobile ? '2.2rem' : '3rem',
                color: theme.primary,
                marginBottom: 20,
                letterSpacing: '-1px',
                lineHeight: 1.1
              }}>
                {t(service.titleKey)}
              </h2>
              
              <p style={{
                fontSize: '1.1rem',
                color: theme.textLight,
                marginBottom: 32,
                lineHeight: 1.7,
                fontFamily: 'Inter, Arial, sans-serif'
              }}>
                {t(service.descriptionKey)}
              </p>
              
              <p style={{
                fontSize: '1rem',
                color: theme.textLight,
                marginBottom: 40,
                lineHeight: 1.6,
                fontFamily: 'Inter, Arial, sans-serif'
              }}>
                {t(service.longDescriptionKey)}
              </p>
              
              <div style={{
                display: 'flex',
                gap: 16,
                flexWrap: 'wrap'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontSize: '1.08rem',
                  color: theme.primary,
                  fontWeight: 600,
                  marginBottom: 0,
                }}>
                  <span>{t(service.durationKey)}</span>
                  <span style={{ color: '#bbb', fontWeight: 400 }}>|</span>
                  <span>{t(service.priceKey)}</span>
                </div>
              </div>
              <div style={{ margin: '24px 0 0 0' }}>
                <div style={{
                  fontWeight: 700,
                  color: theme.primary,
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.1rem',
                  marginBottom: 10,
                  letterSpacing: '0.5px',
                }}></div>
                <ul style={{
                  listStyle: 'disc',
                  paddingLeft: 24,
                  color: theme.textLight,
                  fontSize: '1.08rem',
                  margin: 0,
                  marginBottom: 24,
                  lineHeight: 1.7,
                }}>
                  {(t(service.benefitsKey, { returnObjects: true }) as string[]).map((benefit: string, i: number) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
              
              <div style={{
                display: 'flex',
                gap: 16,
                flexWrap: 'wrap'
              }}>
                <Link to="/book" style={{
                  padding: '16px 32px',
                  backgroundColor: theme.primary,
                  color: theme.white,
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = theme.secondary;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = theme.primary;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                  {t('therapies_book_now')}
                </Link>
                
                <div style={{
                  padding: '16px 32px',
                  border: `1px solid ${theme.primary}`,
                  color: theme.primary,
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '1rem'
                }}>
                  {t(service.durationKey)} • {t(service.priceKey)}
                </div>
              </div>
            </div>

            {/* Image with Parallax */}
            <div style={{
              order: index % 2 === 0 ? 2 : 1,
              position: 'relative',
              height: isMobile ? '300px' : '500px',
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
                background: `url(${service.image}) center center/cover no-repeat`,
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
      ))}

      {/* Add-on Service Sections */}
      <div ref={addOnSectionRef} style={{ marginTop: isMobile ? '40px' : '0px' }} />
      {ADDON_SERVICES.map((service, index) => (
        <section
          key={service.id}
          className="service-section"
          style={{
            minHeight: '100vh',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: isMobile ? '70px 20px 80px 20px' : '100px 40px',
            background: index % 2 === 0 ? theme.background : theme.white,
            scrollSnapAlign: 'start',
            borderRadius: '20px',
            margin: isMobile ? '20px 20px 20px 20px' : '20px',
          }}
        >
          
          <div style={{
            maxWidth: 1400,
            margin: '0 auto',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 60 : 80,
            alignItems: 'center'
          }}>
            {/* Text Content */}
            <div style={{
              order: (MAIN_SERVICES.length + index) % 2 === 0 ? 1 : 2,
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
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: theme.accent,
                  letterSpacing: '2px',
                  marginRight: 16
                }}>
                  {service.sectionNumber}
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
                marginBottom: isMobile ? 16 : 20,
                letterSpacing: '-1px',
                lineHeight: 1.1
              }}>
                {t(service.titleKey)}
              </h2>
              
              <p style={{
                fontSize: isMobile ? '1rem' : '1.1rem',
                color: theme.textLight,
                marginBottom: isMobile ? 24 : 32,
                lineHeight: 1.7,
                fontFamily: 'Inter, Arial, sans-serif'
              }}>
                {t(service.descriptionKey)}
              </p>
              
              <p style={{
                fontSize: isMobile ? '0.95rem' : '1rem',
                color: theme.textLight,
                marginBottom: isMobile ? 32 : 40,
                lineHeight: 1.6,
                fontFamily: 'Inter, Arial, sans-serif'
              }}>
                {t(service.longDescriptionKey)}
              </p>
              
              <div style={{
                display: 'flex',
                gap: 16,
                flexWrap: 'wrap'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontSize: '1.08rem',
                  color: theme.primary,
                  fontWeight: 600,
                  marginBottom: 0,
                }}>
                  <span>{t(service.durationKey)}</span>
                  <span style={{ color: '#bbb', fontWeight: 400 }}>|</span>
                  <span>{t(service.priceKey)}</span>
                </div>
              </div>
              <div style={{ margin: '24px 0 0 0' }}>
                <div style={{
                  fontWeight: 700,
                  color: theme.primary,
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.1rem',
                  marginBottom: 10,
                  letterSpacing: '0.5px',
                }}></div>
                <ul style={{
                  listStyle: 'disc',
                  paddingLeft: 24,
                  color: theme.textLight,
                  fontSize: '1.08rem',
                  margin: 0,
                  marginBottom: 24,
                  lineHeight: 1.7,
                }}>
                  {(t(service.benefitsKey, { returnObjects: true }) as string[]).map((benefit: string, i: number) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
              
              <div style={{
                display: 'flex',
                gap: 16,
                flexWrap: 'wrap'
              }}>
                {/* <Link to="/book" style={{
                  padding: '16px 32px',
                  backgroundColor: theme.primary,
                  color: theme.white,
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = theme.secondary;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = theme.primary;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                  Book Now
                </Link> */}
              </div>
            </div>

            {/* Image with Parallax */}
            <div style={{
              order: (MAIN_SERVICES.length + index) % 2 === 0 ? 2 : 1,
              position: 'relative',
              height: isMobile ? '300px' : '500px',
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
                background: `url(${service.image}) center center/cover no-repeat`,
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
      ))}

      {/* Custom CSS for animations */}
      <style>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
          }
        
        @media (max-width: 768px) {
          .service-section {
            padding: 60px 20px !important;
          }
        }
      `}</style>
    </div>
  );
} 
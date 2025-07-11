import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import CallToActionBanner from '../components/CallToActionBanner';
import AddOnPillCta from '../components/AddOnPillCta';

// Service data with enhanced descriptions
const MAIN_SERVICES = [
  {
    id: 'mind-scalp',
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
  const [activeSection, setActiveSection] = useState('mind-scalp');
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
    }}>
      {/* Hero Section with Service Cards */}
      <section style={{ 
        maxWidth: isMobile ? '100%' : 1400, 
        margin: '0 auto', 
        padding: isMobile ? '40px 8px 40px 8px' : '80px 20px 120px 20px', 
        textAlign: 'center' 
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: isMobile ? 18 : 32, 
          marginTop: isMobile ? '8px' : '2%' 
        }}>
          <span style={{
            background: 'rgba(27,77,62,0.08)',
            color: '#d1b981',
            fontWeight: 600,
            fontSize: isMobile ? '0.95rem' : '1rem',
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
          maxWidth: isMobile ? '98%' : 700,
          margin: isMobile ? '0 auto 32px' : '0 auto 60px',
          fontFamily: 'Inter, Arial, sans-serif',
        }}>
          {t('therapies_subtitle')}
        </p>
        {/* Main Services */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '24px' : '40px',
          alignItems: 'stretch',
          justifyContent: 'center',
          width: '100%',
          margin: isMobile ? '0 auto' : '0 auto 0',
        }}>
          {MAIN_SERVICES.map((service) => (
            <div
              key={service.id}
              className="service-section"
              ref={el => { sectionRefs.current[service.id] = el; }}
              style={{
                background: theme.cardBg,
                borderRadius: '18px',
                boxShadow: '0 4px 24px rgba(27,77,62,0.08)',
                padding: isMobile ? '18px 10px 18px 10px' : '32px 32px 32px 32px',
                margin: isMobile ? '0 0 8px 0' : '0 0 0 0',
                minWidth: isMobile ? 'unset' : 320,
                maxWidth: isMobile ? '100%' : 400,
                width: isMobile ? '100%' : 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'left',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <img
                src={service.image}
                alt={t(service.titleKey)}
                style={{
                  width: isMobile ? '100%' : '90%',
                  maxWidth: isMobile ? 320 : 340,
                  height: isMobile ? 120 : 180,
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: isMobile ? 12 : 18,
                  marginTop: isMobile ? 0 : 8,
                  boxShadow: '0 2px 8px rgba(27,77,62,0.07)'
                }}
              />
              <h2 style={{
                fontSize: isMobile ? '1.15rem' : '1.35rem',
                fontWeight: 700,
                color: theme.primary,
                margin: '0 0 6px 0',
                fontFamily: 'Playfair Display, serif',
                textAlign: 'left',
                width: '100%'
              }}>{t(service.titleKey)}</h2>
              <div style={{
                color: theme.textLight,
                fontSize: isMobile ? '0.98rem' : '1.08rem',
                marginBottom: isMobile ? 8 : 12,
                textAlign: 'left',
                width: '100%'
              }}>{t(service.subtitleKey)}</div>
              <div style={{
                color: theme.text,
                fontSize: isMobile ? '0.97rem' : '1.08rem',
                marginBottom: isMobile ? 10 : 16,
                textAlign: 'left',
                width: '100%'
              }}>{t(service.descriptionKey)}</div>
              <div style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                marginBottom: isMobile ? 8 : 16,
                width: '100%'
              }}>
                <span style={{
                  background: 'rgba(27,77,62,0.08)',
                  color: theme.primary,
                  borderRadius: 999,
                  padding: isMobile ? '4px 10px' : '6px 16px',
                  fontWeight: 600,
                  fontSize: isMobile ? '0.93rem' : '1rem',
                }}>{t(service.durationKey)}</span>
                <span style={{
                  color: theme.accent,
                  fontWeight: 700,
                  fontSize: isMobile ? '1rem' : '1.1rem',
                }}>{t(service.priceKey)}</span>
              </div>
              <ul style={{
                color: theme.text,
                fontSize: isMobile ? '0.95rem' : '1.05rem',
                margin: '0 0 8px 0',
                paddingLeft: '18px',
                textAlign: 'left',
                width: '100%'
              }}>
                {(t(service.benefitsKey, { returnObjects: true }) as string[]).map((benefit, idx) => (
                  <li key={idx} style={{ marginBottom: isMobile ? 4 : 8 }}>{benefit}</li>
                ))}
              </ul>
              <Link to={`/book?service=${service.id}`} style={{
                background: theme.primary,
                color: theme.white,
                border: 'none',
                borderRadius: '8px',
                padding: isMobile ? '10px 18px' : '12px 24px',
                fontSize: isMobile ? '0.97rem' : '1.05rem',
                fontWeight: 600,
                fontFamily: 'Inter, Arial, sans-serif',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(27,77,62,0.12)',
                textDecoration: 'none',
                marginTop: isMobile ? 8 : 16,
                width: isMobile ? '100%' : 'auto',
                textAlign: 'center',
                display: 'block',
              }}>{t('therapies_bookThisTherapy')}</Link>
            </div>
          ))}
        </div>
        {/* Add-on Services */}
        <div style={{
          marginTop: isMobile ? 32 : 60,
          width: '100%',
        }}>
          <h2 style={{
            fontSize: isMobile ? '1.2rem' : '1.7rem',
            fontWeight: 600,
            color: theme.primary,
            marginBottom: isMobile ? 12 : 24,
            textAlign: 'center',
          }}>{t('therapies_addons_title')}</h2>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '18px' : '32px',
            alignItems: 'stretch',
            justifyContent: 'center',
            width: '100%',
          }}>
            {ADDON_SERVICES.map((service) => (
              <div
                key={service.id}
                style={{
                  background: theme.cardBg,
                  borderRadius: '18px',
                  boxShadow: '0 4px 24px rgba(27,77,62,0.08)',
                  padding: isMobile ? '14px 8px 14px 8px' : '28px 24px 28px 24px',
                  minWidth: isMobile ? 'unset' : 260,
                  maxWidth: isMobile ? '100%' : 320,
                  width: isMobile ? '100%' : 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'left',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={service.image}
                  alt={t(service.titleKey)}
                  style={{
                    width: isMobile ? '100%' : '90%',
                    maxWidth: isMobile ? 260 : 300,
                    height: isMobile ? 90 : 120,
                    objectFit: 'cover',
                    borderRadius: '10px',
                    marginBottom: isMobile ? 8 : 14,
                    marginTop: isMobile ? 0 : 4,
                    boxShadow: '0 2px 8px rgba(27,77,62,0.07)'
                  }}
                />
                <h3 style={{
                  fontSize: isMobile ? '1.05rem' : '1.18rem',
                  fontWeight: 700,
                  color: theme.primary,
                  margin: '0 0 4px 0',
                  fontFamily: 'Playfair Display, serif',
                  textAlign: 'left',
                  width: '100%'
                }}>{t(service.titleKey)}</h3>
                <div style={{
                  color: theme.textLight,
                  fontSize: isMobile ? '0.93rem' : '1.01rem',
                  marginBottom: isMobile ? 6 : 10,
                  textAlign: 'left',
                  width: '100%'
                }}>{t(service.subtitleKey)}</div>
                <div style={{
                  color: theme.text,
                  fontSize: isMobile ? '0.93rem' : '1.01rem',
                  marginBottom: isMobile ? 8 : 12,
                  textAlign: 'left',
                  width: '100%'
                }}>{t(service.descriptionKey)}</div>
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  marginBottom: isMobile ? 6 : 12,
                  width: '100%'
                }}>
                  <span style={{
                    background: 'rgba(27,77,62,0.08)',
                    color: theme.primary,
                    borderRadius: 999,
                    padding: isMobile ? '3px 8px' : '5px 12px',
                    fontWeight: 600,
                    fontSize: isMobile ? '0.91rem' : '0.97rem',
                  }}>{t(service.durationKey)}</span>
                  <span style={{
                    color: theme.accent,
                    fontWeight: 700,
                    fontSize: isMobile ? '0.97rem' : '1.05rem',
                  }}>{t(service.priceKey)}</span>
                </div>
                <ul style={{
                  color: theme.text,
                  fontSize: isMobile ? '0.91rem' : '1.01rem',
                  margin: '0 0 6px 0',
                  paddingLeft: '16px',
                  textAlign: 'left',
                  width: '100%'
                }}>
                  {(t(service.benefitsKey, { returnObjects: true }) as string[]).map((benefit, idx) => (
                    <li key={idx} style={{ marginBottom: isMobile ? 3 : 6 }}>{benefit}</li>
                  ))}
                </ul>
                <Link to={`/book?addon=${service.id}`} style={{
                  background: theme.primary,
                  color: theme.white,
                  border: 'none',
                  borderRadius: '8px',
                  padding: isMobile ? '8px 14px' : '10px 20px',
                  fontSize: isMobile ? '0.93rem' : '1.01rem',
                  fontWeight: 600,
                  fontFamily: 'Inter, Arial, sans-serif',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(27,77,62,0.12)',
                  textDecoration: 'none',
                  marginTop: isMobile ? 6 : 12,
                  width: isMobile ? '100%' : 'auto',
                  textAlign: 'center',
                  display: 'block',
                }}>Add to Booking</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 
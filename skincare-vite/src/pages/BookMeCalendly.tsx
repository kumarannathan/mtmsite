import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import CalendlyBooking from '../components/CalendlyBooking';
import styles from '../App.module.css';
// import AddOnPillCTA from '../components/AddOnPillCTA';

interface Service {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  calendlyUrl: string;
}

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

export default function BookMeCalendly() {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showTreatments, setShowTreatments] = useState(false);

  const calendlyRef = useRef<HTMLDivElement | null>(null);

  const services: Service[] = [
    {
      id: "health-scalp-therapy",
      title: t('bookme_mind_scalp_title'),
      description: t('bookme_mind_scalp_description'),
      duration: "40 minutes",
      price: "$1,300 MXN",
      calendlyUrl: "https://calendly.com/kumarann-umich/mind-scalp-therapy",
    },
    {
      id: "hair-growth-preservation",
      title: t('bookme_hair_growth_title'),
      description: t('bookme_hair_growth_description'),
      duration: "60 minutes",
      price: "$1,700 MXN",
      calendlyUrl: "https://calendly.com/kumarann-umich/hair-growth-preservation-therapy-clone",
    },
    {
      id: "hair-rejuvenation-therapy",
      title: t('bookme_hair_rejuvenation_title'),
      description: t('bookme_hair_rejuvenation_description'),
      duration: "60 minutes",
      price: "$1,700 MXN",
      calendlyUrl: "https://calendly.com/kumarann-umich/mind-scalp-therapy-clone",
    },
  ];

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setTimeout(() => {
      if (calendlyRef.current) {
        calendlyRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100); // slight delay to ensure Calendly is rendered
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#fdf9f5', padding: '0 0 80px 0' }}>
      {/* Hero Header Section */}
      <section style={{
                marginTop: isMobile ? '100px' : '0px',
        width: '100%',
        background: '#fdf9f5',
        minHeight: isMobile ? '15vh' : '20vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: isMobile ? '80px' : '8%',
        paddingBottom: '1%',
        paddingLeft: isMobile ? '16px' : '0',
        paddingRight: isMobile ? '16px' : '0',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ 
            fontFamily: 'Playfair Display, serif', 
            fontWeight: 700, 
            fontSize: isMobile ? '2rem' : '2.5rem', 
            marginBottom: 10, 
            color: '#1B4D3E',
            lineHeight: 1.2,
          }}>
            {t('bookme_bookWithUs')}
          </h1>
          <div style={{
            fontSize: isMobile ? '0.9rem' : '1rem',
            color: '#2A6B57',
            marginBottom: 20,
            fontWeight: 400,
            maxWidth: isMobile ? '100%' : 480,
            lineHeight: 1.45,
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            {t('bookme_selectServiceDescription')}
          </div>
        </div>
      </section>
      {/* Booking Steps Section */}
      <section style={{
        width: '100%',
        background: '#fdf9f5',
        minHeight: '30vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: isMobile ? '16px' : '0',
        paddingRight: isMobile ? '16px' : '0',
      }}>
        <div style={{ 
          maxWidth: isMobile ? '100%' : 600, 
          margin: '0 auto', 
          textAlign: 'center', 
          marginTop: isMobile ? '20px' : '40px' 
        }}>
          {/* 1. Choose a Treatment (step style) */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: isMobile ? '8px' : '12px', 
            justifyContent: 'center', 
            marginBottom: 8 
          }}>
            <div style={{
              width: isMobile ? '32px' : '38px',
              height: isMobile ? '32px' : '38px',
              background: 'rgba(27, 77, 62, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #1B4D3E',
              flexShrink: 0,
            }}>
              <span style={{ 
                fontSize: isMobile ? '16px' : '18px', 
                fontWeight: '700', 
                color: '#1B4D3E' 
              }}>1</span>
            </div>
            <h2 style={{ 
              fontFamily: 'Playfair Display, serif', 
              fontWeight: 800, 
              fontSize: isMobile ? '1.2rem' : '1.4rem', 
              color: '#1B4D3E', 
              margin: 0, 
              letterSpacing: '-1px', 
              lineHeight: 1.1 
            }}>
              {t('bookme_chooseTreatment')}
            </h2>
          </div>
          <div style={{ 
            fontSize: isMobile ? '0.9rem' : '1rem', 
            color: '#2A6B57', 
            marginBottom: 20, 
            fontWeight: 400, 
            maxWidth: isMobile ? '100%' : 480, 
            lineHeight: 1.45, 
            textAlign: 'center', 
            marginLeft: isMobile ? 'auto' : '10%', 
            marginRight: 'auto' 
          }}>
            {t('bookme_chooseTreatmentDescription')}
          </div>
          {/* View Treatments button and blurb */}
          <div style={{ marginBottom: 18 }}>
            <button
              onClick={() => setShowTreatments(!showTreatments)}
              style={{
                background: '#1B4D3E',
                color: '#fff',
                border: 'none',
                borderRadius: '999px',
                padding: isMobile ? '10px 20px' : '12px 24px',
                fontSize: isMobile ? '0.9rem' : '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(27, 77, 62, 0.15)',
                marginBottom: 10,
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#0F3D1F';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#1B4D3E';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {showTreatments ? t('bookme_hideTreatments') : t('bookme_viewTreatments')}
              <svg 
                style={{ width: '16px', height: '16px', transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)', transform: showTreatments ? 'rotate(180deg)' : 'rotate(0deg)' }} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          {/* Treatments List (collapsible) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '12px' : '14px',
            maxHeight: showTreatments ? '900px' : '0',
            opacity: showTreatments ? 1 : 0,
            overflow: 'hidden',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: showTreatments ? 'translateY(0)' : 'translateY(-10px)',
            marginBottom: showTreatments ? (isMobile ? 16 : 24) : 0,
          }}>
            {services.map((service) => (
              <ServiceTile
                key={service.id}
                service={service}
                isSelected={selectedService?.id === service.id}
                onSelect={() => handleServiceSelect(service)}
                t={t}
                isMobile={isMobile}
              />
            ))}
          </div>
          {/* 2. Select a service to choose a time */}
          <div style={{
            margin: '32px 0 0 0',
            marginBottom: isMobile ? '60px' : '100px',
            opacity: 1,
            transition: 'opacity 0.4s',
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: isMobile ? '8px' : '12px', 
              justifyContent: 'center', 
              marginBottom: 8 
            }}>
              <div style={{
                width: isMobile ? '32px' : '38px',
                height: isMobile ? '32px' : '38px',
                background: 'rgba(27, 77, 62, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #1B4D3E',
                flexShrink: 0,
              }}>
                <span style={{ 
                  fontSize: isMobile ? '16px' : '18px', 
                  fontWeight: '700', 
                  color: '#1B4D3E' 
                }}>2</span>
              </div>
              <h2 style={{ 
                fontFamily: 'Playfair Display, serif', 
                fontWeight: 800, 
                fontSize: isMobile ? '1.2rem' : '1.4rem', 
                color: '#1B4D3E', 
                margin: 0, 
                letterSpacing: '-1px', 
                lineHeight: 1.1 
              }}>
                {t('bookme_selectServiceToChooseTime')}
              </h2>
            </div>
            <div style={{ 
              fontSize: isMobile ? '0.9rem' : '1rem', 
              color: '#2A6B57', 
              marginBottom: 20, 
              fontWeight: 400, 
              maxWidth: isMobile ? '100%' : 480, 
              lineHeight: 1.45, 
              textAlign: 'center', 
              marginLeft: 'auto', 
              marginRight: 'auto' 
            }}>
              {t('bookme_selectServiceToChooseTimeDescription')}
            </div>
            {/* Calendly widget appears here if a service is selected */}
            {selectedService && (
              <div ref={calendlyRef} style={{ 
                margin: '32px 0 0 0', 
                animation: 'fadeIn 0.5s ease-out',
                paddingLeft: isMobile ? '8px' : '0',
                paddingRight: isMobile ? '8px' : '0',
              }}>
                <CalendlyBooking 
                  key={selectedService.id} 
                  calendlyUrl={selectedService.calendlyUrl} 
                  onBookingComplete={() => {}} 
                />
              </div>
            )}
          </div>
          {/* 3. Select add ons */}
          <div style={{
            margin: '32px 0 0 0',
            opacity: 1,
            transition: 'opacity 0.4s',
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: isMobile ? '8px' : '12px', 
              justifyContent: 'center', 
              marginBottom: 8 
            }}>
              <div style={{
                width: isMobile ? '32px' : '38px',
                height: isMobile ? '32px' : '38px',
                background: 'rgba(27, 77, 62, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #1B4D3E',
                flexShrink: 0,
              }}>
                <span style={{ 
                  fontSize: isMobile ? '16px' : '18px', 
                  fontWeight: '700', 
                  color: '#1B4D3E' 
                }}>3</span>
              </div>
              <h2 style={{ 
                fontFamily: 'Playfair Display, serif', 
                fontWeight: 800, 
                fontSize: isMobile ? '1.2rem' : '1.4rem', 
                color: '#1B4D3E', 
                margin: 0, 
                letterSpacing: '-1px', 
                lineHeight: 1.1 
              }}>
                {t('bookme_providerWillReachOut')}
              </h2>
            </div>
            <div style={{ 
              fontSize: isMobile ? '0.9rem' : '1rem', 
              color: '#2A6B57', 
              marginBottom: 20, 
              fontWeight: 400, 
              maxWidth: isMobile ? '100%' : 480, 
              lineHeight: 1.45, 
              textAlign: 'center', 
              marginLeft: 'auto', 
              marginRight: 'auto' 
            }}>
              {t('bookme_lookForEmailOrCall')}
            </div>
          </div>
        </div>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>
    </div>
  );
}

interface ServiceTileProps {
  service: Service;
  isSelected: boolean;
  onSelect: () => void;
  t: (key: string) => string;
  isMobile: boolean;
}

function ServiceTile({ service, isSelected, onSelect, t, isMobile }: ServiceTileProps) {
  return (
    <div
      style={{
        position: 'relative',
        padding: isMobile ? '14px 16px 12px 16px' : '16px 18px 14px 18px',
        background: '#fff',
        border: isSelected ? '2px solid #1B4D3E' : '1px solid #e5e7eb',
        borderRadius: '20px',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        boxShadow: '0 8px 32px rgba(27,77,62,0.08)',
        marginBottom: 0,
        willChange: 'transform, box-shadow',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 16px 48px rgba(27,77,62,0.15)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(27,77,62,0.08)';
      }}
      onClick={onSelect}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      aria-label={`Select ${service.title}`}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '8px' : '10px' }}>
        <div>
          <h3 style={{
            fontSize: isMobile ? '1rem' : '1.05rem',
            fontWeight: 700,
            color: isSelected ? '#1B4D3E' : '#111',
            marginBottom: '6px',
            transition: 'color 0.2s',
            fontFamily: 'Playfair Display, serif',
            textAlign: 'left',
          }}>
            {service.title}
          </h3>
          <p style={{
            color: '#6b7280',
            marginTop: '6px',
            lineHeight: '1.5',
            fontSize: isMobile ? '0.87rem' : '0.93rem',
            fontWeight: 400,
          }}>
            {service.description}
          </p>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '8px' : '10px',
            fontSize: isMobile ? '0.9rem' : '0.97rem',
            color: '#6b7280',
          }}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <svg
                style={{ width: '15px', height: '15px', marginRight: '3px' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {service.duration.replace('minutes', t('bookme_minutes'))}
            </span>
            <span style={{
              fontSize: isMobile ? '0.95rem' : '1.01rem',
              fontWeight: 700,
              color: '#1B4D3E',
            }}>
              {service.price}
            </span>
          </div>
        </div>
      </div>
      {isSelected && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(27, 77, 62, 0.05)',
          borderRadius: '20px',
          pointerEvents: 'none',
        }} />
      )}
    </div>
  );
} 
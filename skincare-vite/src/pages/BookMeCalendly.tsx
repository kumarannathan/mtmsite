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

const services: Service[] = [
  {
    id: "mind-scalp-therapy",
    title: "Mind & Scalp Therapy",
    description: "A comprehensive treatment combining relaxation techniques with therapeutic scalp massage to promote mental clarity and stress relief.",
    duration: "40 minutes",
    price: "$1,300 MXN",
    calendlyUrl: "https://calendly.com/kumarann-umich/mind-scalp-therapy",
  },
  {
    id: "hair-growth-preservation",
    title: "Hair Growth & Preservation",
    description: "Specialized treatment focused on stimulating hair growth and reducing loss with natural techniques.",
    duration: "60 minutes",
    price: "$1,700 MXN",
    calendlyUrl: "https://calendly.com/kumarann-umich/hair-growth-preservation-therapy-clone",
  },
  {
    id: "hair-rejuvenation-therapy",
    title: "Hair Rejuvenation Therapy",
    description: "Transformative therapy that naturally reverts grey hair while restoring shine and improving scalp health.",
    duration: "60 minutes",
    price: "$1,700 MXN",
    calendlyUrl: "https://calendly.com/kumarann-umich/mind-scalp-therapy-clone",
  },
];

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

// Styled pill CTA
function PillCTA({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'inline-block',
      background: '#fdf9f5',
      color: '#19934c',
      fontWeight: 600,
      fontSize: '1rem',
      borderRadius: '999px',
      padding: '7px 22px',
      letterSpacing: '0.01em',
      marginBottom: 18,
      boxShadow: '0 2px 12px rgba(27,77,62,0.08)',
      fontFamily: 'Inter, Arial, sans-serif',
      // marginTop: '2%' 
    }}>{children}</div>
  );
}

export default function BookMeCalendly() {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
  };

  return (
  
    <div style={{ width: '100%', minHeight: '100vh', background: '#fdf9f5', padding: '0 0 40px 0' }}>
      {/* Steps/Progress Bar Section */}
      <section style={{
        
        width: '100%',
        background: '#fdf9f5',
        minHeight: '30vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
  
      }}>
          <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      marginBottom: 0, 
      marginTop: '5%' 
    }}>
      <span style={{
        background: 'rgba(27,77,62,0.08)',
        color: theme.primary,
        fontWeight: 600,
        fontSize: '1rem',
        borderRadius: 999,
        padding: '8px 24px',
        letterSpacing: '0.04em',
        fontFamily: 'Inter, Arial, sans-serif',
        display: 'inline-block',
      }}>
       Schedule your wellness 
      </span>
      </div>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '2.5rem', marginBottom: 10, color: '#1B4D3E' }}>
            Book with us
          </h1>
          <p style={{
          fontSize: '1.2rem',
          color: 'black',
          maxWidth: 700,
          margin: '0 auto 40px',
          fontFamily: 'Inter, Arial, sans-serif',
          lineHeight: 1.6,
        }}>
         Select a service and choose any add ons, a provider will reach out to you upon confirmation. <span style={{textDecoration: 'underline'}}>Add ons can be added after selecting a time.</span>
        </p>
          {/* Progress Bar with Steps */}
          {/* <div style={{ width: '100%', maxWidth: 700, margin: '0 auto 24px auto' }}>
          
            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: 24 }}>
              {[1, 2, 3].map((num) => (
                <div key={num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 120 }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: '#f8fff9',
                    border: '2px solid #19934c',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: '#19934c',
                    marginBottom: 8,
                  }}>{num}</div>
                </div>
              ))}
            </div>
            {/* Captions *
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 0 10 10', gap: '48px' }}>
              <div style={{ width: '33.33%', textAlign: 'center', fontSize: '1rem', color: '#222' }}>
                Select service
              </div>
              <div style={{ width: '33.33%', textAlign: 'center', fontSize: '1rem', color: '#222' }}>
                Choose time
              </div>
              <div style={{ width: '40.33%', textAlign: 'center', fontSize: '1rem', color: '#222' }}>
                Confirm booking
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Booking UI Section */}
      <section style={{ width: '100%', background: '#fdf9f5', padding: '32px 32px 32px 32px' }}>
        <div className={styles.root} style={{
          width: '100%',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 32 : 48,
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          padding: '32px 0px 32px  32px',
          marginTop: '0px'
        }}>
          {/* Left Column - Services */}
    
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 320, maxWidth: 540 }}>
              
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 800,
              fontSize: '2.1rem', // smaller
              color: '#1B4D3E',
              marginBottom: 8,
              letterSpacing: '-1px',
              lineHeight: 1.1,
            }}>
         1. Choose a Treatment
            </h1>
            <div style={{
              fontSize: '1rem', // smaller
              color: '#2A6B57',
              marginBottom: 20,
              fontWeight: 400,
              maxWidth: 480,
              lineHeight: 1.45,
            }}>
              Select one of our signature therapies below to begin your booking. Each session includes a customized care routine and optional enhancements.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {services.map((service) => (
                <ServiceTile
                  key={service.id}
                  service={service}
                  isSelected={selectedService?.id === service.id}
                  onSelect={() => handleServiceSelect(service)}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Calendly Widget */}
          <div style={{
            flex: 1,
            height: '100%',
             background: 'white',

            transition: 'none',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: selectedService ? 'flex-start' : 'center',
            alignItems: 'center',
            boxShadow: '0 8px 32px rgba(27,77,62,0.08)',
            clipPath: 'inset(10px 10px 10px 10px)',
            alignSelf: 'flex-start',
            width: '95%',
            borderRadius: '20px',
            minWidth: 0,
            minHeight: 700,
          }}>
            {selectedService ? (
              <div style={{
                height: '100%',
                animation: 'fadeIn 0.5s ease-out',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
              }}>
                <div style={{
                  flex: 1,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <CalendlyBooking
                    calendlyUrl={selectedService.calendlyUrl}
                    onBookingComplete={() => {}}
                  />
                </div>
              </div>
            ) : (
              <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    margin: '0 auto 16px',
                    background: 'rgba(27, 77, 62, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {/* Loading Spinner */}
                    <svg style={{ width: '32px', height: '32px', color: '#1B4D3E', animation: 'spin 1s linear infinite' }} viewBox="0 0 50 50">
                      <circle cx="25" cy="25" r="20" fill="none" stroke="#1B4D3E" strokeWidth="5" strokeDasharray="31.4 31.4" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 500,
                    color: '#111',
                    marginBottom: '8px',
                  }}>
                    2. Please select a service to choose a time
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                  }}>
                    Once you select a service, you can pick your preferred time slot.
                  </p>
                </div>
                {/* Spinner animation CSS */}
                <style>{`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}</style>
              </div>
            )}
          </div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 1400px) {
            .${styles.root} > div > div {
              max-width: 100vw !important;
            }
          }
          @media (max-width: 1200px) {
            .${styles.root} > div > div {
              flex-direction: column !important;
              gap: 32px !important;
            }
          }
          @media (max-width: 1024px) {
            .${styles.root} > div > div {
              flex-direction: column !important;
              gap: 32px !important;
            }
            .${styles.root} > div > div > div:first-child h1 {
              font-size: 2.2rem !important;
              margin-bottom: 24px !important;
            }
          }

          @media (max-width: 768px) {
            .${styles.root} > div {
              padding: 24px 8px !important;
            }
            .${styles.root} > div > div > div:first-child h1 {
              font-size: 1.5rem !important;
              margin-bottom: 18px !important;
            }
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
}

function ServiceTile({ service, isSelected, onSelect }: ServiceTileProps) {
  return (
    <div
      style={{
        position: 'relative',
        padding: '16px 18px 14px 18px', // smaller padding
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <h3 style={{
            fontSize: '1.05rem', // smaller
            fontWeight: 700,
            color: isSelected ? '#1B4D3E' : '#111',
            marginBottom: '6px',
            transition: 'color 0.2s',
            fontFamily: 'Playfair Display, serif',
          }}>
            {service.title}
          </h3>
          <p style={{
            color: '#6b7280',
            marginTop: '6px',
            lineHeight: '1.5',
            fontSize: '0.93rem', // smaller
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
            gap: '10px', // smaller
            fontSize: '0.97rem', // smaller
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
              {service.duration}
            </span>
            <span style={{
              fontSize: '1.01rem', // smaller
              fontWeight: 700,
              color: '#1B4D3E',
            }}>
              {service.price}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            style={{
              padding: '8px 22px', // smaller
              borderRadius: '999px',
              fontWeight: 700,
              fontFamily: 'Inter, Arial, sans-serif',
              fontSize: '0.98rem', // smaller
              background: isSelected ? '#800020' : '#19934c',
              color: '#fff',
              border: 'none',
              boxShadow: '0 2px 8px rgba(27, 77, 62, 0.13)',
              cursor: 'pointer',
              transition: 'all 0.18s',
              outline: 'none',
              minWidth: 90,
              willChange: 'transform, box-shadow',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.background = isSelected ? '#a8324a' : '#17603a';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(27, 77, 62, 0.18)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = isSelected ? '#800020' : '#19934c';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(27, 77, 62, 0.13)';
            }}
          >
            {isSelected ? "Selected" : <><span>Book Now</span><svg style={{ width: '18px', height: '18px', marginLeft: 8, verticalAlign: 'middle' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></>}
          </button>
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
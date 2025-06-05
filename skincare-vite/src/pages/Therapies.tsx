import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Therapies() {
  const { t, i18n } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);
  const [showPromotions, setShowPromotions] = useState(false);
  const promotionsRef = useRef<HTMLDivElement>(null);

  // Enhanced therapies data with more details for expanded view
  const therapies = [
    {
      id: 1,
      title: t('service_mind_scalp_title'),
      shortDescription: t('service_mind_scalp_desc'),
      longDescription: 'This signature therapy combines traditional scalp massage techniques with modern relaxation methods to restore scalp health and promote mental calm. Each session is personalized to address your specific needs and concerns.',
      duration: '45 min',
      price: '$1,200 MXN',
      icon: '✨',
      benefits: [
        'Reduces stress and anxiety',
        'Improves scalp circulation',
        'Promotes deeper sleep',
        'Relieves tension headaches'
      ]
    },
    {
      id: 2,
      title: t('service_hair_growth_title'),
      shortDescription: t('service_hair_growth_desc'),
      longDescription: 'Our specialized hair growth therapy uses clinically-proven techniques to stimulate follicle activity, improve density, and reduce hair loss. We combine manual stimulation with premium natural products for optimal results.',
      duration: '45 min',
      price: '$1,700 MXN',
      icon: '🌱',
      benefits: [
        'Stimulates dormant hair follicles',
        'Strengthens existing hair',
        'Reduces hair thinning',
        'Improves scalp health'
      ]
    },
    {
      id: 3,
      title: t('service_hair_rejuvenation_title'),
      shortDescription: t('service_hair_rejuvenation_desc'),
      longDescription: 'This intensive treatment targets aging, damaged, or stressed hair to restore vitality, shine, and strength. We use a combination of nutrient-rich formulations and specialized massage techniques to transform hair texture and appearance.',
      duration: '45 min',
      price: '$1,700 MXN',
      icon: '✨',
      benefits: [
        'Reverts grey hair to natural color',
        'Restores natural shine',
        'Improves scalp health',
        'Improves hair elasticity'
      ]
    },
    {
      id: 4,
      title: t('service_gong_therapy_title'),
      shortDescription: t('service_gong_therapy_desc'),
      longDescription: 'Experience profound relaxation through sound therapy. This unique session uses specific frequency patterns to activate your body\'s natural rest response while promoting emotional clarity and mental balance.',
      duration: '15 min',
      price: '$250 MXN',
      icon: '🔊',
      benefits: [
        'Deepens meditation practice',
        'Releases emotional blockages',
        'Enhances cognitive clarity',
        'Promotes deep relaxation'
      ]
    },
    {
      id: 5,
      title: t('service_hair_styling_title'),
      shortDescription: t('service_hair_styling_desc'),
      longDescription: 'Professional hair styling service offering both straightening and curly styles with premium hair cream. Note: For hair longer than shoulders, please check with our staff before booking.',
      duration: '20 min',
      price: '$200 MXN',
      icon: '💇',
      benefits: [
        'Straightened (Planchado)',
        'Curly with hair cream (Quebrado con crema para peinar)',
        'Professional styling',
        'Premium hair products'
      ]
    }
  ];

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const scrollToPromotions = () => {
    setShowPromotions(true);
    promotionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Responsive grid style for services
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;
  const serviceGridStyle = isMobile
    ? { display: 'flex', flexDirection: 'column' as 'column', gap: '18px' }
    : { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'white',
        fontFamily: 'Inter, Arial, sans-serif',
      }}
    >
      {/* Header Section */}
      <section style={{
        background: 'none',
        padding: '80px 24px 32px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <h1 style={{
            fontFamily: 'Inter, Arial, sans-serif',
            fontWeight: 700,
            fontSize: '3rem',
            color: '#111',
            marginBottom: '24px',
            letterSpacing: '-0.01em',
          }}>
            {t('therapies_title')}
          </h1>
          <div style={{
            width: '60px',
            height: '4px',
            background: '#19934c',
            margin: '0 auto 32px',
            borderRadius: '2px',
          }}></div>
          <p style={{
            fontSize: '1.18rem',
            lineHeight: 1.6,
            color: '#222',
            marginBottom: '0',
            fontWeight: 400,
          }}>
            {t('therapies_subtitle')}
          </p>
        </div>
      </section>

      {/* Toggle all details button - now centered below hero section */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        margin: '0 auto 32px auto',
        width: '100%',
        maxWidth: '1200px',
      }}>
        <button
          style={{
            background: 'rgba(255,255,255,0.92)',
            border: '1px solid rgba(34,197,94,0.2)',
            borderRadius: '8px',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#333',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = 'rgba(34,197,94,0.08)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.92)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          onClick={toggleDetails}
        >
          {showDetails ? t('therapies_hideAllDetails') : t('therapies_showAllDetails')}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {showDetails ? (
              <path d="M18 15L12 9L6 15" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            ) : (
              <path d="M6 9L12 15L18 9" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            )}
          </svg>
        </button>

        <button
          style={{
            background: 'rgba(255,255,255,0.92)',
            border: '1px solid rgba(34,197,94,0.2)',
            borderRadius: '8px',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#333',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = 'rgba(34,197,94,0.08)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.92)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          onClick={scrollToPromotions}
        >
          {t('therapies_promotions')}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#333" strokeWidth="2"/>
            <path d="M12 6V12L16 14" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Services Grid Section */}
      <section style={{
        padding: '0 24px 80px 24px',
        background: 'none',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}>
          {/* Top row - 3 cards */}
          <div style={serviceGridStyle}>
            {therapies.slice(0, 3).map((therapy) => (
              <div
                key={therapy.id}
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  borderRadius: '16px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                  padding: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  fontFamily: 'Inter, Arial, sans-serif',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  position: 'relative',
                  height: 'auto',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.06)';
                }}
              >
                {/* Card content */}
                <div style={{
                  height: '8px',
                  width: '100%',
                  background: '#19934c',
                  position: 'relative',
                }} />
                
                <div style={{
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  flex: 1,
                }}>
                  <h3 style={{ 
                    fontWeight: 700, 
                    fontSize: '1.35rem', 
                    marginBottom: '14px',
                    marginTop: 0,
                    color: '#111'
                  }}>
                    {therapy.title}
                  </h3>
                  
                  <p style={{ 
                    color: '#555', 
                    fontSize: '1.05rem', 
                    lineHeight: '1.6',
                    margin: '0 0 24px 0',
                    flex: '1',
                  }}>
                    {therapy.shortDescription}
                  </p>
                  
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    margin: '0 0 12px 0',
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" 
                          stroke="#19934c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.71 15.18L12.61 13.33C12.07 13.01 11.63 12.24 11.63 11.61V7.51" 
                          stroke="#19934c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span style={{ 
                        fontWeight: 600, 
                        color: '#444',
                        fontSize: '0.95rem',
                      }}>
                        {therapy.duration}
                      </span>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                          stroke="#19934c" strokeWidth="1.5"/>
                        <path d="M15 8.5H9" stroke="#19934c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.5 11.5H8.5" stroke="#19934c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15 14.5H9" stroke="#19934c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span style={{ 
                        fontWeight: 700, 
                        color: '#19934c',
                        fontSize: '1.1rem',
                      }}>
                        {therapy.price}
                      </span>
                    </div>
                  </div>
                  
                  <div 
                    style={{ 
                      height: showDetails ? 'auto' : '0',
                      overflow: 'hidden',
                      transition: 'height 0.3s ease, opacity 0.3s ease',
                      opacity: showDetails ? 1 : 0,
                      marginBottom: showDetails ? '16px' : '0',
                    }}
                  >
                    <div style={{
                      marginTop: '24px',
                      padding: '16px',
                      background: 'rgba(34,197,94,0.03)',
                      borderRadius: '8px',
                    }}>
                      <div style={{
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        color: '#333',
                        marginBottom: '10px',
                      }}>
                        {t('therapies_benefits')}:
                      </div>
                      <ul style={{
                        margin: '0',
                        padding: '0 0 0 18px',
                        listStyle: 'disc outside',
                        color: '#555',
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                      }}>
                        {therapy.benefits.map((benefit, i) => (
                          <li key={i} style={{ marginBottom: '6px' }}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  padding: '24px 28px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid rgba(0,0,0,0.05)',
                  background: 'rgba(255,255,255,0.95)',
                }}>
                  <Link 
                    to={`/book?service=${therapy.id}`}
                    style={{
                      background: '#19934c',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px 24px',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      fontFamily: 'Inter, Arial, sans-serif',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(34,197,94,0.2)',
                      transition: 'all 0.2s ease',
                      textDecoration: 'none',
                      display: 'inline-block',
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.background = '#16a34a';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(34,197,94,0.3)';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.background = '#19934c';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(34,197,94,0.2)';
                    }}
                  >
                    {t('therapies_bookThisTherapy')}
                  </Link>
                  
                  <button 
                    style={{
                      background: 'transparent',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px',
                      cursor: 'pointer',
                      borderRadius: '50%',
                      color: '#666',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDetails();
                    }}
                  >
                    {showDetails ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 15L12 9L6 15" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom row - 2 centered cards */}
          <div style={isMobile ? { display: 'flex', flexDirection: 'column' as 'column', gap: '18px' } : { display: 'flex', justifyContent: 'center', gap: '32px' }}>
            {therapies.slice(3, 5).map((therapy) => (
              <div
                key={therapy.id}
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  borderRadius: '16px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                  padding: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  fontFamily: 'Inter, Arial, sans-serif',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  position: 'relative',
                  height: 'auto',
                  ...(isMobile ? {} : { width: 'calc(33.333% - 22px)' }),
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.06)';
                }}
              >
                {/* Card content */}
                <div style={{
                  height: '8px',
                  width: '100%',
                  background: '#19934c',
                  position: 'relative',
                }} />
                
                <div style={{
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  flex: 1,
                }}>
                  <h3 style={{ 
                    fontWeight: 700, 
                    fontSize: '1.35rem', 
                    marginBottom: '14px',
                    marginTop: 0,
                    color: '#111'
                  }}>
                    {therapy.title}
                  </h3>
                  
                  <p style={{ 
                    color: '#555', 
                    fontSize: '1.05rem', 
                    lineHeight: '1.6',
                    margin: '0 0 24px 0',
                    flex: '1',
                  }}>
                    {therapy.shortDescription}
                  </p>
                  
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    margin: '0 0 12px 0',
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" 
                          stroke="#19934c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.71 15.18L12.61 13.33C12.07 13.01 11.63 12.24 11.63 11.61V7.51" 
                          stroke="#19934c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span style={{ 
                        fontWeight: 600, 
                        color: '#444',
                        fontSize: '0.95rem',
                      }}>
                        {therapy.duration}
                      </span>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                          stroke="#19934c" strokeWidth="1.5"/>
                        <path d="M15 8.5H9" stroke="#19934c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.5 11.5H8.5" stroke="#19934c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15 14.5H9" stroke="#19934c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span style={{ 
                        fontWeight: 700, 
                        color: '#19934c',
                        fontSize: '1.1rem',
                      }}>
                        {therapy.price}
                      </span>
                    </div>
                  </div>
                  
                  <div 
                    style={{ 
                      height: showDetails ? 'auto' : '0',
                      overflow: 'hidden',
                      transition: 'height 0.3s ease, opacity 0.3s ease',
                      opacity: showDetails ? 1 : 0,
                      marginBottom: showDetails ? '16px' : '0',
                    }}
                  >
                    <div style={{
                      marginTop: '24px',
                      padding: '16px',
                      background: 'rgba(34,197,94,0.03)',
                      borderRadius: '8px',
                    }}>
                      <div style={{
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        color: '#333',
                        marginBottom: '10px',
                      }}>
                        {t('therapies_benefits')}:
                      </div>
                      <ul style={{
                        margin: '0',
                        padding: '0 0 0 18px',
                        listStyle: 'disc outside',
                        color: '#555',
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                      }}>
                        {therapy.benefits.map((benefit, i) => (
                          <li key={i} style={{ marginBottom: '6px' }}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  padding: '24px 28px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid rgba(0,0,0,0.05)',
                  background: 'rgba(255,255,255,0.95)',
                }}>
                  <Link 
                    to={`/book?service=${therapy.id}`}
                    style={{
                      background: '#19934c',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px 24px',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      fontFamily: 'Inter, Arial, sans-serif',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(34,197,94,0.2)',
                      transition: 'all 0.2s ease',
                      textDecoration: 'none',
                      display: 'inline-block',
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.background = '#16a34a';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(34,197,94,0.3)';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.background = '#19934c';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(34,197,94,0.2)';
                    }}
                  >
                    {t('therapies_bookThisTherapy')}
                  </Link>
                  
                  <button 
                    style={{
                      background: 'transparent',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px',
                      cursor: 'pointer',
                      borderRadius: '50%',
                      color: '#666',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDetails();
                    }}
                  >
                    {showDetails ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 15L12 9L6 15" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section 
        ref={promotionsRef}
        style={{
          padding: '80px 24px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div style={{
          background: 'rgba(255,255,255,0.92)',
          borderRadius: '22px',
          boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
          padding: '48px',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#111',
            marginBottom: '24px',
          }}>
            {t('therapies_currentPromotions')}
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            marginTop: '40px',
          }}>
            {/* Promotion 1 */}
            <div style={{
              background: 'rgba(34,197,94,0.05)',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'left',
              border: '1px solid rgba(34,197,94,0.1)',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'rgba(34,197,94,0.1)',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#19934c" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="#19934c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 600,
                color: '#111',
                marginBottom: '12px',
              }}>
                {t('therapies_firstVisitPromo')}
              </h3>
              <p style={{
                fontSize: '1.05rem',
                color: '#444',
                marginBottom: '20px',
                lineHeight: 1.6,
              }}>
                {t('therapies_firstVisitPromoDesc')}
              </p>
              <div style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#19934c',
              }}>
                20% OFF
              </div>
            </div>

            {/* Promotion 2 */}
            <div style={{
              background: 'rgba(34,197,94,0.05)',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'left',
              border: '1px solid rgba(34,197,94,0.1)',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'rgba(34,197,94,0.1)',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#19934c" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="#19934c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 600,
                color: '#111',
                marginBottom: '12px',
              }}>
                {t('therapies_packagePromo')}
              </h3>
              <p style={{
                fontSize: '1.05rem',
                color: '#444',
                marginBottom: '20px',
                lineHeight: 1.6,
              }}>
                {t('therapies_packagePromoDesc')}
              </p>
              <div style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#19934c',
              }}>
                15% OFF
              </div>
            </div>

            {/* Promotion 3 */}
            <div style={{
              background: 'rgba(34,197,94,0.05)',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'left',
              border: '1px solid rgba(34,197,94,0.1)',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'rgba(34,197,94,0.1)',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#19934c" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="#19934c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 600,
                color: '#111',
                marginBottom: '12px',
              }}>
                {t('therapies_referralPromo')}
              </h3>
              <p style={{
                fontSize: '1.05rem',
                color: '#444',
                marginBottom: '20px',
                lineHeight: 1.6,
              }}>
                {t('therapies_referralPromoDesc')}
              </p>
              <div style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#19934c',
              }}>
                $500 MXN OFF
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
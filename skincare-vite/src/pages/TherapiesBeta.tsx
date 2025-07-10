import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { Link } from 'react-router-dom';

export default function TherapiesBeta() {
  const { t, i18n } = useTranslation();
  const [selectedTherapy, setSelectedTherapy] = useState<any | null>(null);
  const [showPromotions, setShowPromotions] = useState(false);
  const promotionsRef = useRef<HTMLDivElement>(null);

  // Main therapies - core services
  const mainTherapies = [
    {
      id: 1,
      titleKey: 'service_mind_title',
      descriptionKey: 'service_mind_description',
      durationKey: 'service_mind_duration',
      priceKey: 'service_mind_price',
      benefitsKey: 'service_mind_benefits',
      icon: '✨'
    },
    {
      id: 2,
      titleKey: 'service_growth_title',
      descriptionKey: 'service_growth_description',
      durationKey: 'service_growth_duration',
      priceKey: 'service_growth_price',
      benefitsKey: 'service_growth_benefits',
      icon: '🌱'
    },
    {
      id: 3,
      titleKey: 'service_rejuvenation_title',
      descriptionKey: 'service_rejuvenation_description',
      durationKey: 'service_rejuvenation_duration',
      priceKey: 'service_rejuvenation_price',
      benefitsKey: 'service_rejuvenation_benefits',
      icon: '✨'
    }
  ];

  // Add-on services - optional enhancements
  const addonTherapies = [
    {
      id: 4,
      titleKey: 'addon_gong_title',
      descriptionKey: 'addon_gong_description',
      durationKey: 'addon_gong_duration',
      priceKey: 'addon_gong_price',
      benefitsKey: 'addon_gong_benefits',
      icon: '🔊'
    },
    {
      id: 5,
      titleKey: 'addon_styling_title',
      descriptionKey: 'addon_styling_description',
      durationKey: 'addon_styling_duration',
      priceKey: 'addon_styling_price',
      benefitsKey: 'addon_styling_benefits',
      noteKey: 'addon_styling_note',
      icon: '💇'
    }
  ];

  // Combine all therapies for easier lookup
  const allTherapies = [...mainTherapies, ...addonTherapies];

  const handleOpenModal = (therapy: any) => {
    setSelectedTherapy(therapy);
  };

  const handleCloseModal = () => {
    setSelectedTherapy(null);
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
            {t('therapies_title') || 'Our Signature Therapies'}
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
            {t('therapies_subtitle') || 'Each session is designed and delivered by MTM Certified Therapists.'}
          </p>
          <div style={{
            marginTop: '32px',
            padding: '16px',
            background: 'rgba(25, 147, 76, 0.05)',
            borderRadius: '8px',
            border: '1px solid rgba(25, 147, 76, 0.1)',
            color: '#19934c',
            fontSize: '1rem',
            fontWeight: 500
          }}>
            {t('therapies_wellness_note')}
          </div>
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
          gap: '48px',
        }}>
          {/* Main Therapies Section */}
          <div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 600,
              color: '#111',
              marginBottom: '32px',
              textAlign: 'center',
            }}>
              Core Therapies
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#666',
              textAlign: 'center',
              marginBottom: '32px',
              maxWidth: '600px',
              margin: '0 auto 32px auto',
            }}>
              Choose from our signature therapies designed to address your specific wellness needs
            </p>
            
            <div style={serviceGridStyle}>
              {mainTherapies.map((therapy) => {
                const descriptionText = t(therapy.descriptionKey);
                const isListFormat = descriptionText.trim().startsWith('-');

                return (
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
                        fontSize: '1.2rem', 
                        marginBottom: '14px',
                        marginTop: 0,
                        color: '#111'
                      }}>
                        {t(therapy.titleKey)}
                      </h3>
                      
                      {isListFormat ? (
                        <ul style={{ paddingLeft: '20px', margin: '0 0 24px 0', color: '#555', fontSize: '1.05rem', lineHeight: '1.6', flex: 1, textAlign: 'left' }}>
                          {descriptionText.split('\n').map((item, index) => (
                            <li key={index} style={{ marginBottom: '8px' }}>{item.replace(/^-/, '').trim()}</li>
                          ))}
                        </ul>
                      ) : (
                        <p style={{
                          color: '#555',
                          fontSize: '1.05rem',
                          lineHeight: '1.6',
                          margin: '0 0 24px 0',
                          flex: 1
                        }}>
                          {descriptionText}
                        </p>
                      )}
                      
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
                            {t(therapy.durationKey)}
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
                            {t(therapy.priceKey)}
                          </span>
                        </div>
                      </div>
                      
                      <div 
                        style={{ 
                          height: selectedTherapy === therapy ? 'auto' : '0',
                          overflow: 'hidden',
                          transition: 'height 0.3s ease, opacity 0.3s ease',
                          opacity: selectedTherapy === therapy ? 1 : 0,
                          marginBottom: selectedTherapy === therapy ? '16px' : '0',
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
                            {t('therapies_keyBenefits')}:
                          </div>
                          <ul style={{
                            margin: '0',
                            padding: '0 0 0 18px',
                            listStyle: 'disc outside',
                            color: '#555',
                            fontSize: '0.95rem',
                            lineHeight: 1.6,
                          }}>
                            {therapy.benefitsKey && Array.isArray(t(therapy.benefitsKey, { returnObjects: true })) && (t(therapy.benefitsKey, { returnObjects: true }) as string[]).map((benefit: string, i) => (
                              <li key={i} style={{ marginBottom: '6px' }}>{benefit}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{
                      padding: '24px 28px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'stretch',
                      gap: '12px',
                      marginTop: 'auto',
                      paddingTop: '20px'
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
                          textAlign: 'center',
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
                        onClick={() => handleOpenModal(therapy)}
                        style={{
                          background: 'transparent',
                          border: '1px solid #ddd',
                          color: '#333',
                          borderRadius: '8px',
                          padding: '12px 18px',
                          fontSize: '0.95rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                         onMouseOver={e => {
                          e.currentTarget.style.background = '#f8f8f8';
                          e.currentTarget.style.borderColor = '#ccc';
                        }}
                        onMouseOut={e => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.borderColor = '#ddd';
                        }}
                      >
                        {t('common_learnMore')}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add-on Services Section */}
          <div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 600,
              color: '#111',
              marginBottom: '32px',
              textAlign: 'center',
            }}>
              {t('therapies_addons_title')}
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#666',
              textAlign: 'center',
              marginBottom: '32px',
              maxWidth: '600px',
              margin: '0 auto 32px auto',
            }}>
              Enhance your experience with these complementary services
            </p>
            
            <div style={isMobile ? { display: 'flex', flexDirection: 'column' as 'column', gap: '18px' } : { display: 'flex', justifyContent: 'center', gap: '32px' }}>
              {addonTherapies.map((therapy) => {
                const descriptionText = t(therapy.descriptionKey);
                const isListFormat = descriptionText.trim().startsWith('-');

                return (
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
                        fontSize: '1.2rem', 
                        marginBottom: '14px',
                        marginTop: 0,
                        color: '#111'
                      }}>
                        {t(therapy.titleKey)}
                      </h3>
                      
                      {isListFormat ? (
                        <ul style={{ paddingLeft: '20px', margin: '0 0 24px 0', color: '#555', fontSize: '1.05rem', lineHeight: '1.6', flex: 1, textAlign: 'left' }}>
                          {descriptionText.split('\n').map((item, index) => (
                            <li key={index} style={{ marginBottom: '8px' }}>{item.replace(/^-/, '').trim()}</li>
                          ))}
                        </ul>
                      ) : (
                        <p style={{
                          color: '#555',
                          fontSize: '1.05rem',
                          lineHeight: '1.6',
                          margin: '0 0 24px 0',
                          flex: 1
                        }}>
                          {descriptionText}
                        </p>
                      )}

                      {therapy.noteKey && (
                        <p style={{ fontSize: '0.9rem', color: '#777', fontStyle: 'italic', marginTop: '-16px', marginBottom: '16px' }}>
                          {t(therapy.noteKey)}
                        </p>
                      )}
                      
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
                            {t(therapy.durationKey)}
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
                            {t(therapy.priceKey)}
                          </span>
                        </div>
                      </div>
                      
                      <div 
                        style={{ 
                          height: selectedTherapy === therapy ? 'auto' : '0',
                          overflow: 'hidden',
                          transition: 'height 0.3s ease, opacity 0.3s ease',
                          opacity: selectedTherapy === therapy ? 1 : 0,
                          marginBottom: selectedTherapy === therapy ? '16px' : '0',
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
                            {therapy.benefitsKey && Array.isArray(t(therapy.benefitsKey, { returnObjects: true })) && (t(therapy.benefitsKey, { returnObjects: true }) as string[]).map((benefit: string, i: number) => (
                              <li key={i} style={{ marginBottom: '6px' }}>{benefit}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{
                      padding: '24px 28px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'stretch',
                      gap: '12px',
                      marginTop: 'auto',
                      paddingTop: '20px'
                    }}>
                      <Link 
                        to={`/book?addon=${therapy.id}`}
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
                          textAlign: 'center',
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
                        Add to Booking
                      </Link>
                       <button 
                        onClick={() => handleOpenModal(therapy)}
                         style={{
                          background: 'transparent',
                          border: '1px solid #ddd',
                          color: '#333',
                          borderRadius: '8px',
                          padding: '12px 18px',
                          fontSize: '0.95rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                         onMouseOver={e => {
                          e.currentTarget.style.background = '#f8f8f8';
                          e.currentTarget.style.borderColor = '#ccc';
                        }}
                        onMouseOut={e => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.borderColor = '#ddd';
                        }}
                      >
                        {t('common_learnMore')}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
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
          
          <div className="promotions" style={{
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

      {/* Modal for therapy details */}
      {selectedTherapy && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1001,
          backdropFilter: 'blur(5px)'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            width: '90%',
            maxWidth: '600px',
            padding: '32px',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <button
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#888'
              }}
            >
              &times;
            </button>
            
            <h2 style={{ marginTop: 0, fontSize: '2rem', color: '#111' }}>{t(selectedTherapy.titleKey)}</h2>
            
            <div style={{ display: 'flex', gap: '16px', margin: '24px 0', color: '#555' }}>
              <span>{t(selectedTherapy.durationKey)}</span>
              <span>|</span>
              <span style={{ fontWeight: 600, color: '#19934c' }}>{t(selectedTherapy.priceKey)}</span>
            </div>
            
            <p style={{ whiteSpace: 'pre-line', lineHeight: 1.6, color: '#444' }}>
              {t(selectedTherapy.descriptionKey)}
            </p>

            {selectedTherapy.noteKey && (
              <p style={{ marginTop: '16px', fontSize: '0.9rem', color: '#777', fontStyle: 'italic' }}>
                {t(selectedTherapy.noteKey)}
              </p>
            )}
            
            <h4 style={{ marginTop: '32px', marginBottom: '16px', fontSize: '1.1rem', color: '#333' }}>
              Key Benefits
            </h4>
            <ul style={{ paddingLeft: '20px', color: '#555', listStyleType: 'disc' }}>
              {selectedTherapy.benefitsKey && Array.isArray(t(selectedTherapy.benefitsKey, { returnObjects: true })) && (t(selectedTherapy.benefitsKey, { returnObjects: true }) as string[]).map((benefit: string, index: number) => (
                <li key={index} style={{ marginBottom: '8px' }}>{benefit}</li>
              ))}
            </ul>
            
            <Link 
              to={`/book?service=${selectedTherapy.id}`}
              style={{
                display: 'inline-block',
                marginTop: '32px',
                background: '#19934c',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              Book This Therapy
            </Link>
          </div>
        </div>
      )}
    </div>
  );
} 
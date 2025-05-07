import { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import i18n from '../i18n';
import React from 'react';

// Enhanced therapies data with more details for expanded view
const therapies = [
  {
    id: 1,
    title: 'Mind & Scalp Health and Relaxation',
    shortDescription: 'Deep relaxation therapy combining ancient and modern techniques.',
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
    title: 'Hair Growth & Preservation Therapy',
    shortDescription: 'Treatment focused on stimulating hair growth and reducing loss.',
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
    title: 'Hair Rejuvenation Therapy',
    shortDescription: 'Revitalizes aging or damaged hair, improving texture and shine.',
    longDescription: 'This intensive treatment targets aging, damaged, or stressed hair to restore vitality, shine, and strength. We use a combination of nutrient-rich formulations and specialized massage techniques to transform hair texture and appearance.',
    duration: '45 min',
    price: '$1,700 MXN',
    icon: '✨',
    benefits: [
      'Restores natural shine',
      'Improves hair elasticity',
      'Repairs damaged cuticles',
      'Balances scalp oils'
    ]
  },
  {
    id: 4,
    title: 'Elevated Mind Relaxation "Gong" Therapy',
    shortDescription: 'A sound healing session using frequencies for emotional clarity.',
    longDescription: 'Experience profound relaxation through sound therapy. This unique session uses specific frequency patterns to activate your body\'s natural rest response while promoting emotional clarity and mental balance.',
    duration: '60 min',
    price: '$1,700 (solo), $1,700 pp (couple), $2,000 (enhanced)',
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
    title: 'Post-Therapy Rejuvenation',
    shortDescription: 'Tea and relaxation ritual after therapy to extend the experience.',
    longDescription: 'Extend your wellness journey with our post-therapy rejuvenation ritual. Enjoy artisanal teas selected for their healing properties while relaxing in our tranquil space, allowing the benefits of your therapy to fully integrate.',
    duration: '30 min',
    price: '$500 MXN',
    icon: '🍵',
    benefits: [
      'Extends therapy benefits',
      'Hydrates and detoxifies',
      'Supports mind-body integration',
      'Completes the wellness experience'
    ]
  },
  {
    id: 6,
    title: 'Customized Wellness Experience',
    shortDescription: 'Personalized combination of therapies tailored to your needs.',
    longDescription: 'Our expert therapists will work with you to create a completely personalized wellness experience, combining elements from our signature therapies to address your specific concerns and wellness goals.',
    duration: '75-90 min',
    price: '$2,200 MXN',
    icon: '🌿',
    benefits: [
      'Tailored to your specific needs',
      'Addresses multiple concerns',
      'Combines best techniques',
      'Maximizes therapeutic benefits'
    ]
  }
];

export default function Therapies() {
  const { lang } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'hsla(0,100%,50%,1)',
        backgroundImage: `
          radial-gradient(at 40% 20%, hsla(27,0%,100%,1) 0px, transparent 50%),
          radial-gradient(at 80% 0%, hsla(186,0%,100%,1) 0px, transparent 50%),
          radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%),
          radial-gradient(at 80% 50%, hsla(340,0%,100%,1) 0px, transparent 50%),
          radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%),
          radial-gradient(at 84% 62%, hsla(132,100%,70%,1) 0px, transparent 50%),
          radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%)`,
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
            {lang === 'en' ? 'Our Signature Therapies' : 'Nuestras Terapias Exclusivas'}
          </h1>
          <div style={{
            width: '60px',
            height: '4px',
            background: '#ec1c24',
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
            {lang === 'en'
              ? 'Each session is designed and delivered by MTM Certified Therapists to address your specific needs.'
              : 'Cada sesión es diseñada y entregada por Terapeutas Certificados MTM para atender sus necesidades específicas.'}
          </p>
        </div>
      </section>

      {/* Toggle all details button - now centered below hero section */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto 32px auto',
        width: '100%',
        maxWidth: '1200px',
      }}>
        <button
          style={{
            background: 'rgba(255,255,255,0.92)',
            border: '1px solid rgba(236,28,36,0.2)',
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
            e.currentTarget.style.background = 'rgba(236,28,36,0.08)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.92)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          onClick={toggleDetails}
        >
          {showDetails ? 'Hide Therapy Details' : 'Show All Therapy Details'}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {showDetails ? (
              <path d="M18 15L12 9L6 15" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            ) : (
              <path d="M6 9L12 15L18 9" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            )}
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
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '32px',
        }}>
          {therapies.map((therapy) => (
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
              {/* Top colored banner and checkmark */}
              <div style={{
                height: '8px',
                width: '100%',
                background: '#ec1c24',
                position: 'relative',
              }} />
              
              {/* Checkmark icon */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '24px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(236,28,36,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                    stroke="#ec1c24" strokeWidth="1.5" fillOpacity="0.1" fill="#ffeded" />
                  <path d="M8 12L11 15L16 9" 
                    stroke="#ec1c24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              {/* Card content */}
              <div style={{
                padding: '32px 28px 100px 28px', // Extra padding at bottom for button
                paddingTop: '40px', // Extra padding to accommodate checkmark
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}>
                {/* Title */}
                <h3 style={{ 
                  fontWeight: 700, 
                  fontSize: '1.35rem', 
                  marginBottom: '14px',
                  marginTop: 0,
                  color: '#111'
                }}>
                  {therapy.title}
                </h3>
                
                {/* Description */}
                <p style={{ 
                  color: '#555', 
                  fontSize: '1.05rem', 
                  lineHeight: '1.6',
                  margin: '0 0 24px 0',
                  flex: '1',
                }}>
                  {therapy.shortDescription}
                </p>
                
                {/* Duration and Price */}
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
                        stroke="#ec1c24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15.71 15.18L12.61 13.33C12.07 13.01 11.63 12.24 11.63 11.61V7.51" 
                        stroke="#ec1c24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                        stroke="#ec1c24" strokeWidth="1.5"/>
                      <path d="M15 8.5H9" stroke="#ec1c24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15.5 11.5H8.5" stroke="#ec1c24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 14.5H9" stroke="#ec1c24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ 
                      fontWeight: 700, 
                      color: '#ec1c24',
                      fontSize: '1.1rem',
                    }}>
                      {therapy.price}
                    </span>
                  </div>
                </div>
                
                {/* Benefits list - visible when showDetails is true */}
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
                    background: 'rgba(236,28,36,0.03)',
                    borderRadius: '8px',
                  }}>
                    <div style={{
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      color: '#333',
                      marginBottom: '10px',
                    }}>
                      Key Benefits:
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
              
              {/* Button container - absolute positioning */}
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
                <button
                  style={{
                    background: '#ec1c24',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    fontFamily: 'Inter, Arial, sans-serif',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(236,28,36,0.2)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.background = '#d81920';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(236,28,36,0.3)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.background = '#ec1c24';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(236,28,36,0.2)';
                  }}
                  onClick={e => { 
                    e.stopPropagation(); 
                    /* booking logic here */ 
                  }}
                >
                  {lang === 'en' ? 'Book This Therapy' : 'Reservar'}
                </button>
                
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
      </section>
    </div>
  );
} 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import OpeningBanner from '../components/OpeningBanner';
import CalendlyBooking from '../components/CalendlyBooking';
import RelaxationHeroCard from '../components/RelaxationHeroCard';

// Feature card data - now using translation keys
const featureCards = [
  {
    titleKey: 'landing_feature_massage_title',
    headingKey: 'landing_feature_massage_heading',
    descriptionKey: 'landing_feature_massage_description',
    buttonTextKey: 'landing_feature_massage_button',
    buttonLink: '/book',
    image: '/img4.jpeg'
  },
  {
    titleKey: 'landing_feature_facial_title',
    headingKey: 'landing_feature_facial_heading',
    descriptionKey: 'landing_feature_facial_description',
    buttonTextKey: 'landing_feature_facial_button',
    buttonLink: '/book',
    image: '/img5.jpeg'
  },
  {
    titleKey: 'landing_feature_offer_title',
    headingKey: 'landing_feature_offer_heading',
    descriptionKey: 'landing_feature_offer_description',
    buttonTextKey: 'landing_feature_offer_button',
    buttonLink: '/therapies/#promotions',
    image: '/chinese.jpeg'
  }
];

const galleryImages = [
  '/chinGong.jpeg',
  '/gonflower.jpeg',
  '/gongman.jpeg',
  '/hairhead.jpeg',
  '/img1.jpeg',
  '/img2.jpeg',
  '/img3.jpeg',
  '/img4.jpeg',
  '/img5.jpeg',
  '/img6.jpeg',
  '/img7.jpeg',
  '/chinese.jpeg'
];

// Define theme colors
const theme = {
  primary: '#1B4D3E', // Deep forest green
  secondary: '#0F3D1F', // Dark green (changed from gold)
  white: '#FFFFFF',
  lightGreen: '#2A6B57', // Lighter green for hover states
  cardBg: '#F8FFF9' // Very light green tint for cards
};

export default function Landing1() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [logoScale, setLogoScale] = useState(0.5); // Start with smaller scale
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);
  const [stackScale, setStackScale] = useState(1); // For click animation
  const totalSlides = featureCards.length;

  // Handle responsive behavior
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Handle initial logo animation
  useEffect(() => {
    // Start with smaller scale, then animate to normal size after a short delay
    const timer = setTimeout(() => {
      setLogoScale(1.0);
    }, 500); // Start growing after 500ms

    return () => clearTimeout(timer);
  }, []);

  const handleStackClick = () => {
    // 1. Trigger grow animation
    setStackScale(1.03); // Grow by 3%
    setTimeout(() => {
      setStackScale(1); // Return to normal size
    }, 150); // ms for animation

    // 2. Advance to the next image
    setCurrentGalleryImage(prev => (prev + 1) % galleryImages.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#fdf9f5',
      fontFamily: 'Nunito, Inter, Arial, sans-serif'
    }}>
      <OpeningBanner />
      {/* Hero Video Section */}
      <div style={{
        width: '100%',
        height: '110vh',
        position: 'relative',
        backgroundColor: theme.primary,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.white,
        textAlign: 'center',
        marginTop: '-80px',
        marginBottom: '0px',
        overflow: 'hidden',
        zIndex: 1
      }}>
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            top: 0,
            left: 0,
            zIndex: 1
          }}
        >
          <source src="/scalpcare.mp4" type="video/mp4" />
        </video>

        {/* Content overlay */}
        <div style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: '800px',
          padding: '0 20px'
        }}>
          {/* MTM Logo */}
          <div style={{
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <img 
              src="/logoNOBG.png" 
              alt="MTM Logo" 
              style={{
                height: '90px',
                width: 'auto',
                opacity: 0.9,
                transform: `scale(${logoScale})`,
                transition: 'transform 1.2s cubic-bezier(0.2, 0, 0.5, 1)'
              }}
            />
          </div>
          <div>
      {/* <RelaxationHeroCard
        backgroundImage={'/hairprods.jpg'}
        heading="Experience Relaxation Like Never Before"
        subtext="Join us today to book your perfect massage session and unwind in style."
        ctaText="Get Started"
        onCtaClick={() => alert("CTA Clicked!")}
      /> */}
    </div>
          <h1 style={{
            fontSize: isMobile ? '2.8rem' : '4.5rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            color: theme.white,
            textShadow: `2px 2px 4px rgba(0,0,0,0.2)`,
            lineHeight: 1.1
          }}>
            {t('landing_hero_title')}
          </h1>
          <p style={{
            fontSize: isMobile ? '1.2rem' : '1.5rem',
            marginBottom: '2.5rem',
            lineHeight: 1.6,
            maxWidth: '600px',
            margin: '0 auto 2rem',
            fontWeight: 300,
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            color: theme.white
          }}>
            {t('landing_hero_subtitle')}
          </p>
          <Link to="/book" style={{ textDecoration: 'none' }}>
            <button style={{
              backgroundColor: theme.primary,
              color: theme.white,
              border: 'none',
              padding: '16px 32px',
              borderRadius: '8px',
              fontSize: '1.2rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = theme.lightGreen;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = theme.primary;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              {t('landing_book_appointment')}
            </button>
          </Link>
        </div>
      </div>

      {/* Feature Cards Carousel Section */}
      <div style={{
        padding: isMobile ? '0 20px' : '0 40px',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
        marginTop: '-150px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative'
        }}>
          {/* Cards Container */}
          <div style={{
            display: 'flex',
            transition: 'transform 0.5s ease',
            transform: `translateX(${-currentSlide * (100 / 2)}%)`,
            gap: '24px',
            position: 'relative'
          }}>
            {featureCards.map((card, index) => (
              <div
                key={index}
                style={{
                  flex: '0 0 calc(50% - 12px)',
                  backgroundColor: theme.cardBg,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08), 0 4px 10px rgba(0, 0, 0, 0.04)',
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  height: '300px',
                  position: 'relative',
                  alignItems: 'center',
                  justifyContent: isMobile ? 'flex-start' : 'space-between',
                  border: `1px solid rgba(27, 77, 62, 0.1)`
                }}
              >
                {/* Text Content */}
                <div style={{
                  padding: isMobile ? '20px' : '48px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  flex: 1
                }}>
                  <h3 style={{
                    color: theme.secondary,
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    letterSpacing: '1px'
                  }}>
                    {t(card.titleKey)}
                  </h3>
                  <h2 style={{
                    color: theme.primary,
                    marginBottom: '0.75rem',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    lineHeight: 1.2
                  }}>
                    {t(card.headingKey)}
                  </h2>
                  <p style={{
                    color: '#555',
                    marginBottom: '1.5rem',
                    fontSize: '1rem',
                    lineHeight: 1.4
                  }}>
                    {t(card.descriptionKey)}
                  </p>
                  {card.buttonTextKey && (
                    <Link to={card.buttonLink} style={{ textDecoration: 'none' }}>
                      <button style={{
                        backgroundColor: theme.primary,
                        color: theme.white,
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = theme.lightGreen;
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = theme.primary;
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                      >
                        {t(card.buttonTextKey)}
                      </button>
                    </Link>
                  )}
                </div>

                {/* Image (Right Side) */}
                <div style={{
                  width: isMobile ? '100%' : '40%',
                  height: isMobile ? '160px' : '100%',
                  position: 'relative',
                  order: isMobile ? -1 : 2
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundImage: `url(${card.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            marginTop: '20px',
            position: 'relative'
          }}>
            <button
              onClick={prevSlide}
              style={{
                background: 'transparent',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.primary,
                fontSize: '14px'
              }}
            >
              ←
            </button>
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                style={{
                  width: '40px',
                  height: '4px',
                  border: 'none',
                  borderRadius: '2px',
                  background: currentSlide === index ? theme.secondary : '#E1E1E1',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'background-color 0.3s ease'
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
            <button
              onClick={nextSlide}
              style={{
                background: 'transparent',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.primary,
                fontSize: '14px'
              }}
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div style={{
        padding: isMobile ? '40px 20px' : '80px 40px',
        backgroundColor: '#fdf9f5',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
          gap: isMobile ? '40px' : '60px',
          alignItems: 'start'
        }}>
          {/* Scalp Therapy */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src="/spa.svg" 
                alt="Scalp Therapy Icon" 
                style={{
                  width: '48px',
                  height: '48px'
                }}
              />
            </div>
            <h3 style={{
              color: theme.primary,
              fontSize: '1.5rem',
              marginBottom: '16px',
              fontWeight: 600

              
            }}>
              {t('landing_service_scalp_title')}
            </h3>
            <p style={{
              color: '#666',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              maxWidth: '300px',
              margin: '0 auto'
            }}>
              {t('landing_service_scalp_description')}
            </p>
            <div style={{
              display: 'flex',
              gap: '8px',
              marginTop: '24px'
            }}>
              <Link to="/therapies" style={{
                padding: '8px 16px',
                border: `1px solid ${theme.primary}`,
                borderRadius: '4px',
                color: theme.primary,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}>
                {t('landing_learn_more')}
              </Link>
              <Link to="/book" style={{
                padding: '8px 16px',
                backgroundColor: theme.primary,
                borderRadius: '4px',
                color: theme.white,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}>
                {t('landing_book_now')}
              </Link>
            </div>
          </div>

          {/* Mind Therapy */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src="/spawater.svg" 
                alt="Mind Therapy Icon" 
                style={{
                  width: '48px',
                  height: '48px'
                }}
              />
            </div>
            <h3 style={{
              color: theme.primary,
              fontSize: '1.5rem',
              marginBottom: '16px',
              fontWeight: 600
            }}>
              {t('landing_service_hair_title')}
            </h3>
            <p style={{
              color: '#666',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              maxWidth: '300px',
              margin: '0 auto'
            }}>
              {t('landing_service_hair_description')}
            </p>
            <div style={{
              display: 'flex',
              gap: '8px',
              marginTop: '24px'
            }}>
              <Link to="/services" style={{
                padding: '8px 16px',
                border: `1px solid ${theme.primary}`,
                borderRadius: '4px',
                color: theme.primary,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}>
                {t('landing_learn_more')}
              </Link>
              <Link to="/book" style={{
                padding: '8px 16px',
                backgroundColor: theme.primary,
                borderRadius: '4px',
                color: theme.white,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}>
                {t('landing_book_now')}
              </Link>
            </div>
          </div>

          {/* Hair Restoration */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src="/vector.png" 
                alt="Hair Restoration Icon" 
                style={{
                  width: '68px',
                  height: '68px'
                }}
              />
            </div>
            <h3 style={{
              color: theme.primary,
              fontSize: '1.5rem',
              marginBottom: '16px',
              fontWeight: 600
            }}>
              {t('landing_service_sound_title')}
            </h3>
            <p style={{
              color: '#666',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              maxWidth: '300px',
              margin: '0 auto'
            }}>
              {t('landing_service_sound_description')}
            </p>
            <div style={{
              display: 'flex',
              gap: '8px',
              marginTop: '24px'
            }}>
              <Link to="/services" style={{
                padding: '8px 16px',
                border: `1px solid ${theme.primary}`,
                borderRadius: '4px',
                color: theme.primary,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}>
                {t('landing_learn_more')}
              </Link>
              <Link to="/book" style={{
                padding: '8px 16px',
                backgroundColor: theme.primary,
                borderRadius: '4px',
                color: theme.white,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}>
                {t('landing_book_now')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div style={{
        padding: isMobile ? '180px 20px 40px' : '200px 40px 80px',
        backgroundColor: '#fdf9f5',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{
              color: theme.primary,
              fontSize: isMobile ? '2rem' : '2.5rem',
              marginBottom: '1.5rem',
              fontWeight: 700
            }}>
              {t('landing_info_title')}
            </h2>
            <p style={{
              color: '#666',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              marginBottom: '2rem'
            }}>
              {t('landing_info_subtitle')}
            </p>

            <div style={{ marginTop: '40px' }}>
              <h3 style={{ color: theme.secondary, marginBottom: '1rem', fontSize: '1.3rem', fontWeight: 600 }}>
                {t('landing_philosophy_title')}
              </h3>
              <p style={{ color: '#666', marginBottom: '2rem' }}>
                {t('landing_philosophy_description')}
              </p>

              <h3 style={{ color: theme.secondary, marginBottom: '1rem', fontSize: '1.3rem', fontWeight: 600 }}>
                {t('landing_restoration_title')}
              </h3>
              <p style={{ color: '#666', marginBottom: '2rem' }}>
                {t('landing_restoration_description')}
              </p>

              <h3 style={{ color: theme.secondary, marginBottom: '1rem', fontSize: '1.3rem', fontWeight: 600 }}>
                {t('landing_meaning_title')}
              </h3>
              <p style={{ color: '#666', marginBottom: '2rem' }}>
                {t('landing_meaning_description')}
              </p>
            </div>
          </div>

          {/* Image */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '500px',
              display: isMobile ? 'none' : 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 0.15s ease-in-out',
              transform: `scale(${stackScale})`,
            }}
            onClick={handleStackClick}
          >
            {galleryImages.map((image, index) => {
              const isActive = index === currentGalleryImage;
              const isNext = index === (currentGalleryImage + 1) % galleryImages.length;
              const isPrev = index === (currentGalleryImage - 1 + galleryImages.length) % galleryImages.length;

              let transform = 'scale(0.8) rotate(0deg)';
              let zIndex = 0;
              let opacity = 0;

              if (isActive) {
                transform = 'scale(1) rotate(0deg)';
                zIndex = 3;
                opacity = 1;
              } else if (isNext) {
                transform = 'scale(0.9) rotate(5deg) translateX(50px)';
                zIndex = 2;
                opacity = 1;
              } else if (isPrev) {
                transform = 'scale(0.9) rotate(-5deg) translateX(-50px)';
                zIndex = 1;
                opacity = 1;
              }

              return (
                <div
                  key={image}
                  style={{
                    position: 'absolute',
                    width: '80%',
                    height: '80%',
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '20px',
                    border: `1px solid rgba(27, 77, 62, 0.1)`,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: transform,
                    zIndex: zIndex,
                    opacity: opacity,
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 
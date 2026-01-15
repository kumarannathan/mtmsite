import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Feature card data - now using translation keys
const featureCards = [
  {
    titleKey: 'landing_feature_massage_title',
    headingKey: 'landing_feature_massage_heading',
    descriptionKey: 'landing_feature_massage_description',
    buttonTextKey: 'landing_feature_massage_button',
    buttonLink: '/therapies',
    image: '/mindScalp.jpg'
  },
  {
    titleKey: 'landing_feature_facial_title',
    headingKey: 'landing_feature_facial_heading',
    descriptionKey: 'landing_feature_facial_description',
    buttonTextKey: 'landing_feature_facial_button',
    buttonLink: '/therapies',
    image: '/growth.jpg'
  },
  {
    titleKey: 'landing_feature_hair_therapy_title',
    headingKey: 'landing_feature_hair_therapy_heading',
    descriptionKey: 'landing_feature_hair_therapy_description',
    buttonTextKey: 'landing_feature_hair_therapy_button',
    buttonLink: '/therapies',
    image: '/rejuvenation.jpg'
  },
  {
    titleKey: 'landing_feature_hair_revitalization_title',
    headingKey: 'landing_feature_hair_revitalization_heading',
    descriptionKey: 'landing_feature_hair_revitalization_description',
    buttonTextKey: 'landing_feature_hair_revitalization_button',
    buttonLink: '/therapies',
    image: '/gongTherapy.jpg'
  }
];

const galleryImages = [
  '/stylingHer.jpg',
  '/mtm1.jpg',
  '/mtm6.jpg',
  '/hair5.jpg',
  '/mtm7.jpg',
  '/mtm4.jpg',
  // '/mtm5.jpg',
  // '/gongman.jpeg',
  // '/hairhead.jpeg',
  // '/img1.jpeg',
  // '/img2.jpeg',
  // '/img3.jpeg',
  '/img4.jpeg',
  '/growth.jpg',
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
  cardBg: '#F8FFF9', // Very light green tint for cards
  text: '#222', // Text color
  textLight: '#666' // Light text color
};

export default function Landing1() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [logoScale, setLogoScale] = useState(0.5); // Start with smaller scale
  const [currentLogo, setCurrentLogo] = useState('/logoNOBG.png'); // Start with first logo
  const [logoIsWhite, setLogoIsWhite] = useState(false); // Track if logo should be white
  const [logoOpacity, setLogoOpacity] = useState(1); // Track logo opacity for smooth transition
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);
  const [stackScale, setStackScale] = useState(1); // For click animation
  const [showServicesHeader, setShowServicesHeader] = useState(false);
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
    // Start with smaller scale, then animate to normal size after a longer delay
    const timer = setTimeout(() => {
      setLogoScale(isMobile ? 1.8 : 2.5);
    }, 800); // Start growing after 800ms

    // Fade out first logo
    const fadeOutTimer = setTimeout(() => {
      setLogoOpacity(0);
    }, 2200); // Start fading out before logo change

    // Change logo and fade in new logo
    const logoChangeTimer = setTimeout(() => {
      setCurrentLogo('/mtm.png');
      setLogoIsWhite(true); // Make logo white after transition
      setLogoOpacity(1); // Fade in new logo
    }, 2500); // Slightly after fade out starts

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeOutTimer);
      clearTimeout(logoChangeTimer);
    };
  }, [isMobile]);

  // Auto-switch carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGalleryImage(prev => (prev + 1) % galleryImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  // Handle scroll detection for services header
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 0) {
        setShowServicesHeader(true);
      } else {
        setShowServicesHeader(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      fontFamily: 'Inter, Arial, sans-serif',
      paddingTop: isMobile ? '10vh' : '80px'
    }}>
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
        zIndex: 1,

      }}>
        {/* Video Background */}
        {isMobile ? (
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/mindScalp.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            top: 0,
            left: 0,
            zIndex: 1
          }} />
        ) : (
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
        )}

        {/* Content overlay */}
        <div style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: '800px',
          padding: '0 20px',
          marginTop: isMobile ? '60px' : '80px',
          display: isMobile ? 'flex' : 'block',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: isMobile ? 'center' : 'flex-start',
          alignItems: isMobile ? 'center' : 'flex-start',
          minHeight: isMobile ? '100vh' : 'auto'
        }}>
          {/* MTM Logo */}
          <div style={{
            marginBottom: isMobile ? '10rem' : '6rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img
              src={currentLogo}
              alt="MTM Harmony Logo"
              aria-label="MTM Harmony Logo"
              style={{
                height: isMobile ? '90px' : '120px',
                marginBottom: '3%',
                width: 'auto',
                opacity: logoOpacity * 0.9, // Combine with existing opacity
                transform: `scale(${logoScale})`,
                transition: 'transform 2.0s cubic-bezier(0.2, 0, 0.5, 1), opacity 0.6s ease-in-out, filter 0.6s ease-in-out',
                filter: logoIsWhite ? 'brightness(0) invert(1) brightness(1.2)' : 'brightness(1.2)'
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
          {/* {!isMobile && (
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              color: theme.white,
              textShadow: `2px 2px 4px rgba(0,0,0,0.2)`,
              lineHeight: 1.1
            }}>
              {t('landing_hero_title')}
            </h1>
          )} */}
          {!isMobile && (
            <p style={{
              fontSize: '1.5rem',
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
          )}
          <Link to="/book-calendly" style={{ textDecoration: 'none' }}>
            <button
              aria-label={t('landing_book_appointment')}
              style={{
                backgroundColor: theme.primary,
                color: theme.white,
                border: 'none',
                padding: isMobile ? '16px 40px' : '16px 32px',
                borderRadius: '8px',
                fontSize: isMobile ? '1.1rem' : '1.2rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                marginTop: isMobile ? '0rem' : '0',
                marginBottom: isMobile ? '0rem' : '20%'
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

      {/* Feature Cards Section - Mobile Only */}
      {isMobile && (
        <div style={{
          padding: '40px 20px 60px 20px',
          backgroundColor: '#fdf9f5',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{
            maxWidth: '100%',
            margin: '0 auto',
            position: 'relative'
          }}>
            {/* Single Card Display */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px'
            }}>
              <div
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  boxShadow: '0 4px 18px rgba(27,77,62,0.08)',
                  overflow: 'hidden',
                  border: '1px solid rgba(27, 77, 62, 0.1)',
                  position: 'relative'
                }}
              >
                {/* Image */}
                <div style={{
                  width: '100%',
                  height: '200px',
                  position: 'relative',
                  order: -1
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundImage: `url(${featureCards[currentSlide].image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}></div>
                </div>

                {/* Text Content */}
                <div style={{
                  padding: '32px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  gap: '16px'
                }}>
                  <h3 style={{
                    color: theme.secondary,
                    marginBottom: '8px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    letterSpacing: '1px'
                  }}>
                    {t(featureCards[currentSlide].titleKey)}
                  </h3>
                  <h2 style={{
                    color: theme.primary,
                    marginBottom: '12px',
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    lineHeight: 1.2
                  }}>
                    {t(featureCards[currentSlide].headingKey)}
                  </h2>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.primary,
                fontSize: '18px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                zIndex: 10
              }}
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.primary,
                fontSize: '18px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                zIndex: 10
              }}
            >
              →
            </button>

            {/* Pagination Dots */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              marginTop: '20px'
            }}>
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
            </div>
          </div>
        </div>
      )}

      {/* Our Services Header */}
      {!isMobile && (
        <div style={{
          padding: showServicesHeader ? '40px 40px 20px 40px' : '0px 40px',
          marginTop: '5%',
          position: 'relative',
          zIndex: 2,
          backgroundColor: '#fdf9f5',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          height: showServicesHeader ? 'auto' : '0px',
          gap: '16px'
        }}>
          <div style={{
            background: 'rgba(27,77,62,0.08)',
            color: '#d1b981',
            fontWeight: 600,
            fontSize: '1rem',
            borderRadius: 999,
            padding: '8px 24px',
            letterSpacing: '0.04em',
            fontFamily: 'Inter, Arial, sans-serif',
            display: 'inline-block'
          }}>
            What We Offer
          </div>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 600,
            fontSize: '2.8rem',
            color: '#1B4D3E',
            margin: 0,
            letterSpacing: '-1px',
            lineHeight: 1.1,
            textAlign: 'center'
          }}>
            Our Services
          </h2>
        </div>
      )}

      {/* Feature Cards Section - Desktop Only */}
      {!isMobile && (
        <div style={{
          padding: '20px 40px 80px 40px',
          marginTop: '0%',
          position: 'relative',
          zIndex: 2,
          overflow: 'hidden',
          backgroundColor: '#fdf9f5'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            position: 'relative'
          }}>
            {/* Carousel Container */}
            <div style={{
              display: 'flex',
              gap: '24px',
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '500px'
            }}>
              {/* Cards Container */}
              <div
                style={{
                  display: 'flex',
                  gap: '24px',
                  position: 'relative',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: '1000px',
                  cursor: 'pointer',
                  minHeight: '500px'
                }}
                onClick={nextSlide}
              >
                {featureCards.map((card, index) => {
                  const isActive = index === currentSlide;
                  const isNext = index === (currentSlide + 1) % totalSlides;
                  const isPrev = index === (currentSlide - 1 + totalSlides) % totalSlides;
                  const isNextNext = index === (currentSlide + 2) % totalSlides;
                  const isPrevPrev = index === (currentSlide - 2 + totalSlides) % totalSlides;

                  let transform = 'scale(0.7) translateX(0)';
                  let zIndex = 0;
                  let opacity = 0.3;

                  if (isActive) {
                    transform = 'scale(1) translateX(0)';
                    zIndex = 5;
                    opacity = 1;
                  } else if (isNext) {
                    transform = 'scale(0.85) translateX(120px)';
                    zIndex = 4;
                    opacity = 0.8;
                  } else if (isPrev) {
                    transform = 'scale(0.85) translateX(-120px)';
                    zIndex = 3;
                    opacity = 0.8;
                  } else if (isNextNext) {
                    transform = 'scale(0.7) translateX(240px)';
                    zIndex = 2;
                    opacity = 0.4;
                  } else if (isPrevPrev) {
                    transform = 'scale(0.7) translateX(-240px)';
                    zIndex = 1;
                    opacity = 0.4;
                  }

                  return (
                    <div
                      key={index}
                      style={{
                        position: 'absolute',
                        width: '320px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '450px',
                        border: '1px solid rgba(27, 77, 62, 0.1)',
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: transform,
                        zIndex: zIndex,
                        opacity: opacity,
                        cursor: isActive ? 'pointer' : 'default'
                      }}
                      onClick={() => isActive && goToSlide(index)}
                      onMouseOver={(e) => {
                        if (isActive) {
                          e.currentTarget.style.transform = 'scale(1.02) translateX(0)';
                          e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (isActive) {
                          e.currentTarget.style.transform = 'scale(1) translateX(0)';
                          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                        }
                      }}
                    >
                      {/* Image (Top Section) */}
                      <div style={{
                        width: '100%',
                        height: '65%',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          bottom: 0,
                          left: 0,
                          backgroundImage: `url(${card.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          borderRadius: '16px 16px 0 0'
                        }}></div>
                      </div>

                      {/* Text Content (Bottom Section) */}
                      <div style={{
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        flex: 1,
                        gap: '8px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '0 0 16px 16px'
                      }}>
                        <h3 style={{
                          color: '#1B4D3E',
                          marginBottom: '0.2rem',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          letterSpacing: '1px',
                          textTransform: 'uppercase'
                        }}>
                          {t(card.titleKey)}
                        </h3>
                        <h2 style={{
                          color: '#1B4D3E',
                          marginBottom: '0.4rem',
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          lineHeight: 1.2
                        }}>
                          {t(card.headingKey)}
                        </h2>
                        <p style={{
                          color: '#666',
                          marginBottom: '1rem',
                          fontSize: '0.85rem',
                          lineHeight: 1.4,
                          flex: 1
                        }}>
                          {t(card.descriptionKey)}
                        </p>
                        {card.buttonTextKey && (
                          <Link to={card.buttonLink} style={{ textDecoration: 'none', alignSelf: 'flex-start' }}>
                            <button style={{
                              backgroundColor: '#1B4D3E',
                              color: '#FFFFFF',
                              border: 'none',
                              padding: '10px 20px',
                              borderRadius: '8px',
                              fontSize: '0.85rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'all 0.3s ease'
                            }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#2A6B57';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = '#1B4D3E';
                                e.currentTarget.style.transform = 'translateY(0)';
                              }}
                            >
                              {t(card.buttonTextKey)}
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pagination Dots */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px',
              marginTop: '40px'
            }}>
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  style={{
                    width: '50px',
                    height: '6px',
                    border: 'none',
                    borderRadius: '3px',
                    background: currentSlide === index ? theme.secondary : '#E1E1E1',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'background-color 0.3s ease, transform 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Services Section */}
      {/* Our Services Section - Professional Minimalist Redesign */}
      <div style={{
        padding: isMobile ? '60px 20px' : '100px 40px',
        backgroundColor: '#fdf9f5',
        position: 'relative',
        zIndex: 1,
        borderBottom: '1px solid rgba(0,0,0,0.03)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
          gap: isMobile ? '60px' : '40px',
          alignItems: 'start'
        }}>
          {/* Scalp Therapy */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '20px',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{
              width: '80px',
              height: '80px',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.primary,
              backgroundColor: 'rgba(27,77,62,0.03)',
              borderRadius: '50%',
              transition: 'all 0.3s ease'
            }}>
              <img
                src="/spa.svg"
                alt="Scalp Therapy Icon"
                style={{
                  width: '40px',
                  height: '40px',
                  filter: 'brightness(0.8) contrast(1.2)'
                }}
              />
            </div>
            <h3 style={{
              color: theme.primary,
              fontSize: '1.4rem',
              marginBottom: '16px',
              fontWeight: 600,
              fontFamily: 'Inter, Arial, sans-serif',
              letterSpacing: '0.2px'
            }}>
              {t('landing_service_scalp_title')}
            </h3>
            <p style={{
              color: theme.textLight,
              fontSize: '1.05rem',
              lineHeight: 1.7,
              maxWidth: '320px',
              margin: '0 auto 24px',
              fontWeight: 400
            }}>
              {t('landing_service_scalp_description')}
            </p>
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Link to="/therapies" style={{
                color: theme.primary,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                borderBottom: `1px solid ${theme.primary}`,
                paddingBottom: '2px',
                transition: 'all 0.2s ease'
              }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                {t('landing_learn_more')}
              </Link>
              <Link to="/book-calendly" style={{
                color: '#d1b981',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                borderBottom: '1px solid #d1b981',
                paddingBottom: '2px',
                transition: 'all 0.2s ease'
              }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                {t('landing_book_now')}
              </Link>
            </div>
          </div>

          {/* Health Therapy */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '20px',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{
              width: '80px',
              height: '80px',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.primary,
              backgroundColor: 'rgba(27,77,62,0.03)',
              borderRadius: '50%',
              transition: 'all 0.3s ease'
            }}>
              <img
                src="/spawater.svg"
                alt="Health Therapy Icon"
                style={{
                  width: '40px',
                  height: '40px',
                  filter: 'brightness(0.8) contrast(1.2)'
                }}
              />
            </div>
            <h3 style={{
              color: theme.primary,
              fontSize: '1.4rem',
              marginBottom: '16px',
              fontWeight: 600,
              fontFamily: 'Inter, Arial, sans-serif',
              letterSpacing: '0.2px'
            }}>
              {t('landing_service_hair_title')}
            </h3>
            <p style={{
              color: theme.textLight,
              fontSize: '1.05rem',
              lineHeight: 1.7,
              maxWidth: '320px',
              margin: '0 auto 24px',
              fontWeight: 400
            }}>
              {t('landing_service_hair_description')}
            </p>
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Link to="/therapies" style={{
                color: theme.primary,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                borderBottom: `1px solid ${theme.primary}`,
                paddingBottom: '2px',
                transition: 'all 0.2s ease'
              }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                {t('landing_learn_more')}
              </Link>
              <Link to="/book-calendly" style={{
                color: '#d1b981',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                borderBottom: '1px solid #d1b981',
                paddingBottom: '2px',
                transition: 'all 0.2s ease'
              }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                {t('landing_book_now')}
              </Link>
            </div>
          </div>

          {/* Hair Restoration */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '20px',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{
              width: '80px',
              height: '80px',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.primary,
              backgroundColor: 'rgba(27,77,62,0.03)',
              borderRadius: '50%',
              transition: 'all 0.3s ease'
            }}>
              <img
                src="/vector.png"
                alt="Hair Restoration Icon"
                style={{
                  width: '56px',
                  height: '56px',
                  opacity: 0.9
                }}
              />
            </div>
            <h3 style={{
              color: theme.primary,
              fontSize: '1.4rem',
              marginBottom: '16px',
              fontWeight: 600,
              fontFamily: 'Inter, Arial, sans-serif',
              letterSpacing: '0.2px'
            }}>
              {t('landing_service_sound_title')}
            </h3>
            <p style={{
              color: theme.textLight,
              fontSize: '1.05rem',
              lineHeight: 1.7,
              maxWidth: '320px',
              margin: '0 auto 24px',
              fontWeight: 400
            }}>
              {t('landing_service_sound_description')}
            </p>
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Link to="/therapies" style={{
                color: theme.primary,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                borderBottom: `1px solid ${theme.primary}`,
                paddingBottom: '2px',
                transition: 'all 0.2s ease'
              }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                {t('landing_learn_more')}
              </Link>
              <Link to="/book-calendly" style={{
                color: '#d1b981',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                borderBottom: '1px solid #d1b981',
                paddingBottom: '2px',
                transition: 'all 0.2s ease'
              }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                {t('landing_book_now')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div style={{
        padding: isMobile ? '60px 16px 60px' : '80px 40px 100px',
        backgroundColor: '#fdf9f5',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          {/* Hero Title with Gold Accent */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: isMobile ? 20 : 32,
            marginTop: isMobile ? '8px' : '5%'
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
              {t('landing_info_title')}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 600,
            fontSize: isMobile ? '1.8rem' : '2.8rem',
            color: theme.primary,
            marginBottom: isMobile ? 16 : 24,
            letterSpacing: '-1px',
            lineHeight: 1.1,
          }}>
            {isMobile ? t('mtm_harmony_statement_mobile') : t('mtm_harmony_statement')}
          </h1>

          <p style={{
            fontSize: isMobile ? '1rem' : '1.2rem',
            color: theme.textLight,
            maxWidth: isMobile ? '98%' : 700,
            margin: isMobile ? '0 auto 40px' : '0 auto 60px',
            fontFamily: 'Inter, Arial, sans-serif',
            lineHeight: 1.6,
          }}>
            {t('mtm_approach_statement')}
          </p>

          {/* Image Carousel - Professional Gallery Refinement */}
          <div
            style={{
              margin: isMobile ? '40px auto' : '60px auto',
              maxWidth: isMobile ? '100%' : '850px',
              position: 'relative',
              width: '100%',
              padding: isMobile ? '0 10px' : '0'
            }}
            role="region"
            aria-roledescription="carousel"
            aria-label="MTM Wellness Gallery"
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: isMobile ? '350px' : '450px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: `scale(${stackScale})`,
                perspective: '1000px'
              }}
              onClick={handleStackClick}
              aria-live="polite"
            >
              {galleryImages.map((image, index) => {
                const isActive = index === currentGalleryImage;
                const isNext = index === (currentGalleryImage + 1) % galleryImages.length;
                const isPrev = index === (currentGalleryImage - 1 + galleryImages.length) % galleryImages.length;

                let transform = 'scale(0.8) translateZ(-100px) rotateY(15deg)';
                let zIndex = 0;
                let opacity = 0;

                if (isActive) {
                  transform = 'scale(1) translateZ(0) rotateY(0deg)';
                  zIndex = 3;
                  opacity = 1;
                } else if (isNext) {
                  transform = `scale(0.92) translateX(${isMobile ? '30px' : '80px'}) translateZ(-50px) rotateY(-5deg)`;
                  zIndex = 2;
                  opacity = 0.6;
                } else if (isPrev) {
                  transform = `scale(0.92) translateX(${isMobile ? '-30px' : '-80px'}) translateZ(-50px) rotateY(5deg)`;
                  zIndex = 1;
                  opacity = 0.6;
                }

                return (
                  <div
                    key={image}
                    style={{
                      position: 'absolute',
                      width: isMobile ? '85%' : '75%',
                      height: '90%',
                      backgroundImage: `url(${image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '12px',
                      border: '8px solid #FFFFFF',
                      boxShadow: isActive
                        ? '0 20px 40px rgba(0,0,0,0.15), 0 5px 15px rgba(27,77,62,0.1)'
                        : '0 10px 25px rgba(0,0,0,0.1)',
                      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: transform,
                      zIndex: zIndex,
                      opacity: opacity,
                      overflow: 'hidden'
                    }}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Slide ${index + 1} of ${galleryImages.length}`}
                  >
                    {/* Subtle overlay for inacitve slides */}
                    {!isActive && (
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(253, 249, 245, 0.3)',
                        transition: 'opacity 0.6s ease'
                      }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pagination Dots for Accessibility and Visual Hint */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '20px'
            }}>
              {galleryImages.map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: index === currentGalleryImage ? '#1B4D3E' : 'rgba(27,77,62,0.2)',
                    transition: 'all 0.3s ease'
                  }}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          {/* Info Cards - Professional Minimalist Redesign */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
            gap: isMobile ? '48px' : '40px',
            width: '100%',
            marginTop: isMobile ? '40px' : '60px',
            padding: '0 20px'
          }}>
            {/* Cultural Wellness Philosophy Card */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '20px',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                width: '64px',
                height: '64px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.primary,
              }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C12 22 20 18 20 12C20 6 12 2 12 2C12 2 4 6 4 12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 18C12 18 17 15.5 17 12C17 8.5 12 6 12 6C12 6 7 8.5 7 12C7 15.5 12 18 12 18Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: theme.primary,
                marginBottom: '16px',
                fontFamily: 'Inter, Arial, sans-serif',
                letterSpacing: '0.5px'
              }}>
                {t('landing_philosophy_title')}
              </h3>
              <p style={{
                color: theme.textLight,
                fontSize: '1rem',
                lineHeight: 1.7,
                margin: 0,
                fontWeight: 400,
              }}>
                {t('landing_philosophy_description')}
              </p>
            </div>

            {/* Natural Hair Restoration Card */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '20px',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                width: '64px',
                height: '64px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.primary,
              }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 20C7 20 7 11 12 11C17 11 17 20 17 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M12 11C12 11 12 2 12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M2 13C2 13 5.5 13 7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M17 11C18.5 13 22 13 22 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: theme.primary,
                marginBottom: '16px',
                fontFamily: 'Inter, Arial, sans-serif',
                letterSpacing: '0.5px'
              }}>
                {t('landing_restoration_title')}
              </h3>
              <p style={{
                color: theme.textLight,
                fontSize: '1rem',
                lineHeight: 1.7,
                margin: 0,
                fontWeight: 400,
              }}>
                {t('landing_restoration_description')}
              </p>
            </div>

            {/* Meaning of MTM Card */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '20px',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                width: '64px',
                height: '64px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.primary,
              }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 2V4M12 20V22M22 12H20M4 12H2M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M15 15C15 15 17.5 15 19 13.5C20.5 12 20.5 9.5 20.5 9.5C20.5 9.5 18 9.5 16.5 11C15 12.5 15 15 15 15Z" fill="currentColor" opacity="0.2" />
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: theme.primary,
                marginBottom: '16px',
                fontFamily: 'Inter, Arial, sans-serif',
                letterSpacing: '0.5px'
              }}>
                {t('landing_meaning_title')}
              </h3>
              <p style={{
                color: theme.textLight,
                fontSize: '1rem',
                lineHeight: 1.7,
                margin: 0,
                fontWeight: 400,
              }}>
                {t('landing_meaning_description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
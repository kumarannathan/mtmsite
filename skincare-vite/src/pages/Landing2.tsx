import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Feature card data
const featureCards = [
  {
    title: 'HOLISTIC WELLNESS',
    heading: 'Mind & Body Harmony',
    description: 'Ancient Eastern techniques meet modern wellness for complete mind-body balance and deep relaxation.',
    buttonText: 'Experience harmony',
    buttonLink: '/book',
    image: '/img4.jpeg'
  },
  {
    title: 'NATURAL RESTORATION',
    heading: 'Hair Vitality Therapy',
    description: 'Transformative natural treatments that restore hair\'s natural color and vitality using time-honored methods.',
    buttonText: 'Restore naturally',
    buttonLink: '/book',
    image: '/img5.jpeg'
  },
  {
    title: 'EXCLUSIVE PACKAGE',
    heading: 'Wellness Journey',
    description: 'Embark on a complete wellness journey with our signature package combining multiple therapies for optimal results.',
    buttonText: 'Start journey',
    buttonLink: '/therapies/#promotions',
    image: '/chinese.jpeg'
  }
];

// Define earthy theme colors
const theme = {
  primary: '#8B7355', // Warm brown
  secondary: '#D2B48C', // Tan
  accent: '#A0522D', // Sienna
  cream: '#F5F5DC', // Beige
  darkBrown: '#654321', // Dark brown
  lightBrown: '#DEB887', // Burlywood
  cardBg: '#FAF8F3' // Very light cream
};

export default function Landing2() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const totalSlides = featureCards.length;

  // Handle responsive behavior
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 100) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set page title
  useEffect(() => {
    document.title = 'MTM - Natural Wellness & Restoration | Eastern Wellness Therapies';
  }, []);

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
      backgroundColor: theme.cream,
      fontFamily: 'Nunito, Inter, Arial, sans-serif'
    }}>
      {/* Floating Elements Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              background: `radial-gradient(circle, ${theme.lightBrown}20, transparent)`,
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Hero Video Section */}
      <div style={{
        width: '100%',
        height: '110vh',
        position: 'relative',
        backgroundColor: theme.darkBrown,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.cream,
        textAlign: 'center',
        marginTop: '-80px',
        marginBottom: '0px',
        overflow: 'hidden',
        zIndex: 1
      }}>
        {/* Video Background with Overlay */}
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
        
        {/* Dark overlay for better text readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(101, 67, 33, 0.4)',
          zIndex: 2
        }}></div>

        {/* Content overlay */}
        <div style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: '800px',
          padding: '0 20px'
        }}>
          <div style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease'
          }}>
            {/* MTM Logo */}
            <div style={{
              marginBottom: '2rem',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <img 
                src="/mtm.png" 
                alt="MTM Logo" 
                style={{
                  height: '80px',
                  width: 'auto',
                  filter: 'brightness(0) invert(1)',
                  opacity: 0.9
                }}
              />
            </div>
            
            <h1 style={{
              fontSize: isMobile ? '2.8rem' : '4.5rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              color: theme.cream,
              textShadow: `2px 2px 4px rgba(0,0,0,0.3)`,
              lineHeight: 1.1
            }}>
              <span style={{ fontFamily: 'Cavolini, serif' }}>MTM Care</span>
              <br />
              Natural Wellness & Restoration
            </h1>
            <p style={{
              fontSize: isMobile ? '1.2rem' : '1.5rem',
              marginBottom: '2.5rem',
              lineHeight: 1.6,
              maxWidth: '600px',
              margin: '0 auto 2rem',
              fontWeight: 300,
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
              color: theme.cream
            }}>
              MTM offers authentic Eastern wellness experiences that restore your natural vitality through time-honored traditions and modern techniques.
            </p>
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link to="/book" style={{ textDecoration: 'none' }}>
                <button style={{
                  backgroundColor: theme.accent,
                  color: theme.cream,
                  border: 'none',
                  padding: '16px 32px',
                  borderRadius: '50px',
                  fontSize: '1.2rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(160, 82, 45, 0.3)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = theme.primary;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(160, 82, 45, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = theme.accent;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(160, 82, 45, 0.3)';
                }}
                >
                  Begin Your Journey
                </button>
              </Link>
              <Link to="/therapies" style={{ textDecoration: 'none' }}>
                <button style={{
                  backgroundColor: 'transparent',
                  color: theme.cream,
                  border: `2px solid ${theme.cream}`,
                  padding: '16px 32px',
                  borderRadius: '50px',
                  fontSize: '1.2rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = theme.cream;
                  e.currentTarget.style.color = theme.darkBrown;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = theme.cream;
                }}
                >
                  Explore Therapies
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          animation: 'bounce 2s infinite'
        }}>
          <div style={{
            width: '2px',
            height: '30px',
            backgroundColor: theme.cream,
            margin: '0 auto'
          }}></div>
          <div style={{
            width: '8px',
            height: '8px',
            backgroundColor: theme.cream,
            borderRadius: '50%',
            margin: '5px auto 0',
            animation: 'pulse 2s infinite'
          }}></div>
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
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(139, 115, 85, 0.15), 0 6px 20px rgba(139, 115, 85, 0.1)',
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  height: '320px',
                  position: 'relative',
                  alignItems: 'center',
                  justifyContent: isMobile ? 'flex-start' : 'space-between',
                  border: `1px solid rgba(139, 115, 85, 0.1)`,
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(139, 115, 85, 0.25), 0 10px 30px rgba(139, 115, 85, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(139, 115, 85, 0.15), 0 6px 20px rgba(139, 115, 85, 0.1)';
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
                    color: theme.accent,
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    letterSpacing: '1px'
                  }}>
                    {card.title}
                  </h3>
                  <h2 style={{
                    color: theme.darkBrown,
                    marginBottom: '0.75rem',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    lineHeight: 1.2
                  }}>
                    {card.heading}
                  </h2>
                  <p style={{
                    color: '#666',
                    marginBottom: '1.5rem',
                    fontSize: '1rem',
                    lineHeight: 1.4
                  }}>
                    {card.description}
                  </p>
                  {card.buttonText && (
                    <Link to={card.buttonLink} style={{ textDecoration: 'none' }}>
                      <button style={{
                        backgroundColor: theme.primary,
                        color: theme.cream,
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '25px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(139, 115, 85, 0.2)'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = theme.accent;
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = theme.primary;
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                      >
                        {card.buttonText}
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
                  background: currentSlide === index ? theme.accent : '#E1E1E1',
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
        backgroundColor: theme.cream,
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
          {/* Mind & Scalp Health */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '30px',
            borderRadius: '16px',
            backgroundColor: theme.cardBg,
            border: `1px solid rgba(139, 115, 85, 0.1)`,
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 115, 85, 0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <div style={{
              width: '80px',
              height: '80px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: `${theme.primary}15`,
              borderRadius: '50%'
            }}>
              <img 
                src="/spa.svg" 
                alt="Mind & Scalp Health Icon" 
                style={{
                  width: '48px',
                  height: '48px',
                  filter: 'brightness(0.8)'
                }}
              />
            </div>
            <h3 style={{
              color: theme.darkBrown,
              fontSize: '1.5rem',
              marginBottom: '16px',
              fontWeight: 600
            }}>
              Mind & Scalp Health
            </h3>
            <p style={{
              color: '#666',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              maxWidth: '300px',
              margin: '0 auto'
            }}>
              Deep relaxation therapy combining ancient and modern techniques for scalp health and mental clarity.
            </p>
            <div style={{
              display: 'flex',
              gap: '8px',
              marginTop: '24px'
            }}>
              <Link to="/therapies" style={{
                padding: '8px 16px',
                border: `1px solid ${theme.primary}`,
                borderRadius: '20px',
                color: theme.primary,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}>
                Learn more
              </Link>
              <Link to="/book" style={{
                padding: '8px 16px',
                backgroundColor: theme.primary,
                borderRadius: '20px',
                color: theme.cream,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}>
                Book now
              </Link>
            </div>
          </div>

          {/* Hair Growth & Restoration */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '30px',
            borderRadius: '16px',
            backgroundColor: theme.cardBg,
            border: `1px solid rgba(139, 115, 85, 0.1)`,
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 115, 85, 0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <div style={{
              width: '80px',
              height: '80px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: `${theme.primary}15`,
              borderRadius: '50%'
            }}>
              <img 
                src="/spawater.svg" 
                alt="Hair Growth & Restoration Icon" 
                style={{
                  width: '48px',
                  height: '48px',
                  filter: 'brightness(0.8)'
                }}
              />
            </div>
            <h3 style={{
              color: theme.darkBrown,
              fontSize: '1.5rem',
              marginBottom: '16px',
              fontWeight: 600
            }}>
              Hair Growth & Restoration
            </h3>
            <p style={{
              color: '#666',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              maxWidth: '300px',
              margin: '0 auto'
            }}>
              Specialized treatments for hair growth stimulation, preservation, and natural color restoration.
            </p>
            <div style={{
              display: 'flex',
              gap: '8px',
              marginTop: '24px'
            }}>
              <Link to="/therapies" style={{
                padding: '8px 16px',
                border: `1px solid ${theme.primary}`,
                borderRadius: '20px',
                color: theme.primary,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}>
                Learn more
              </Link>
              <Link to="/book" style={{
                padding: '8px 16px',
                backgroundColor: theme.primary,
                borderRadius: '20px',
                color: theme.cream,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}>
                Book now
              </Link>
            </div>
          </div>

          {/* Sound Healing & Styling */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '30px',
            borderRadius: '16px',
            backgroundColor: theme.cardBg,
            border: `1px solid rgba(139, 115, 85, 0.1)`,
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 115, 85, 0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <div style={{
              width: '80px',
              height: '80px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: `${theme.primary}15`,
              borderRadius: '50%'
            }}>
              <img 
                src="/spahair.svg" 
                alt="Sound Healing & Styling Icon" 
                style={{
                  width: '48px',
                  height: '48px',
                  filter: 'brightness(0.8)'
                }}
              />
            </div>
            <h3 style={{
              color: theme.darkBrown,
              fontSize: '1.5rem',
              marginBottom: '16px',
              fontWeight: 600
            }}>
              Sound Healing & Styling
            </h3>
            <p style={{
              color: '#666',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              maxWidth: '300px',
              margin: '0 auto'
            }}>
              Transformative Tibetan gong therapy for deep relaxation and professional hair styling services.
            </p>
            <div style={{
              display: 'flex',
              gap: '8px',
              marginTop: '24px'
            }}>
              <Link to="/therapies" style={{
                padding: '8px 16px',
                border: `1px solid ${theme.primary}`,
                borderRadius: '20px',
                color: theme.primary,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}>
                Learn more
              </Link>
              <Link to="/book" style={{
                padding: '8px 16px',
                backgroundColor: theme.primary,
                borderRadius: '20px',
                color: theme.cream,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}>
                Book now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div style={{
        padding: isMobile ? '180px 20px 40px' : '200px 40px 80px',
        backgroundColor: theme.cream,
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
              color: theme.darkBrown,
              fontSize: isMobile ? '2rem' : '2.5rem',
              marginBottom: '1.5rem',
              fontWeight: 700
            }}>
              Ancient Wisdom, Modern Wellness
            </h2>
            <p style={{
              color: '#666',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              marginBottom: '2rem'
            }}>
              MTM (明天明) embodies the harmony of Eastern wellness traditions, where every treatment is a journey towards balance, health, and natural beauty. Our approach combines ancient wisdom with modern techniques for holistic scalp care and mental clarity.
            </p>

            <div style={{ marginTop: '40px' }}>
              <h3 style={{ color: theme.accent, marginBottom: '1rem', fontSize: '1.3rem', fontWeight: 600 }}>
                Cultural Wellness Philosophy
              </h3>
              <p style={{ color: '#666', marginBottom: '2rem' }}>
                Inspired by Eastern traditions, where every ritual, from scalp therapy to relaxation techniques, is rooted in the belief that health and beauty are interconnected. Our treatments focus on natural methods that promote both physical wellness and mental peace.
              </p>

              <h3 style={{ color: theme.accent, marginBottom: '1rem', fontSize: '1.3rem', fontWeight: 600 }}>
                Natural Hair Restoration
              </h3>
              <p style={{ color: '#666', marginBottom: '2rem' }}>
                Experience our signature treatment that naturally reverts grey hair while promoting deep relaxation and better sleep. We use chemical-free techniques passed down through generations of Eastern wellness practitioners.
              </p>

              <h3 style={{ color: theme.accent, marginBottom: '1rem', fontSize: '1.3rem', fontWeight: 600 }}>
                The Meaning of MTM (明天明)
              </h3>
              <p style={{ color: '#666', marginBottom: '2rem' }}>
                Our name represents hope and brightness - combining the characters for sun and moon (明), present moment (天), and future brightness (明). It embodies our commitment to helping you achieve a brighter, more balanced tomorrow through holistic wellness practices.
              </p>
            </div>
          </div>

          {/* Image */}
          <div style={{
            backgroundImage: 'url(/chinese.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '20px',
            minHeight: '500px',
            display: isMobile ? 'none' : 'block',
            border: `1px solid rgba(139, 115, 85, 0.1)`,
            boxShadow: '0 10px 30px rgba(139, 115, 85, 0.15)'
          }}></div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cavolini:wght@400;700&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
} 
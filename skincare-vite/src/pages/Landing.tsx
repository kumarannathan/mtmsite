import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Feature card data
const featureCards = [
  {
    title: 'MASSAGE SERVICES',
    heading: 'Mind & Scalp Relaxation',
    description: 'Deep relaxation therapy combining ancient and modern techniques.',
    buttonText: 'Book an appointment',
    buttonLink: '/book',
    image: '/img4.jpeg'
  },
  {
    title: 'FACIAL SERVICES',
    heading: 'Hair Therapy',
    description: 'Transformative therapy that reverts grey hair to natural color while restoring shine and improving scalp health.',
    buttonText: 'Book Hair Care',
    buttonLink: '/book',
    image: '/img5.jpeg'
  },
  {
    title: 'SPECIAL OFFER',
    heading: 'New Client Special',
    description: 'First-time guests save on their initial visit. Experience our signature services at a special introductory rate.',
    buttonText: 'View offers',
    buttonLink: '/therapies/#promotions',
    image: '/chinese.jpeg'
  }
];

// Define theme colors
const theme = {
  primary: '#1B4D3E', // Deep forest green
  secondary: '#D4AF37', // Gold
  white: '#FFFFFF',
  lightGreen: '#2A6B57', // Lighter green for hover states
  cardBg: '#F8FFF9' // Very light green tint for cards
};

export default function Landing1() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = featureCards.length;

  // Handle responsive behavior
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
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
      backgroundColor: theme.white,
      fontFamily: 'Nunito, Inter, Arial, sans-serif'
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
            color: theme.white,
            textShadow: `2px 2px 4px rgba(0,0,0,0.2)`,
            lineHeight: 1.1
          }}>
            Personalized Scalp & Mind Therapy
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
            MTM offers holistic, evidence-based scalp and relaxation experiences rooted in ritual, culture, and innovation.
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
              Book an appointment
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
                    {card.title}
                  </h3>
                  <h2 style={{
                    color: theme.primary,
                    marginBottom: '0.75rem',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    lineHeight: 1.2
                  }}>
                    {card.heading}
                  </h2>
                  <p style={{
                    color: '#555',
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
        backgroundColor: theme.white,
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
                borderRadius: '4px',
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
                borderRadius: '4px',
                color: theme.white,
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
                Learn more
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
                Book now
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
                src="/spahair.svg" 
                alt="Hair Restoration Icon" 
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
                Learn more
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
                Book now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div style={{
        padding: isMobile ? '180px 20px 40px' : '200px 40px 80px',
        backgroundColor: theme.white,
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
              Discover the Balance of Eastern Wellness
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
              <h3 style={{ color: theme.secondary, marginBottom: '1rem', fontSize: '1.3rem', fontWeight: 600 }}>
                Cultural Wellness Philosophy
              </h3>
              <p style={{ color: '#666', marginBottom: '2rem' }}>
                Inspired by Eastern traditions, where every ritual, from scalp therapy to relaxation techniques, is rooted in the belief that health and beauty are interconnected. Our treatments focus on natural methods that promote both physical wellness and mental peace.
              </p>

              <h3 style={{ color: theme.secondary, marginBottom: '1rem', fontSize: '1.3rem', fontWeight: 600 }}>
                Natural Hair Restoration
              </h3>
              <p style={{ color: '#666', marginBottom: '2rem' }}>
                Experience our signature treatment that naturally reverts grey hair while promoting deep relaxation and better sleep. We use chemical-free techniques passed down through generations of Eastern wellness practitioners.
              </p>

              <h3 style={{ color: theme.secondary, marginBottom: '1rem', fontSize: '1.3rem', fontWeight: 600 }}>
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
            border: `1px solid rgba(27, 77, 62, 0.1)`
          }}></div>
        </div>
      </div>
    </div>
  );
} 
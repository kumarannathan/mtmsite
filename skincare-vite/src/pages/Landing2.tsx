import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Service data for the new design
const services = [
  {
    icon: '🧘',
    title: 'Mind Therapy',
    description: 'Deep relaxation through Tibetan gong therapy and meditation techniques',
    color: '#EEF2FF' // Indigo light
  },
  {
    icon: '💆',
    title: 'Scalp Care',
    description: 'Natural hair restoration and scalp health treatments',
    color: '#F0FDFA' // Teal light
  },
  {
    icon: '✨',
    title: 'Wellness Rituals',
    description: 'Ancient Eastern practices for holistic mind-body balance',
    color: '#FEF3C7' // Amber light
  }
];

// Testimonials data
const testimonials = [
  {
    text: "MTM transformed my approach to wellness. The scalp therapy is unlike anything I've experienced.",
    author: "Sarah Chen",
    role: "Wellness Enthusiast"
  },
  {
    text: "The natural hair restoration treatment exceeded my expectations. My hair has never felt healthier.",
    author: "Michael Rodriguez",
    role: "Returning Client"
  }
];

// Modern theme colors - Purple & Teal Palette
const theme = {
  primary: '#6366F1', // Indigo purple
  secondary: '#14B8A6', // Teal
  accent: '#F59E0B', // Amber
  neutral: '#1E293B', // Slate dark
  light: '#F8FAFC', // Slate light
  dark: '#0F172A', // Slate very dark
  success: '#10B981', // Emerald
  cardBg: '#FFFFFF',
  purple: '#8B5CF6', // Violet
  pink: '#EC4899' // Pink
};

export default function Landing2() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [logoScale, setLogoScale] = useState(1.6);
  const [isVisible, setIsVisible] = useState(false);

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
      if (window.scrollY > 50) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle initial logo animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoScale(1.0);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: theme.light,
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      overflowX: 'hidden'
    }}>
      {/* Hero Section - Split Screen Design */}
      <section style={{
        height: '100vh',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        position: 'relative',
        marginTop: '-80px'
      }}>
        {/* Left Side - Content */}
        <div style={{
          flex: isMobile ? 'none' : '1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: isMobile ? '120px 24px 60px' : '0 80px',
          backgroundColor: theme.primary,
          color: theme.light,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Animated background elements */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.1,
            background: `radial-gradient(circle at 20% 80%, ${theme.secondary} 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, ${theme.purple} 0%, transparent 50%)`
          }}></div>

          <div style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '500px'
          }}>
            {/* Logo */}
            <div style={{
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <img 
                src="/mtm.png" 
                alt="MTM Logo" 
                style={{
                  height: '60px',
                  width: 'auto',
                  filter: 'brightness(0) invert(1)',
                  transform: `scale(${logoScale})`,
                  transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
              <div style={{
                width: '2px',
                height: '40px',
                backgroundColor: theme.secondary,
                opacity: 0.6
              }}></div>
              <span style={{
                fontSize: '1.2rem',
                fontWeight: 300,
                letterSpacing: '2px',
                opacity: 0.8
              }}>WELLNESS</span>
            </div>

            <h1 style={{
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}>
              Eastern Wisdom,
              <br />
              <span style={{ color: theme.secondary }}>Modern Wellness</span>
            </h1>

            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.6,
              marginBottom: '2.5rem',
              opacity: 0.9,
              fontWeight: 400
            }}>
              Experience the harmony of ancient Eastern traditions and contemporary wellness practices. 
              MTM offers transformative therapies for mind, body, and spirit.
            </p>

            <div style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <Link to="/book" style={{ textDecoration: 'none' }}>
                <button style={{
                  backgroundColor: theme.secondary,
                  color: theme.dark,
                  border: 'none',
                  padding: '16px 32px',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(20, 184, 166, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(20, 184, 166, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(20, 184, 166, 0.3)';
                }}
                >
                  Book Consultation
                </button>
              </Link>
              <Link to="/therapies" style={{ textDecoration: 'none' }}>
                <button style={{
                  backgroundColor: 'transparent',
                  color: theme.light,
                  border: `2px solid ${theme.light}`,
                  padding: '14px 30px',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = theme.light;
                  e.currentTarget.style.color = theme.primary;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = theme.light;
                }}
                >
                  Explore Services
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Visual */}
        <div style={{
          flex: isMobile ? 'none' : '1',
          position: 'relative',
          height: isMobile ? '50vh' : '100%',
          background: `linear-gradient(135deg, ${theme.neutral} 0%, ${theme.primary} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
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
              opacity: 0.7
            }}
          >
            <source src="/scalpcare.mp4" type="video/mp4" />
          </video>

          {/* Overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(45deg, rgba(30, 41, 59, 0.8) 0%, rgba(99, 102, 241, 0.6) 100%)`
          }}></div>

          {/* Floating elements */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${theme.secondary}20, transparent)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              animation: 'pulse 3s infinite'
            }}>
              🧘
            </div>
            <div style={{
              textAlign: 'center',
              color: theme.light
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                marginBottom: '8px'
              }}>
                Mind & Body Harmony
              </h3>
              <p style={{
                fontSize: '1rem',
                opacity: 0.8
              }}>
                Discover inner peace through ancient wisdom
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={{
        padding: isMobile ? '80px 24px' : '120px 80px',
        backgroundColor: theme.cardBg
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            <h2 style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: 700,
              color: theme.dark,
              marginBottom: '1rem'
            }}>
              Our Signature Therapies
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Each therapy is carefully crafted to restore balance and promote natural wellness
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '32px'
          }}>
            {services.map((service, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: service.color,
                  padding: '40px 32px',
                  borderRadius: '16px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '1px solid rgba(0,0,0,0.05)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '24px'
                }}>
                  {service.icon}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: theme.dark,
                  marginBottom: '16px'
                }}>
                  {service.title}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#666',
                  lineHeight: 1.6
                }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{
        padding: isMobile ? '80px 24px' : '120px 80px',
        backgroundColor: theme.primary,
        color: theme.light
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontWeight: 700,
            marginBottom: '80px'
          }}>
            What Our Clients Say
          </h2>

          <div style={{
            position: 'relative',
            minHeight: '200px'
          }}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  opacity: currentTestimonial === index ? 1 : 0,
                  transform: currentTestimonial === index ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.5s ease'
                }}
              >
                <blockquote style={{
                  fontSize: '1.3rem',
                  lineHeight: 1.6,
                  marginBottom: '32px',
                  fontStyle: 'italic'
                }}>
                  "{testimonial.text}"
                </blockquote>
                <div>
                  <div style={{
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    marginBottom: '4px'
                  }}>
                    {testimonial.author}
                  </div>
                  <div style={{
                    opacity: 0.7,
                    fontSize: '0.9rem'
                  }}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '40px'
          }}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: 'none',
                  background: currentTestimonial === index ? theme.secondary : 'rgba(255,255,255,0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: isMobile ? '80px 24px' : '120px 80px',
        backgroundColor: theme.cardBg,
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontWeight: 700,
            color: theme.dark,
            marginBottom: '1.5rem'
          }}>
            Ready to Begin Your Wellness Journey?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            marginBottom: '2.5rem',
            lineHeight: 1.6
          }}>
            Experience the transformative power of Eastern wellness traditions combined with modern techniques.
          </p>
          <Link to="/book" style={{ textDecoration: 'none' }}>
            <button style={{
              backgroundColor: theme.primary,
              color: theme.light,
              border: 'none',
              padding: '18px 40px',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
            }}
            >
              Book Your First Session
            </button>
          </Link>
        </div>
      </section>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}
      </style>
    </div>
  );
} 
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// import CallToActionBanner from '../components/CallToActionBanner';
import AddOnPillCta from '../components/AddOnPillCta';

// Service data with enhanced descriptions
const MAIN_SERVICES = [
  {
    id: 'mind-scalp',
    title: 'Mind & Scalp Therapy',
    subtitle: 'Deep relaxation therapy combining ancient and modern techniques',
    description: 'Experience the perfect harmony of mental clarity and scalp wellness. Our signature therapy combines traditional healing practices with contemporary techniques to create a transformative experience that addresses both your mental state and scalp health simultaneously.',
    longDescription: 'This comprehensive treatment begins with a gentle scalp assessment, followed by a series of therapeutic techniques designed to release tension and promote circulation. The session incorporates mindfulness practices, ensuring your mind and body achieve complete relaxation. Perfect for those seeking stress relief and improved scalp condition.',
    image: '/mindScalp.jpg',
    sectionNumber: '01',
    duration: '40 min',
    price: '$1,300 MXN',
    benefits: [
      'Reduces stress and anxiety',
      'Improves scalp circulation',
      'Promotes deeper sleep',
      'Relieves tension headaches',
    ],
  },
  {
    id: 'hair-growth',
    title: 'Hair Growth & Preservation',
    subtitle: 'Specialized treatment focused on stimulating natural hair growth',
    description: 'Our advanced hair growth therapy utilizes proven techniques to stimulate follicles and promote healthy hair development. This treatment is designed for those experiencing hair thinning or seeking to maintain their natural hair vitality.',
    longDescription: 'Using a combination of scalp stimulation, nutrient-rich treatments, and specialized massage techniques, this therapy works to awaken dormant follicles and strengthen existing hair. The treatment includes a comprehensive scalp analysis and personalized care plan to ensure optimal results for your specific hair type and concerns.',
    image: '/growth.jpg',
    sectionNumber: '02',
    duration: '60 min',
    price: '$1,700 MXN',
    benefits: [
      'Stimulates dormant hair follicles',
      'Strengthens existing hair',
      'Reduces hair thinning',
      'Improves scalp health',
    ],
  },
  {
    id: 'hair-rejuvenation',
    title: 'Hair Rejuvenation Therapy',
    subtitle: 'Transformative therapy that naturally restores hair vitality',
    description: 'Experience the remarkable transformation of your hair\'s natural color and shine. This innovative therapy works to naturally restore your hair\'s youthful appearance while improving overall scalp health and hair texture.',
    longDescription: 'Our rejuvenation therapy combines ancient wisdom with modern science to address premature graying and hair vitality. The treatment includes specialized scalp treatments, natural pigment restoration techniques, and intensive moisture therapy to bring back your hair\'s natural luster and strength.',
    image: '/rejuvenation.jpg',
    sectionNumber: '03',
    duration: '60 min',
    price: '$1,700 MXN',
    benefits: [
      'Reverts grey hair to natural color',
      'Restores natural shine',
      'Improves scalp health',
      'Improves hair elasticity',
    ],
  },
];

// Add-on services data
const ADDON_SERVICES = [
  {
    id: 'gong-therapy',
    title: 'Acoustic & Tibetan Bowl Vibration Therapy',
    subtitle: 'Sound healing for deep relaxation and energy balance',
    description: 'Immerse yourself in the transformative power of sound. Our Gong Therapy session uses ancient instruments to create healing vibrations that promote relaxation, reduce stress, and restore energetic harmony.',
    longDescription: 'During this session, the resonant tones of the gong wash over you, helping to release tension and clear mental blockages. Gong Therapy is ideal for those seeking a meditative, deeply restorative experience that nurtures both mind and body.',
    image: '/gongTherapy.jpg',
    sectionNumber: '01',
    duration: '15 min',
    price: '$250 MXN',
    benefits: [
      'Deepens meditation practice',
      'Releases emotional blockages',
      'Enhances cognitive clarity',
      'Promotes deep relaxation',
    ],
  },
  {
    id: 'hair-styling',
    title: 'Hair Styling',
    subtitle: 'Finish your session with a professional style',
    description: 'Complete your spa experience with our expert hair styling add-on. Whether you prefer a blowout, soft waves, or a sleek finish, our stylists will ensure you leave looking and feeling your best.',
    longDescription: 'Our styling service uses premium products and techniques tailored to your hair type and desired look. It’s the perfect way to transition from relaxation to your next event or simply enjoy a little extra pampering.\n\nOptions:\n- Straightening\n- Wavy with styling cream\n\nIf hair longer than shoulders, check with attendance before booking.',
    image: '/styling.jpg',
    sectionNumber: '02',
    duration: '20 min',
    price: '$200 MXN',
    benefits: [
      'Straightened (Planchado)',
      'Curly with hair cream (Quebrado con crema para peinar)',
      'Professional styling',
      'Premium hair products',
    ],
  },
];

// Design system
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

export default function Therapies() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('mind-scalp');
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const addOnSectionRef = useRef<HTMLDivElement | null>(null);

  // Handle responsive behavior
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSection(sectionId);
    }
  };

  // Intersection Observer for parallax effects
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px'
      }
    );

    const sections = document.querySelectorAll('.service-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: theme.background, 
      fontFamily: 'Inter, Arial, sans-serif',
      overflowX: 'hidden',
      overflowY: 'auto',
      scrollSnapType: 'y mandatory',
    }}>
      {/* Hero Section with Service Cards */}
      <section style={{ 
        maxWidth: 1400, 
        margin: '0 auto', 
        padding: '80px 20px 120px 20px', 
        textAlign: 'center' 
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: 32, 
          marginTop: '2%' 
        }}>
          <span style={{
            background: 'rgba(27,77,62,0.08)',
            color: '#19934c',
            fontWeight: 600,
            fontSize: '1rem',
            borderRadius: 999,
            padding: '8px 24px',
            letterSpacing: '0.04em',
            fontFamily: 'Inter, Arial, sans-serif',
            display: 'inline-block',
          }}>
            Our Therapies
          </span>
        </div>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontWeight: 600,
          fontSize: isMobile ? '2.5rem' : '3.5rem',
          color: theme.primary,
          marginBottom: 24,
          letterSpacing: '-1px',
          lineHeight: 1.1,
        }}>
          Signature Healing Treatments
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: theme.textLight,
          maxWidth: 700,
          margin: '0 auto 60px',
          fontFamily: 'Inter, Arial, sans-serif',
          lineHeight: 1.6,
        }}>
          Discover our curated collection of transformative therapies, each designed to restore balance, 
          promote healing, and elevate your well-being through ancient wisdom and modern techniques. All therpaies come with customised care routine, fresh tea, and a snack.
        </p>


        <div style={{ margin: isMobile ? '0px 100px 120px 100px' : '0px 0 40px 0', display: 'flex', justifyContent: 'center' }}>
        <AddOnPillCta onClick={() => {
          if (addOnSectionRef.current) {
            addOnSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }} />
      </div>
      
        {/* Service Cards Grid - FULL IMAGE CARDS WITH OVERLAY TEXT ONLY */}
        <div style={{
            display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: 32,
          maxWidth: 1200,
          margin: '0 auto'
        }}>
          {MAIN_SERVICES.map((service) => (
            <div
              key={service.id}
              onClick={() => scrollToSection(service.id)}
              style={{
                position: 'relative',
                borderRadius: 20,
                overflow: 'hidden',
                minHeight: isMobile ? 220 : 500,
                height: isMobile ? 220 : 320,
                boxShadow: '0 8px 32px rgba(27,77,62,0.08)',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                background: `url(${service.image}) center center/cover no-repeat`,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'scale(1.03) translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(27,77,62,0.15)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(27,77,62,0.08)';
              }}
            >
              {/* Gradient overlay for readability */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(120deg, rgba(27,77,62,0.10) 30%, rgba(0,0,0,0.38) 100%)',
                zIndex: 1,
              }} />
              {/* Text Overlay */}
              <div style={{
                position: 'relative',
                zIndex: 2,
                padding: isMobile ? '20px' : '32px',
                color: '#fff',
                textAlign: 'left',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                minHeight: isMobile ? 120 : 160,
                background: 'none',
              }}>
                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontWeight: 700,
                  fontSize: isMobile ? '1.2rem' : '1.5rem',
                  marginBottom: 8,
                  color: '#fff',
                  textShadow: '0 2px 12px rgba(0,0,0,0.25)',
                  letterSpacing: '-0.5px',
                  lineHeight: 1.2
                }}>{service.title}</h3>
                <p style={{
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontSize: isMobile ? '0.98rem' : '1.08rem',
                  color: '#fff',
                  textShadow: '0 2px 8px rgba(0,0,0,0.18)',
                  marginBottom: 0,
                  lineHeight: 1.5,
                  fontWeight: 400,
                  maxWidth: '90%'
                }}>{service.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Service Sections with Parallax */}
      {MAIN_SERVICES.map((service, index) => (
        <section
          key={service.id}
          ref={(el) => {
            sectionRefs.current[service.id] = el;
          }}
          className="service-section"
          style={{
            minHeight: '100vh',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: isMobile ? '80px 20px' : '120px 40px',
            background: index % 2 === 1 ? theme.background : theme.white,
            scrollSnapAlign: 'start',
          }}
        >
          <div style={{
            maxWidth: 1400,
            margin: '0 auto',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 60 : 80,
            alignItems: 'center'
          }}>
            {/* Text Content */}
            <div style={{
              order: index % 2 === 0 ? 1 : 2,
              opacity: 0,
              transform: 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            className="animate-in"
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 24
              }}>
                <span style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: theme.accent,
                  letterSpacing: '2px',
                  marginRight: 16
                }}>
                  {service.sectionNumber}
                </span>
                <div style={{
                  flex: 1,
                  height: '1px',
                  background: 'rgba(209, 185, 129, 0.3)'
                }} />
              </div>
              
              <h2 style={{
                fontFamily: 'Playfair Display, serif',
                fontWeight: 800,
                fontSize: isMobile ? '2.2rem' : '3rem',
                color: theme.primary,
                marginBottom: 20,
                letterSpacing: '-1px',
                lineHeight: 1.1
              }}>
                {service.title}
              </h2>
              
              <p style={{
                fontSize: '1.1rem',
                color: theme.textLight,
                marginBottom: 32,
                lineHeight: 1.7,
                fontFamily: 'Inter, Arial, sans-serif'
              }}>
                {service.description}
              </p>
              
              <p style={{
                fontSize: '1rem',
                color: theme.textLight,
                marginBottom: 40,
                lineHeight: 1.6,
                fontFamily: 'Inter, Arial, sans-serif'
              }}>
                {service.longDescription}
              </p>
              
              <div style={{
                display: 'flex',
                gap: 16,
                flexWrap: 'wrap'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontSize: '1.08rem',
                  color: theme.primary,
                  fontWeight: 600,
                  marginBottom: 0,
                }}>
                  <span>{service.duration}</span>
                  <span style={{ color: '#bbb', fontWeight: 400 }}>|</span>
                  <span>{service.price}</span>
                </div>
              </div>
              <div style={{ margin: '24px 0 0 0' }}>
                <div style={{
                  fontWeight: 700,
                  color: theme.primary,
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.1rem',
                  marginBottom: 10,
                  letterSpacing: '0.5px',
                }}></div>
                <ul style={{
                  listStyle: 'disc',
                  paddingLeft: 24,
                  color: theme.textLight,
                  fontSize: '1.08rem',
                  margin: 0,
                  marginBottom: 24,
                  lineHeight: 1.7,
                }}>
                  {service.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
              
              <div style={{
                display: 'flex',
                gap: 16,
                flexWrap: 'wrap'
              }}>
                <Link to="/book" style={{
                  padding: '16px 32px',
                  backgroundColor: theme.primary,
                  color: theme.white,
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = theme.secondary;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = theme.primary;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                  Book Now
                </Link>
                
                <div style={{
                  padding: '16px 32px',
                  border: `1px solid ${theme.primary}`,
                  color: theme.primary,
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '1rem'
                }}>
                  {service.duration} • {service.price}
                </div>
              </div>
            </div>

            {/* Image with Parallax */}
            <div style={{
              order: index % 2 === 0 ? 2 : 1,
              position: 'relative',
              height: isMobile ? '300px' : '500px',
              borderRadius: '20px',
              overflow: 'hidden',
              opacity: 0,
              transform: 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
            }}
            className="animate-in"
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `url(${service.image}) center center/cover no-repeat`,
                transform: 'scale(1.1)',
                transition: 'transform 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              />
            </div>
          </div>
        </section>
      ))}

      {/* Add-on Service Sections */}
      <div ref={addOnSectionRef} />
      {ADDON_SERVICES.map((service, index) => (
        <section
          key={service.id}
          className="service-section"
          style={{
            minHeight: '100vh',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: isMobile ? '70px 20px' : '100px 40px',
            background: (MAIN_SERVICES.length + index) % 2 === 0 ? theme.background : theme.white,
            scrollSnapAlign: 'start',
          }}
        >
          
          <div style={{
            maxWidth: 1400,
            margin: '0 auto',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 60 : 80,
            alignItems: 'center'
          }}>
            {/* Text Content */}
            <div style={{
              order: (MAIN_SERVICES.length + index) % 2 === 0 ? 1 : 2,
              opacity: 0,
              transform: 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            className="animate-in"
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 24
              }}>
                <span style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: theme.accent,
                  letterSpacing: '2px',
                  marginRight: 16
                }}>
                  {service.sectionNumber}
                </span>
                <div style={{
                  flex: 1,
                  height: '1px',
                  background: 'rgba(209, 185, 129, 0.3)'
                }} />
              </div>
              
              <h2 style={{
                fontFamily: 'Playfair Display, serif',
                fontWeight: 800,
                fontSize: isMobile ? '2.2rem' : '3rem',
                color: theme.primary,
                marginBottom: 20,
                letterSpacing: '-1px',
                lineHeight: 1.1
              }}>
                {service.title}
              </h2>
              
              <p style={{
                fontSize: '1.1rem',
                color: theme.textLight,
                marginBottom: 32,
                lineHeight: 1.7,
                fontFamily: 'Inter, Arial, sans-serif'
              }}>
                {service.description}
              </p>
              
              <p style={{
                fontSize: '1rem',
                color: theme.textLight,
                marginBottom: 40,
                lineHeight: 1.6,
                fontFamily: 'Inter, Arial, sans-serif'
              }}>
                {service.longDescription}
              </p>
              
              <div style={{
                display: 'flex',
                gap: 16,
                flexWrap: 'wrap'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontSize: '1.08rem',
                  color: theme.primary,
                  fontWeight: 600,
                  marginBottom: 0,
                }}>
                  <span>{service.duration}</span>
                  <span style={{ color: '#bbb', fontWeight: 400 }}>|</span>
                  <span>{service.price}</span>
                </div>
              </div>
              <div style={{ margin: '24px 0 0 0' }}>
                <div style={{
                  fontWeight: 700,
                  color: theme.primary,
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.1rem',
                  marginBottom: 0,
                  letterSpacing: '0.5px',
                }}></div>
                <ul style={{
                  listStyle: 'disc',
                  paddingLeft: 24,
                  color: theme.textLight,
                  fontSize: '1.08rem',
                  margin: 0,
                  marginBottom: 24,
                  lineHeight: 1.7,
                }}>
                  {service.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
              
              <div style={{
                display: 'flex',
                gap: 16,
                flexWrap: 'wrap'
              }}>
                {/* <Link to="/book" style={{
                  padding: '16px 32px',
                  backgroundColor: theme.primary,
                  color: theme.white,
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = theme.secondary;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = theme.primary;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                  Book Now
                </Link> */}
              </div>
            </div>

            {/* Image with Parallax */}
            <div style={{
              order: (MAIN_SERVICES.length + index) % 2 === 0 ? 2 : 1,
              position: 'relative',
              height: isMobile ? '300px' : '500px',
              borderRadius: '20px',
              overflow: 'hidden',
              opacity: 0,
              transform: 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
            }}
            className="animate-in"
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `url(${service.image}) center center/cover no-repeat`,
                transform: 'scale(1.1)',
                transition: 'transform 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              />
            </div>
          </div>
        </section>
      ))}

      {/* Call to Action Section
      <section style={{
        padding: '120px 40px',
        background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
        textAlign: 'center',
        color: theme.white
      }}>
        <div style={{
          maxWidth: 800,
          margin: '0 auto'
        }}>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 800,
            fontSize: isMobile ? '2.5rem' : '3.5rem',
            marginBottom: 24,
            letterSpacing: '-1px'
          }}>
            Begin Your Healing Journey
          </h2>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: 40,
            lineHeight: 1.6,
            opacity: 0.9
          }}>
            Experience the transformative power of our signature therapies. 
            Book your session today and discover the path to holistic wellness.
          </p>
          <Link to="/book" style={{
            padding: '20px 40px',
            backgroundColor: theme.white,
            color: theme.primary,
            textDecoration: 'none',
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '1.1rem',
            transition: 'all 0.3s ease',
            display: 'inline-block',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)';
          }}
          >
            Book Your Session
          </Link>
        </div>
      </section> */}

      {/* Custom CSS for animations */}
      <style>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        @media (max-width: 768px) {
          .service-section {
            padding: 60px 20px !important;
          }
        }
      `}</style>
    </div>
  );
} 
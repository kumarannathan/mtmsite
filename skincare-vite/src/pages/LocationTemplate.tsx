import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Location data
const locationData = [
  {
    id: 'san-luis-potosi',
    name: 'MTM - San Luis Potosi',
    address: 'Joaquin Meade 136, Lomas 1er Secc, CP 78290, San Luis Potosi, SLP, Mexico',
    phone: '+52 56 6156 7879',
    mapsUrl: 'https://maps.app.goo.gl/gtKcAsqH7hd87hQD8',
    coordinates: {lat: 22.1565, lng: -100.9855},
    image: '/locationMTM.jpg',
    description: 'Our flagship location in San Luis Potosi offers a luxurious retreat for holistic wellness and personalized care. Experience our signature treatments in a serene environment designed for your complete relaxation and rejuvenation.',
    hours: 'Weekdays: 10am - 6pm\n'
  }
];

export default function LocationTemplate() {
  const { locationId } = useParams<{ locationId: string }>();
  const { t, i18n } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  
  // Handle responsive behavior
  React.useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Find the location data based on the URL parameter
  const location = locationData.find(loc => loc.id === locationId);
  
  // If location doesn't exist, show error
  if (!location) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '40px',
        textAlign: 'center'
      }}>
        <div>
          <h1>{t('location_not_found')}</h1>
          <p>{t('location_not_found_message')}</p>
          <Link to="/locations" style={{
            display: 'inline-block',
            marginTop: '20px',
            background: '#ec1c24',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600
          }}>{t('view_all_locations')}</Link>
        </div>
      </div>
    );
  }
  
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#fdf9f5',
        fontFamily: 'Inter, Arial, sans-serif',
        paddingBottom: '80px'
      }}
    >
      {/* Header Section */}
      <section style={{ 
        maxWidth: 1400, 
        margin: '0 auto', 
        padding: isMobile ? '60px 20px 40px 20px' : '80px 20px 60px 20px', 
      paddingTop: isMobile ? '100px' : '4%',
        textAlign: 'center',
        background: '#fdf9f5'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: 24, 
          marginTop: '2%'
        }}>
          <span style={{
            background: 'rgba(27,77,62,0.08)',
            color: '#19934c',
            fontWeight: 600,
            fontSize: isMobile ? '0.9rem' : '1rem',
            borderRadius: 999,
            padding: isMobile ? '6px 20px' : '8px 24px',
            letterSpacing: '0.04em',
            fontFamily: 'Inter, Arial, sans-serif',
            display: 'inline-block',
          }}>
            {t('location_details')}
          </span>
        </div>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontWeight: 600,
          fontSize: isMobile ? '2.5rem' : '3.5rem',
          color: '#1B4D3E',
          marginBottom: 24,
          letterSpacing: '-1px',
          lineHeight: 1.1,
        }}>
          {location.name.split(' - ')[1]}
        </h1>
        <p style={{
          fontSize: isMobile ? '1rem' : '1.2rem',
          color: '#666',
          maxWidth: isMobile ? '100%' : 700,
          margin: '0 auto 40px',
          fontFamily: 'Inter, Arial, sans-serif',
          lineHeight: 1.6,
        }}>
          {location.address}
        </p>
      </section>

      {/* Main Content Section */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '0 16px' : '0 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '24px' : '40px',
        marginTop: isMobile ? '-50px' : '-70px',
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: isMobile ? '24px' : '32px',
        }}>
          {/* Location Image and Info */}
          <div style={{
            flex: '1 1 500px',
            background: 'rgba(255,255,255,0.92)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
          }}>
            <div style={{
              height: isMobile ? '200px' : '300px',
              overflow: 'hidden',
            }}>
              <img 
                src={location.image} 
                alt={location.name} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div style={{
              padding: isMobile ? '24px' : '32px',
            }}>
              <h2 style={{
                fontFamily: 'Inter, Arial, sans-serif',
                fontWeight: 600,
                fontSize: isMobile ? '1.4rem' : '1.6rem',
                color: '#111',
                marginBottom: '16px',
                letterSpacing: '-0.01em',
              }}>{t('about_this_location')}</h2>
              <p style={{
                fontSize: isMobile ? '1rem' : '1.1rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '24px',
              }}>
                {location.description}
              </p>
              
              <div style={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row',
                flexWrap: 'wrap', 
                gap: isMobile ? '24px' : '32px',
                marginBottom: '24px' 
              }}>
                <div>
                  <h3 style={{ 
                    fontSize: isMobile ? '1rem' : '1.1rem', 
                    fontWeight: 600, 
                    marginBottom: '8px' 
                  }}>{t('hours')}</h3>
                  <div style={{ 
                    whiteSpace: 'pre-line', 
                    color: '#555', 
                    lineHeight: 1.6,
                    fontSize: isMobile ? '0.9rem' : '1rem',
                  }}>
                    {t('weekdays')}
                  </div>
                </div>
                
                <div>
                  <h3 style={{ 
                    fontSize: isMobile ? '1rem' : '1.1rem', 
                    fontWeight: 600, 
                    marginBottom: '8px' 
                  }}>{t('contact')}</h3>
                  <p style={{ 
                    color: '#555', 
                    marginBottom: '4px',
                    fontSize: isMobile ? '0.9rem' : '1rem',
                  }}>
                    <strong>{t('phone')}</strong> <a href={`tel:${location.phone}`} style={{ color: '#19934c', textDecoration: 'none' }}>{location.phone}</a>
                  </p>
                  <a 
                    href={location.mapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '6px',
                      color: '#19934c', 
                      textDecoration: 'none', 
                      fontWeight: 500,
                      marginTop: '8px',
                      fontSize: isMobile ? '0.9rem' : '1rem',
                    }}
                  >
                    <span>{t('get_directions')}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 17L17 7" stroke="#19934c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 7H17V17" stroke="#19934c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              <Link 
                to="/book-calendly" 
                style={{ 
                  display: 'inline-block',
                  backgroundColor: '#19934c',
                  color: 'white',
                  padding: isMobile ? '10px 20px' : '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  marginTop: '16px',
                  transition: 'all 0.2s ease',
                }}
              >
                {t('book_appointment')}
              </Link>
            </div>
          </div>
          
          {/* Map and Contact Form */}
          <div style={{
            flex: '1 1 340px',
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '24px' : '32px',
          }}>
            {/* Google Map */}
            <div style={{
              height: isMobile ? '250px' : '320px',
              background: 'rgba(255,255,255,0.92)',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
            }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8073.029660474845!2d-101.02066151328684!3d22.1383935704247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842a98da9ff1f979%3A0x7b611dd395a16dcc!2sJoaqu%C3%ADn%20Meade%20136%2C%20Las%20Lomas%201ra%20Secc%2C%2078290%20San%20Luis%20Potos%C3%AD%2C%20S.L.P.%2C%20Mexico!5e0!3m2!1sen!2sus!4v1749076137958!5m2!1sen!2sus" 
                style={{
                  border: 0,
                  width: '100%',
                  height: '100%',
                }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            
            {/* Image Gallery */}
            <div style={{
              background: 'rgba(255,255,255,0.92)',
              borderRadius: '20px',
              padding: isMobile ? '24px' : '32px',
              boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
            }}>
              <h2 style={{
                fontFamily: 'Inter, Arial, sans-serif',
                fontWeight: 600,
                fontSize: isMobile ? '1.4rem' : '1.6rem',
                color: '#111',
                marginBottom: '24px',
                letterSpacing: '-0.01em',
              }}>{t('gallery')}</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(auto-fit, minmax(80px, 1fr))' : 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: isMobile ? '12px' : '16px',
              }}>
                {[1,2,3,4,5,6].map(num => (
                  <img
                    key={num}
                    src={`/mtm${num}.jpg`}
                    alt={`Gallery ${num}`}
                    style={{
                      width: '100%',
                      aspectRatio: '1/1',
                      objectFit: 'cover',
                      borderRadius: '14px',
                      boxShadow: '0 2px 12px rgba(44,44,84,0.08)',
                      background: '#f3f3f3',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
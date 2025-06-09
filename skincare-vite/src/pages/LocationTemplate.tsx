import React from 'react';
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
    image: '/building1.jpg',
    description: 'Our flagship location in San Luis Potosi offers a luxurious retreat for holistic wellness and personalized care. Experience our signature treatments in a serene environment designed for your complete relaxation and rejuvenation.',
    hours: 'Monday - Saturday: 9am - 8pm\nSunday: 10am - 6pm'
  }
];

export default function LocationTemplate() {
  const { locationId } = useParams<{ locationId: string }>();
  const { t, i18n } = useTranslation();
  
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
          <h1>Location not found</h1>
          <p>Sorry, we couldn't find the location you're looking for.</p>
          <Link to="/locations" style={{
            display: 'inline-block',
            marginTop: '20px',
            background: '#ec1c24',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600
          }}>View All Locations</Link>
        </div>
      </div>
    );
  }
  
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'white',
        fontFamily: 'Inter, Arial, sans-serif',
        paddingBottom: '80px'
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
            {location.name.split(' - ')[1]}
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
            {location.address}
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '32px',
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
              height: '300px',
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
              padding: '32px',
            }}>
              <h2 style={{
                fontFamily: 'Inter, Arial, sans-serif',
                fontWeight: 600,
                fontSize: '1.6rem',
                color: '#111',
                marginBottom: '16px',
                letterSpacing: '-0.01em',
              }}>About This Location</h2>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '24px',
              }}>
                {location.description}
              </p>
              
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '32px',
                marginBottom: '24px' 
              }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Hours</h3>
                  <div style={{ whiteSpace: 'pre-line', color: '#555', lineHeight: 1.6 }}>
                    {location.hours}
                  </div>
                </div>
                
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Contact</h3>
                  <p style={{ color: '#555', marginBottom: '4px' }}>
                    <strong>Phone:</strong> <a href={`tel:${location.phone}`} style={{ color: '#19934c', textDecoration: 'none' }}>{location.phone}</a>
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
                      marginTop: '8px'
                    }}
                  >
                    <span>Get Directions</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 17L17 7" stroke="#19934c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 7H17V17" stroke="#19934c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              <Link 
                to="/book" 
                style={{ 
                  display: 'inline-block',
                  backgroundColor: '#19934c',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  marginTop: '16px',
                  transition: 'all 0.2s ease',
                }}
              >
                Book an Appointment
              </Link>
            </div>
          </div>
          
          {/* Map and Contact Form */}
          <div style={{
            flex: '1 1 340px',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}>
            {/* Google Map */}
            <div style={{
              height: '320px',
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
            
            {/* Contact Form */}
            <div style={{
              background: 'rgba(255,255,255,0.92)',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
            }}>
              <h2 style={{
                fontFamily: 'Inter, Arial, sans-serif',
                fontWeight: 600,
                fontSize: '1.6rem',
                color: '#111',
                marginBottom: '24px',
                letterSpacing: '-0.01em',
              }}>Contact Us</h2>
              
              <form>
                <div style={{ marginBottom: '16px' }}>
                  <label 
                    htmlFor="name" 
                    style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontWeight: 500, 
                      color: '#333' 
                    }}
                  >
                    Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      backgroundColor: '#f8f8f8',
                    }}
                    placeholder="Your name"
                  />
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <label 
                    htmlFor="email" 
                    style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontWeight: 500, 
                      color: '#333' 
                    }}
                  >
                    Email
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      backgroundColor: '#f8f8f8',
                    }}
                    placeholder="Your email"
                  />
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <label 
                    htmlFor="message" 
                    style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontWeight: 500, 
                      color: '#333' 
                    }}
                  >
                    Message
                  </label>
                  <textarea 
                    id="message" 
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      minHeight: '120px',
                      resize: 'vertical',
                      backgroundColor: '#f8f8f8',
                    }}
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  style={{ 
                    backgroundColor: '#19934c',
                    color: 'white',
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
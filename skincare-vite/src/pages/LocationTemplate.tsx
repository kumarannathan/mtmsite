import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

// Location data
const locationData = [
  {
    id: 'polanco',
    name: 'CDMX - Polanco',
    address: 'Av. Presidente Masaryk 123, Polanco, CDMX',
    phone: '+52 55 1234 5678',
    mapsUrl: 'https://goo.gl/maps/xyz',
    coordinates: {lat: 19.4319, lng: -99.1959},
    image: '/building1.jpg',
    description: 'Our flagship location in the heart of Polanco offers a luxurious retreat from the bustle of Mexico City. Our modern facility features private treatment rooms, a relaxation lounge, and a team of certified specialists ready to provide personalized care.',
    hours: 'Monday - Saturday: 9am - 8pm\nSunday: 10am - 6pm'
  },
  {
    id: 'roma',
    name: 'CDMX - Roma',
    address: 'Calle Colima 456, Roma Norte, CDMX',
    phone: '+52 55 8765 4321',
    mapsUrl: 'https://goo.gl/maps/abc',
    coordinates: {lat: 19.4173, lng: -99.1626},
    image: '/building2.jpg',
    description: 'Located in the trendy Roma Norte neighborhood, our boutique wellness center offers a cozy atmosphere with a focus on innovative treatments and personalized care in an intimate setting.',
    hours: 'Monday - Friday: 10am - 8pm\nSaturday: 10am - 7pm\nSunday: 11am - 5pm'
  },
  {
    id: 'condesa',
    name: 'CDMX - Condesa',
    address: 'Av. Michoacán 75, Condesa, CDMX',
    phone: '+52 55 2468 1357',
    mapsUrl: 'https://goo.gl/maps/def',
    coordinates: {lat: 19.4112, lng: -99.1767},
    image: '/building3.jpg',
    description: 'Our Condesa location blends seamlessly with the artistic neighborhood, offering a tranquil escape within walking distance of Parque México. Experience our signature treatments in a relaxed, bohemian atmosphere.',
    hours: 'Monday - Thursday: 11am - 8pm\nFriday - Saturday: 10am - 9pm\nSunday: 12pm - 6pm'
  },
  {
    id: 'santa-fe',
    name: 'CDMX - Santa Fe',
    address: 'Av. Vasco de Quiroga 3800, Santa Fe, CDMX',
    phone: '+52 55 9753 1246',
    mapsUrl: 'https://goo.gl/maps/ghi',
    coordinates: {lat: 19.3577, lng: -99.2674},
    image: '/building4.jpg',
    description: 'Our Santa Fe center provides a modern, sophisticated environment for busy professionals. With extended hours and efficient service, we help you integrate wellness into your demanding schedule.',
    hours: 'Monday - Friday: 8am - 9pm\nSaturday: 9am - 7pm\nSunday: 10am - 6pm'
  },
  {
    id: 'san-angel',
    name: 'CDMX - San Ángel',
    address: 'Av. de la Paz 44, San Ángel, CDMX',
    phone: '+52 55 8642 7531',
    mapsUrl: 'https://goo.gl/maps/jkl',
    coordinates: {lat: 19.3475, lng: -99.1871},
    image: '/building1.jpg',
    description: 'Nestled in historic San Ángel, our location is housed in a beautifully restored colonial building. Experience traditional and modern treatments while surrounded by the charm of old Mexico City.',
    hours: 'Tuesday - Sunday: 10am - 7pm\nClosed on Mondays'
  }
];

export default function LocationTemplate() {
  const { locationId } = useParams<{ locationId: string }>();
  const { lang } = useLanguage();
  
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
                    <strong>Phone:</strong> <a href={`tel:${location.phone}`} style={{ color: '#ec1c24', textDecoration: 'none' }}>{location.phone}</a>
                  </p>
                  <a 
                    href={location.mapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '6px',
                      color: '#ec1c24', 
                      textDecoration: 'none', 
                      fontWeight: 500,
                      marginTop: '8px'
                    }}
                  >
                    <span>Get Directions</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 17L17 7" stroke="#ec1c24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 7H17V17" stroke="#ec1c24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              <Link 
                to="/book" 
                style={{ 
                  display: 'inline-block',
                  backgroundColor: '#ec1c24',
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.549122367647!2d-99.19592642405796!3d19.431877640702456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d20201b7f988db%3A0xcd9f860549324caa!2sAv.%20Pdte.%20Masaryk%20123%2C%20Polanco%2C%20Polanco%20IV%20Secc%2C%20Miguel%20Hidalgo%2C%2011550%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX%2C%20Mexico!5e0!3m2!1sen!2sus!4v1746633806968!5m2!1sen!2sus" 
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
                    backgroundColor: '#ec1c24',
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
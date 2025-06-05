import styles from '../App.module.css';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t, i18n } = useTranslation();
  const [selectedLocation, setSelectedLocation] = useState(0);
  
  // Location data
  const locations = [
    {
      id: 1,
      name: 'San Luis Potosi',
      address: 'Joaquin Meade 136, Lomas 1er Secc, CP 78290, San Luis Potosi, SLP, Mexico',
      phone: '+52 56 6156 7879',
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=22.1565,-100.9855',
      coordinates: {lat: 22.1565, lng: -100.9855},
      image: '/building1.jpg'
    }
  ];
  
  const socialMediaLinks = [
    {
      name: 'WhatsApp',
      icon: '/whatsapp.png',
      url: 'https://wa.me/525661567879',
      alt: 'WhatsApp'
    },
    {
      name: 'Instagram',
      icon: '/insta.png',
      url: 'https://instagram.com/mtm_wellbeing',
      alt: 'Instagram'
    }
  ];
  
  // Handle location selection
  const handleLocationSelect = (index: number) => {
    setSelectedLocation(index);
  };
  
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'white',
        fontFamily: 'Inter, Arial, sans-serif',
      }}
    >
      <section style={{
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
            {t('contact_title')}
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
            {t('contact_subtitle')}
          </p>
        </div>
      </section>
      <section style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '40px',
        padding: '32px 0 24px 0',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Locations List */}
        <div style={{
          flex: '1 1 340px',
          minWidth: '320px',
          maxWidth: '420px',
          background: 'rgba(255,255,255,0.92)',
          borderRadius: '22px',
          boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
          padding: '32px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
        }}>
          {/* Location Name */}
          <div style={{ fontWeight: 700, fontSize: '1.35rem', color: '#111', marginBottom: 10, letterSpacing: '-0.01em' }}>{locations[selectedLocation].name}</div>
          {/* Address */}
          <div style={{ color: '#444', fontSize: '1.08rem', marginBottom: 5, lineHeight: 1.6 }}>{locations[selectedLocation].address}</div>
          {/* Phone */}
          <div style={{ color: '#7a6e6e', fontSize: '1.05rem', marginBottom: 5, display: 'flex', alignItems: 'center', gap: 1 }}>
            <span style={{ color: '#7a6e6e' }}>Tel:</span>
            <a href={`tel:${locations[selectedLocation].phone}`} style={{ color: '#19934c', textDecoration: 'none', fontWeight: 500 }}>{locations[selectedLocation].phone}</a>
          </div>
          {/* Directions */}
          <a href={locations[selectedLocation].mapsUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#19934c', fontWeight: 600, textDecoration: 'none', fontSize: '1.08rem', marginBottom: 1 }}>
            {t('common_getDirections')}
          </a>

          {/* Social Media Links */}
          <div style={{ marginTop: '18px', marginBottom: '8px' }}>
            <div style={{ fontWeight: 700, fontSize: '1.35rem', color: '#111', marginBottom: 18, letterSpacing: '-0.01em' }}>
              {t('common_connectWithUs')}
            </div>
            <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
              {socialMediaLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textDecoration: 'none'
                  }}
                >
                  <div style={{ 
                    width: '42px', 
                    height: '42px', 
                    borderRadius: '50%', 
                    background: 'white', 
                    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '6px'
                  }}>
                    <img 
                      src={social.icon} 
                      alt={social.alt} 
                      style={{ 
                        width: '24px', 
                        height: '24px', 
                        objectFit: 'contain'
                      }} 
                    />
                  </div>
                  <span style={{ fontSize: '12px', color: '#666' }}>{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Rotating Image Gallery */}
          <div style={{ 
            marginTop: '24px',
            position: 'relative',
            width: '100%',
            height: '200px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            {['/chinese.jpeg', '/chinGong.jpeg', '/flowers.jpeg', '/gong.jpeg', '/hairhead.jpeg', '/gongflower.jpeg'].map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`Gallery image ${index + 1}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0,
                  transition: 'opacity 1s ease-in-out',
                  animation: `fadeInOut 12s linear ${index * 2}s infinite`
                }}
              />
            ))}
          </div>

          <style>
            {`
              @keyframes fadeInOut {
                0%, 16.67% { opacity: 0; }
                4.17%, 12.5% { opacity: 1; }
                16.67%, 100% { opacity: 0; }
              }
            `}
          </style>

          {/* Browse Locations Heading */}
          {/* <div style={{ fontWeight: 700, fontSize: '1.35rem', color: '#111', margin: '24px 0 12px 0', letterSpacing: '-0.01em' }}>
            {t('common_browseLocations')}
          </div> */}
          {/* Decorative Illustration */}
          <div style={{ 
            marginTop: '10px', 
            display: 'flex',
            justifyContent: 'center',
            opacity: 0.9,
            padding: '10px 0'
          }}>
            {/* <img 
              src="/svg.png" 
              alt="Decorative illustration" 
              style={{ 
                width: '85%', 
                maxWidth: '280px', 
                height: 'auto',
                filter: 'drop-shadow(0 2px 4px rgba(34, 197, 94, 0.2))'
              }} 
            /> */}
          </div>
        </div>
        
        {/* Map Section with Flex Column */}
        <div style={{
          flex: '2 1 480px',
          minWidth: '340px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}>
          {/* Google Map Container */}
          <div style={{
            height: '420px',
            background: 'rgba(255,255,255,0.85)',
            borderRadius: '22px',
            boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8073.029660474845!2d-101.02066151328684!3d22.1383935704247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842a98da9ff1f979%3A0x7b611dd395a16dcc!2sJoaqu%C3%ADn%20Meade%20136%2C%20Las%20Lomas%201ra%20Secc%2C%2078290%20San%20Luis%20Potos%C3%AD%2C%20S.L.P.%2C%20Mexico!5e0!3m2!1sen!2sus!4v1749076137958!5m2!1sen!2sus" 
              style={{
                border: 0,
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0
              }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          
          {/* Scrollable Locations Card */}
          <div style={{
            background: 'rgba(255,255,255,0.92)',
            borderRadius: '22px',
            boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
            padding: '24px',
            position: 'relative',
          }}>
            <h3 style={{
              fontWeight: 600,
              fontSize: '1.2rem',
              marginBottom: '16px',
              color: '#111'
            }}>
              {t('common_browseLocations')}
            </h3>
            
            {/* Scrollable container */}
            <div style={{
              display: 'flex',
              overflowX: 'auto',
              gap: '16px',
              padding: '8px 4px',
              scrollbarWidth: 'thin',
              scrollbarColor: '#19934c #f5f5f5',
              msOverflowStyle: '-ms-autohiding-scrollbar',
            }}>
              {locations.map((location, index) => (
                <div
                  key={location.id}
                  onClick={() => handleLocationSelect(index)}
                  style={{
                    flex: '0 0 240px',
                    background: selectedLocation === index ? 'rgba(34,197,94,0.06)' : 'white',
                    borderRadius: '16px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: selectedLocation === index ? '1px solid rgba(34,197,94,0.3)' : '1px solid #eee',
                    boxShadow: selectedLocation === index ? '0 4px 12px rgba(34,197,94,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{
                    height: '120px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginBottom: '12px',
                    background: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
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
                    fontWeight: 600, 
                    fontSize: '1rem', 
                    marginBottom: '6px',
                    color: selectedLocation === index ? '#19934c' : '#111',
                  }}>
                    {location.name}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {location.address}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
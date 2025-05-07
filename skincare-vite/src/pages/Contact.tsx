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
      name: 'CDMX - Polanco',
      address: 'Av. Presidente Masaryk 123, Polanco, CDMX',
      phone: '+52 55 1234 5678',
      mapsUrl: 'https://goo.gl/maps/xyz',
      coordinates: {lat: 19.4319, lng: -99.1959},
      image: '/building1.jpg'
    },
    {
      id: 2,
      name: 'CDMX - Roma',
      address: 'Calle Colima 456, Roma Norte, CDMX',
      phone: '+52 55 8765 4321',
      mapsUrl: 'https://goo.gl/maps/abc',
      coordinates: {lat: 19.4173, lng: -99.1626},
      image: '/building2.jpg'
    },
    {
      id: 3,
      name: 'CDMX - Condesa',
      address: 'Av. Michoacán 75, Condesa, CDMX',
      phone: '+52 55 2468 1357',
      mapsUrl: 'https://goo.gl/maps/def',
      coordinates: {lat: 19.4112, lng: -99.1767},
      image: '/building3.jpg'
    },
    {
      id: 4,
      name: 'CDMX - Santa Fe',
      address: 'Av. Vasco de Quiroga 3800, Santa Fe, CDMX',
      phone: '+52 55 9753 1246',
      mapsUrl: 'https://goo.gl/maps/ghi',
      coordinates: {lat: 19.3577, lng: -99.2674},
      image: '/building4.jpg'
    },
    {
      id: 5,
      name: 'CDMX - San Ángel',
      address: 'Av. de la Paz 44, San Ángel, CDMX',
      phone: '+52 55 8642 7531',
      mapsUrl: 'https://goo.gl/maps/jkl',
      coordinates: {lat: 19.3475, lng: -99.1871},
      image: '/building1.jpg'
    }
  ];
  
  const socialMediaLinks = [
    {
      name: 'WhatsApp',
      icon: '/whatsapp.png',
      url: 'https://wa.me/525512345678',
      alt: 'WhatsApp'
    },
    {
      name: 'Facebook',
      icon: '/fb.png',
      url: 'https://facebook.com/mtmskincare',
      alt: 'Facebook'
    },
    {
      name: 'Instagram',
      icon: '/insta.png',
      url: 'https://instagram.com/mtmskincare',
      alt: 'Instagram'
    },
    {
      name: 'Twitter',
      icon: '/twt.png',
      url: 'https://twitter.com/mtmskincare',
      alt: 'Twitter'
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
          gap: '24px',
        }}>
          <div style={{ fontWeight: 700, fontSize: '1.18rem', color: '#111', marginBottom: 10 }}>{locations[selectedLocation].name}</div>
          <div style={{ color: '#444', fontSize: '1.05rem', marginBottom: 6 }}>{locations[selectedLocation].address}</div>
          <div style={{ color: '#7a6e6e', fontSize: '1.01rem', marginBottom: 10 }}>
            {t('common_tel')}
            <a href={`tel:${locations[selectedLocation].phone}`} style={{ color: '#ec1c24', textDecoration: 'none' }}>{locations[selectedLocation].phone}</a>
          </div>
          <a href={locations[selectedLocation].mapsUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#ec1c24', fontWeight: 500, textDecoration: 'none' }}>
            {t('common_getDirections')}
          </a>
          
          {/* Social Media Links */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ fontWeight: 700, fontSize: '1.18rem', color: '#111', marginBottom: 16 }}>
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
          
          {/* Decorative Illustration */}
          <div style={{ 
            marginTop: '30px', 
            display: 'flex',
            justifyContent: 'center',
            opacity: 0.9,
            padding: '10px 0'
          }}>
            <img 
              src="/balloons.svg" 
              alt="Building illustration" 
              style={{ 
                width: '85%', 
                maxWidth: '280px', 
                height: 'auto',
                filter: 'drop-shadow(0 2px 4px rgba(236, 28, 36, 0.2))'
              }} 
            />
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.549122367647!2d-99.19592642405796!3d19.431877640702456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d20201b7f988db%3A0xcd9f860549324caa!2sAv.%20Pdte.%20Masaryk%20123%2C%20Polanco%2C%20Polanco%20IV%20Secc%2C%20Miguel%20Hidalgo%2C%2011550%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX%2C%20Mexico!5e0!3m2!1sen!2sus!4v1746633806968!5m2!1sen!2sus" 
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
              scrollbarColor: '#ec1c24 #f5f5f5',
              msOverflowStyle: '-ms-autohiding-scrollbar',
            }}>
              {locations.map((location, index) => (
                <div
                  key={location.id}
                  onClick={() => handleLocationSelect(index)}
                  style={{
                    flex: '0 0 240px',
                    background: selectedLocation === index ? 'rgba(236,28,36,0.06)' : 'white',
                    borderRadius: '16px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: selectedLocation === index ? '1px solid rgba(236,28,36,0.3)' : '1px solid #eee',
                    boxShadow: selectedLocation === index ? '0 4px 12px rgba(236,28,36,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
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
                    color: selectedLocation === index ? '#ec1c24' : '#111',
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
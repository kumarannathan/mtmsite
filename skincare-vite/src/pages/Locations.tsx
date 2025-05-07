import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

// Location data
const locations = [
  {
    id: 'polanco',
    name: 'CDMX - Polanco',
    address: 'Av. Presidente Masaryk 123, Polanco, CDMX',
    phone: '+52 55 1234 5678',
    image: '/building1.jpg',
    description: 'Our flagship location in the heart of Polanco offers a luxurious retreat from the bustle of Mexico City.'
  },
  {
    id: 'roma',
    name: 'CDMX - Roma',
    address: 'Calle Colima 456, Roma Norte, CDMX',
    phone: '+52 55 8765 4321',
    image: '/building2.jpg',
    description: 'Located in the trendy Roma Norte neighborhood, our boutique wellness center offers a cozy atmosphere.'
  },
  {
    id: 'condesa',
    name: 'CDMX - Condesa',
    address: 'Av. Michoacán 75, Condesa, CDMX',
    phone: '+52 55 2468 1357',
    image: '/building3.jpg',
    description: 'Our Condesa location blends seamlessly with the artistic neighborhood, offering a tranquil escape.'
  },
  {
    id: 'santa-fe',
    name: 'CDMX - Santa Fe',
    address: 'Av. Vasco de Quiroga 3800, Santa Fe, CDMX',
    phone: '+52 55 9753 1246',
    image: '/building4.jpg',
    description: 'Our Santa Fe center provides a modern, sophisticated environment for busy professionals.'
  },
  {
    id: 'san-angel',
    name: 'CDMX - San Ángel',
    address: 'Av. de la Paz 44, San Ángel, CDMX',
    phone: '+52 55 8642 7531',
    image: '/building1.jpg',
    description: 'Nestled in historic San Ángel, our location is housed in a beautifully restored colonial building.'
  }
];

export default function Locations() {
  const { lang } = useLanguage();
  
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
            {lang === 'en' ? 'Locations' : 'Ubicaciones'}
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
            {lang === 'en'
              ? 'Visit one of our premium wellness centers across Mexico City'
              : 'Visita uno de nuestros centros de bienestar premium en la Ciudad de México'}
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px 24px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '32px',
        }}>
          {locations.map(location => (
            <Link 
              key={location.id}
              to={`/locations/${location.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                background: 'rgba(255,255,255,0.92)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.06)';
              }}
              >
                <div style={{
                  height: '200px',
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
                  padding: '24px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <h2 style={{
                    color: '#111',
                    fontSize: '1.4rem',
                    fontWeight: 600,
                    marginBottom: '8px',
                  }}>
                    {location.name.split(' - ')[1]}
                  </h2>
                  <p style={{
                    color: '#666',
                    fontSize: '0.95rem',
                    marginBottom: '14px',
                  }}>
                    CDMX
                  </p>
                  <p style={{
                    color: '#333',
                    fontSize: '1rem',
                    marginBottom: '16px',
                    flex: 1,
                  }}>
                    {location.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto',
                  }}>
                    <div style={{
                      color: '#ec1c24',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}>
                      <span>{lang === 'en' ? 'View Location' : 'Ver Ubicación'}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19" stroke="#ec1c24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 5L19 12L12 19" stroke="#ec1c24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#666',
                      fontSize: '0.9rem',
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.9999 16.9201V19.9201C22.0026 20.1986 21.9446 20.4743 21.8287 20.7294C21.7129 20.9846 21.5418 21.2137 21.3289 21.402C21.1161 21.5902 20.8667 21.7336 20.5971 21.8228C20.3274 21.912 20.0441 21.9452 19.7639 21.9201C16.5997 21.5857 13.5759 20.5342 10.9879 18.8501C8.57421 17.3148 6.54978 15.2904 5.01437 12.8767C3.32389 10.2727 2.27241 7.2283 1.94994 4.0442C1.92495 3.76489 1.95787 3.48257 2.04656 3.21343C2.13525 2.94429 2.27796 2.69483 2.46537 2.48177C2.65278 2.26872 2.88089 2.09699 3.13531 1.98003C3.38973 1.86307 3.6655 1.80378 3.94396 1.8052H6.94396C7.42648 1.8004 7.89525 1.98109 8.26456 2.3089C8.63387 2.6367 8.87313 3.08728 8.93994 3.5752C9.07059 4.6851 9.34006 5.77343 9.73994 6.8102C9.8849 7.18688 9.91183 7.59792 9.81743 7.99151C9.72304 8.38511 9.51124 8.74246 9.21394 9.0102L7.99994 10.2242C9.42611 12.7175 11.5066 14.7979 13.9999 16.2242L15.2139 15.0102C15.4816 14.7129 15.839 14.5011 16.2326 14.4067C16.6262 14.3123 17.0372 14.3392 17.4139 14.4842C18.4507 14.884 19.539 15.1535 20.6489 15.2842C21.1447 15.3517 21.6018 15.5951 21.9314 15.9717C22.2609 16.3483 22.4375 16.8267 22.4239 17.3182L21.9999 16.9201Z" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{location.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
} 
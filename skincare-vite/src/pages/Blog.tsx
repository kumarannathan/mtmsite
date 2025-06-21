import React from 'react';

export default function Blog() {
  const photos = [
    '/chinGong.jpeg',
    '/gongflower.jpeg',
    '/gongman.jpeg',
    '/hairhead.jpeg',
    '/plants.jpeg',
    '/flowers.jpeg',
    '/img1.jpeg',
    '/img2.jpeg',
    '/img3.jpeg'
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'white',
      fontFamily: 'Inter, Arial, sans-serif',
      padding: '80px 24px 32px 24px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '18px',
        boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
        padding: '40px 32px',
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          color: '#111',
          marginBottom: '16px',
          textAlign: 'center',
        }}>
          Our Wellness Journey
        </h1>
        
        <p style={{
          fontSize: '1.1rem',
          color: '#666',
          textAlign: 'center',
          marginBottom: '48px',
          maxWidth: '600px',
          margin: '0 auto 48px auto',
        }}>
          Discover the serene moments and transformative experiences that define our wellness sanctuary
        </p>

        {/* Photo Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '32px',
        }}>
          {photos.map((photo, index) => (
            <div
              key={index}
              style={{
                aspectRatio: '1',
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
              }}
            >
              <img
                src={photo}
                alt={`Wellness moment ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.3))',
                height: '40%',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '16px',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.opacity = '0';
              }}
              >
                <div style={{
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                }}>
                  Wellness Moment
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Description Section */}
        <div style={{
          textAlign: 'center',
          marginTop: '32px',
          padding: '32px',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          borderRadius: '12px',
          border: '1px solid #e9ecef',
        }}>
          <h3 style={{
            fontSize: '1.4rem',
            fontWeight: '600',
            color: '#333',
            marginBottom: '16px',
          }}>
            Experience the MTM Difference
          </h3>
          <p style={{
            color: '#666',
            marginBottom: '24px',
            fontSize: '1rem',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto 24px auto',
          }}>
            Each image captures a moment of tranquility, healing, and transformation. From our ancient gong therapy sessions to modern scalp treatments, every experience is designed to restore your natural balance and vitality.
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}>
            <a 
              href="/book"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#19934c',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '0.95rem',
                transition: 'transform 0.2s ease, background 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.background = '#16a34a';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = '#19934c';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 12H16M12 8V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Book Your Session
            </a>
            <a 
              href="/therapies"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                color: '#19934c',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '0.95rem',
                border: '2px solid #19934c',
                transition: 'transform 0.2s ease, background 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.background = '#19934c';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#19934c';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Explore Therapies
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 
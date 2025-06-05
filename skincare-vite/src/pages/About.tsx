import { useTranslation } from 'react-i18next';

export default function About() {
  const { t, i18n } = useTranslation();
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;
  const mobileTextStyle = isMobile ? { fontSize: '1rem', lineHeight: 1.5 } : {};
  
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'white',
      fontFamily: 'Inter, Arial, sans-serif',
    }}>
      {/* Header Section */}
      <section style={{ 
        padding: '80px 24px 32px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1200px',
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
            {t('about_mtm')}
          </h1>
          <div style={{
            width: '60px',
            height: '4px',
            background: '#17603a',
            margin: '0 auto 32px',
            borderRadius: '2px',
          }}></div>
          <p style={{ 
            fontSize: '1.18rem',
            lineHeight: 1.6,
            color: '#222',
            marginBottom: '0',
            fontWeight: 400,
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            {t('about_mtm_description')}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto 80px auto',
        padding: '0 24px',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.92)',
          borderRadius: '22px',
          boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
          padding: '48px',
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#111',
            marginBottom: '32px',
          }}>
            {t('our_story')}
          </h2>
          
          {/* First Story Section */}
          <div style={{ marginBottom: '48px' }}>
            <p style={{
              fontSize: '1.18rem',
              lineHeight: 1.8,
              color: '#444',
              marginBottom: '24px',
              position: 'relative',
              paddingLeft: '24px',
              borderLeft: '3px solid #17603a',
            }}>
              {t('our_story_description')}
            </p>
          </div>

          {/* Second Story Section with Image */}
          <div style={{ 
            display: isMobile ? 'block' : 'grid',
            gridTemplateColumns: isMobile ? undefined : '1fr 1fr',
            gap: isMobile ? undefined : '48px',
            marginBottom: '48px',
            alignItems: 'center',
          }}>
            {!isMobile ? (
              <div style={{
                background: '#f5f5f5',
                borderRadius: '16px',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
                fontSize: '1.1rem',
                overflow: 'hidden',
              }}>
                <img 
                  src="/chinGong.jpeg" 
                  alt="Eastern culture scene with gong and flowers"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            ) : null}
            <div style={mobileTextStyle}>
              <p style={{
                fontSize: isMobile ? '1rem' : '1.18rem',
                lineHeight: isMobile ? 1.5 : 1.8,
                color: '#444',
                marginBottom: '24px',
              }}>
                {t('our_story_second')}
              </p>
              <p style={{
                fontSize: isMobile ? '1rem' : '1.18rem',
                lineHeight: isMobile ? 1.5 : 1.8,
                color: '#444',
                marginBottom: '24px',
              }}>
                {t('our_story_third')}
              </p>
            </div>
          </div>

          {/* Third Story Section with Image */}
          <div style={{ 
            display: isMobile ? 'block' : 'grid',
            gridTemplateColumns: isMobile ? undefined : '1fr 1fr',
            gap: isMobile ? undefined : '48px',
            marginBottom: '48px',
            alignItems: 'center',
          }}>
            <div style={mobileTextStyle}>
              <p style={{
                fontSize: isMobile ? '1rem' : '1.18rem',
                lineHeight: isMobile ? 1.5 : 1.8,
                color: '#444',
                marginBottom: '24px',
              }}>
                {t('our_story_fourth')}
              </p>
              <p style={{
                fontSize: isMobile ? '1rem' : '1.18rem',
                lineHeight: isMobile ? 1.5 : 1.8,
                color: '#444',
                marginBottom: '24px',
              }}>
                {t('our_story_fifth')}
              </p>
            </div>
            {!isMobile ? (
              <div style={{
                background: '#f5f5f5',
                borderRadius: '16px',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
                fontSize: '1.1rem',
                overflow: 'hidden',
              }}>
                <img 
                  src="/hairhead.jpeg" 
                  alt="Natural hair care products"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            ) : null}
          </div>

          {/* Final Story Section */}
          <div style={{ marginBottom: '40px' }}>
            <p style={{
              fontSize: '1.18rem',
              lineHeight: '1.8',
              color: '#444',
              marginBottom: '24px',
            }}>
              {t('our_story_sixth')}
            </p>
            <p style={{
              fontSize: '1.18rem',
              lineHeight: '1.8',
              color: '#444',
              marginBottom: '24px',
              fontStyle: 'italic',
            }}>
              {t('our_story_seventh')}
            </p>
          </div>

          {/* Why MTM Section */}
          <div style={{ marginTop: '60px' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#111',
              marginBottom: '32px',
            }}>
              {t('why_mtm')}
            </h2>
            
            <div style={{ 
              display: isMobile ? 'block' : 'grid',
              gridTemplateColumns: isMobile ? undefined : '1fr 1fr',
              gap: isMobile ? undefined : '48px',
              marginBottom: '48px',
              alignItems: 'center',
            }}>
              <div style={mobileTextStyle}>
                <p style={{
                  fontSize: isMobile ? '1rem' : '1.18rem',
                  lineHeight: isMobile ? 1.5 : 1.8,
                  color: '#444',
                  marginBottom: '24px',
                  fontWeight: 500,
                }}>
                  {t('why_mtm_description')}
                </p>

                <div style={{
                  background: 'rgba(17,96,58,0.05)',
                  borderRadius: '16px',
                  padding: '32px',
                  marginBottom: '32px',
                }}>
                  <p style={{
                    fontSize: isMobile ? '1rem' : '1.18rem',
                    lineHeight: isMobile ? 1.5 : 1.8,
                    color: '#444',
                    marginBottom: '16px',
                  }}>
                    {t('why_mtm_ming')}
                  </p>
                  <p style={{
                    fontSize: isMobile ? '1rem' : '1.18rem',
                    lineHeight: isMobile ? 1.5 : 1.8,
                    color: '#444',
                    marginBottom: '16px',
                  }}>
                    {t('why_mtm_tian')}
                  </p>
                  <p style={{
                    fontSize: isMobile ? '1rem' : '1.18rem',
                    lineHeight: isMobile ? 1.5 : 1.8,
                    color: '#444',
                    marginBottom: '16px',
                  }}>
                    {t('why_mtm_ming_tian')}
                  </p>
                  <p style={{
                    fontSize: isMobile ? '1rem' : '1.18rem',
                    lineHeight: isMobile ? 1.5 : 1.8,
                    color: '#444',
                    marginBottom: '16px',
                  }}>
                    {t('why_mtm_ming_tian_ming')}
                  </p>
                </div>
              </div>
              {!isMobile ? (
                <div style={{
                  background: '#f5f5f5',
                  borderRadius: '16px',
                  height: '425px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#666',
                  fontSize: '1.1rem',
                  overflow: 'hidden',
                  marginTop: '12%',
                }}>
                  <img 
                    src="/chinese.jpeg" 
                    alt="Chinese characters and calligraphy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              ) : null}
            </div>

            <p style={{
              fontSize: '1.18rem',
              lineHeight: 1.8,
              color: '#444',
              marginBottom: '24px',
              fontStyle: 'italic',
            }}>
              {t('why_mtm_belief')}
            </p>

            <p style={{
              fontSize: '1.18rem',
              lineHeight: 1.8,
              color: '#444',
              marginBottom: '24px',
            }}>
              {t('why_mtm_community')}
            </p>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto 80px auto',
        padding: '0 24px',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.92)',
          borderRadius: '22px',
          boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
          padding: '48px',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#111',
            marginBottom: '24px',
          }}>
            Visit Us
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'center',
            marginBottom: '32px',
          }}>
            <div>
              <p style={{
                fontSize: '1.18rem',
                lineHeight: 1.6,
                color: '#444',
                marginBottom: '24px',
              }}>
                MTM - San Luis Potosi
              </p>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: 1.6,
                color: '#666',
                marginBottom: '16px',
              }}>
                Joaquin Meade 136, Lomas 1er Secc,<br />
                CP 78290, San Luis Potosi, SLP, Mexico
              </p>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: 1.6,
                color: '#666',
                marginBottom: '24px',
              }}>
                Phone: +52 56 6156 7879
              </p>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=22.1565,-100.9855"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#17603a',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                }}
              >
                Get Directions
              </a>
            </div>
            <div style={{
              background: '#f5f5f5',
              borderRadius: '16px',
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
              fontSize: '1.1rem',
            }}>
              [Image: MTM Location]
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
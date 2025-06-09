import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();
  
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
  
  // Add a media query for mobile styles
  const mobileFooterStyles = {
    flexDirection: 'row' as const,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '16px',
    padding: '0 8px',
  };
  
  // In the main footer div, conditionally apply mobile styles if window.innerWidth <= 600
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;
  
  return (
    <footer style={{ 
      background: '#000', 
      padding: isMobile ? '32px 16px 24px' : '40px 24px 30px',
      color: '#fff',
      fontFamily: 'Inter, Arial, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: isMobile ? '16px' : '30px',
      }}>
        {/* Brand column - only show on desktop */}
        {!isMobile && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', marginTop: '15%', borderRadius: '20px' }}>
            <img 
                src="/image.png" 
              alt="MTM Logo" 
              style={{
                height: '38px',
                width: 'auto',
                  display: 'block',
                  borderRadius: '12px',
                  background: 'transparent',
                }}
              />
          </Link>
          <p style={{
            fontSize: '14px',
            lineHeight: 1.5,
            color: '#aaa',
            maxWidth: '300px',
            marginLeft: '16px',
          }}>
              {/* {t('footer.footerTagline')} */}
          </p>
        </div>
        )}
        
        {/* Contact column - centered */}
        <div style={{ 
          textAlign: 'center',
          minWidth: isMobile ? '120px' : '220px',
          width: '100%',
          marginBottom: isMobile ? '0' : '8px',
        }}>
          <h3 style={{
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: 700,
            marginBottom: '12px',
            color: '#fff',
            letterSpacing: '-0.01em',
            textAlign: 'center',
          }}>
            {t('Contact')}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', justifyContent: 'center' }}>
            <a href="tel:+525661567879" style={{ color: '#19934c', textDecoration: 'underline', fontSize: '1.08rem', fontWeight: 700 }}>
              +52 56 6156 7879
            </a>
            <a href="mailto:mtmreserv@gmail.com" style={{ color: '#19934c', textDecoration: 'underline', fontSize: '1.08rem', fontWeight: 700 }}>
              mtmreserv@gmail.com
            </a>
            <a 
              href="https://maps.app.goo.gl/gtKcAsqH7hd87hQD8" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#19934c', textDecoration: 'underline', fontSize: '1.08rem', fontWeight: 700 }}
            >
              Joaquin Meade 136, Lomas 1er Secc, CP 78290, San Luis Potosi, SLP, Mexico
            </a>
          </div>
        </div>
        {/* Connect with Us column - on the right */}
        <div style={{ 
          minWidth: isMobile ? '120px' : '180px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-end',
          marginTop: isMobile ? '18px' : '24px',
        }}>
          <div style={{ 
            fontWeight: 600, 
            fontSize: isMobile ? '14px' : '16px', 
            color: '#fff', 
            marginBottom: isMobile ? '12px' : '16px', 
            textAlign: 'right',
          }}>
            {t('common_connectWithUs')}
          </div>
          <div style={{ 
            display: 'flex', 
            gap: isMobile ? '12px' : '18px', 
            flexWrap: 'wrap', 
            justifyContent: 'flex-end', 
            alignItems: 'center' 
          }}>
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
                  width: isMobile ? '36px' : '42px', 
                  height: isMobile ? '36px' : '42px', 
                  borderRadius: '50%', 
                  background: '#222', 
                  boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: isMobile ? '4px' : '6px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#333'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#222'}
                >
                  <img 
                    src={social.icon} 
                    alt={social.alt} 
                    style={{ 
                      width: isMobile ? '20px' : '24px', 
                      height: isMobile ? '20px' : '24px', 
                      objectFit: 'contain'
                    }} 
                  />
                </div>
                <span style={{ fontSize: isMobile ? '10px' : '12px', color: '#aaa' }}>{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Copyright bar */}
      <div style={{ 
        borderTop: '1px solid #222', 
        marginTop: isMobile ? '20px' : '24px', 
        paddingTop: isMobile ? '12px' : '16px',
        textAlign: 'center',
        fontSize: isMobile ? '11px' : '13px',
        color: '#666'
      }}>
        &copy; {currentYear} MTM. {t('All rights reserved')}
      </div>
    </footer>
  );
} 
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [isMobile, setIsMobile] = useState(false);
  
  // Handle responsive behavior
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  const socialMediaLinks = [
    {
      name: t('footer_whatsapp'),
      icon: (
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          style={{ minWidth: '24px' }}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#25D366"/>
        </svg>
      ),
      url: 'https://wa.me/525661567879',
      alt: 'WhatsApp'
    },
    {
      name: t('footer_instagram'),
      icon: (
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          style={{ minWidth: '24px' }}
        >
          <defs>
            <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#405DE6', stopOpacity: 1}} />
              <stop offset="25%" style={{stopColor: '#5851DB', stopOpacity: 1}} />
              <stop offset="50%" style={{stopColor: '#833AB4', stopOpacity: 1}} />
              <stop offset="75%" style={{stopColor: '#C13584', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#E1306C', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="url(#instagram-gradient)"/>
        </svg>
      ),
      url: 'https://instagram.com/mtm_wellbeing',
      alt: 'Instagram'
    }
  ];

  const navigationLinks = [
    { name: t('footer_home'), path: '/' },
    { name: t('footer_services'), path: '/therapies' },
    { name: t('footer_book'), path: '/booking' },
    { name: t('footer_about'), path: '/about' }
  ];

  return (
    <footer style={{
      backgroundColor: '#FCFAF7',
      padding: isMobile ? '40px 20px' : '60px 40px',
      color: '#1B4D3E',
      fontFamily: 'Inter, Arial, sans-serif',
      borderTop: '1px solid rgba(27, 77, 62, 0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '40px' : '80px',
        marginBottom: '40px',
        alignItems: isMobile ? 'center' : 'flex-start',
        textAlign: isMobile ? 'center' : 'left'
      }}>
        {/* Contact Section */}
        <div style={{
          flex: 1,
          maxWidth: isMobile ? '100%' : '400px'
        }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '24px',
            color: '#1B4D3E',
            letterSpacing: '-0.02em'
          }}>
            {t('footer_contact')}
          </h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {/* <a 
              href="tel:+525661567879" 
              style={{
                color: '#1B4D3E',
                textDecoration: 'none',
                fontSize: '16px',
                lineHeight: '1.6',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#2A6B57'}
              onMouseOut={(e) => e.currentTarget.style.color = '#1B4D3E'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM5.1 5h1.7c.1.9.3 1.8.5 2.6L5.8 9.1c-.4-1.3-.7-2.7-.7-4.1zM19 18.9c-1.4 0-2.8-.3-4.1-.7l1.5-1.5c.8.2 1.7.4 2.6.5v1.7z"/>
              </svg>
              +52 56 6156 7879
            </a> */}
            <a 
              href="mailto:mtmreserv@gmail.com" 
              style={{
                color: '#1B4D3E',
                textDecoration: 'none',
                fontSize: '16px',
                lineHeight: '1.6',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#2A6B57'}
              onMouseOut={(e) => e.currentTarget.style.color = '#1B4D3E'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              mtmreserv@gmail.com
            </a>
            <a 
              href="https://maps.app.goo.gl/gtKcAsqH7hd87hQD8" 
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#1B4D3E',
                textDecoration: 'none',
                fontSize: '16px',
                lineHeight: '1.8',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#2A6B57'}
              onMouseOut={(e) => e.currentTarget.style.color = '#1B4D3E'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              {t('footer_find_us')}
            </a>
          </div>
        </div>

        {/* Connect With Us Section */}
        <div style={{
          flex: 1,
          maxWidth: isMobile ? '100%' : '400px'
        }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '24px',
            color: '#1B4D3E',
            letterSpacing: '-0.02em'
          }}>
            {t('footer_connect_with_us')}
          </h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {socialMediaLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#1B4D3E',
                  textDecoration: 'none',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#2A6B57';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#1B4D3E';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                {social.icon}
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(27, 77, 62, 0.1), transparent)',
        margin: '0 auto 32px'
      }} />

      {/* Navigation Links */}
      <nav style={{
        display: 'flex',
        gap: isMobile ? '16px' : '32px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: '32px'
      }}>
        {navigationLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            style={{
              color: '#1B4D3E',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'color 0.2s ease',
              padding: '4px 0'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#2A6B57'}
            onMouseOut={(e) => e.currentTarget.style.color = '#1B4D3E'}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Copyright */}
      <div style={{
        textAlign: 'center',
        fontSize: '13px',
        color: 'rgba(27, 77, 62, 0.6)',
        fontWeight: '400'
      }}>
        &copy; {currentYear} MTM. {t('footer_all_rights_reserved')}
      </div>
    </footer>
  );
} 
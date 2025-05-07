import { useLanguage } from '../LanguageContext';
import i18n from '../i18n';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { lang } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer style={{ 
      background: '#000', 
      padding: '40px 24px 30px',
      color: '#fff',
      fontFamily: 'Inter, Arial, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '30px'
      }}>
        {/* Brand column */}
        <div>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', marginBottom: '16px', borderRadius: '20px' }}>
            <img 
              src="/logoFull.png" 
              alt="MTM Logo" 
              style={{
                height: '38px',
                width: 'auto',
                marginRight: '10px'
              }}
            />
            <div style={{ 
              fontFamily: 'Playfair Display, serif', 
              fontSize: '24px', 
              fontWeight: 700, 
              color: '#fff'
            }}>MTM</div>
          </Link>
          <p style={{
            fontSize: '14px',
            lineHeight: 1.5,
            color: '#aaa',
            maxWidth: '300px'
          }}>
            {lang === 'en' 
              ? 'Holistic scalp and mind therapy in the heart of Mexico City.' 
              : 'Terapia holística para cuero cabelludo y mente en el corazón de la Ciudad de México.'}
          </p>
        </div>
        
        {/* Links column */}
        <div>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            marginBottom: '16px',
            color: '#fff'
          }}>
            {lang === 'en' ? 'Quick Links' : 'Enlaces Rápidos'}
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px 24px'
          }}>
            <li>
              <Link to="/" style={{ color: '#aaa', textDecoration: 'none', fontSize: '14px' }}>
                {i18n.home[lang]}
              </Link>
            </li>
            <li>
              <Link to="/about" style={{ color: '#aaa', textDecoration: 'none', fontSize: '14px' }}>
                {i18n.about[lang]}
              </Link>
            </li>
            <li>
              <Link to="/therapies" style={{ color: '#aaa', textDecoration: 'none', fontSize: '14px' }}>
                {i18n.therapies[lang]}
              </Link>
            </li>
            <li>
              <Link to="/book" style={{ color: '#aaa', textDecoration: 'none', fontSize: '14px' }}>
                {i18n.bookNow[lang]}
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Contact column */}
        <div>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            marginBottom: '16px',
            color: '#fff'
          }}>
            {lang === 'en' ? 'Contact' : 'Contacto'}
          </h3>
          <div style={{ marginBottom: '8px', color: '#aaa', fontSize: '14px' }}>
            {lang === 'en' ? 'Phone' : 'Teléfono'}: 
            <a 
              href="tel:+525512345678" 
              style={{ 
                color: '#ec1c24', 
                textDecoration: 'none',
                paddingBottom: '1px',
                borderBottom: '1px solid transparent'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderBottom = '1px solid #ec1c24'}
              onMouseOut={(e) => e.currentTarget.style.borderBottom = '1px solid transparent'}
            >
              +52 55 1234 5678
            </a>
          </div>
          <div style={{ marginBottom: '8px', color: '#aaa', fontSize: '14px' }}>
            Email: 
            <a 
              href="mailto:info@mtm.mx" 
              style={{ 
                color: '#ec1c24', 
                textDecoration: 'none',
                paddingBottom: '1px',
                borderBottom: '1px solid transparent'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderBottom = '1px solid #ec1c24'}
              onMouseOut={(e) => e.currentTarget.style.borderBottom = '1px solid transparent'}
            >
              info@mtm.mx
            </a>
          </div>
          
          {/* Social icons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <a 
              href="https://mtm.mx" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '6px', 
                background: '#222',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '16px',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#333'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#222'}
            >
              🌐
            </a>
            <a 
              href="https://instagram.com/mtm" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '6px', 
                background: '#222',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '16px',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#333'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#222'}
            >
              📷
            </a>
            <a 
              href="mailto:info@mtm.mx" 
              style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '6px', 
                background: '#222',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '16px',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#333'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#222'}
            >
              ✉️
            </a>
          </div>
        </div>
      </div>
      
      {/* Copyright bar */}
      <div style={{ 
        borderTop: '1px solid #222', 
        marginTop: '24px', 
        paddingTop: '16px',
        textAlign: 'center',
        fontSize: '13px',
        color: '#666'
      }}>
        &copy; {currentYear} MTM. {lang === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}
      </div>
    </footer>
  );
} 
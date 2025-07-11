import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function OpeningBanner() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    // Show banner after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 2000,
      background: 'linear-gradient(135deg, #1B4D3E 0%, #2A6B57 50%, #1B4D3E 100%)',
      color: 'white',
      padding: isMobile ? '12px 16px' : '20px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 8px 32px rgba(27, 77, 62, 0.3), 0 4px 16px rgba(0,0,0,0.1)',
      animation: 'slideDown 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
      fontFamily: 'Inter, Arial, sans-serif',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '0 0 20px 20px',
      flexWrap: isMobile ? 'wrap' : 'nowrap',
      gap: isMobile ? '12px' : '0',
    }}>
      {/* Grand Opening - Left Side */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: isMobile ? '1rem' : '1.3rem',
        fontWeight: 700,
        textShadow: '0 2px 4px rgba(0,0,0,0.2)',
        animation: 'pulse 2s ease-in-out infinite',
        flex: isMobile ? '1 1 100%' : '0 0 auto',
        justifyContent: isMobile ? 'center' : 'flex-start',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: isMobile ? '6px 12px' : '8px 16px',
          backgroundColor: 'rgba(255,255,255,0.15)',
          borderRadius: '25px',
          border: '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)',
          fontSize: isMobile ? '0.9rem' : '1rem',
        }}>
          <span style={{ fontSize: isMobile ? '1.2rem' : '1.4rem', animation: 'bounce 1s ease-in-out infinite' }}>🎉</span>
          <span>{t('banner_opening_week')}</span>
        </div>
      </div>

      {/* Right Side Content */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? '8px' : '20px',
        flex: isMobile ? '1 1 100%' : '0 0 auto',
        justifyContent: isMobile ? 'center' : 'flex-end',
        flexWrap: isMobile ? 'wrap' : 'nowrap',
      }}>
        {/* Special Offer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          justifyContent: isMobile ? 'center' : 'flex-start',
        }}>
          <span style={{
            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
            letterSpacing: '0.3px',
            fontSize: isMobile ? '0.9rem' : '1.2rem',
            fontWeight: 500,
            display: isMobile ? 'none' : 'inline',
          }}>{t('banner_special_offer_text')}</span>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: isMobile ? '4px 8px' : '6px 12px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.3)',
            backdropFilter: 'blur(10px)',
            fontWeight: 700,
            fontSize: isMobile ? '0.8rem' : '0.9rem',
            letterSpacing: '1px',
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            <span style={{ fontSize: '0.8rem' }}>💎</span>
            <span style={{ display: isMobile ? 'none' : 'inline' }}>{t('banner_use_code')}</span>
            <span style={{
              backgroundColor: 'rgba(255,255,255,0.9)',
              color: '#1B4D3E',
              padding: '4px 8px',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: isMobile ? '0.75rem' : '0.85rem',
              letterSpacing: '1.5px',
              textShadow: 'none'
            }}>OPENING</span>
            <span style={{ display: isMobile ? 'none' : 'inline' }}>{t('banner_at_booking')}</span>
          </div>
        </div>

        {/* Book Now Button */}
        <Link to="/book" style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
          color: '#1B4D3E',
          padding: isMobile ? '8px 16px' : '10px 20px',
          borderRadius: '25px',
          textDecoration: 'none',
          fontSize: isMobile ? '0.8rem' : '0.9rem',
          fontWeight: 700,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.3)',
          position: 'relative',
          overflow: 'hidden',
          display: 'inline-block',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.15)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.1)';
        }}
        >
          {t('banner_book_now')}
        </Link>

        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white',
            fontSize: isMobile ? '1.2rem' : '1.4rem',
            cursor: 'pointer',
            padding: isMobile ? '6px' : '8px',
            borderRadius: '50%',
            width: isMobile ? '32px' : '36px',
            height: isMobile ? '32px' : '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: 'blur(10px)',
            fontWeight: 300,
            flexShrink: 0,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          ×
        </button>
      </div>

      <style>
        {`
          @keyframes slideDown {
            from {
              transform: translateY(-100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.8;
            }
          }
          
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-5px);
            }
            60% {
              transform: translateY(-3px);
            }
          }
        `}
      </style>
    </div>
  );
} 
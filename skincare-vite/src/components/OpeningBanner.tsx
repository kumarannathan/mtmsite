import React, { useState, useEffect, createContext, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Create context for banner visibility
export const BannerContext = createContext({
  isBannerVisible: true,
  setIsBannerVisible: (visible: boolean) => {},
});

export const useBanner = () => useContext(BannerContext);

export default function OpeningBanner() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  // Update context when banner visibility changes
  useEffect(() => {
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new CustomEvent('bannerVisibilityChange', { 
      detail: { isVisible } 
    }));
  }, [isVisible]);

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
      padding: isMobile ? '8px 16px' : '12px 32px',
      display: 'flex',
      flexDirection: isMobile ? 'row' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 8px rgba(27, 77, 62, 0.2)',
      fontFamily: 'Inter, Arial, sans-serif',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      minHeight: isMobile ? '40px' : '48px',
    }}>
      {/* Mobile Layout - Simplified */}
      {isMobile && (
        <>
          {/* Opening Text */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            fontWeight: 600,
            flex: 1,
          }}>
            <span style={{ fontSize: '0.9rem' }}>🎉</span>
            <span>{t('banner_opening_week')}</span>
          </div>

          {/* Book Now Button */}
          <Link to="/book-calendly" style={{
            background: 'white',
            color: '#1B4D3E',
            padding: '6px 12px',
            borderRadius: '16px',
            textDecoration: 'none',
            fontSize: '0.8rem',
            fontWeight: 600,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
            display: 'inline-block',
            marginRight: '8px',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
          }}
          >
            {t('banner_book_now')}
          </Link>

          {/* Close Button */}
          <button
            onClick={handleClose}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              fontSize: '0.9rem',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              fontWeight: 300,
              flexShrink: 0,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ×
          </button>
        </>
      )}

      {/* Desktop Layout */}
      {!isMobile && (
        <>
          {/* Left Side - Opening Info */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '1rem',
            fontWeight: 600,
            textShadow: '0 1px 2px rgba(0,0,0,0.2)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              fontSize: '0.9rem',
            }}>
              <span style={{ fontSize: '1.1rem' }}>🎉</span>
              <span>{t('banner_opening_week')}</span>
            </div>
            
            <span style={{
              textShadow: '0 1px 2px rgba(0,0,0,0.1)',
              letterSpacing: '0.3px',
              fontSize: '0.95rem',
              fontWeight: 500,
            }}>{t('banner_special_offer_text')}</span>
          </div>

          {/* Right Side Content */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flex: '0 0 auto',
            justifyContent: 'flex-end',
            flexWrap: 'nowrap',
          }}>
            {/* Special Offer Code */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(10px)',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.5px',
            }}>
              <span style={{ fontSize: '0.8rem' }}>💎</span>
              <span>{t('banner_use_code')}</span>
              <span style={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                color: '#1B4D3E',
                padding: '3px 8px',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.75rem',
                letterSpacing: '1px',
                textShadow: 'none'
              }}>OPENING</span>
              <span>{t('banner_at_booking')}</span>
            </div>

            {/* Book Now Button */}
            <Link to="/book-calendly" style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
              color: '#1B4D3E',
              padding: '8px 20px',
              borderRadius: '20px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 700,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              position: 'relative',
              overflow: 'hidden',
              display: 'inline-block',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
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
                fontSize: '1.2rem',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
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
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ×
            </button>
          </div>
        </>
      )}
    </div>
  );
} 
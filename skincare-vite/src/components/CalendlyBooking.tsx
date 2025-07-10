import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface CalendlyBookingProps {
  calendlyUrl: string;
  onBookingComplete?: (bookingData: any) => void;
}

export default function CalendlyBooking({ calendlyUrl, onBookingComplete }: CalendlyBookingProps) {
  const { t } = useTranslation();

  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);

    // Listen for Calendly events
    const handleCalendlyEvent = (e: any) => {
      if (e.data.event && e.data.event.indexOf('calendly') === 0) {
        console.log('Calendly event:', e.data);
        
        if (e.data.event === 'calendly.event_scheduled') {
          const bookingData = {
            eventType: e.data.payload.event_type,
            eventDate: e.data.payload.event.start_time,
            eventEnd: e.data.payload.event.end_time,
            invitee: e.data.payload.invitee,
            calendarEvent: e.data.payload.event
          };
          
          if (onBookingComplete) {
            onBookingComplete(bookingData);
          }
        }
      }
    };

    window.addEventListener('message', handleCalendlyEvent);

    return () => {
      document.head.removeChild(script);
      window.removeEventListener('message', handleCalendlyEvent);
    };
  }, [onBookingComplete]);

  return (
    <div style={{ 
      background: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      marginBottom: '24px'
    }}>
      <h3 style={{ 
        fontSize: '1.4rem', 
        marginBottom: '16px', 
        fontWeight: 600, 
        color: '#333',
        textAlign: 'center'
      }}>
        {t('booking_selectDateTime')}
      </h3>
      
      <p style={{ 
        fontSize: '1rem', 
        color: '#666', 
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        {t('booking_calendlyDescription')}
      </p>

      {/* Calendly Inline Widget */}
      <div 
        className="calendly-inline-widget" 
        data-url={calendlyUrl}
        style={{ 
          minWidth: '320px', 
          height: '700px',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      />
    </div>
  );
} 
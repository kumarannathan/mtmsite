import React from 'react';
import { useTranslation } from 'react-i18next';
import HybridBookingForm from '../components/HybridBookingForm';
import styles from '../App.module.css';

// Import your service data
const mainServices = [
  {
    id: '1',
    titleKey: 'service_mind_title',
    descriptionKey: 'service_mind_description',
    durationKey: 'service_mind_duration',
    priceKey: 'service_mind_price'
  },
  {
    id: '2',
    titleKey: 'service_growth_title',
    descriptionKey: 'service_growth_description',
    durationKey: 'service_growth_duration',
    priceKey: 'service_growth_price'
  },
  {
    id: '3',
    titleKey: 'service_rejuvenation_title',
    descriptionKey: 'service_rejuvenation_description',
    durationKey: 'service_rejuvenation_duration',
    priceKey: 'service_rejuvenation_price'
  }
];

const addonServices = [
  {
    id: '4',
    titleKey: 'addon_gong_title',
    descriptionKey: 'addon_gong_description',
    durationKey: 'addon_gong_duration',
    priceKey: 'addon_gong_price'
  },
  {
    id: '5',
    titleKey: 'addon_styling_title',
    descriptionKey: 'addon_styling_description',
    durationKey: 'addon_styling_duration',
    priceKey: 'addon_styling_price',
    noteKey: 'addon_styling_note'
  }
];

export default function BookMeTest() {
  const { t } = useTranslation();

  return (
    <div className={styles.root} style={{ 
      fontFamily: 'Inter, Arial, sans-serif',
      backgroundColor: '#fbeee5',
      minHeight: '100vh',
      paddingTop: '120px',
      paddingBottom: '60px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.92)',
        borderRadius: '24px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
        padding: '48px 42px',
      }}>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '16px', fontWeight: 600, color: '#111' }}>
          {t('booking_title')} - Calendly Test
        </h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '40px', color: '#666' }}>
          Testing Calendly integration with your existing booking system
        </p>
        
        <HybridBookingForm 
          mainServices={mainServices}
          addonServices={addonServices}
        />
      </div>
    </div>
  );
} 
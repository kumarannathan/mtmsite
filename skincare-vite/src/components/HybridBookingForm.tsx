import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CalendlyBooking from './CalendlyBooking';
import emailjs from '@emailjs/browser';
import { getCalendlyUrlByServiceId, getServiceMappingByServiceId } from '../config/calendlyConfig';

interface BookingData {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  service: string;
  notes: string;
  promotionCode: string;
  calendlyBooking?: any;
}

interface HybridBookingFormProps {
  mainServices: any[];
  addonServices: any[];
}

export default function HybridBookingForm({ mainServices, addonServices }: HybridBookingFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<BookingData>({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    service: '',
    notes: '',
    promotionCode: ''
  });
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [bookingStep, setBookingStep] = useState<'form' | 'calendar' | 'complete'>('form');
  const [calendlyBooking, setCalendlyBooking] = useState<any>(null);

  const handleCalendlyComplete = (bookingData: any) => {
    setCalendlyBooking(bookingData);
    setBookingStep('complete');
    
    // Auto-fill form with Calendly data
    setFormData(prev => ({
      ...prev,
      email: bookingData.invitee.email || prev.email,
      name: bookingData.invitee.name?.split(' ')[0] || prev.name,
      lastname: bookingData.invitee.name?.split(' ').slice(1).join(' ') || prev.lastname
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!calendlyBooking) {
      alert('Please complete your calendar booking first');
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const customerTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CUSTOMER;
    const businessTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_BUSINESS;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const mainService = mainServices.find(s => s.id === formData.service);
    const addons = addonServices.filter(s => selectedAddons.includes(s.id));
    
    let therapyDetails = mainService ? t(mainService.titleKey) : 'Not specified';
    if (addons.length > 0) {
      therapyDetails += ` (+ ${addons.map(a => t(a.titleKey)).join(', ')})`;
    }

    // Format Calendly booking data
    const eventDate = new Date(calendlyBooking.eventDate);
    const formattedDateTime = eventDate.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const templateParams = {
      booking_id: `MTM-${Date.now().toString().slice(-6)}`,
      full_name: `${formData.name} ${formData.lastname}`,
      email: formData.email,
      phone: formData.phone,
      preferred_date: formattedDateTime,
      selected_therapy: therapyDetails,
      additional_notes: formData.notes,
      promotion_code: formData.promotionCode || 'None',
      calendly_event_id: calendlyBooking.calendarEvent.uri,
      calendly_invitee_id: calendlyBooking.invitee.uri
    };

    // Send emails
    try {
      await emailjs.send(serviceId, customerTemplateId, templateParams, publicKey);
      await emailjs.send(serviceId, businessTemplateId, templateParams, publicKey);
      
      console.log('✅ Booking submitted successfully with Calendly integration');
      
      // Reset form
      setFormData({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        service: '',
        notes: '',
        promotionCode: ''
      });
      setSelectedAddons([]);
      setCalendlyBooking(null);
      setBookingStep('form');
      
    } catch (error) {
      console.error('❌ Error submitting booking:', error);
      alert('Error submitting booking. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceSelect = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      service: serviceId
    }));
  };

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons(prevAddons => {
      if (prevAddons.includes(addonId)) {
        return prevAddons.filter(id => id !== addonId);
      } else {
        return [...prevAddons, addonId];
      }
    });
  };

  if (bookingStep === 'calendar') {
    const selectedCalendlyUrl = getCalendlyUrlByServiceId(formData.service);
    
    if (!selectedCalendlyUrl) {
      return (
        <div style={{ 
          background: 'white',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: '#333' }}>
            Service Not Configured
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '24px' }}>
            This service is not yet configured with Calendly. Please contact us to book this service.
          </p>
          <button
            onClick={() => setBookingStep('form')}
            style={{
              backgroundColor: '#19934c',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Back to Services
          </button>
        </div>
      );
    }
    
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <CalendlyBooking 
          calendlyUrl={selectedCalendlyUrl}
          onBookingComplete={handleCalendlyComplete}
        />
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={() => setBookingStep('form')}
            style={{
              backgroundColor: '#666',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Back to Form
          </button>
        </div>
      </div>
    );
  }

  if (bookingStep === 'complete') {
    return (
      <div style={{ 
        background: 'white',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: '#19934c' }}>
          Calendar Booking Complete!
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '24px' }}>
          Your appointment has been scheduled. Please complete the form below to finalize your booking.
        </p>
        
        <button
          onClick={() => setBookingStep('form')}
          style={{
            backgroundColor: '#19934c',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Complete Booking Form
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ 
        background: 'white',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: '#333' }}>
          Step 1: Select Your Service
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '16px',
          marginBottom: '24px'
        }}>
          {mainServices.map(service => (
            <div 
              key={service.id}
              onClick={() => handleServiceSelect(service.id)}
              style={{
                border: formData.service === service.id ? '2px solid #19934c' : '1px solid #ddd',
                borderRadius: '12px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: formData.service === service.id ? 'rgba(25, 147, 76, 0.05)' : '#fff',
                transform: formData.service === service.id ? 'translateY(-2px)' : 'none'
              }}
            >
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: formData.service === service.id ? '#19934c' : '#333', marginBottom: '8px' }}>
                {t(service.titleKey)}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '12px', lineHeight: 1.4 }}>
                {t(service.descriptionKey)}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#666' }}>
                <span>{t(service.durationKey)}</span>
                <span style={{ fontWeight: 600 }}>{t(service.priceKey)}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => setBookingStep('calendar')}
            disabled={!formData.service}
            style={{
              backgroundColor: formData.service ? '#19934c' : '#ccc',
              color: 'white',
              border: 'none',
              padding: '14px 32px',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 500,
              cursor: formData.service ? 'pointer' : 'not-allowed',
              boxShadow: formData.service ? '0 2px 10px rgba(25, 147, 76, 0.15)' : 'none'
            }}
          >
            {formData.service ? 'Continue to Calendar' : 'Please Select a Service First'}
          </button>
        </div>
      </div>

      {calendlyBooking && (
        <form onSubmit={handleSubmit} style={{ 
          background: 'white',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '24px', color: '#333' }}>
            Step 2: Complete Your Information
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#555' }}>
                First Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  color: '#111',
                  backgroundColor: '#fff'
                }}
                placeholder="Enter your first name"
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#555' }}>
                Last Name *
              </label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  color: '#111',
                  backgroundColor: '#fff'
                }}
                placeholder="Enter your last name"
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#555' }}>
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  color: '#111',
                  backgroundColor: '#fff'
                }}
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#555' }}>
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  color: '#111',
                  backgroundColor: '#fff'
                }}
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#555' }}>
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                minHeight: '120px',
                resize: 'vertical',
                color: '#111',
                backgroundColor: '#fff'
              }}
              placeholder="Any special requests or concerns..."
            />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#555' }}>
              Promotion Code (Optional)
            </label>
            <input
              type="text"
              name="promotionCode"
              value={formData.promotionCode}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                color: '#111',
                backgroundColor: '#fff'
              }}
              placeholder="Enter promotion code if you have one"
            />
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              type="submit"
              style={{
                backgroundColor: '#19934c',
                color: '#fff',
                border: 'none',
                padding: '14px 32px',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 500,
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(25, 147, 76, 0.15)',
              }}
            >
              Complete Booking
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 
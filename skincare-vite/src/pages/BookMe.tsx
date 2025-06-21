import styles from '../App.module.css';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import './flatpickr-custom.css';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  date: string;
  service: string;
  notes: string;
  promotionCode: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  note?: string;
}

interface TranslatableService {
  id: string;
  titleKey: string;
  descriptionKey: string;
  durationKey: string;
  priceKey: string;
  noteKey?: string;
}

const mainServices: TranslatableService[] = [
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

const addonServices: TranslatableService[] = [
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

export default function BookMe() {
  const { t, i18n } = useTranslation();
  
  // Create fully translated service objects
  const translatedMainServices: Service[] = mainServices.map(s => ({
    id: s.id,
    title: t(s.titleKey),
    description: t(s.descriptionKey),
    duration: t(s.durationKey),
    price: t(s.priceKey)
  }));
  
  const translatedAddonServices: Service[] = addonServices.map(s => ({
    id: s.id,
    title: t(s.titleKey),
    description: t(s.descriptionKey),
    duration: t(s.durationKey),
    price: t(s.priceKey),
    note: s.noteKey ? t(s.noteKey) : undefined
  }));
  
  // Combine all services for easier lookup
  const allServices: Service[] = [...translatedMainServices, ...translatedAddonServices];

  const [formData, setFormData] = useState<FormData>({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    date: '',
    service: '',
    notes: '',
    promotionCode: ''
  });
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // On mount, try to load name, lastname, phone from localStorage
  useEffect(() => {
    const name = localStorage.getItem('booking_name') || '';
    const lastname = localStorage.getItem('booking_lastname') || '';
    const phone = localStorage.getItem('booking_phone') || '';
    setFormData(prev => ({ ...prev, name, lastname, phone }));
  }, []);

  useEffect(() => {
    // Pre-fill form from URL parameters
    const params = new URLSearchParams(window.location.search);
    const serviceId = params.get('service');
    const addonId = params.get('addon');

    if (serviceId && mainServices.some(s => s.id === serviceId)) {
      setFormData(prev => ({ ...prev, service: serviceId }));
    }

    if (addonId && addonServices.some(a => a.id === addonId)) {
      setSelectedAddons(prev => {
        if (!prev.includes(addonId)) {
          return [...prev, addonId];
        }
        return prev;
      });
    }
  }, []); // Run once on component mount

  useEffect(() => {
    // Initialize the date picker on the correct element
    const datePickerElement = document.getElementById('date-picker');
    if (datePickerElement) {
      flatpickr(datePickerElement, {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        minDate: "today",
        disableMobile: false,
        minTime: "09:00",
        maxTime: "17:00",
        disable: [
          function(date) {
            // Disable weekends (Saturday = 6, Sunday = 0)
            return date.getDay() === 0 || date.getDay() === 6;
          }
        ],
        locale: {
          firstDayOfWeek: 1,
          ...((i18n.language === 'es') ? {
            weekdays: {
              shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
              longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
            },
            months: {
              shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
              longhand: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
            }
          } : {})
        },
        onChange: function(selectedDates, dateStr) {
          setFormData(prev => ({
            ...prev,
            date: dateStr
          }));
        }
      });
    }
  }, [i18n.language]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
        return prevAddons.filter(id => id !== addonId); // Deselect
      } else {
        return [...prevAddons, addonId]; // Select
      }
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // --- 1. EmailJS setup ---
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

    const templateParams = {
      booking_id: `MTM-${Date.now().toString().slice(-6)}`,
      full_name: `${formData.name} ${formData.lastname}`,
      email: formData.email,
      phone: formData.phone,
      preferred_date: formData.date,
      selected_therapy: therapyDetails,
      additional_notes: formData.notes,
      promotion_code: formData.promotionCode || 'None'
    };

    // --- 2. Send email to customer ---
    emailjs.send(serviceId, customerTemplateId, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS! Customer email sent.', response.status, response.text);
      }, (err) => {
        console.log('FAILED... to send customer email', err);
      });

    // --- 3. Send email to business ---
    emailjs.send(serviceId, businessTemplateId, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS! Business notification sent.', response.status, response.text);
      }, (err) => {
        console.log('FAILED... to send business notification', err);
      });


    // --- 4. Original form logic ---
    localStorage.setItem('booking_name', formData.name);
    localStorage.setItem('booking_lastname', formData.lastname);
    localStorage.setItem('booking_phone', formData.phone);
    console.log('Booking submitted:', formData, selectedAddons);
    setSubmitted(true);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    marginBottom: '20px',
    fontSize: '16px',
    transition: 'border-color 0.3s ease',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#f8f8f8'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    fontSize: '14px',
    color: '#333',
    textAlign: 'left' as const
  };

  const buttonStyle = {
    background: '#19934c',
    color: 'white',
    border: 'none',
    padding: '14px 32px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    marginTop: '10px',
    width: '100%'
  };

  const resetForm = () => {
    setFormData({
      name: '',
      lastname: '',
      email: '',
      phone: '',
      date: '',
      service: '',
      notes: '',
      promotionCode: ''
    });
    setSelectedAddons([]);
    setSubmitted(false);
  };

  const parsePrice = (priceStr: string) => {
    return parseFloat(priceStr.replace(/[^0-9.-]+/g, ''));
  };

  const calculateTotalPrice = () => {
    let total = 0;
    if (formData.service) {
      const mainService = mainServices.find(s => s.id === formData.service);
      if (mainService) {
        total += parsePrice(t(mainService.priceKey));
      }
    }
    selectedAddons.forEach(addonId => {
      const addonService = addonServices.find(s => s.id === addonId);
      if (addonService) {
        total += parsePrice(t(addonService.priceKey));
      }
    });
    return total.toLocaleString('en-US', { style: 'currency', currency: 'MXN' });
  };

  // Helper to get duration in minutes from the selected service
  function getServiceDurationMinutes(serviceId: string) {
    const service = allServices.find(s => s.id === serviceId);
    if (!service) return 60;
    // Extract the number from the duration string (e.g., '45 min')
    const match = service.duration.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 60;
  }

  // Helper to generate Google Calendar event link
  function getGoogleCalendarUrl() {
    if (!formData.date || !formData.service) return '#';
    const service = allServices.find(s => s.id === formData.service);
    if (!service) return '#';
    const start = new Date(formData.date);
    const durationMinutes = getServiceDurationMinutes(formData.service);
    const end = new Date(start.getTime() + durationMinutes * 60000);
    function formatDate(d: Date) {
      return d.toISOString().replace(/[-:]|\.\d{3}/g, '').slice(0, 15) + 'Z';
    }
    const details = [
      `text=${encodeURIComponent(service.title)}`,
      `dates=${formatDate(start)}/${formatDate(end)}`,
      `details=${encodeURIComponent(service.description)}`,
      `location=`
    ].join('&');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&${details}`;
  }

  if (submitted) {
    return (
      <div className={styles.root} style={{ minHeight: '100vh', fontFamily: 'Inter, Arial, sans-serif', paddingTop: '100px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '60px 24px', textAlign: 'center' }}>
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto 24px' }}>
            <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" fill="#ecf7ec" stroke="#19934c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.75 12L10.58 14.83L16.25 9.17" stroke="#19934c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          
          <h1 style={{ fontSize: '2rem', color: '#111', marginBottom: '16px', fontWeight: 600 }}>
            {t('booking_confirmed')}
          </h1>
          
          <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#555', marginBottom: '32px' }}>
            {t('booking_thankYouMessage')}
          </p>
          
          {/* Booking Details Card */}
          <div style={{ 
            background: '#f8f8f8', 
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '32px',
            textAlign: 'left'
          }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '16px', fontWeight: 500 }}>
              Booking Summary
            </h3>
            
            <div style={{ display: 'grid', gap: '16px' }}>
              <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#666' }}>Main Therapy:</span>
                  <span style={{ fontWeight: 500 }}>{mainServices.find(s => s.id === formData.service)?.titleKey ? t(mainServices.find(s => s.id === formData.service)!.titleKey) : ''}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Price:</span>
                  <span style={{ fontWeight: 500 }}>{mainServices.find(s => s.id === formData.service)?.priceKey ? t(mainServices.find(s => s.id === formData.service)!.priceKey) : ''}</span>
                </div>
              </div>
              
              {selectedAddons.length > 0 && (
                <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '16px' }}>
                  <span style={{ color: '#666', display: 'block', marginBottom: '8px' }}>Add-ons:</span>
                  {selectedAddons.map(addonId => {
                    const addon = addonServices.find(a => a.id === addonId);
                    return (
                      <div key={addonId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ paddingLeft: '16px' }}>- {addon ? t(addon.titleKey) : ''}</span>
                        <span style={{ fontWeight: 500 }}>{addon ? t(addon.priceKey) : ''}</span>
                      </div>
                    )
                  })}
                </div>
              )}
              
              {formData.promotionCode && (
                <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#666' }}>Promotion Code:</span>
                    <span style={{ fontWeight: 500, color: '#19934c' }}>{formData.promotionCode}</span>
                  </div>
                </div>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px' }}>
                <span style={{ color: '#333', fontWeight: 600 }}>Total Price:</span>
                <span style={{ fontWeight: 600, color: '#19934c' }}>{calculateTotalPrice()}</span>
              </div>
              
              <div style={{ 
                background: 'rgba(25, 147, 76, 0.05)', 
                padding: '12px', 
                borderRadius: '6px', 
                border: '1px solid rgba(25, 147, 76, 0.1)',
                marginTop: '8px'
              }}>
                <div style={{ fontSize: '0.9rem', color: '#19934c', fontWeight: 500, marginBottom: '4px' }}>
                  📅 Booking Hours
                </div>
                <div style={{ fontSize: '0.85rem', color: '#666' }}>
                  Monday - Friday: 9:00 AM - 5:00 PM
                </div>
              </div>
            </div>
          </div>
          
          {/* Reminder and Calendar Options */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '16px', 
            marginBottom: '32px',
            flexWrap: 'wrap'
          }}>
            <button style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#ffffff',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '10px 16px',
              color: '#333',
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6V12H16" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Set Reminder
            </button>
            
            <button style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#ffffff',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '10px 16px',
              color: '#333',
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}
            type="button"
            onClick={() => {
              const url = getGoogleCalendarUrl();
              if (url !== '#') window.open(url, '_blank');
            }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="#333" strokeWidth="1.5"/>
                <path d="M3 10H21" stroke="#333" strokeWidth="1.5"/>
                <path d="M16 2V6" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M8 2V6" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Add to Google Calendar
            </button>
            
            <button style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#f5f5f5',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '10px 16px',
              color: '#999',
              fontSize: '0.95rem',
              cursor: 'not-allowed'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12549 15.0077 5.24919 15.0227 5.37063L8.08261 9.34076C7.54305 8.81196 6.80891 8.5 6 8.5C4.34315 8.5 3 9.84315 3 11.5C3 13.1569 4.34315 14.5 6 14.5C6.80891 14.5 7.54305 14.188 8.08261 13.6592L15.0227 17.6294C15.0077 17.7508 15 17.8745 15 18C15 19.6569 16.3431 21 18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15C17.1911 15 16.457 15.312 15.9174 15.8408L8.97733 11.8706C8.99229 11.7492 9 11.6255 9 11.5C9 11.3745 8.99229 11.2508 8.97733 11.1294L15.9174 7.15924C16.457 7.68804 17.1911 8 18 8Z" stroke="#999" strokeWidth="1.5"/>
              </svg>
              Share Booking
            </button>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button 
              onClick={resetForm}
              style={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #19934c',
                color: '#19934c', 
                padding: '12px 24px', 
                borderRadius: '8px',
                fontWeight: 500,
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              {t('booking_bookAnotherSession')}
            </button>
            
            <a 
              href="/"
              style={{ 
                backgroundColor: '#19934c', 
                border: 'none',
                color: 'white', 
                padding: '12px 24px', 
                borderRadius: '8px',
                fontWeight: 500,
                fontSize: '1rem',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              {t('booking_returnToHome')}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root} style={{ 
      fontFamily: 'Inter, Arial, sans-serif',
      backgroundColor: 'white',
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
          {t('booking_title')}
        </h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '40px', color: '#666' }}>
          {t('booking_subtitle')}
        </p>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '24px', fontWeight: 500, color: '#333' }}>
              {t('booking_yourInformation')}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#555' }}>
                  {t('booking_fullName')} *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={t('booking_enterYourFullName')}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '1rem',
                    color: '#111',
                    backgroundColor: '#fff'
                  }}
                />
              </div>
              <div>
                <label htmlFor="lastname" style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#555' }}>
                  Last Name *</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                  placeholder="Enter your last name"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '1rem',
                    color: '#111',
                    backgroundColor: '#fff'
                  }}
                />
              </div>
              <div>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#555' }}>
                  {t('booking_emailAddress')} *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t('booking_enterYourEmail')}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '1rem',
                    color: '#111',
                    backgroundColor: '#fff'
                  }}
                />
              </div>
              <div>
                <label htmlFor="phone" style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#555' }}>
                  {t('booking_phoneNumber')} *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder={t('booking_enterYourPhoneNumber')}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '1rem',
                    color: '#111',
                    backgroundColor: '#fff'
                  }}
                />
              </div>
            </div>
          </div>
          
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '24px', fontWeight: 500, color: '#333' }}>
              Step 1: {t('booking_selectTherapy')} *
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', 
              gap: '16px',
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
                    boxShadow: formData.service === service.id ? '0 4px 12px rgba(25, 147, 76, 0.1)' : 'none',
                    transform: formData.service === service.id ? 'translateY(-2px)' : 'none'
                  }}
                >
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: formData.service === service.id ? '#19934c' : '#333', marginBottom: '8px' }}>{t(service.titleKey)}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '12px', lineHeight: 1.4, whiteSpace: 'pre-line' }}>{t(service.descriptionKey)}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#666' }}>
                    <span>{t(service.durationKey)}</span>
                    <span style={{ fontWeight: 600 }}>{t(service.priceKey)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '24px', fontWeight: 500, color: '#333' }}>
              Step 2: Optional Add-ons
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', 
              gap: '16px',
            }}>
              {addonServices.map(service => (
                <div 
                  key={service.id}
                  onClick={() => handleAddonToggle(service.id)}
                  style={{
                    border: selectedAddons.includes(service.id) ? '2px solid #19934c' : '1px solid #ddd',
                    borderRadius: '12px',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: selectedAddons.includes(service.id) ? 'rgba(25, 147, 76, 0.05)' : '#fff',
                    boxShadow: selectedAddons.includes(service.id) ? '0 4px 12px rgba(25, 147, 76, 0.1)' : 'none',
                    transform: selectedAddons.includes(service.id) ? 'translateY(-2px)' : 'none',
                    position: 'relative'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      width: '100%'
                    }}
                  >
                    {selectedAddons.includes(service.id) && (
                      <div style={{ position: 'absolute', top: '10px', right: '10px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#19934c', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
                    )}
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0, fontWeight: 600, fontSize: '1.1rem', color: '#444' }}>{t(service.titleKey)}</h4>
                      <p style={{ margin: '4px 0 0', color: '#777', fontSize: '0.9rem' }}>
                        {t(service.durationKey)}
                      </p>
                      {service.noteKey && (
                        <p style={{ margin: '4px 0 0', color: '#777', fontSize: '0.8rem', fontStyle: 'italic' }}>
                          {t(service.noteKey)}
                        </p>
                      )}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: '1.1rem', color: '#19934c' }}>{t(service.priceKey)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '24px', fontWeight: 500, color: '#333' }}>
              Step 3: Select Date & Time *
            </h2>
            <div>
              <label htmlFor="date-picker" style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#555' }}>
                {t('booking_preferredDate')} *
              </label>
              <input
                type="text"
                id="date-picker"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                placeholder={t('booking_selectDate')}
                style={{
                  width: '100%',
                  padding: '16px 18px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  backgroundColor: '#fff',
                  color: '#111'
                }}
              />
              <div style={{ 
                background: 'rgba(25, 147, 76, 0.05)', 
                padding: '12px', 
                borderRadius: '6px', 
                border: '1px solid rgba(25, 147, 76, 0.1)',
                marginTop: '12px'
              }}>
                <div style={{ fontSize: '0.9rem', color: '#19934c', fontWeight: 500, marginBottom: '4px' }}>
                  ⏰ Available Booking Times
                </div>
                <div style={{ fontSize: '0.85rem', color: '#666' }}>
                  Monday - Friday: 9:00 AM - 5:00 PM
                </div>
                <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>
                  Weekend bookings are not available
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '24px', fontWeight: 500, color: '#333' }}>
              Step 4: Additional Information
            </h2>
            
            <div style={{ marginBottom: '24px' }}>
              <label htmlFor="promotionCode" style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#555' }}>
                Promotion Code (Optional)
              </label>
              <input
                type="text"
                id="promotionCode"
                name="promotionCode"
                value={formData.promotionCode}
                onChange={handleChange}
                placeholder="Enter promotion code if you have one"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  cursor: 'text',
                  backgroundColor: '#fff',
                  color: '#111'
                }}
              />
              <p style={{ fontSize: '0.85rem', color: '#777', marginTop: '8px' }}>
                Have a promotion code? Enter it here to receive your discount.
              </p>
            </div>
            
            <div>
              <label htmlFor="notes" style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#555' }}>
                {t('booking_additionalNotes')}
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder={t('booking_anySpecificConcerns')}
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
              ></textarea>
              <p style={{ fontSize: '0.9rem', color: '#777', marginTop: '8px' }}>
                {t('booking_anySpecialRequests')}
              </p>
            </div>
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
              {t('booking_confirmBooking')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 
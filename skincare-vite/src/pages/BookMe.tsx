import styles from '../App.module.css';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_red.css';
import { useTranslation } from 'react-i18next';

interface FormData {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  date: string;
  service: string;
  notes: string;
}

export default function BookMe() {
  const { t, i18n } = useTranslation();
  
  // Services from Therapies page
  const services = [
    {
      id: 'mind-scalp-health',
      title: t('service_mind_scalp_title'),
      description: t('service_mind_scalp_desc'),
      duration: '45 min',
      price: '$1,200 MXN'
    },
    {
      id: 'hair-growth',
      title: t('service_hair_growth_title'),
      description: t('service_hair_growth_desc'),
      duration: '45 min',
      price: '$1,700 MXN'
    },
    {
      id: 'hair-rejuvenation',
      title: t('service_hair_rejuvenation_title'),
      description: t('service_hair_rejuvenation_desc'),
      duration: '45 min',
      price: '$1,700 MXN'
    },
    {
      id: 'gong-therapy',
      title: t('service_gong_therapy_title'),
      description: t('service_gong_therapy_desc'),
      duration: '15 min',
      price: '$250 MXN'
    },
    {
      id: 'post-therapy',
      title: t('service_post_therapy_title'),
      description: t('service_post_therapy_desc'),
      duration: '30 min',
      price: '$500 MXN'
    },
    {
      id: 'hair-styling',
      title: t('service_hair_styling_title'),
      description: t('service_hair_styling_desc'),
      duration: '20 min',
      price: '$200 MXN'
    }
  ];
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    date: '',
    service: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // On mount, try to load name, lastname, phone from localStorage
  useEffect(() => {
    const name = localStorage.getItem('booking_name') || '';
    const lastname = localStorage.getItem('booking_lastname') || '';
    const phone = localStorage.getItem('booking_phone') || '';
    setFormData(prev => ({ ...prev, name, lastname, phone }));
  }, []);

  useEffect(() => {
    // Initialize the date picker on the correct element
    const datePickerElement = document.getElementById('date-picker');
    if (datePickerElement) {
      flatpickr(datePickerElement, {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        minDate: "today",
        disableMobile: false,
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Save name, lastname, phone to localStorage
    localStorage.setItem('booking_name', formData.name);
    localStorage.setItem('booking_lastname', formData.lastname);
    localStorage.setItem('booking_phone', formData.phone);
    console.log('Booking submitted:', formData);
    setSubmitted(true);
    // Here you would typically send the data to your backend
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
      notes: ''
    });
    setSubmitted(false);
  };

  // Helper to get duration in minutes from the selected service
  function getServiceDurationMinutes(serviceId: string) {
    const service = services.find(s => s.id === serviceId);
    if (!service) return 60;
    // Extract the number from the duration string (e.g., '45 min')
    const match = service.duration.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 60;
  }

  // Helper to generate Google Calendar event link
  function getGoogleCalendarUrl() {
    if (!formData.date || !formData.service) return '#';
    const service = services.find(s => s.id === formData.service);
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
              Booking Details
            </h3>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>Service:</span>
                <span style={{ fontWeight: 500 }}>{services.find(s => s.id === formData.service)?.title}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>Date & Time:</span>
                <span style={{ fontWeight: 500 }}>{formData.date}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>Duration:</span>
                <span style={{ fontWeight: 500 }}>{services.find(s => s.id === formData.service)?.duration}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>Price:</span>
                <span style={{ fontWeight: 500 }}>{services.find(s => s.id === formData.service)?.price}</span>
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
              {t('booking_selectTherapy')} *
            </h2>
            {/* Therapy Card Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', 
              gap: '16px',
              marginBottom: '32px'
            }}>
              {services.map(service => (
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
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: 600, 
                    marginBottom: '8px',
                    color: formData.service === service.id ? '#19934c' : '#333'
                  }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '12px', lineHeight: 1.4 }}>
                    {service.description.length > 60 
                      ? service.description.substring(0, 60) + '...' 
                      : service.description}
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    fontSize: '0.9rem',
                    color: '#666'
                  }}>
                    <span>{service.duration}</span>
                    <span style={{ fontWeight: 600 }}>{service.price}</span>
                  </div>
                  
                  {formData.service === service.id && (
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      marginTop: '12px' 
                    }}>
                      <span style={{ 
                        display: 'inline-block',
                        backgroundColor: '#19934c',
                        color: 'white',
                        fontSize: '0.8rem',
                        padding: '4px 10px',
                        borderRadius: '99px',
                        fontWeight: 500
                      }}>
                        Selected
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
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
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  backgroundColor: '#fff',
                  color: '#111'
                }}
              />
            </div>
          </div>
          
          <div style={{ marginBottom: '32px' }}>
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
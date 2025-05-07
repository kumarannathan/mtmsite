import styles from '../App.module.css';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_red.css';
import { useTranslation } from 'react-i18next';

interface FormData {
  name: string;
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
      duration: '60 min',
      price: '$1,700 MXN'
    },
    {
      id: 'post-therapy',
      title: t('service_post_therapy_title'),
      description: t('service_post_therapy_desc'),
      duration: '30 min',
      price: '$500 MXN'
    },
    {
      id: 'custom-wellness',
      title: t('service_custom_wellness_title'),
      description: t('service_custom_wellness_desc'),
      duration: '75-90 min',
      price: '$2,200 MXN'
    }
  ];
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    service: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const datePickerElement = document.getElementById('date-picker');
    if (datePickerElement) {
      flatpickr(datePickerElement, {
        enableTime: false,
        dateFormat: "Y-m-d",
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
    background: '#ec1c24',
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
      email: '',
      phone: '',
      date: '',
      service: '',
      notes: ''
    });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className={styles.root} style={{ minHeight: '100vh', fontFamily: 'Inter, Arial, sans-serif', paddingTop: '100px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '60px 24px', textAlign: 'center' }}>
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto 24px' }}>
            <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" fill="#ecf7ec" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.75 12L10.58 14.83L16.25 9.17" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          
          <h1 style={{ fontSize: '2rem', color: '#111', marginBottom: '16px', fontWeight: 600 }}>
            {t('booking_confirmed')}
          </h1>
          
          <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#555', marginBottom: '32px' }}>
            {t('booking_thankYouMessage')}
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button 
              onClick={resetForm}
              style={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #ec1c24',
                color: '#ec1c24', 
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
                backgroundColor: '#ec1c24', 
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
      backgroundColor: 'hsla(0,100%,50%,1)',
      backgroundImage: `
        radial-gradient(at 40% 20%, hsla(27,0%,100%,1) 0px, transparent 50%),
        radial-gradient(at 80% 0%, hsla(186,0%,100%,1) 0px, transparent 50%),
        radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%),
        radial-gradient(at 80% 50%, hsla(340,0%,100%,1) 0px, transparent 50%),
        radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%),
        radial-gradient(at 84% 62%, hsla(132,100%,70%,1) 0px, transparent 50%),
        radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%)`,
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
                  {t('booking_fullName')} *
                </label>
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
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#555' }}>
                  {t('booking_emailAddress')} *
                </label>
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
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div>
                <label htmlFor="phone" style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#555' }}>
                  {t('booking_phoneNumber')} *
                </label>
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
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
          </div>
          
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div>
                <label htmlFor="booking-date" style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#555' }}>
                  {t('booking_preferredDate')} *
                </label>
                <input
                  type="text"
                  id="booking-date"
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
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div>
                <label htmlFor="service" style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#555' }}>
                  {t('booking_selectTherapy')} *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '1rem',
                    backgroundColor: '#fff'
                  }}
                >
                  <option value="" disabled>{t('booking_selectTherapy')}</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.title} ({service.duration}, {service.price})
                    </option>
                  ))}
                </select>
              </div>
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
                resize: 'vertical'
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
                backgroundColor: '#ec1c24',
                color: '#fff',
                border: 'none',
                padding: '14px 32px',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 500,
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(236, 28, 36, 0.15)',
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
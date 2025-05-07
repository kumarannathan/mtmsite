import styles from '../App.module.css';
import { useLanguage } from '../LanguageContext';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_red.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  service: string;
  notes: string;
}

// Services from Therapies page
const services = [
  {
    id: 'mind-scalp-health',
    title: 'Mind & Scalp Health and Relaxation',
    description: 'Deep relaxation therapy combining ancient and modern techniques.',
    duration: '45 min',
    price: '$1,200 MXN'
  },
  {
    id: 'hair-growth',
    title: 'Hair Growth & Preservation Therapy',
    description: 'Treatment focused on stimulating hair growth and reducing loss.',
    duration: '45 min',
    price: '$1,700 MXN'
  },
  {
    id: 'hair-rejuvenation',
    title: 'Hair Rejuvenation Therapy',
    description: 'Revitalizes aging or damaged hair, improving texture and shine.',
    duration: '45 min',
    price: '$1,700 MXN'
  },
  {
    id: 'gong-therapy',
    title: 'Elevated Mind Relaxation "Gong" Therapy',
    description: 'A sound healing session using frequencies for emotional clarity.',
    duration: '60 min',
    price: '$1,700 MXN'
  },
  {
    id: 'post-therapy',
    title: 'Post-Therapy Rejuvenation',
    description: 'Tea and relaxation ritual after therapy to extend the experience.',
    duration: '30 min',
    price: '$500 MXN'
  },
  {
    id: 'custom-wellness',
    title: 'Customized Wellness Experience',
    description: 'Personalized combination of therapies tailored to your needs.',
    duration: '75-90 min',
    price: '$2,200 MXN'
  }
];

export default function BookMe() {
  const { lang } = useLanguage();
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
          ...((lang === 'es') ? {
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
  }, [lang]);

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

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'hsla(0,100%,50%,1)',
      backgroundImage: `
        radial-gradient(at 40% 20%, hsla(27,0%,100%,1) 0px, transparent 50%),
        radial-gradient(at 80% 0%, hsla(186,0%,100%,1) 0px, transparent 50%),
        radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%),
        radial-gradient(at 80% 50%, hsla(340,0%,100%,1) 0px, transparent 50%),
        radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%),
        radial-gradient(at 84% 62%, hsla(132,100%,70%,1) 0px, transparent 50%),
        radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%)`,
      padding: '40px 20px 80px',
      fontFamily: 'Inter, sans-serif'
    }}>
      <section style={{
        padding: '40px 24px 32px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <h1 style={{
            fontFamily: 'Inter, Arial, sans-serif',
            fontWeight: 700,
            fontSize: '3rem',
            color: '#111',
            marginBottom: '24px',
            letterSpacing: '-0.01em',
          }}>
            {lang === 'en' ? 'Book Your MTM Session' : 'Reserva tu sesión MTM'}
          </h1>
          <div style={{
            width: '60px',
            height: '4px',
            background: '#ec1c24',
            margin: '0 auto 32px',
            borderRadius: '2px',
          }}></div>
          <p style={{
            fontSize: '1.18rem',
            lineHeight: 1.6,
            color: '#222',
            marginBottom: '0',
            fontWeight: 400,
          }}>
            {lang === 'en' 
              ? 'Select your preferred date and therapy to schedule your personalized session.'
              : 'Selecciona tu fecha preferida y terapia para programar tu sesión personalizada.'}
          </p>
        </div>
      </section>

      {!submitted ? (
        <section style={{
          maxWidth: '900px',
          margin: '0 auto 60px',
          padding: '0 20px',
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{
              background: 'rgba(255,255,255,0.92)',
              borderRadius: '22px',
              boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
              padding: '40px',
              marginBottom: '30px',
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#333',
                marginTop: 0,
                marginBottom: '30px'
              }}>
                {lang === 'en' ? 'Your Information' : 'Tu Información'}
              </h2>
              
              <div style={{ marginBottom: '24px' }}>
                <label htmlFor="name" style={labelStyle}>
                  {lang === 'en' ? 'Full Name' : 'Nombre Completo'}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder={lang === 'en' ? 'Enter your full name' : 'Ingresa tu nombre completo'}
                />
              </div>

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 300px' }}>
                  <label htmlFor="email" style={labelStyle}>
                    {lang === 'en' ? 'Email Address' : 'Correo Electrónico'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    placeholder={lang === 'en' ? 'Enter your email' : 'Ingresa tu correo electrónico'}
                  />
                </div>

                <div style={{ flex: '1 1 300px' }}>
                  <label htmlFor="phone" style={labelStyle}>
                    {lang === 'en' ? 'Phone Number' : 'Número de Teléfono'}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    placeholder={lang === 'en' ? 'Enter your phone number' : 'Ingresa tu número de teléfono'}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label htmlFor="date-picker" style={labelStyle}>
                  {lang === 'en' ? 'Preferred Date' : 'Fecha Preferida'}
                </label>
                <input
                  type="text"
                  id="date-picker"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder={lang === 'en' ? 'Select a date' : 'Selecciona una fecha'}
                />
              </div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.92)',
              borderRadius: '22px',
              boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
              padding: '40px',
              marginBottom: '30px'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#333',
                marginTop: 0,
                marginBottom: '30px'
              }}>
                {lang === 'en' ? 'Select a Therapy' : 'Selecciona una Terapia'}
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
              }}>
                {services.map(service => (
                  <div 
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    style={{
                      background: formData.service === service.id ? 'rgba(236,28,36,0.03)' : 'white',
                      border: formData.service === service.id ? '1.5px solid #ec1c24' : '1px solid #eee',
                      borderRadius: '12px',
                      padding: '20px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: formData.service === service.id ? '0 4px 20px rgba(236,28,36,0.1)' : '0 2px 10px rgba(0,0,0,0.04)',
                    }}
                  >
                    <h3 style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: 600, 
                      margin: '0 0 8px 0',
                      color: formData.service === service.id ? '#ec1c24' : '#333'
                    }}>
                      {service.title}
                    </h3>
                    <p style={{ 
                      fontSize: '0.9rem', 
                      color: '#666', 
                      margin: '0 0 12px 0',
                      lineHeight: 1.4
                    }}>
                      {service.description}
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      fontSize: '0.9rem',
                      color: '#777'
                    }}>
                      <span>{service.duration}</span>
                      <span style={{ fontWeight: 600 }}>{service.price}</span>
                    </div>
                    
                    {formData.service === service.id && (
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: '#ec1c24',
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.92)',
              borderRadius: '22px',
              boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
              padding: '40px',
              marginBottom: '30px'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#333',
                marginTop: 0,
                marginBottom: '30px'
              }}>
                {lang === 'en' ? 'Additional Notes' : 'Notas Adicionales'}
              </h2>
              
              <div style={{ marginBottom: '24px' }}>
                <label htmlFor="notes" style={labelStyle}>
                  {lang === 'en' ? 'Any special requests or concerns?' : '¿Alguna solicitud especial o inquietud?'}
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  style={{...inputStyle, height: '120px', resize: 'vertical'}}
                  placeholder={lang === 'en' ? 'Any specific concerns or requirements...' : 'Cualquier inquietud o requisito específico...'}
                ></textarea>
              </div>
            </div>

            <button 
              type="submit" 
              style={{
                ...buttonStyle,
                maxWidth: '400px',
                margin: '20px auto',
                display: 'block',
                padding: '16px 32px',
                borderRadius: '99px',
                fontSize: '1.1rem'
              }}
              disabled={!formData.service}
            >
              {lang === 'en' ? 'Book Now' : 'Reservar Ahora'}
            </button>
          </form>
        </section>
      ) : (
        <section style={{
          maxWidth: '600px',
          margin: '40px auto',
          background: 'rgba(255,255,255,0.92)',
          borderRadius: '22px',
          boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
          padding: '60px 40px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            background: 'rgba(236,28,36,0.07)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginBottom: '24px' 
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="#ec1c24"/>
            </svg>
          </div>
          <h2 style={{ 
            fontFamily: 'Inter, Arial, sans-serif',
            fontSize: '2rem',
            fontWeight: 700,
            color: '#111',
            marginBottom: '16px' 
          }}>
            {lang === 'en' ? 'Booking Confirmed!' : '¡Reserva Confirmada!'}
          </h2>
          <p style={{ 
            fontSize: '1.1rem',
            lineHeight: '1.6', 
            color: '#444', 
            maxWidth: '400px', 
            margin: '0 auto 32px' 
          }}>
            {lang === 'en' 
              ? 'Thank you for booking with MTM. We have sent a confirmation email to your inbox. We look forward to welcoming you soon!' 
              : 'Gracias por reservar con MTM. Hemos enviado un correo electrónico de confirmación a tu bandeja de entrada. ¡Esperamos darte la bienvenida pronto!'}
          </p>
          <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <button 
              onClick={() => setSubmitted(false)} 
              style={{
                background: 'transparent',
                border: '1px solid #ec1c24',
                color: '#ec1c24',
                padding: '12px 24px',
                borderRadius: '99px',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              {lang === 'en' ? 'Book Another Session' : 'Reservar Otra Sesión'}
            </button>
            <button 
              onClick={() => window.location.href = '/'} 
              style={{
                background: '#ec1c24',
                border: 'none',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '99px',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              {lang === 'en' ? 'Return to Home' : 'Volver al Inicio'}
            </button>
          </div>
        </section>
      )}
    </div>
  );
} 
import styles from '../App.module.css';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t, i18n } = useTranslation();
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Location data
  const locations = [
    {
      id: 1,
      name: 'San Luis Potosi',
      address: 'Joaquin Meade 136, Lomas 1er Secc, CP 78290, San Luis Potosi, SLP, Mexico',
      phone: '+52 56 6156 7879',
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=22.1565,-100.9855',
      coordinates: {lat: 22.1565, lng: -100.9855},
      image: '/locationMTM.jpg'
    }
  ];
  
  const socialMediaLinks = [
    {
      name: 'WhatsApp',
      icon: '/whatsapp.png',
      url: 'https://wa.me/525661567879',
      alt: 'WhatsApp'
    },
    {
      name: 'Instagram',
      icon: '/insta.png',
      url: 'https://instagram.com/mtm_wellbeing',
      alt: 'Instagram'
    }
  ];
  
  // Handle location selection
  const handleLocationSelect = (index: number) => {
    setSelectedLocation(index);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Using EmailJS to send email
      const emailData = {
        to_email: 'mtmreserv@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        subject: `Contact Form Message from ${formData.name}`
      };

      // For now, we'll use a simple mailto link as a fallback
      // In production, you'd want to use a proper email service like EmailJS, SendGrid, etc.
      const mailtoLink = `mailto:mtmreserv@gmail.com?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      
      window.location.href = mailtoLink;
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      
      // Reset error message after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#fdf9f5',
        fontFamily: 'Inter, Arial, sans-serif',
      }}
    >
      <section style={{
        maxWidth: 1400,
        margin: '0 auto',
        padding: '80px 20px 120px 20px',
        textAlign: 'center',
        background: '#fdf9f5',
        marginTop: "-2%",
        marginBottom: "-10%",
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 32,
          marginTop: '6%'
        }}>
          <span style={{
            background: 'rgba(27,77,62,0.08)',
            color: '#d1b981',
            fontWeight: 600,
            fontSize: '1rem',
            borderRadius: 999,
            padding: '8px 24px',
            letterSpacing: '0.04em',
            fontFamily: 'Inter, Arial, sans-serif',
            display: 'inline-block',
          }}>
            Contact Us
          </span>
        </div>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontWeight: 600,
          fontSize: '3.5rem',
          color: '#1B4D3E',
          marginBottom: 24,
          letterSpacing: '-1px',
          lineHeight: 1.1,
        }}>
          {t('contact_title')}
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#666',
          maxWidth: 700,
          margin: '0 auto 60px',
          fontFamily: 'Inter, Arial, sans-serif',
          lineHeight: 1.6,
        }}>
          {t('contact_subtitle')}
        </p>
      </section>
      <section style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '40px',
        padding: '32px 0 24px 0',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Locations List */}
        <div style={{
          flex: '1 1 340px',
          minWidth: '320px',
          maxWidth: '420px',
          background: 'rgba(255,255,255,0.92)',
          borderRadius: '22px',
          boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
          padding: '20px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          {/* Location Name */}
          <div style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 600,
            fontSize: '1.5rem',
            color: '#1B4D3E',
            marginBottom: 4,
            letterSpacing: '-1px',
            lineHeight: 1.1,
          }}>{locations[selectedLocation].name}</div>
          {/* Address */}
          <div style={{ color: '#444', fontSize: '0.98rem', marginBottom: 2, lineHeight: 1.4 }}>{locations[selectedLocation].address}</div>
          {/* Phone */}
          {/* <div style={{ color: '#7a6e6e', fontSize: '0.97rem', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <span style={{ color: '#7a6e6e' }}>Tel:</span>
            <a href={`tel:${locations[selectedLocation].phone}`} style={{ color: '#19934c', textDecoration: 'none', fontWeight: 500 }}>{locations[selectedLocation].phone}</a>
          </div> */}
          {/* Directions */}
          <a href={locations[selectedLocation].mapsUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#19934c', fontWeight: 600, textDecoration: 'none', fontSize: '0.98rem', marginBottom: 2 }}>
            {t('common_getDirections')}
          </a>
          
          {/* Social Media Links */}
       
          {/* Contact Form */}

          <h1 style={{marginBottom: '-10px', fontWeight: '600', color: '#1B4D3E', marginTop: '35%'}}>
            Contact Us
          </h1>
          <form style={{
            marginTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                fontFamily: 'Inter, Arial, sans-serif',
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                fontFamily: 'Inter, Arial, sans-serif',
              }}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                fontFamily: 'Inter, Arial, sans-serif',
                resize: 'vertical',
              }}
            />
            
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div style={{
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(34, 197, 94, 0.1)',
                color: '#166534',
                fontSize: '0.9rem',
                textAlign: 'center',
                border: '1px solid rgba(34, 197, 94, 0.2)',
              }}>
                Message sent successfully! Check your email client.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div style={{
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#dc2626',
                fontSize: '0.9rem',
                textAlign: 'center',
                border: '1px solid rgba(239, 68, 68, 0.2)',
              }}>
                Error sending message. Please try again.
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                background: isSubmitting ? '#6b7280' : '#1B4D3E',
                color: 'white',
                fontWeight: 700,
                fontSize: '1.08rem',
                border: 'none',
                borderRadius: '8px',
                padding: '14px 0',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                marginTop: '8px',
                fontFamily: 'Inter, Arial, sans-serif',
                boxShadow: '0 2px 8px rgba(27,77,62,0.10)',
                transition: 'background 0.2s',
                opacity: isSubmitting ? 0.7 : 1,
              }}
              onMouseOver={e => {
                if (!isSubmitting) {
                  e.currentTarget.style.background = '#0F3D1F';
                }
              }}
              onMouseOut={e => {
                if (!isSubmitting) {
                  e.currentTarget.style.background = '#1B4D3E';
                }
              }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          
          {/* Decorative Illustration */}
          <div style={{ 
            marginTop: '10px', 
            display: 'flex',
            justifyContent: 'center',
            opacity: 0.9,
            padding: '10px 0'
          }}>
            {/* <img 
              src="/svg.png" 
              alt="Decorative illustration" 
              style={{ 
                width: '85%', 
                maxWidth: '280px', 
                height: 'auto',
                filter: 'drop-shadow(0 2px 4px rgba(34, 197, 94, 0.2))'
              }} 
            /> */}
          </div>
        </div>
        
        {/* Map Section with Flex Column */}
        <div style={{
          flex: '2 1 480px',
          minWidth: '340px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}>
          {/* Google Map Container */}
          <div style={{
            height: '360px',
            background: 'rgba(255,255,255,0.85)',
            borderRadius: '22px',
            boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8073.029660474845!2d-101.02066151328684!3d22.1383935704247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842a98da9ff1f979%3A0x7b611dd395a16dcc!2sJoaqu%C3%ADn%20Meade%20136%2C%20Las%20Lomas%201ra%20Secc%2C%2078290%20San%20Luis%20Potos%C3%AD%2C%20S.L.P.%2C%20Mexico!5e0!3m2!1sen!2sus!4v1749076137958!5m2!1sen!2sus" 
              style={{
                border: 0,
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0
              }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          
          {/* Scrollable Locations Card */}
          <div style={{
            background: 'rgba(255,255,255,0.92)',
            borderRadius: '22px',
            boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
            padding: '24px',
            position: 'relative',
          }}>
            {/* Main Contact Info Section */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '10px',
              marginBottom: '18px',
            }}>
              <div style={{
                fontFamily: 'Playfair Display, serif',
                fontWeight: 600,
                fontSize: '1.5rem',
                color: '#1B4D3E',
                marginBottom: 4,
                letterSpacing: '-1px',
                lineHeight: 1.1,
              }}>
                {t('common_connectWithUs')}
              </div>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
                {/* WhatsApp */}
                <a href="https://wa.me/525661567879" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#19934c', fontWeight: 600, fontSize: '1.08rem', gap: 6 }}>
                  <img src="/whatsapp.png" alt="WhatsApp" style={{ width: 22, height: 22, marginRight: 2 }} />
                  WhatsApp
                </a>
                {/* Instagram */}
                <a href="https://instagram.com/mtm_wellbeing" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#C13584', fontWeight: 600, fontSize: '1.08rem', gap: 6 }}>
                  <img src="/insta.png" alt="Instagram" style={{ width: 22, height: 22, marginRight: 2 }} />
                  Instagram
                </a>
                {/* Email */}
                <a href="mailto:info@mtmwellbeing.com" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#1B4D3E', fontWeight: 600, fontSize: '1.08rem', gap: 6 }}>
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ marginRight: 2 }}>
                    <rect x="3" y="5" width="18" height="14" rx="3" stroke="#1B4D3E" strokeWidth="2" fill="white"/>
                    <path d="M3 7l9 6 9-6" stroke="#1B4D3E" strokeWidth="2" fill="none"/>
                  </svg>
                  Email
                </a>
              </div>
            </div>
            
            {/* Scrollable container */}
            <div style={{
              display: 'flex',
              overflowX: 'auto',
              gap: '16px',
              padding: '8px 4px',
              scrollbarWidth: 'thin',
              scrollbarColor: '#19934c #f5f5f5',
              msOverflowStyle: '-ms-autohiding-scrollbar',
            }}>
              {locations.map((location, index) => (
                <div
                  key={location.id}
                  onClick={() => handleLocationSelect(index)}
                  style={{
                    flex: '0 0 240px',
                    background: selectedLocation === index ? 'rgba(34,197,94,0.06)' : 'white',
                    borderRadius: '16px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: selectedLocation === index ? '1px solid rgba(34,197,94,0.3)' : '1px solid #eee',
                    boxShadow: selectedLocation === index ? '0 4px 12px rgba(34,197,94,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{
                    height: '120px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginBottom: '12px',
                    background: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <img 
                      src={location.image} 
                      alt={location.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <div style={{ 
                    fontWeight: 600, 
                    fontSize: '1rem', 
                    marginBottom: '6px',
                    color: selectedLocation === index ? '#19934c' : '#111',
                  }}>
                    {location.name}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {location.address}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
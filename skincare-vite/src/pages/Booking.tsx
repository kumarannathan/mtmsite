import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { submitBooking, BookingData } from '../services/bookingService';
import '../components/BookingDatePicker.css';

export default function Booking() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<BookingData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    preferredDate: '',
    selectedTherapy: '',
    additionalNotes: '',
    couponCode: '',
    createdAt: new Date()
  });
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await submitBooking(formData);
      setSubmitStatus('success');
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        preferredDate: '',
        selectedTherapy: '',
        additionalNotes: '',
        couponCode: '',
        createdAt: new Date()
      });
      setSelectedDate(null);
    } catch (error) {
      console.error('Booking submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
    if (date) {
      setFormData(prev => ({
        ...prev,
        preferredDate: date.format('YYYY-MM-DD HH:mm:ss')
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        preferredDate: ''
      }));
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'white',
      padding: '80px 24px 32px 24px',
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          color: '#111',
          marginBottom: '24px',
          textAlign: 'center',
        }}>
          {t('booking_title')}
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#666',
          marginBottom: '48px',
          textAlign: 'center',
        }}>
          {t('booking_subtitle')}
        </p>

        <form onSubmit={handleSubmit} style={{
          background: 'white',
          padding: '32px',
          borderRadius: '16px',
          boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
        }}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 500,
              color: '#333',
            }}>
              {t('booking_fullName')}
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                color: '#111',
                backgroundColor: '#fff'
              }}
              placeholder={t('booking_enterYourFullName')}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 500,
              color: '#333',
            }}>
              {t('booking_emailAddress')}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                color: '#111',
                backgroundColor: '#fff'
              }}
              placeholder={t('booking_enterYourEmail')}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 500,
              color: '#333',
            }}>
              {t('booking_phoneNumber')}
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                color: '#111',
                backgroundColor: '#fff'
              }}
              placeholder={t('booking_enterYourPhoneNumber')}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 500,
              color: '#333',
            }}>
              {t('booking_preferredDate')}
            </label>
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder={t('booking_selectDate')}
              value={selectedDate}
              onChange={handleDateChange}
              style={{
                width: '100%',
                height: '48px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
              }}
              disabledDate={(current) => {
                // Disable past dates
                return current && current < dayjs().startOf('day');
              }}
              disabledTime={(date) => {
                if (date) {
                  const currentHour = dayjs().hour();
                  const currentMinute = dayjs().minute();
                  
                  // If it's today, disable past times
                  if (date.isSame(dayjs(), 'day')) {
                    return {
                      disabledHours: () => Array.from({ length: currentHour }, (_, i) => i),
                      disabledMinutes: (selectedHour) => {
                        if (selectedHour === currentHour) {
                          return Array.from({ length: currentMinute + 1 }, (_, i) => i);
                        }
                        return [];
                      }
                    };
                  }
                }
                return {};
              }}
              showNow={false}
              minuteStep={15}
              hourStep={1}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 500,
              color: '#333',
            }}>
              {t('booking_selectTherapy')}
            </label>
            <select
              name="selectedTherapy"
              value={formData.selectedTherapy}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                backgroundColor: 'white',
                color: '#111'
              }}
            >
              <option value="">{t('booking_selectTherapy')}</option>
              <option value="mind-scalp-health">{t('service_mind_scalp_title')}</option>
              <option value="hair-growth">{t('service_hair_growth_title')}</option>
              <option value="hair-rejuvenation">{t('service_hair_rejuvenation_title')}</option>
              <option value="hair-styling">{t('service_hair_styling_title')}</option>
            </select>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 500,
              color: '#333',
            }}>
              {t('booking_additionalNotes')}
            </label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                minHeight: '100px',
                resize: 'vertical',
                color: '#111',
                backgroundColor: '#fff'
              }}
              placeholder={t('booking_anySpecialRequests')}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 500,
              color: '#333',
            }}>
              Coupon Code (optional)
            </label>
            <input
              type="text"
              name="couponCode"
              value={formData.couponCode}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                color: '#111',
                backgroundColor: '#fff'
              }}
              placeholder="Enter coupon code if you have one"
            />
          </div>

          {submitStatus === 'success' && (
            <div style={{
              padding: '16px',
              backgroundColor: '#17603a',
              color: 'white',
              borderRadius: '8px',
              marginBottom: '24px',
              textAlign: 'center',
            }}>
              {t('booking_confirmed')}
            </div>
          )}

          {submitStatus === 'error' && (
            <div style={{
              padding: '16px',
              backgroundColor: '#dc2626',
              color: 'white',
              borderRadius: '8px',
              marginBottom: '24px',
              textAlign: 'center',
            }}>
              An error occurred. Please try again.
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#17603a',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? 'Submitting...' : t('booking_confirmBooking')}
          </button>
        </form>
      </div>
    </div>
  );
} 
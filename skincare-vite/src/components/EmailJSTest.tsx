import React from 'react';
import emailjs from '@emailjs/browser';

export default function EmailJSTest() {
  const testEmailJS = () => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const customerTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CUSTOMER;
    const businessTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_BUSINESS;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Test with our new date/time format
    const testParams = {
      booking_id: `MTM-TEST-${Date.now().toString().slice(-6)}`,
      full_name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      preferred_date: '2024-01-15 10:00 AM', // Our new format
      selected_therapy: 'Test Therapy',
      additional_notes: 'This is a test booking with new date/time format',
      promotion_code: 'TEST123'
    };

    console.log('Testing EmailJS with new format:', testParams);

    // Test customer email
    emailjs.send(serviceId, customerTemplateId, testParams, publicKey)
      .then((response) => {
        console.log('✅ Customer email test successful:', response.status, response.text);
      }, (err) => {
        console.log('❌ Customer email test failed:', err);
      });

    // Test business email
    emailjs.send(serviceId, businessTemplateId, testParams, publicKey)
      .then((response) => {
        console.log('✅ Business email test successful:', response.status, response.text);
      }, (err) => {
        console.log('❌ Business email test failed:', err);
      });
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3>EmailJS Test</h3>
      <p>Click the button below to test EmailJS with the new date/time format:</p>
      <button 
        onClick={testEmailJS}
        style={{
          backgroundColor: '#19934c',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Test EmailJS Integration
      </button>
      <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>
        Check the browser console for results
      </p>
    </div>
  );
} 
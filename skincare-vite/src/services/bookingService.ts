import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import emailjs from '@emailjs/browser';

// Your Firebase configuration
const firebaseConfig = {
  // Add your Firebase config here
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export interface BookingData {
  fullName: string;
  email: string;
  phoneNumber: string;
  preferredDate: string;
  selectedTherapy: string;
  additionalNotes?: string;
  couponCode?: string;
  createdAt: Date;
}

export const submitBooking = async (bookingData: BookingData) => {
  try {
    // Add booking to Firestore
    const bookingsRef = collection(db, 'bookings');
    const docRef = await addDoc(bookingsRef, {
      ...bookingData,
      status: 'pending',
      createdAt: new Date()
    });

    // Send business notification email
    console.log('Sending business notification email...');
    try {
      const businessEmailResult = await emailjs.send(
        'service_iy0h3i5',
        'template_n9fo70r',
        {
          to_email: 'kumaran7699@gmail.com',
          from_name: bookingData.fullName,
          booking_id: docRef.id,
          full_name: bookingData.fullName,
          email: bookingData.email,
          phone: bookingData.phoneNumber,
          preferred_date: bookingData.preferredDate,
          selected_therapy: bookingData.selectedTherapy,
          additional_notes: bookingData.additionalNotes || 'None'
        },
        'HRh2WSfjKvUy8wEOK'
      );
      console.log('Business notification email sent successfully:', businessEmailResult);
    } catch (error) {
      console.error('Error sending business notification email:', error);
    }

    // Send customer confirmation email
    console.log('Sending customer confirmation email...');
    try {
      const customerEmailResult = await emailjs.send(
        'service_iy0h3i5',
        'template_bzovq7c',
        {
          to_email: bookingData.email,
          from_name: 'MTM Team',
          booking_id: docRef.id,
          full_name: bookingData.fullName,
          preferred_date: bookingData.preferredDate,
          selected_therapy: bookingData.selectedTherapy
        },
        'HRh2WSfjKvUy8wEOK'
      );
      console.log('Customer confirmation email sent successfully:', customerEmailResult);
    } catch (error) {
      console.error('Error sending customer confirmation email:', error);
    }

    return {
      success: true,
      bookingId: docRef.id
    };
  } catch (error) {
    console.error('Error submitting booking:', error);
    throw error;
  }
}; 
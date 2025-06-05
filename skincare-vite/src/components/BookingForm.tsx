import styled from 'styled-components';
import { useState } from 'react';
import { submitBooking } from '../services/bookingService';

const FormContainer = styled.form`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  input,
  textarea,
  select {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    color: #000000 !important;
    background-color: white;
    -webkit-text-fill-color: #000000 !important;
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
    border-color: #17603a;
    box-shadow: 0 0 0 2px rgba(23, 96, 58, 0.2);
  }

  input::placeholder,
  textarea::placeholder {
    color: #999;
    -webkit-text-fill-color: #999;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
`;

const Button = styled.button`
  background-color: #17603a;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #145332;
  }
`;

const BookingForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    preferredDate: '',
    selectedTherapy: '',
    additionalNotes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitBooking({
        ...formData,
        createdAt: new Date()
      });
      alert('Booking submitted successfully!');
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        preferredDate: '',
        selectedTherapy: '',
        additionalNotes: ''
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
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

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="fullName">Full Name</Label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="preferredDate">Preferred Date</Label>
        <input
          type="date"
          id="preferredDate"
          name="preferredDate"
          value={formData.preferredDate}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="selectedTherapy">Select Therapy</Label>
        <select
          id="selectedTherapy"
          name="selectedTherapy"
          value={formData.selectedTherapy}
          onChange={handleChange}
          required
        >
          <option value="">Select a therapy</option>
          <option value="Facial">Facial</option>
          <option value="Massage">Massage</option>
          <option value="Body Treatment">Body Treatment</option>
        </select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="additionalNotes">Additional Notes</Label>
        <textarea
          id="additionalNotes"
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleChange}
          rows={4}
        />
      </FormGroup>

      <Button type="submit">Book Appointment</Button>
    </FormContainer>
  );
};

export default BookingForm; 
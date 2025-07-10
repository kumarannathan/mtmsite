# 🗓️ Calendly Integration Setup Guide

## Overview
This guide will help you integrate Calendly with your MTM booking system for better organization and professional scheduling.

## 🎯 Benefits of Calendly Integration

### ✅ **For Your Business:**
- **Automatic Calendar Management**: No double bookings
- **Professional Scheduling**: Branded booking experience
- **Availability Control**: Set your own hours and buffer times
- **Automated Reminders**: Reduce no-shows
- **Analytics**: Track booking patterns and conversions
- **Multi-location Support**: Different calendars for different locations

### ✅ **For Your Customers:**
- **Instant Confirmation**: No waiting for email responses
- **Calendar Integration**: Automatic Google/Outlook calendar invites
- **Rescheduling**: Easy self-service rescheduling
- **Timezone Handling**: Automatic timezone conversion
- **Mobile-Friendly**: Works perfectly on all devices

## 🚀 Setup Options

### **Option 1: Full Calendly Integration (Recommended)**
Replace your current date/time picker with Calendly widget.

### **Option 2: Hybrid Approach**
Keep your current form but add Calendly for calendar management.

### **Option 3: Calendly Only**
Use Calendly for everything - service selection, scheduling, and form collection.

## 📋 Step-by-Step Setup

### **Step 1: Create Calendly Account**
1. Go to [calendly.com](https://calendly.com)
2. Sign up for a free account
3. Complete your profile setup

### **Step 2: Create Event Types**
Create event types for each of your services:

#### **Mind & Scalp Therapy**
- **Duration**: 40 minutes
- **Buffer Time**: 15 minutes before and after
- **Availability**: Monday-Friday, 10AM-6PM
- **Location**: Your MTM location

#### **Hair Growth Therapy**
- **Duration**: 60 minutes
- **Buffer Time**: 15 minutes before and after
- **Availability**: Monday-Friday, 10AM-6PM

#### **Hair Rejuvenation Therapy**
- **Duration**: 60 minutes
- **Buffer Time**: 15 minutes before and after
- **Availability**: Monday-Friday, 10AM-6PM

#### **Gong Therapy (Add-on)**
- **Duration**: 15 minutes
- **Buffer Time**: 5 minutes before and after
- **Availability**: Monday-Friday, 10AM-6PM

### **Step 3: Configure Your Calendar**
1. Connect your Google Calendar or Outlook
2. Set your working hours
3. Block off unavailable times
4. Set up buffer times between appointments

### **Step 4: Customize Your Calendly**
1. **Branding**: Add your MTM logo and colors
2. **Questions**: Add custom questions for:
   - Service selection
   - Special requests
   - Promotion codes
3. **Confirmation Page**: Customize the thank you message
4. **Email Templates**: Set up automated emails

### **Step 5: Get Your Calendly URLs**
For each event type, get the booking URL:
- `https://calendly.com/your-username/mind-scalp-therapy`
- `https://calendly.com/your-username/hair-growth-therapy`
- `https://calendly.com/your-username/hair-rejuvenation-therapy`
- `https://calendly.com/your-username/gong-therapy`

## 🔧 Implementation

### **Option 1: Full Calendly Integration**

Replace your current `BookMe.tsx` with the Calendly component:

```typescript
// In your BookMe.tsx
import CalendlyBooking from '../components/CalendlyBooking';

// Replace the date/time picker section with:
<CalendlyBooking 
  calendlyUrl="https://calendly.com/your-username/mind-scalp-therapy"
  onBookingComplete={(bookingData) => {
    // Handle booking completion
    console.log('Booking completed:', bookingData);
  }}
/>
```

### **Option 2: Hybrid Approach**

Use the `HybridBookingForm.tsx` component:

```typescript
// In your BookMe.tsx
import HybridBookingForm from '../components/HybridBookingForm';

// Replace the entire form with:
<HybridBookingForm 
  calendlyUrl="https://calendly.com/your-username/mind-scalp-therapy"
  mainServices={mainServices}
  addonServices={addonServices}
/>
```

## 🎨 Customization

### **Styling Your Calendly Widget**
Add custom CSS to match your brand:

```css
/* Custom Calendly styling */
.calendly-inline-widget {
  border-radius: 12px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
}

.calendly-badge-widget {
  background-color: #19934c !important;
  color: white !important;
}
```

### **Custom Questions**
In your Calendly event settings, add custom questions:

1. **Service Selection**: Dropdown with your services
2. **Special Requests**: Text area for notes
3. **Promotion Code**: Text field for codes
4. **Contact Information**: Name, email, phone

## 📧 Email Integration

### **Calendly + EmailJS Integration**
The components automatically integrate with your existing EmailJS setup:

```typescript
// When a booking is completed, it sends:
const templateParams = {
  booking_id: `MTM-${Date.now().toString().slice(-6)}`,
  full_name: `${formData.name} ${formData.lastname}`,
  email: formData.email,
  phone: formData.phone,
  preferred_date: formattedDateTime, // From Calendly
  selected_therapy: therapyDetails,
  additional_notes: formData.notes,
  promotion_code: formData.promotionCode || 'None',
  calendly_event_id: calendlyBooking.calendarEvent.uri,
  calendly_invitee_id: calendlyBooking.invitee.uri
};
```

## 🔄 Workflow Options

### **Workflow 1: Service-First**
1. Customer selects service on your website
2. Redirected to specific Calendly event type
3. Books appointment
4. Returns to complete additional information

### **Workflow 2: Calendar-First**
1. Customer goes directly to Calendly
2. Selects service and time in Calendly
3. Fills out form in Calendly
4. Receives confirmation emails

### **Workflow 3: Hybrid**
1. Customer selects service on your website
2. Books time in Calendly widget
3. Completes additional form on your website
4. Receives confirmation emails

## 💰 Pricing Considerations

### **Calendly Plans:**
- **Free**: 1 event type, basic features
- **Professional ($8/month)**: Unlimited event types, custom branding
- **Teams ($12/month)**: Multiple users, team scheduling
- **Enterprise**: Advanced features, API access

### **Recommended for MTM:**
Start with **Professional** plan for:
- Multiple service types
- Custom branding
- Advanced analytics
- Buffer times
- Custom questions

## 🚀 Next Steps

1. **Choose your integration approach** (Full, Hybrid, or Calendly-only)
2. **Set up your Calendly account** and event types
3. **Implement the chosen component** in your codebase
4. **Test the booking flow** end-to-end
5. **Customize styling** to match your brand
6. **Set up analytics** to track conversions

## 📞 Support

If you need help with the implementation:
1. Check Calendly's documentation
2. Review the component code in this repository
3. Test with the provided components

## 🎯 Benefits Summary

✅ **Professional booking experience**
✅ **No double bookings**
✅ **Automatic calendar management**
✅ **Mobile-friendly**
✅ **Timezone handling**
✅ **Automated reminders**
✅ **Analytics and insights**
✅ **Easy rescheduling**
✅ **Integration with existing EmailJS setup**

This integration will significantly improve your booking process and provide a more professional experience for your customers! 
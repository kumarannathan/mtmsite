# 🚀 Hybrid Calendly Implementation Guide

## Step-by-Step Implementation

### **Step 1: Set Up Calendly Account**

1. **Create Calendly Account**
   - Go to [calendly.com](https://calendly.com)
   - Sign up for a free account
   - Complete your profile setup

2. **Create Event Types**
   Create these event types in Calendly:

   | Service | Duration | Calendly Event Name | URL Pattern |
   |---------|----------|-------------------|-------------|
   | Mind & Scalp Therapy | 40 min | `mind-scalp-therapy` | `https://calendly.com/your-username/mind-scalp-therapy` |
   | Hair Growth Therapy | 60 min | `hair-growth-therapy` | `https://calendly.com/your-username/hair-growth-therapy` |
   | Hair Rejuvenation Therapy | 60 min | `hair-rejuvenation-therapy` | `https://calendly.com/your-username/hair-rejuvenation-therapy` |
   | Gong Therapy Add-on | 15 min | `gong-therapy` | `https://calendly.com/your-username/gong-therapy` |
   | Hair Styling Add-on | 20 min | `hair-styling` | `https://calendly.com/your-username/hair-styling` |

3. **Configure Each Event Type**
   - Set duration to match your services
   - Add buffer time (15 min before/after for main services, 5 min for add-ons)
   - Set availability: Monday-Friday, 10AM-6PM
   - Add your MTM location
   - Customize branding with your colors (#19934c)

### **Step 2: Update Configuration**

1. **Replace URLs in `src/config/calendlyConfig.ts`**
   ```typescript
   // Replace 'your-username' with your actual Calendly username
   calendlyUrl: 'https://calendly.com/your-actual-username/mind-scalp-therapy'
   ```

2. **Test the URLs**
   - Visit each URL to make sure they work
   - Test booking flow in Calendly

### **Step 3: Implement in Your App**

1. **Replace BookMe.tsx with Hybrid Form**
   ```typescript
   // In your BookMe.tsx, replace the entire component with:
   import HybridBookingForm from '../components/HybridBookingForm';
   
   export default function BookMe() {
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
           
           <HybridBookingForm 
             mainServices={mainServices}
             addonServices={addonServices}
           />
         </div>
       </div>
     );
   }
   ```

### **Step 4: Test the Integration**

1. **Test Service Selection**
   - Select different services
   - Verify Calendly URLs are correct

2. **Test Booking Flow**
   - Complete a test booking
   - Check EmailJS integration
   - Verify calendar events are created

3. **Test Error Handling**
   - Try booking without selecting service
   - Test with invalid Calendly URLs

### **Step 5: Customize Styling**

1. **Match Your Brand Colors**
   ```css
   /* Add to your CSS */
   .calendly-inline-widget {
     border-radius: 12px !important;
     box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
   }
   ```

2. **Customize Calendly Branding**
   - In Calendly settings, add your MTM logo
   - Use your brand color (#19934c)
   - Customize confirmation messages

## 🎯 What You'll Get

### **User Experience:**
1. **Step 1**: Customer selects service from your beautiful form
2. **Step 2**: Redirected to professional Calendly calendar
3. **Step 3**: Books appointment with instant confirmation
4. **Step 4**: Returns to complete additional information
5. **Step 5**: Receives confirmation emails

### **Business Benefits:**
- ✅ No double bookings
- ✅ Professional scheduling experience
- ✅ Automatic calendar management
- ✅ Mobile-friendly booking
- ✅ Analytics and insights
- ✅ Automated reminders

## 🔧 Configuration Checklist

- [ ] Calendly account created
- [ ] Event types configured
- [ ] URLs updated in `calendlyConfig.ts`
- [ ] BookMe.tsx replaced with HybridBookingForm
- [ ] EmailJS integration tested
- [ ] Styling customized
- [ ] End-to-end flow tested

## 📞 Need Help?

If you run into any issues:
1. Check the Calendly documentation
2. Verify your URLs are correct
3. Test the booking flow step by step
4. Check browser console for errors

## 🚀 Ready to Implement?

Once you have your Calendly URLs, I can help you:
1. Update the configuration file
2. Replace the BookMe component
3. Test the integration
4. Customize the styling

Just provide me with your Calendly URLs and I'll help you implement everything! 
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

admin.initializeApp();

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.pass
  }
});

export const sendBookingEmail = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).send('');
    return;
  }

  try {
    const {
      bookingId,
      fullName,
      email,
      phoneNumber,
      preferredDate,
      selectedTherapy,
      additionalNotes
    } = req.body;

    // Email to MTM
    const mtmEmailContent = `
      New Booking Request
      ------------------
      Booking ID: ${bookingId}
      Name: ${fullName}
      Email: ${email}
      Phone: ${phoneNumber}
      Preferred Date: ${preferredDate}
      Selected Therapy: ${selectedTherapy}
      Additional Notes: ${additionalNotes || 'None'}
    `;

    // Email to customer
    const customerEmailContent = `
      Thank you for booking with MTM!
      ----------------------------
      Your booking details:
      Booking ID: ${bookingId}
      Name: ${fullName}
      Preferred Date: ${preferredDate}
      Selected Therapy: ${selectedTherapy}
      
      We will contact you shortly to confirm your appointment.
      
      Best regards,
      MTM Team
    `;

    // Send email to MTM
    await transporter.sendMail({
      from: functions.config().email.user,
      to: 'kumaran7699@gmail.com', // Testing email address
      subject: `New Booking Request - ${fullName}`,
      text: mtmEmailContent
    });

    // Send confirmation email to customer
    await transporter.sendMail({
      from: functions.config().email.user,
      to: email,
      subject: 'Your MTM Booking Confirmation',
      text: customerEmailContent
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}); 
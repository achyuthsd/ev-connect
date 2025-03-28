const functions = require('firebase-functions');
const mailgun = require('mailgun-js');
require('dotenv').config();

// Mailgun credentials from environment variables
const mg = mailgun({
  apiKey: "d6f073e407e725d5df3db7cf9381fae2-3d4b3a2a-e4e4cab2",
  domain: "sandboxc92695af031a4c8d8c882c522f7b844d.mailgun.org",
});

exports.sendBookingConfirmation = functions.https.onRequest((req, res) => {
  const { email, date, station, port } = req.body;

  if (!email || !date || !station || !port) {
    return res.status(400).send("Missing required booking details.");
  }

  const data = {
    from: "EV Connect <noreply@yourdomain.com>",
    to: email,
    subject: "Booking Confirmation",
    text: `Hi, your EV charging slot has been confirmed.\n\nDetails:\n- Date: ${date}\n- Station: ${station}\n- Port: ${port}\n\nThank you for using EV Connect!`,
  };

  mg.messages().send(data, (error, body) => {
    if (error) {
      console.error("Error:", error);
      return res.status(500).send("Error sending email.");
    }
    console.log("Email sent:", body);
    res.status(200).send("Booking confirmation email sent.");
  });
});

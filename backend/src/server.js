const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json({ limit: '10kb' }));

// Rate limiting
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2,
  message: { success: false, message: 'Too many requests. Please try again later.' }
});

// Contact form endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, phone, service, message, lang } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: lang === 'es'
        ? 'Por favor completa todos los campos requeridos.'
        : 'Please fill in all required fields.'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: lang === 'es' ? 'Email no válido.' : 'Invalid email address.'
    });
  }

  try {
    // Log the contact submission (in production, use nodemailer to send email)
    console.log('📧 New contact form submission:');
    console.log({ name, email, phone, service, message, timestamp: new Date().toISOString() });

    // In production, configure nodemailer:
    // const transporter = nodemailer.createTransporter({ ... });
    // await transporter.sendMail({ from: email, to: 'asorialegalhuman@gmail.com', ... });

    res.status(200).json({
      success: true,
      message: lang === 'es'
        ? '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.'
        : 'Message sent successfully! We will contact you soon.'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: lang === 'es'
        ? 'Error al enviar el mensaje. Por favor intenta más tarde.'
        : 'Error sending message. Please try again later.'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Legal Human API running on port ${PORT}`);
});

module.exports = app;

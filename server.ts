import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Persistent storage backup directory
const DATA_DIR = path.resolve(__dirname, 'data');
const QUOTES_FILE = path.join(DATA_DIR, 'quotations.json');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(QUOTES_FILE)) {
  fs.writeFileSync(QUOTES_FILE, JSON.stringify([], null, 2));
}

// In-memory rate limiting map
const rateLimitMap = new Map<string, number>();

// Valid choices
const VALID_SERVICES = [
  'Website development',
  'Business website',
  'E-commerce website',
  'Digital marketing',
  'AI-powered advertising and AI ad creation',
  'Google Business Profile setup/optimisation',
  'Website maintenance',
  'AI chatbot or automation',
  'Other/custom digital solution',
];

const VALID_PACKAGES = [
  'Starter Package — R1,500',
  'Business Growth Package — R2,000',
  'Complete Package — R2,500',
  'Custom quotation — price to be determined based on requirements',
  'Starter — R1,500',
  'Business Growth — R2,000',
  'Complete — R2,500',
];

const VALID_BUDGETS = [
  'R1,500',
  'R2,000',
  'R2,500',
  '1500',
  '2000',
  '2500',
  'Under R1,000',
  'R1,000–R2,500',
  'R2,500–R5,000',
  'Over R5,000',
  'Not sure yet',
];

const VALID_TIMELINES = [
  'As soon as possible',
  'Within 2–4 weeks',
  'Within 1–3 months',
  'Just exploring options',
];

function createEmailTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT) || 587;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }
  return null;
}

// API Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    emailConfigured: Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
    businessEmail: process.env.BUSINESS_EMAIL || 'info@makuawebsolutions.co.za',
  });
});

// Quote submission endpoint
app.post('/api/quote', async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      businessName,
      email,
      phone,
      service,
      package: pkg,
      projectRequirements,
      budget,
      timeline,
      _hp,
    } = req.body;

    // Honeypot anti-spam check
    if (_hp) {
      return res.status(200).json({
        success: true,
        reference: 'MWS-Q-FILTERED',
        message: 'Your quotation request has been submitted successfully.',
      });
    }

    // Rate Limiting (1 per 10 seconds per client)
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
    const lastTime = rateLimitMap.get(clientIp);
    const now = Date.now();
    if (lastTime && now - lastTime < 10000) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please wait a few seconds before trying again.',
      });
    }
    rateLimitMap.set(clientIp, now);

    // Validation
    const errors: Record<string, string> = {};

    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      errors.fullName = 'Full name is required (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      errors.email = 'A valid email address is required.';
    }

    if (!phone || typeof phone !== 'string' || phone.trim().replace(/\D/g, '').length < 7) {
      errors.phone = 'A valid phone or WhatsApp number is required.';
    }

    if (!service || !VALID_SERVICES.includes(service)) {
      errors.service = 'Please select a valid service from the list.';
    }

    const isPackageValid =
      typeof pkg === 'string' &&
      pkg.trim().length > 0 &&
      (VALID_PACKAGES.includes(pkg.trim()) ||
        pkg.toLowerCase().includes('starter') ||
        pkg.toLowerCase().includes('growth') ||
        pkg.toLowerCase().includes('complete') ||
        pkg.toLowerCase().includes('custom'));

    if (!pkg || !isPackageValid) {
      errors.package = 'Please select a valid website package or custom quotation.';
    }

    if (!projectRequirements || typeof projectRequirements !== 'string' || projectRequirements.trim().length < 10) {
      errors.projectRequirements = 'Please describe your project requirements (at least 10 characters).';
    }

    if (budget && typeof budget === 'string' && budget.trim()) {
      const budgetVal = budget.trim();
      const isBudgetValid =
        VALID_BUDGETS.includes(budgetVal) ||
        budgetVal.includes('1,500') ||
        budgetVal.includes('2,000') ||
        budgetVal.includes('2,500') ||
        budgetVal.includes('1500') ||
        budgetVal.includes('2000') ||
        budgetVal.includes('2500');

      if (!isBudgetValid) {
        errors.budget = 'Please select a valid budget range option.';
      }
    }

    if (timeline && !VALID_TIMELINES.includes(timeline)) {
      errors.timeline = 'Please select a valid timeline option.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Please correct the highlighted errors before submitting.',
        errors,
      });
    }

    // Unique reference number
    const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
    const refCode = `MWS-Q-${new Date().getFullYear()}-${uniqueSuffix}`;
    const submissionDate = new Date().toISOString();

    const quoteRecord = {
      reference: refCode,
      createdAt: submissionDate,
      fullName: fullName.trim(),
      businessName: businessName && typeof businessName === 'string' ? businessName.trim() : 'N/A',
      email: email.trim(),
      phone: phone.trim(),
      service,
      package: pkg,
      budget: budget || 'Not specified',
      timeline: timeline || 'Not specified',
      projectRequirements: projectRequirements.trim(),
    };

    // Save record to local JSON store
    try {
      const existing = JSON.parse(fs.readFileSync(QUOTES_FILE, 'utf-8'));
      existing.unshift(quoteRecord);
      fs.writeFileSync(QUOTES_FILE, JSON.stringify(existing, null, 2));
    } catch (saveErr) {
      console.error('Error saving quotation record to JSON:', saveErr);
    }

    // Send email notification to configured business email
    const destinationEmail = process.env.BUSINESS_EMAIL || 'info@makuawebsolutions.co.za';
    const transporter = createEmailTransport();
    let emailSent = false;

    if (transporter) {
      try {
        await transporter.sendMail({
          from: `"Makua Web Solutions" <${process.env.SMTP_USER}>`,
          to: destinationEmail,
          replyTo: quoteRecord.email,
          subject: `New Quotation Request [${refCode}] — ${quoteRecord.fullName}`,
          text: `
NEW CLIENT QUOTATION REQUEST
----------------------------------------
Reference: ${refCode}
Date: ${new Date(submissionDate).toLocaleString()}

CLIENT DETAILS:
- Full Name: ${quoteRecord.fullName}
- Business Name: ${quoteRecord.businessName}
- Email: ${quoteRecord.email}
- Phone/WhatsApp: ${quoteRecord.phone}

SERVICE & PACKAGE:
- Service: ${quoteRecord.service}
- Package: ${quoteRecord.package}
- Estimated Budget: ${quoteRecord.budget}
- Project Timeline: ${quoteRecord.timeline}

PROJECT REQUIREMENTS:
${quoteRecord.projectRequirements}

PAYMENT TERMS:
50% deposit before work starts and 50% on completion.
----------------------------------------
          `,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F0EFE9; padding: 28px; color: #411401;">
              <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 14px; padding: 28px; border: 1px solid #E7DCD5; box-shadow: 0 4px 14px rgba(0,0,0,0.06);">
                <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #FFFAA4; padding-bottom: 16px; margin-bottom: 20px;">
                  <div>
                    <h2 style="color: #411401; margin: 0; font-size: 22px;">New Quotation Request</h2>
                    <span style="font-size: 13px; color: #8C6A5A;">Makua Web Solutions Enquiry Portal</span>
                  </div>
                  <div style="text-align: right;">
                    <span style="display: inline-block; background: #FFFAA4; color: #411401; font-weight: bold; padding: 4px 10px; border-radius: 20px; font-size: 12px;">${refCode}</span>
                  </div>
                </div>

                <h3 style="color: #411401; font-size: 15px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;">Client Details</h3>
                <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-bottom: 20px;">
                  <tr><td style="padding: 6px 0; color: #8C6A5A; width: 140px;">Full Name:</td><td style="font-weight: 600; color: #411401;">${quoteRecord.fullName}</td></tr>
                  <tr><td style="padding: 6px 0; color: #8C6A5A;">Business Name:</td><td>${quoteRecord.businessName}</td></tr>
                  <tr><td style="padding: 6px 0; color: #8C6A5A;">Email:</td><td><a href="mailto:${quoteRecord.email}" style="color: #411401; text-decoration: underline;">${quoteRecord.email}</a></td></tr>
                  <tr><td style="padding: 6px 0; color: #8C6A5A;">Phone/WhatsApp:</td><td><a href="tel:${quoteRecord.phone}" style="color: #411401;">${quoteRecord.phone}</a></td></tr>
                </table>

                <h3 style="color: #411401; font-size: 15px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;">Project & Package Selection</h3>
                <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-bottom: 20px;">
                  <tr><td style="padding: 6px 0; color: #8C6A5A; width: 140px;">Selected Service:</td><td style="font-weight: 600; color: #411401;">${quoteRecord.service}</td></tr>
                  <tr><td style="padding: 6px 0; color: #8C6A5A;">Selected Package:</td><td style="font-weight: 600; color: #411401;">${quoteRecord.package}</td></tr>
                  <tr><td style="padding: 6px 0; color: #8C6A5A;">Estimated Budget:</td><td>${quoteRecord.budget}</td></tr>
                  <tr><td style="padding: 6px 0; color: #8C6A5A;">Timeline:</td><td>${quoteRecord.timeline}</td></tr>
                </table>

                <h3 style="color: #411401; font-size: 15px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;">Project Description & Goals</h3>
                <div style="background: #F8F7F4; border: 1px solid #E7DCD5; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #411401; margin-bottom: 24px;">
${quoteRecord.projectRequirements}
                </div>

                <div style="background: #FFFDF0; border-left: 4px solid #C69D50; padding: 12px 16px; border-radius: 4px; font-size: 13px; color: #411401;">
                  <strong>Payment Terms:</strong> 50% deposit before work starts and 50% on completion.
                </div>
              </div>
            </div>
          `,
        });
        emailSent = true;
      } catch (mailError: any) {
        console.error('SMTP Delivery error:', mailError);
      }
    } else {
      console.log('Quotation saved to data/quotations.json. (SMTP not configured)');
    }

    return res.status(200).json({
      success: true,
      reference: refCode,
      message: 'Your quotation request has been submitted successfully!',
      emailSent,
      data: {
        reference: refCode,
        fullName: quoteRecord.fullName,
        service: quoteRecord.service,
        package: quoteRecord.package,
        phone: quoteRecord.phone,
      },
    });
  } catch (err: any) {
    console.error('Unhandled server error on /api/quote:', err);
    return res.status(500).json({
      success: false,
      error: 'Unable to submit quotation request at this time. Please try again or reach out directly on WhatsApp.',
    });
  }
});

// Endpoint to retrieve submitted quotations (for Makua Web Solutions owner)
app.get('/api/quotes', (_req: Request, res: Response) => {
  try {
    if (fs.existsSync(QUOTES_FILE)) {
      const quotes = JSON.parse(fs.readFileSync(QUOTES_FILE, 'utf-8'));
      return res.json({ success: true, count: quotes.length, quotes });
    }
    return res.json({ success: true, count: 0, quotes: [] });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, port: Number(PORT), host: '0.0.0.0' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();

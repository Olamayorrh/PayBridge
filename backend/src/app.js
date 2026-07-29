// src/app.js
'use strict';

const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const rateLimit  = require('express-rate-limit');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const escrowRoutes = require('./routes/escrow.routes');
const transactionRoutes = require('./routes/transaction.routes');
const walletRoutes = require('./routes/wallet.routes');
const globalErrorHandler =
  require('./middlewares/globalErrorHandler.middleware');

const app = express();

// ─────────────────────────────────────────────
// SECURITY HEADERS  (helmet should come first)
// ─────────────────────────────────────────────
app.use(helmet());

// ─────────────────────────────────────────────
// CORS CONFIGURATION
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3001,http://localhost:5173')
  .split(',')
  .map(o => o.trim());

const corsOptions = {
  origin(origin, callback) {
    // Allow server-to-server calls (no origin header) and listed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin '${origin}' is not allowed`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,   // allow cookies / Authorization header
};

app.use(cors(corsOptions));
// app.options('*', cors(corsOptions)); // handle pre-flight for all routes

// const allowedOrigins =
//   (process.env.ALLOWED_ORIGINS ||
//     'http://localhost:3001,http://localhost:5173')

// ─────────────────────────────────────────────
// RATE LIMITING
// ─────────────────────────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});

app.use('/api/auth', authLimiter);
app.use('/api',      generalLimiter);

// ─────────────────────────────────────────────
// BODY PARSING
// ─────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ─────────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────────

app.use('/api/auth',  authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/escrows', escrowRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/wallets', walletRoutes);

// ─────────────────────────────────────────────
// HEALTH CHECK
// ─────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// ─────────────────────────────────────────────
// 404 HANDLER  (before global error handler)
// ─────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─────────────────────────────────────────────
// GLOBAL ERROR HANDLER  (must be LAST)
// ─────────────────────────────────────────────
app.use(globalErrorHandler);

module.exports = app;

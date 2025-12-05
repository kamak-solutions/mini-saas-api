import rateLimit from 'express-rate-limit';

export const loginLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5,                   // 5 tentativas
  message: { message: 'Muitas tentativas, tente mais tarde' },
  standardHeaders: true,
  legacyHeaders: false,
});
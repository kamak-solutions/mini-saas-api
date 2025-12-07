import { signupSchema } from './validation.js';
import { loginSchema } from './validation.js';
import { inviteSchema } from './validation.js';

export class AuthController {
  constructor(service) {
    this.service = service;
  }

  signUp = async (req, res, next) => {
  
    try {
      const dto = signupSchema.parse(req.body);
      const result = await this.service.signUp(dto);
      res.status(201).json(result);
    } catch (e) {
            if (e.name === 'ZodError') {
        const errors = e.issues || e.errors || []; // <-- novo
        return res.status(400).json({ message: 'Dados inválidos', errors });
      }
      next(e);
    }
  };

  
login = async (req, res, next) => {
  try {
    const dto = loginSchema.parse(req.body);
    const { accessToken, refreshToken, user } = await this.service.login(dto);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // https apenas em prod
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
    });

    res.json({ accessToken, user });
  } catch (e) {
    if (e.name === 'ZodError') {
      return res.status(400).json({ message: 'Dados inválidos', errors: e.issues });
    }
    next(e);
  }
};
invite = async (req, res, next) => {
  try {
    const dto = inviteSchema.parse(req.body);
    const result = await this.service.inviteMember({
      tenantId: req.tenantId,   // vindo do token
      email: dto.email,
    });
    res.json(result);
  } catch (e) {
    if (e.name === 'ZodError') {
      return res.status(400).json({ message: 'Dados inválidos', errors: e.issues });
    }
    next(e);
  }
};
refresh = async (req, res, next) => {
  try {
    const result = await this.service.refresh(req.cookies.refreshToken);
    res.json(result);
  } catch (e) {
    next(e);
  }
};
}
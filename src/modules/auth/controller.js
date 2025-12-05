import { signupSchema } from './validation.js';

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
}
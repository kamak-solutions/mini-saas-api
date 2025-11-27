export class AuthController {
  constructor(service) {
    this.service = service;
  }

  signUp = async (req, res, next) => {
    try {
      const result = await this.service.signUp(req.body);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };
}
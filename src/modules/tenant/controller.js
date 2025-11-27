export class TenantController {
  constructor(service) {
    this.service = service
  }

  create = async (req, res, next) => {
    try {
      const tenant = await this.service.createTenant(req.body)
      res.status(201).json(tenant)
    } catch (e) {
      next(e);
    }
  }
}
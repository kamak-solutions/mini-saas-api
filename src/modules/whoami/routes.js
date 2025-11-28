import { Router } from 'express';
import { auth } from '../../middlewares/auth.js';

const router = Router();

router.get('/', auth, (req, res) => {
  res.json({ userId: req.userId, tenantId: req.tenantId, role: req.role });
});

export default router;
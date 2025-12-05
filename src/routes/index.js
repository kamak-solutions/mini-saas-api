import {Router} from 'express'
import healthRoutes from '../modules/health/routes.js'
import tenantRoutes from '../modules/tenant/routes.js'
import authRoutes from '../modules/auth/routes.js'
import { auth } from '../middlewares/auth.js'
import whoamiRoutes from '../modules/whoami/routes.js'
import projectRoutes from '../modules/projects/routes.js'

const api = Router()

api.use('/health',healthRoutes)
api.use('/',healthRoutes)
api.use('/tenants', tenantRoutes)
api.use('/auth', authRoutes)
//api.use('/projects', auth, projectRoutes)
api.use('/whoami', whoamiRoutes)
api.use('/projects', projectRoutes)


export default api
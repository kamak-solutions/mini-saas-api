import {Router} from 'express'
import healthRoutes from '../modules/health/routes.js'
import tenantRoutes from '../modules/tenant/routes.js'


const api = Router()

api.use('/health',healthRoutes)
api.use('/tenants', tenantRoutes)



export default api
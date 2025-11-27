import {Router} from 'express'
import healthRoutes from '../modules/health/routes.js'


const api = Router()

api.use('/health',healthRoutes)



export default api
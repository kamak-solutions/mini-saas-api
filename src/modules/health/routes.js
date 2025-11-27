import { Router } from "express";   

const  router = Router()

router.get('/', (req, res)=>{
    res.json({status:'ok',service:'mini-saas'})
})

export default router
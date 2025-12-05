import { Router } from "express";   

const  router = Router()

router.get('/', (req, res)=>{
    res.json({status:'ok',service:'mini-saas'})
})

router.get('/xss',(req,res) =>{
    const nome = req.query.nome
    res.send(`<h1>Olá, ${nome}</h1>`)
})

export default router



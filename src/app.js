import express from 'express'

export class App{
    constructor(){
        this.express = express()
        this.setupRoutes()
    }

    setupRoutes(){
        this.express.get('/api/health',(_,res)=>{
            res.json({status:'ok',message:'mini-saas'})
        })
    }
    listen(port){
        return this.express.listen(port, ()=>{
            console.log(`API em kttp://localhost:${port}`);
            
        })
    }
}
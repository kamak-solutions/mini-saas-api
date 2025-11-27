import express from 'express'
import routes from './routes/index.js'

export class App{
    constructor(){
        this.express = express()
        this.middlewares()
        this.routes()
        
    }
    middlewares(){
        this.express.use(express.json())
    }
    routes() {
  console.log('1 - entrando em routes');
  this.express.use('/api', routes);
  console.log('2 - use /api foi chamado');
}

    

   
    listen(port){
        return this.express.listen(port, ()=>{
            console.log(`API em http://localhost:${port}`);
            
        })

        
    }
}
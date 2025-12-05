import express from 'express'
import helmet from 'helmet'
import routes from './routes/index.js'
import {logger} from './config/logger.js'

export class App{
    constructor(){
        this.express = express()
        this.middlewares()
        this.routes()
        
    }
    middlewares(){
        this.express.use(express.json())

         // Segurança com Helmet
        this.express.use(helmet())
       
    
    }
    routes() {
  console.log('1 - entrando em routes');
  this.express.use('/api', routes);
  console.log('2 - use /api foi chamado');
}

    

   
    listen(port){
        return this.express.listen(port, ()=>{
           logger.info(`API em http://localhost:${port}`);
            
        })

        
    }
}
import{App} from './app.js'
import { ENV } from './config/env.js'


const app = new App()

app.listen(ENV.PORT)
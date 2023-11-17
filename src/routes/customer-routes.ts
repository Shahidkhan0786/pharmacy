import express, { Router } from 'express'
import { RoutesConfig } from './routes.config'
import { AuthMiddleware} from '../middlewares/auth-middlewares'

export class CustomerRoutes extends RoutesConfig{
    route: Router

    constructor(app:express.Application){
        super(app, 'CustomerRoutes')
    }
    configureRoutes(): express.Application {
           this.route = express.Router()



        this.app.use('/api/customer',new AuthMiddleware(this.app).handle ,this.route)
      
        return this.app;
    }

}
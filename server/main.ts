import * as express from 'express'
import { routeObject } from '../routes/router'
import { environment } from '../common/environment'
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser'
import { tokenApply } from '../middlewares/token'


export class Server{
    
    app: express.Application

    initializeDB():Promise<typeof mongoose>{
        return mongoose.connect(environment.database.url, {
            useNewUrlParser:true,
            useUnifiedTopology: true 
        }, () =>  console.log('DB INITIALIZED!'))
    }

    initRoutes(app:express.Application, routeObjects: routeObject[]):Promise<express.Application>{
        return new Promise((resolve, reject) => {
            try{
                routeObjects.forEach(route => {
                    if(route.midlleware){
                        app[route.method](route.path, route.midlleware,route.callback)
                    }else{
                        app[route.method](route.path, route.callback)
                    }
                })               
                
                app.listen(environment.server.port, () => resolve(app))                
            }
            catch(e){
                reject(e)
            }
        })        
    }
    

    bootstrap(...routeObjects: routeObject[]): Promise<express.Application>{       
        
        this.app = express()

        this.app.use(bodyParser.json())  
        this.app.use(tokenApply)  

        return this.initializeDB()
        .then(() => this.initRoutes(this.app, routeObjects)) 
    }
}
 



import * as express from 'express'
import * as mongoose from 'mongoose';
import { routeObject } from '../routes/router'

export abstract  class Controller<D extends mongoose.Document>{
    
    router:routeObject[]
    model: mongoose.Model<D>
    constructor(protected refModel: mongoose.Model<D>){
        this.model = refModel
    }

    

    create = (req: express.Request, resp: express.Response,  next) => {
        let document = new this.model(req.body)
        document.save()
        .then( createdDocument => resp.json(createdDocument))
        .catch(next)
    }

    list = (req: express.Request, resp: express.Response,  next) => {
        
        this.model.find()
        .then( list => resp.json(list))
        .catch(next)  
        console.log(this.model)     
    }

    update(){}

    replace(){}

    delete(){}


}
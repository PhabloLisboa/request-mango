
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
    }
    
    show = (req: express.Request, resp: express.Response,  next) => {
        this.model.findOne({_id: req.params.id})
        .then(document =>  resp.json(document))
        .catch(next)
    }
    
    update = (req: express.Request, resp: express.Response,  next) => {
        //This is a PATCH
        const options = {runValidators: true, new : true}
        this.model.findOneAndUpdate(req.params.id, req.body, options)
        .then( document => resp.json(document))
        .catch(next)   
    }

    replace = (req: express.Request, resp: express.Response,  next) => {
        // This is a PUT
        const options = {runValidators: true, overwrite: true}
        this.model.update({_id: req.params.id}, req.body, options)
        .then( document => {
            if(document.n){
                this.model.findById(req.params.id)
                .then( response => resp.send(response))
            }else{
                resp.send(404)
            }
        })
        .catch(next)
    }

    delete = (req: express.Request, resp: express.Response,  next) => {
        this.model.findByIdAndDelete({_id: req.params.id})
        .then( document => resp.json(document))
        .catch(next)
    }



}
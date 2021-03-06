
import * as express from 'express'
import * as mongoose from 'mongoose';
import { routeObject } from '../routes/router'
import * as bcrypt from 'bcrypt'

export abstract  class Controller<D extends mongoose.Document>{
    
    router:routeObject[]
    model: mongoose.Model<D>
    constructor(protected refModel: mongoose.Model<D>){
        this.model = refModel
    }

    create = (req: express.Request, resp: express.Response,  next) => {
        let document:any = new this.model(req.body)
        
        if(document.password)
           document.password = bcrypt.hashSync(document.password, 5)
        
        document.save()
        .then( createdDocument => {
            document.password = undefined //Don't show when returned
            return resp.json(createdDocument)})
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
        this.model.findOneAndUpdate({_id: req.params.id}, req.body, options)
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
        .then( document => {
            (<any>document).password = undefined
            resp.json(document)})
        .catch(next)
    }



}
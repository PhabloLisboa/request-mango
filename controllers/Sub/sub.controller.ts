import * as express from 'express'
import { Controller } from "../controller";
import { Sub } from "../../models/Sub/sub.model";
import { routeObject } from "../../routes/router";
import { Group } from '../../models/Group/group.model';


class SubController extends Controller<Sub>{

    constructor(){
        super(Sub)
    }

    show = (req: express.Request, resp: express.Response,  next) => {
        Sub.findOne({_id: req.params.id})
        .then(document => {
            Group.findById(document.group).then(group => {
                document.group = group
                resp.json(document)
            })            
        })
        .catch(next)
    }

    createRoute:routeObject = {
        method:'post',
        path:'/subs',
        callback:this.create
    }
    
    listRoute:routeObject = {
        method:'get',
        path:'/subs',
        callback:this.list
    }

    showRoute:routeObject = {
        method:'get',
        path:'/subs/:id',
        callback:this.show
    }

    updateRoute:routeObject = {
        method:'patch',
        path:'/subs/:id',
        callback:this.update
    }

    replaceRoute:routeObject = {
        method:'put',
        path:'/subs/:id',
        callback:this.replace
    }

    deleteRoute:routeObject = {
        method:'delete',
        path:'/subs/:id',
        callback:this.delete
    }

    router = [this.createRoute, this.listRoute, 
        this.showRoute, this.updateRoute, this.replaceRoute ,this.deleteRoute] 
}

export const subController = new SubController()
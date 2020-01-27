import { Controller } from "../controller";
import { Group } from "../../models/Group/group.model"
import { routeObject } from '../../routes/router'

class GroupController extends Controller<Group>{

    constructor(){
        super(Group)
    }

    createRoute:routeObject = {
        method:'post',
        path:'/groups',
        callback:this.create
    }
    
    listRoute:routeObject = {
        method:'get',
        path:'/groups',
        callback:this.list
    }

    updateRoute:routeObject = {
        method:'post',
        path:'/groups/:id',
        callback:this.update
    }

    router = [this.createRoute, this.listRoute, this.updateRoute]    
}

export const groupController = new GroupController()
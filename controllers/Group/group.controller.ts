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

    showRoute:routeObject = {
        method:'get',
        path:'/groups/:id',
        callback:this.show
    }

    updateRoute:routeObject = {
        method:'patch',
        path:'/groups/:id',
        callback:this.update
    }

    replaceRoute:routeObject = {
        method:'put',
        path:'/groups/:id',
        callback:this.replace
    }

    deleteRoute:routeObject = {
        method:'delete',
        path:'/groups/:id',
        callback:this.delete
    }

    router = [this.createRoute, this.listRoute, 
                this.showRoute, this.updateRoute, this.replaceRoute ,this.deleteRoute]    
}

export const groupController = new GroupController()
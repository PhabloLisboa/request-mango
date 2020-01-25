import { Controller } from "../controller";
import { Group } from "../../models/Group/group.model"
import { routeObject } from '../../routes/router'

class GroupController extends Controller<Group>{

    constructor(){
        super(Group)
    }
    
    teste:routeObject = {
        method:'get',
        path:'/groups',
        callback:this.list
    }

    router = [this.teste]    
}

export const groupController = new GroupController()
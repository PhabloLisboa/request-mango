import * as jwt from 'jsonwebtoken'
import { RequestHandler } from 'express'
import { Group } from '../../models/Group/group.model'
import { environment } from '../../common/environment'

export const authenticate: RequestHandler = (req, resp, next) => {
    const {name, password} = req.body
    
    Group.findOne({name: name},'+password').then(group => {
        if(group && group.match(password)){
            const token = jwt.sign({sub: name, iss: 'API', exp: Date.now()+120}, environment.security.pass)
            resp.json({name: name, token: token})
            return next(false)
        }else{
            resp.status(401)
            return resp.render("Not Authorized")
        }
    }).catch(next)    
}
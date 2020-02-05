import * as jwt from 'jsonwebtoken'
import { RequestHandler, Request } from 'express'
import { environment } from '../common/environment'
import { Group } from '../models/Group/group.model'
import { decode } from 'punycode'

export const tokenApply: RequestHandler = (req, resp, next) => {
    const token = extract(req)
    if(token){
        jwt.verify(token, environment.security.pass, userApply(req, next))
    }else{
        next()
    }
    
}

const extract = (req: Request) => {
    let token = undefined
    const authorization = req.header('authorization')
    if(authorization){
        const parts:string[] = authorization.split(' ')
        if(parts.length === 2 && parts[0] === 'Bearer'){
            token = parts[1]
        }
    }
    return token
}

function userApply (req: Request, next): (error, decoded) => void {
    return (error, decoded) =>{
        if(decoded){
            Group.findOne({name: decoded.sub }).then(group =>{
                if(group){
                    (<any>req).authenticated = group
                    
                }
                next()
            }).catch(next)
        }else{
            next()
        }
    }
}


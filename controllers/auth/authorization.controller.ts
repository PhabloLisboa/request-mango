import { RequestHandler } from "express";


export const authorization:(...profiles: string[])=> RequestHandler  =  (...profiles: string[])=>{
    return (req: any, resp, next) =>{
        console.log(req.authenticated)
        if(req.authenticated && req.authenticated.hasAnyProfile(...profiles)){
            next()
        }else{
            resp.status(401)
            if(req.authenticated){
                return resp.send("You Don't have permission")
            }
            
            return resp.send('Forbbiden')
        }
    }
}
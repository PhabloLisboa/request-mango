import { authenticate } from '../controllers/auth/auth.controller'

export interface routeObject{
    method: string,
    path: string,    
    midlleware?(req, resp, next): Promise<any>,
    callback(req: Express.Request, resp:Express.Response, next): any
}

export const auth: routeObject = {
    method: 'post',
    path: '/auth',
    callback: authenticate
}

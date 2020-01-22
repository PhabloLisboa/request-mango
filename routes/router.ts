


export interface routeObject{
    method: string,
    path: string,    
    midlleware?(req, resp, next): Promise<any>,
    callback(req: Express.Request, resp:Express.Response, next): any,
    auth?: boolean
}

import { Server }  from './server/main'
import { groupController} from './controllers/Group/group.controller'
import { subController } from './controllers/Sub/sub.controller'
import { routeObject , auth} from './routes/router'


declare global {
    namespace Express {
        interface Request { }
        interface Response { 
            send?(),
            json?({}:any)
        }
        interface Application { 

        }
    }
}


const server:Server = new Server()

server.bootstrap(...groupController.router, ...subController.router, auth).then( app =>  console.log(`Server Is running`))
import { Server }  from './server/main'

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

server.bootstrap().then( app =>  console.log(`Server Is running`))
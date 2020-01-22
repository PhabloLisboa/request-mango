export const environment = {
    server:{
        port: process.env.SERVER_PORT || 3000
    },
    database:{
        url: process.env.DB_URL || 'mongodb://127.0.0.1/request-mango',
        lul:'xd'
    }
}
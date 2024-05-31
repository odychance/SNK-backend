const { ApolloServer } = require('apollo-server')
const typeDefs = require('./db/schema')
const resolvers = require('./db/resolvers')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path : 'variables.env'});

const connectDB = require('./config/db')

//Conectar a la base de datos
connectDB()


//servidor
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // console.log(req.headers)



        const token = req.headers['authorization'] || '';
        if(token) {
            try {
                const admin = jwt.verify(token, process.env.SECRET)
                const user = jwt.verify(token, process.env.SECRET)
                return { admin, user }

            } catch (error) {
                console.log('Error in authentication.', 'ERROR AQUI')
                console.log(error)
            }
        }
        // console.log(token, process.env.SECRET)
    }
})


//Arrancar el servidor
server.listen().then( ({url}) => {
    console.log(`Servidor listo en la url ${url}`)
})
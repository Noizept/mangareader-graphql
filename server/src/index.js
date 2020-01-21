var express = require("express")
var apoloServer = require("apollo-server-express").ApolloServer
var bodyParser = require("body-parser")
var cors = require("cors")
const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")
require("./mongo/connection")
const app = express()
const port = process.env.PORT || 3000

app.use(
    cors({
        origin: (origin, cb) => cb(null, true),
        credentials: true
        // preflightContinue: true,
        // exposedHeaders: [
        //     "Access-Control-Allow-Headers",
        //     "Access-Control-Allow-Origin,Origin,X-Requested-With,Content-Type,Accept",
        //     "X-Paassword-Experired"
        // ],
        // optionsSuccessStatus: 200
    })
)
app.use("/graphql", bodyParser.json())

const server = new apoloServer({
    typeDefs,
    resolvers
})
server.applyMiddleware({ app, cors: false, path: "/graphql" })

app.listen({ port: port }, () =>
    console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
)

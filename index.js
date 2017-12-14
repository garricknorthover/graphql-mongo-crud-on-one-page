import { GraphQLServer } from 'graphql-yoga'
import mongoose from 'mongoose'
import typeDefs from './schema'
import resolvers from './resolvers'

mongoose.connect('mongodb://localhost/meoww')
const Cat = mongoose.model('Cat', {
    name: String,
    occupation: String
})

const server = new GraphQLServer({ typeDefs, resolvers, context: { Cat } })
server.start(() => console.log('Server is running on localhost:4000 yo!'))
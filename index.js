import { GraphQLServer } from 'graphql-yoga'
import mongoose from 'mongoose'

// typeDefs and resolvers would normally be placed in their own js file
// graphql-yoga has some magic behind the scenes calling makeExecutableSchema on typeDefs

const typeDefs = `

type Cat {
    _id: String!
    name: String
    occupation: String    
}
type Query {
    allCats:[Cat!]!
}
type Mutation {
    createCat(
        name: String
        occupation: String): Cat!

    updateCat(
        _id: String!
        name: String
        occupation: String): Cat!

    deleteCat(_id: String): Cat
}
`
const resolvers = {
    Query: {
        allCats: async (parent, args, { Cat }) => {
            const cats = await Cat.find()
            return cats.map((objToStr) => {
                objToStr._id = objToStr._id.toString()
                return objToStr
            })
        }
    },
    Mutation: {
        createCat: async (parent, args, { Cat }) => {
            const kitty = await new Cat(args).save();
            kitty._id = kitty._id.toString()
            return kitty
        },
        updateCat: async (parent, args, { Cat }) => {
            await Cat.findByIdAndUpdate(args._id, args)
            return args
        },
        deleteCat: async (parent, args, { Cat }) => {
            await Cat.remove(args)
            return args
        }
    }
}
// Here's the mongo part where you connect and declare a mongo schema
mongoose.connect('mongodb://localhost/meoww')
const Cat = mongoose.model('Cat', {
    name: String,
    occupation: String
})

const server = new GraphQLServer({ typeDefs, resolvers, context: { Cat } })
server.start(() => console.log('Server is running on localhost:4000 yo!'))
import { GraphQLServer } from 'graphql-yoga'
import mongoose from 'mongoose'

// typeDefs and resolvers would normally be placed in their own js file
// graphql-yoga has some magic behind the scenes calling makeExecutableSchema on typeDefs

const typeDefs = `
type Cat {
    _id: String!
    firstName: String
    lastName: String
    phone: String
    email: String
    consignNumber: String
}
type Query {
    allCats:[Cat!]!
}
type Mutation {
    createCat(
        firstName: String
        lastName: String
        phone: String
        email: String
        consignNumber: String): Cat!

    updateCat(
        _id: String!
        firstName: String
        lastName: String
        phone: String
        email: String
        consignNumber: String): Cat!

    deleteCat(_id: String): Cat
}
`
// allCats and createCat are your standard resolvers that are shown on tutorials
// updateCat is my attempt and is pretty clunkey. there is a mongoose function called
// findByIdAndUpdate which works but does not refresh properly in graphiql
// so just assigned the fields individually
// I might have a go at using the spread operator ... , which will be a bit more concise and pleasing to the eye
const resolvers = {
    Query: {
        allCats: async (parent, args, { Cat}) => {
            const cats = await Cat.find()
            return cats.map((x) => {
                x._id = x._id.toString()
                return x
            })
        }
    },
    Mutation: {
        createCat: async (parent, args, { Cat }) => {
            const kitty = await new Cat(args).save();
            kitty._id = kitty._id.toString()
            return kitty
        },
        updateCat:  async (parent, args, { Cat }) => {
            await Cat.findByIdAndUpdate(args._id, args) 
            return args
        },
        deleteCat: async(parent, args, { Cat }) => {
            await Cat.remove(args)
            return args
        }
    }
}
// Here's the mongo part where you connect and declare a mongo schema
mongoose.connect('mongodb://localhost/kittycat')

const Cat = mongoose.model('Cat', {
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    consignNumber: String
})

const server = new GraphQLServer({ typeDefs, resolvers, context: { Cat }})
server.start(() => console.log('Server is running on localhost:4000 yo!'))
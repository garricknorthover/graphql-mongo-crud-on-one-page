import { GraphQLServer } from 'graphql-yoga'
import mongoose from 'mongoose'

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
        firstName: String,
        lastName: String,
        phone: String,
        email: String,
        consignNumber: String): Cat!

    updateCat(
        _id: String!,
        firstName: String,
        lastName: String,
        phone: String,
        email: String,
        consignNumber: String): Cat!

    deleteCat(_id: String): Cat
}
`

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
            const cust = await new Cat(args).save();
            kitty._id = kitty._id.toString()
            return kitty
        },
        updateCat:  async (parent, args, { Cat }) => {
            const cust =  await Cat.findById(args._id, args)
                cust.firstName = args.firstName
                cust.lastName = args.lastName
                cust.phone = args.phone
                cust.email = args.email
                cust.consignNum = args.consignNum
                
            return cust
        },
        deleteCat: async(parent, args, { Cat }) => {
            const kitty = await Cat.remove(args)
        }
    }
}

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
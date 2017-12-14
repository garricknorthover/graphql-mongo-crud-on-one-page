export default  `

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
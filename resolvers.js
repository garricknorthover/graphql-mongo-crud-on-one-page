export default {

    Query: {
        allCats: (parent, args, { Cat }) => {
            return Cat.find()        
    }},

    Mutation: {
        createCat: (parent, args, { Cat}) => {
            return new Cat(args).save();
        },
        updateCat: (parent, args, { Cat }) => {
            return Cat.findByIdAndUpdate(args._id, args, { new:true })
        },
        deleteCat: (parent, args, { Cat }) => {
            return Cat.findByIdAndRemove(args, { select:Cat._id } ).exec()                       
        }
    }
}
export default {
    Query: {
        allCats: (parent, args, { Cat }) => {
            const cats = Cat.find()
            return cats.map((objToStr) => {
                objToStr._id = objToStr._id.toString()
                return objToStr
            })
        }
    },
    Mutation: {
        createCat: (parent, args, { Cat }) => {
            const kitty = new Cat(args).save();
            kitty._id = kitty._id.toString()
            return kitty
        },
        updateCat: (parent, args, { Cat }) => {
            return Cat.findByIdAndUpdate(args._id, args, { new: true })

        },
        deleteCat: async (parent, args, { Cat }) => {
            Cat.remove(args)
            return args
        }
    }
}
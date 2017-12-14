export default {
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
        updateCat: (parent, args, { Cat }) => {
            const result = Cat.findByIdAndUpdate(args._id, args, {new:true})
            return result
        },
        deleteCat: async (parent, args, { Cat }) => {
            await Cat.remove(args)
            return args
        }
    }
}
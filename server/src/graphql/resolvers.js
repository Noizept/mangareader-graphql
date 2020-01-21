const Manga = require("./../mongo/Models/Manga").Manga
const graphql = require("graphql")
const axiosME = require("../mangaSources/mangaEden")


const resolvers = {


    Query: {
        mangas: async (obj, args, context, info) =>
            args.keyword ?
                await Manga.find({ title: { $regex: args.keyword, $options: 'si' } }).sort({ hits: -1 }) :
                await Manga.find({}).sort({ lastUpdated: -1 })
        ,
        manga: async (obj, args, context, info) => await Manga.findById(args.id)
    },

    Manga: {
        id: mangaObjec => mangaObjec._id,
        lastUpdated: mangaObjec => new Date(mangaObjec.lastUpdated * 1000),
        info: async mangaObjec => {
            const res = await axiosME.fetchMangaInfo(mangaObjec.id)
            return {
                chapters: res.data.chapters,
                id: mangaObjec.id
            }

        }
    }
};

module.exports = resolvers
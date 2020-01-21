require("dotenv").config()
const cron = require("node-cron")
const axiosME = require("./../mangaSources/mangaEden")
require("./connection")
const Manga = require("./Models/Manga").Manga




const seed = async () => {
    const mangas = await axiosME.fetchAllMangas()

    await Manga.bulkWrite(mangas.map((manga) => ({
        updateOne: {
            filter: { _id: manga._id },
            update: { $set: manga },
            upsert: true
        }
    })
    ))
    //  await Manga.insertMany(mangas)

}

seed()
cron.schedule('0 * * * *', () => {
    console.log('running every minute to 1 from 5');
});
require("dotenv").config()
const axios = require("axios")

const axiosME = axios.create({
    baseURL: process.env.MANGA_EDEN_URL,
    responseType: "json"
})

const transformChapters = chapters => chapters.map(
    ([number, lastUpdated, title, id]) => ({
        number, lastUpdated, title, id
    }))

const transformMangas = manga =>
    manga
        .filter(manga => manga.ld)
        .map(
            ({ a: alias,
                c: categories,
                h: hits,
                i: _id,
                im: image,
                s: status,
                t: title,
                ld: lastUpdated
            }) => ({
                _id,
                alias,
                image,
                hits,
                title,
                categories,
                status,
                lastUpdated
            })
        )

module.exports.fetchAllMangas = async () => {
    const mangas = await axiosME.get("/list/0/")
    return transformMangas(mangas.data.manga)
}

module.exports.fetchMangaInfo = async (mangaId) => {
    const res = await axiosME.get(`/manga/${mangaId}/`)
    res.data.chapters = transformChapters(res.data.chapters)
    return res
}
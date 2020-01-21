var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const MangaSchema = new Schema({
    alias: String, // String is shorthand for {type: String}
    categories: [String],
    hits: Number,
    image: String,
    status: Number,
    title: String,
    lastUpdated: Number
});

const Manga = mongoose.model('Manga', MangaSchema);

module.exports.Schema = MangaSchema
module.exports.Manga = Manga
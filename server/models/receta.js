const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecetaSchame = Schema({
    name: String,
    descripcion: String,
    portada: String,
    calorias: String,
    ingredientes: String,
    avatar: String
})

module.exports = mongoose.model("Receta", RecetaSchame);
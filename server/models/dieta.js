const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DietaSchame = Schema({
    name: String,
    descripcion: String,
    desayuno: String,
    almuerzo: String,
    cena: String,
    bebida: String,
    tiempo: String,
    calorias: String,
    avatar: String
})

module.exports = mongoose.model("Dieta", DietaSchame);
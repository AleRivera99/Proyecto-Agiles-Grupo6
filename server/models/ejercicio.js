const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EjercicioSchame = Schema({
    name: String,
    descripcion: String,
    tiempo: String,
    repeticiones: String,
    calorias_quemadas: String
})

module.exports = mongoose.model("Ejercicio", EjercicioSchame);
const express = require("express")

const ejercicioController = require("../controllers/ejercicio")
const multipart = require("connect-multiparty");

const md_auth = require('../middlewares/authenticated')
const md_upload_dieta = multipart({uploadDir: "./uploads/ejercicio"})
const api = express.Router();

api.post("/crear-ejercicio",[md_auth.ensureAuth], ejercicioController.createEjercicio);
api.get("/ejercicios", ejercicioController.getEjercicio);
api.delete("/delete-ejercicio/:id", [md_auth.ensureAuth], ejercicioController.deleteEjercicio)
api.put("/upload-avatar-ejercicio/:id",[md_auth.ensureAuth, md_upload_dieta], ejercicioController.uploadEjercicio);
api.get("/get-avatar-ejercicio/:avatarName", ejercicioController.getAvatarEjercicio);
api.put("/update-ejercicio/:id", [md_auth.ensureAuth], ejercicioController.updateEjercicio);

module.exports = api
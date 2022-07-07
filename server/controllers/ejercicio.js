const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt-node");
const jwt = require("../services/jwt")
const Ejercicio = require("../models/ejercicio");
const { exists } = require("../models/ejercicio");
const ejercicio = require("../models/ejercicio");

function createEjercicio(req, res){
    const ejercicio =new Ejercicio();
    const { name, descripcion, tiempo,repeticiones, calorias_quemadas} = req.body;
    ejercicio.name=name;
    ejercicio.descripcion=descripcion;
    ejercicio.tiempo=tiempo;
    ejercicio.repeticiones = repeticiones;
    ejercicio.calorias_quemadas = calorias_quemadas;
    ejercicio.save((err, ejercicioStored) =>{
        if(err){
            res.status(500).send({message: "La ejercicio ya existe"});
        }else{
            if(!ejercicioStored){
                res.status(404).send({message: "Error al crear el ejercicio"});
            }else{
                res.status(200).send({ejercicio: ejercicioStored});
            }
        }
    });
}

async function updateEjercicio(req, res){
    var ejercicioData = req.body;
    const params = req.params;

    Ejercicio.findByIdAndUpdate({ _id: params.id}, ejercicioData, (err, ejercicioUpdate) =>{
        if(err){
            res.status(500).send({ message: "Error del servidor."});
        } else{
            if(!ejercicioUpdate){
                res.status(404).send({message: "No se ha encontrado ningun usuario."})
            } else{
                res.status(200).send({message: "Ejercicio actualizada correctamente"})
            }
        }
    })
}

function getEjercicio(req, res){
    Ejercicio.find().then(ejercicio =>{
        if(!ejercicio){
            res.status(404).send({message: "No se ha encontrado ningun ejercicio"});
        } else{
            res.status(200).send({ejercicio});
        }
    })
}

function uploadEjercicio (req, res){
    const params = req.params;

    Ejercicio.findById({ _id: params.id}, (err, ejercicioData) => {
        if(err){
            res.status(500).send({ message : "Error del servidor"})
        } else{
            if(!ejercicioData){
                res.status(404).send({message: "No se ha encontrado ningun usuario."})
            } else{
                let ejercicio = ejercicioData;   

                if(req.files){
                    let filePath = req.files.avatar.path;
                    let fileSplit = filePath.split('\\');
                    let fileName = fileSplit[2];

                    let extSplit = fileName.split(".");
                    let fileExt = extSplit[1];

                
                    if(fileExt !== "png" && fileExt !== "jpg"){
                        res.status(400).send({message: "La extension de la imagen no es valida.(Extensiones permitidas: .png, .jpg)"});
                    }
                    else{
                        ejercicio.avatar = fileName;
                        Ejercicio.findByIdAndUpdate({ _id: params.id}, ejercicio, (err, ejercicioResult) =>{
                            if(err){
                                res.status(500).send({message: "Error del servidor."});
                            } else{
                                if(!ejercicioResult){
                                    res.status(400).send({message: "No se ha encontrado ningun ejercicio."})
                                } else{
                                    res.status(200).send({ avatarName: fileName});
                                }
                            }
                        })
                    }
                }
            }
        }
    })   

}

function getAvatarEjercicio(req, res){
    const avatarName = req.params.avatarName;
    const filePath = "./uploads/ejercicio/" + avatarName;

    fs.exists(filePath, exists =>{
        if(!exists){
        res.status(404).send({message: "El ejercicio que buscas no existe."})
        } else{
            res.sendFile(path.resolve(filePath));
        }
    });
}

function deleteEjercicio(req, res){
    const {id} = req.params

    Ejercicio.findByIdAndRemove(id, (err, ejercicioDelete) =>{
        if(err){
            res.status(500).send({message: "Error del servidor."});
        }else{
            if(!ejercicioDelete){
                res.status(404).send({message: "No se ha encontrado el ejercicio."});
            } else{
                res.status(200).send({message: "El ejercicio fue eliminado correctamente"})
            }
        }
    })
}

module.exports={
    createEjercicio,
    uploadEjercicio,
    getAvatarEjercicio,
    getEjercicio,
    deleteEjercicio,
    updateEjercicio
};
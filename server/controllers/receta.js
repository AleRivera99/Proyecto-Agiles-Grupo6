const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt-node");
const jwt = require("../services/jwt")
const Receta = require("../models/receta");
const { exists } = require("../models/receta");
const receta = require("../models/receta");

function createReceta(req, res){
    const receta =new Receta();
    const { name, descripcion, portada,calorias, ingredientes} = req.body;
    receta.name=name;
    receta.descripcion=descripcion;
    receta.portada=portada;
    receta.calorias = calorias;
    receta.ingredientes = ingredientes;
    receta.save((err, recetaStored) =>{
        if(err){
            res.status(500).send({message: "La receta ya existe"});
        }else{
            if(!recetaStored){
                res.status(404).send({message: "Error al crear la receta"});
            }else{
                res.status(200).send({receta: recetaStored});
            }
        }
    });
}

async function updateReceta(req, res){
    var recetaData = req.body;
    const params = req.params;

    Receta.findByIdAndUpdate({ _id: params.id}, recetaData, (err, recetaUpdate) =>{
        if(err){
            res.status(500).send({ message: "Error del servidor."});
        } else{
            if(!recetaUpdate){
                res.status(404).send({message: "No se ha encontrado ningun usuario."})
            } else{
                res.status(200).send({message: "Receta actualizada correctamente"})
            }
        }
    })
}

function getRecetas(req, res){
    Receta.find().then(receta =>{
        if(!receta){
            res.status(404).send({message: "No se ha encontrado ninguna receta"});
        } else{
            res.status(200).send({receta});
        }
    })
}

function uploadReceta (req, res){
    const params = req.params;

    Receta.findById({ _id: params.id}, (err, recetaData) => {
        if(err){
            res.status(500).send({ message : "Error del servidor"})
        } else{
            if(!recetaData){
                res.status(404).send({message: "No se ha encontrado ningun usuario."})
            } else{
                let receta = recetaData;   

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
                        receta.avatar = fileName;
                        Receta.findByIdAndUpdate({ _id: params.id}, receta, (err, recetaResult) =>{
                            if(err){
                                res.status(500).send({message: "Error del servidor."});
                            } else{
                                if(!recetaResult){
                                    res.status(400).send({message: "No se ha encontrado ninguna receta."})
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

function getAvatarReceta(req, res){
    const avatarName = req.params.avatarName;
    const filePath = "./uploads/receta/" + avatarName;

    fs.exists(filePath, exists =>{
        if(!exists){
        res.status(404).send({message: "La receta que buscas no existe."})
        } else{
            res.sendFile(path.resolve(filePath));
        }
    });
}

function deleteReceta(req, res){
    const {id} = req.params

    Receta.findByIdAndRemove(id, (err, recetaDelete) =>{
        if(err){
            res.status(500).send({message: "Error del servidor."});
        }else{
            if(!recetaDelete){
                res.status(404).send({message: "No se ha encontrado la receta."});
            } else{
                res.status(200).send({message: "La receta fue eliminada correctamente"})
            }
        }
    })
}

module.exports={
    createReceta,
    uploadReceta,
    getAvatarReceta,
    getRecetas,
    deleteReceta,
    updateReceta
};
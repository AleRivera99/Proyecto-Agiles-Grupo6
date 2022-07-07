const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt-node");
const jwt = require("../services/jwt")
const Dieta = require("../models/dieta");
const { exists } = require("../models/dieta");
const dieta = require("../models/dieta");

function createDieta(req, res){
    const dieta =new Dieta();
    const { name, descripcion, desayuno,almuerzo, cena, bebida,tiempo, calorias} = req.body;
    dieta.name=name;
    dieta.descripcion=descripcion;
    dieta.desayuno=desayuno;
    dieta.almuerzo = almuerzo;
    dieta.cena = cena;
    dieta.bebida = bebida;
    dieta.tiempo = tiempo;
    dieta.calorias= calorias
   
    dieta.save((err, dietaStored) =>{
        if(err){
            res.status(500).send({message: "La transaccion ya existe"});
        }else{
            if(!dietaStored){
                res.status(404).send({message: "Error al crear al usuario"});
            }else{
                res.status(200).send({dieta: dietaStored});
            }
        }
    });
}

async function updateDieta(req, res){
    var dietaData = req.body;
    const params = req.params;

    Dieta.findByIdAndUpdate({ _id: params.id}, dietaData, (err, dietaUpdate) =>{
        if(err){
            res.status(500).send({ message: "Error del servidor."});
        } else{
            if(!dietaUpdate){
                res.status(404).send({message: "No se ha encontrado ningun usuario."})
            } else{
                res.status(200).send({message: "Dieta actualizada correctamente"})
            }
        }
    })
}

function getDietas(req, res){
    Dieta.find().then(dietas =>{
        if(!dietas){
            res.status(404).send({message: "No se ha encontrado ningun usuario"});
        } else{
            res.status(200).send({dietas});
        }
    })
}

function uploadDieta (req, res){
    const params = req.params;

    Dieta.findById({ _id: params.id}, (err, dietaData) => {
        if(err){
            res.status(500).send({ message : "Error del servidor"})
        } else{
            if(!dietaData){
                res.status(404).send({message: "No se ha encontrado ningun usuario."})
            } else{
                let dieta = dietaData;   

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
                        dieta.avatar = fileName;
                        Dieta.findByIdAndUpdate({ _id: params.id}, dieta, (err, dietaResult) =>{
                            if(err){
                                res.status(500).send({message: "Error del servidor."});
                            } else{
                                if(!dietaResult){
                                    res.status(400).send({message: "No se ha encontrado ningun usuario."})
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

function getAvatarDieta(req, res){
    const avatarName = req.params.avatarName;
    const filePath = "./uploads/dieta/" + avatarName;

    fs.exists(filePath, exists =>{
        if(!exists){
        res.status(404).send({message: "La dieta que buscas no existe."})
        } else{
            res.sendFile(path.resolve(filePath));
        }
    });
}

function deleteDieta(req, res){
    const {id} = req.params

    Dieta.findByIdAndRemove(id, (err, dietaDelete) =>{
        if(err){
            res.status(500).send({message: "Error del servidor."});
        }else{
            if(!dietaDelete){
                res.status(404).send({message: "No se ha encontrado la dieta."});
            } else{
                res.status(200).send({message: "La dieta fue eliminada correctamente"})
            }
        }
    })
}

module.exports={
    createDieta,
    uploadDieta,
    getAvatarDieta,
    getDietas,
    deleteDieta,
    updateDieta
};
'use strict'

var Folder  = require('../models/folder.model');

function create(req,res){
    let params = req.body;
    let folder = new Folder();
    if(params.name){
        folder.name = params.name;
        folder.active = true;
        folder.save((err,folderStored)=>{
            if(err) return res.stats(500).send({messsage:'Error en la petición.'});
            if(!folderStored) return res.status(404).send({message:'Error al crear la carpeta.'});
            return res.status(200).send({messsage:'Carpeta creada satisfactoriamente.'});
        })
    }
}

function get(req,res){
    Folder.find({},(err,folders)=>{
        if(err) return res.status(500).send({message:'Error en la petición.'});
        if(!folders) return res.status(404).send({message:'Error al obtener las carpetas.'});
        return res.status(200).send({folders:folders});
    });
}

function update(req,res){
    let params = req.body;
    let folderid = req.params.id;
    Folder.findByIdAndUpdate(folderid,params,{new:true},(err,updatedFolder)=>{
        if(err) return res.status(500).send({message:'Error en la petición.'});
        if(!updatedFolder) return res.status(404).send({message:'Error al actualizar la carpeta.'});
        return res.status(200).send({message:'Carpeta actualizada correctamente.'});
    });
}

function deactivate(req,res){
    let folderid = req.params.id;
    let active = false;
    Folder.findByIdAndUpdate(folderid,{active:active},{new:true},(err,updatedFolder)=>{
        if(err) return res.status(500).send({message:'Error en la petición.'});
        if(!updatedFolder)return res.status(404).send({message:'Error al inactivar la carpeta.'});
        return res.status(200).send({message:'Carpeta desactivada correctamente.'});
    })
}

function activate(req,res){
    let folderid =req.params.id;
    let active = true;
    Folder.findByIdAndUpdate(folderid,{active:active},{new:true},(err,updatedFolder)=>{
        if(err) return res.status(500).send({message:'Error en la petición'});
        if(!updatedFolder) return res.status(404).send({message:'Error al cambiar activar la carpeta.'});
        return res.status(200).send({message:'Carpeta activada correctamente.'});
    })
}

module.exports ={
    create,
    get,
    update,
    activate,
    deactivate
};
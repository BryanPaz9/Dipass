'use strict'
var Pass = require('../models/pass.model');
var User = require('../models/user.model');
var bcrypt = require('bcrypt-nodejs');

function create(req, res){
    let params = req.body;
    let pass = new Pass();
    if(params.name && params.user && params.password){
        pass.name = params.name;
        pass.user = params.user;
        pass.notes = params.notes;
        pass.url = params.url;
        pass.favorite = false;
        pass.favorite = params.favorite;
        pass.updatedate = new Date();
        pass.userid = req.sub._id;
        pass.folderid = params.folderid;
        bcrypt.hash(pass.password,null,null,(err,hash)=>{
            if(err) return res.status(500).send({message:'Error al encriptar contraseña'});
            pass.password = hash;
            pass.save((err,passStored)=>{
                if(err) return res.status(500).send({message:'Error en la transacción'});
                if(!passStored) return res.status(404).send({message:'No se pudo crear el registro.'});
                return res.status(200).send({message:'Contraseña registrada correctamente.'});
            })
        })
    }else{
        return res.status(500).send({message:'Debe llenar los campos obligatorios'});
    }


}

function update(req,res){
    let params = req.body;
    let 
}

function get(req,res)   {
    Pass.find({},(err,pass)=>{
        if(err) return res.status(500).send({message:'Error en el servidor '});
        if(!pass) return res.status(404).send({message:'No se encontró la contraseña'});
        return res.status(200).send({pass:pass});
    })
}

function getById(){

}

function deactivate(){

}

function activate(){

}

module.exports={
    get,
    create,
}

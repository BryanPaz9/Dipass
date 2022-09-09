'use strict'
var Role = require('../models/role.model');

function create(req,res){
    let params = req.body;
    let role = new Role();

    if(params.name){
        role.name = params.name;
        role.save((err,roleStored)=>{
            if(err) return res.status(500).send({message: 'Error en la petición.'});
            if(!roleStored) return res.status(404).send({message:'Error al crear rol.'});
            return res.status(200).send({message:'Rol registrado satisfactoriamente.'});
        })
    }
}

function get(req,res){
    Role.find((err,roles)=>{
        if(err) return res.status(500).send({message:'Error en la petición'});
        if(!roles) return res.status(500).send({message:'No se pudieron obtener los roles'});
        return res.status(200).send({roles:roles});
    })

}

function getById(req,res){
    let roleId = req.params.id;
    Role.findById({id:roleId},(err,role)=>{
        if(err) return res.status(500).send({message:'Error en la petición.'});
        if(!role) return res.status(404).send({message:'No fue posible obtener el rol.'});
        return res.status(200).send({role:role});
    })
}

function update(req,res){
    let roleId = req.params.id;
    Role.findByIdAndUpdate(roleId,{new:true},(err,roleUpdated)=>{
        if(err) return res.status(500).send({message:'Error en la petición'});
        if(!roleUpdated) return res.status(404).send({message:'No fue posible actualizar el rol'});
        return res.status(200).send({message:'Usuario actualizado correctamente.'})
    });
}

function deactivate(req,res){

}

module.exports={
    create,
    get,
    getById,
    update,
    deactive
};
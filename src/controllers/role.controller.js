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

async function createAdminRole(req,res){
    let name = 'ADMIN';
    let role = new Role();
    let admin = await Role.findOne({name:name});
    if(!admin){
        role.name = name;
        role.save((err,adminRoleStored)=>{
            if(err) console.log('Error al crear el rol de admin');
            if(!adminRoleStored) {
                console.log('No se ha creado el rol admin')
            }else{
                console.log(adminRoleStored);
            }
        });
    }
}

async function createUserRole(req,res){
    let name = 'USER';
    let role = new Role();
    let admin = await Role.findOne({name:name});
    if(!admin){
        role.name = name;
        role.save((err,userRoleStored)=>{
            if(err) console.log('Error al crear el rol de admin');
            if(!userRoleStored) {
                console.log('No se ha creado el rol admin')
            }else{
                console.log(userRoleStored);
            }
        });
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
        return res.status(200).send({message:'Rol actualizado correctamente.'})
    });
}

function deactivate(req,res){
    let roleid = req.params.id;
    let active = false;
    Role.findByIdAndUpdate(roleid,{active:active},{new:true},(err,deactivated)=>{
        if(err) return res.status(500).send({message:'Error en la petición'});
        if(!deactivated) return res.status(404).send({message:'No se pudo desactivar el rol'});
        return res.status(200).send({message:'Rol desactivado correctamente'});
    });
}

module.exports={
    create,
    get,
    getById,
    update,
    deactivate,
    createAdminRole,
    createUserRole
};
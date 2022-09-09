var User = require('../models/user.model');
var Role = require('../models/role.model');
var bcrypt = require('bcrypt-nodejs');

async function createUserByAdmin(req,res){
    let params = req.body;
    let adminrole = await Role.findOne({name: 'ADMIN'});
    if(req.user.role != adminrole){
        return res.status(500).send({message:'Solo el administrador puede crear usuarios desde la plataforma.'});
    }
    if(params.email && params.fullname && params.username && params.password && params.roleid){
        let user = new User();
        user.email = params.email;
        user.fullname = params.fullname;
        user.username = params.username;
        user.active = true;
        user.resetpwd = true;
        User.find(
            {username: {$regex:user.username,$options:'-i'}}).exec((err,userFound=>{
                if(err) return res.status(500).send({message:'Error en la petición'});
                if(userFound && userFound.length>=1) return res.status(500).send({message:'Este nombre de usuario ya existe. Por favor utilice otro.'});
                bcrypt.hash(user.username,null,null,(err,hash)=>{
                    user.password = hash;
                    user.roleid = params.roleid;
                    user.save((err,userStored)=>{
                        if(err) return res.status(500).send({message: 'Error al crear usuario'});
                        if(userStored){
                            return res.status(200).send({message:'Usuario creado exitosamente'});
                        }else{
                            return res.status(404).send({message:'No fue posible crear el usuario.'});
                        }
                    })
                })
            })
        )    
    }
}


function createSA(req,res){
    var sa = new User();
    var username = 'desarrollo'
    var email = "desarrollo.it@grupodisatel.com"
    var password = "desarrollo"

    User.findOne({username: {$regex: username,$options:'-i'}},(err,userFound)=>{
        if(err) console.log(err);
        if(!userFound){
            sa.email = email;
            sa.fullname = 'Bryan de Paz';
            sa.username = username
            sa.active = true;
            sa.resetpwd = false;
            bcrypt.hash(password,null,null,(err,hash)=>{
                sa.password = hash;
                sa.role = 'SA';
                sa.save((err,saStored)=>{
                if(err) console.log(err);
                    if(saStored){
                        console.log(saStored)
                    }
                });
            })
        } 
    });
}
async function updateByAdmin(req,res){
    let params = req.body;
    let userId = req.params.id;
    let adminrole = await Role.findOne({name: 'ADMIN'});
    if(req.user.role == adminrole.id){
        User.findByIdAndUpdate(userId,params,{new:true},(err,userUpdated)=>{
            if(err) return res.status(500).send({message:'Error en la petición'});
            if(!userUpdated) return res.status(404).send({message:'No se pudo actualizar el usuario'});
            return res.status(200).send({message:'Usuario actualizado exitosamente'});
        });
    }else{
        return res.status(500).send({message:'Solo el administrador puede modificar este usuario.'});
    }
}

function update(req,res){
    let params = req.body;
    let userId = req.params.id;

    User.findByIdAndUpdate(userId,params,{new:true},(err,updatedUser)=>{
        if(err) return res.status(500).send({message:'Error en la petición'});
        if(!updatedUser) return res.status(404).send({message:'No fue posible actualizar el usuario'});
        return res.status(200).send({messsage: 'Usuario actualizado exitosamente'});
    })
}

async function getById(req,res){
    let userId = req.params.id;
    let adminrole = await Role.findOne({name: 'ADMIN'});
    if(req.user.role != adminrole){
        return res.status(500).send({message:'Solo el administrador puede crear usuarios desde la plataforma.'});
    }
    User.findById(userId,(err,userFound)=>{
        if(err) return res.status(500).send({message:'Error en la petición'});
        if(!userFound) return res.status(404).send({message:'No fue positble encontrar el usuario'});
        return res.status(200).send({user:userFound});
    });
}

function getByName(req,res){
    let username = req.params.name;
    User.find({name:username},(err,userFound)=>{
        if(err) return res.status(200).send({message:'Error en la petición'});
        if(!userFound) return res.status(404).send({message: 'No fue posible encontrar usuarios con ese nombre'});
        return res.status(200).send({user:userFound});
    })
}

function deactivateByAdmin(req,res){

}

function activateByAdmin(req,res){

}


module.exports ={
    createUserByAdmin,
    createSA,
    updateByAdmin,
    update,
    getById,
    getByName,
    deactivateByAdmin,
    activateByAdmin
};
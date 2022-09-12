'use strict'
var User = require('../models/user.model');
var Role = require('../models/role.model');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

async function signUp(req,res){
    let params = req.body;
    let user = new User();
    let userrole = await Role.findOne({name:'USER'});
    if(params.email && params.username && params.fullname && params.password){
        user.email = params.email;
        user.fullname = params.fullname;
        user.active = true;
        user.resetpwd = false;
        user.username = params.username;
        User.find(
            {username:user.username}).exec((err,userFound)=>{
                if(err){
                    console.log(err);
                    return res.status(500).send({message:'Error en la petición'});
                } 
                if(userFound && userFound.length>0) return res.status(500).send({message:'Este nombre de usuario ya se encuentra registrado '});
                bcrypt.hash(params.password,null,null,(err,hash)=>{
                    user.password = hash;
                    user.roleid = userrole._id;
                    user.save((err,userStored)=>{
                        if(err) return res.status(500).send({message:'Error en el servidor'});
                        if(!userStored) return res.status(500).send({message:'No fue registrar el usuario.'});
                        return res.status(200).json({user:userStored,token:jwt.createToken(userStored)});
                    })
                })
            })
    }
}

async function logIn(req,res){
    let params = req.body;
    User.findOne({username:params.username},(err,user)=>{
        if(err) return res.status(500).send({message:'Error al realizar petición'});
        if(!user) return res.status(404).send({message:'No se ha podido inicar sesión'});
        if(user && user.active){
            bcrypt.compare(params.password,user.password,(err,gettoken)=>{
                if(gettoken){
                    if(params.gettoken){
                        return res.status(200).send({token:jwt.createToken(user)})
                    }else{
                        user.password = undefined;
                        return res.status(200).send({user});
                    }
                }else{
                    return res.status(404).send({message:'El usuario no pudo ser identificado'});
                }
            })
        }else if(user && !user.active){
            return res.status(403).send({message:'Este usuario se encuentra desactivado, por favor contacta con el administrador.'});
        }
    })
}

module.exports ={
    signUp,
    logIn
}
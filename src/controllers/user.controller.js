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
            sa.firstLogin = false;
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

module.exports ={
    createUserByAdmin,
    createSA
};
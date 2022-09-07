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
module.exports ={
    createUserByAdmin
};
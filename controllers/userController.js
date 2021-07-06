var User = require('../models/userModel');
var token = require('../utility/token');
var pw = require('../utility/password');



exports.login = function (req,res) {
    User.find({email:req.body.email},function (err,user) {
        if(err)
            res.json({status:400,message:err});
        if(pw.isValid(req.body.password,user.password))
            res.json({
                status:200,
                access_token:token.generateToken({user:user._id},'access'),
                refresh_token:token.generateToken({user:user._id},'refresh'),
            });
        else
            res.json({
                status:401,
                message:'Password is not true'
            })
    });
}

exports.register = function (req,res) {
    try 
    {
        var user = token.verifyToken(req.body.token,'access');
        if(user.user_type == 0)
            res.json({status:401,message:'This user cannot create new users'});
        var newuser = new User();
        newuser.email = req.body.email;
        newuser.password = req.body.password;
        newuser.name = req.body.name;
        newuser.surname = req.body.surname;
        newuser.created_date = Date.now();
        newuser.user_type = req.body.user_type;

        newuser.save((err) => {
            if(err)
                res.json({status:400,message:err});
            res.json({status:200,message:"User created"});
        })
    }
    catch(err)
    {
        res.json({status:400,message:err});
    }
};


exports.index = function(req,res) {
    User.get(function (err,users) {
        if(err)
        {
            res.json({
                status:400,
                message:err
            });
            console.log(err);
        }
        else
            res.json({
                status:200,
                data:users
            });
    });
}






var User = require('../models/userModel');
var token = require('../utility/token');
var pw = require('../utility/password');



exports.login =  function  (req,res) {
    if(req.body.email == null || req.body.password == null)
    {
        res.json({status:400,message:"No credientals"});
        return;
    }
    User.findOne({email:req.body.email}, async function (err,user) {
        if(err)
            res.json({status:400,message:err});
        var isvalid = await pw.isValid(req.body.password,user.password); /* kontrol edene kadar bekle */
        if(isvalid)
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


exports.register = async function (req,res) {
    try 
    {
        var user = await User.findOne({_id:token.verifyToken(req.body.token,'access').user});
        if(user.user_type == 0 || (user.user_type == 1 && req.body.user_type == 2)) /* çalışan kullanıcı oluşturamaz ve admin superadmin oluşturamaz */
            res.json({status:401,message:'This user cannot create new users'});
        var newuser = new User();
        newuser.email = req.body.email;
        newuser.password = pw.hash(req.body.password);
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
        res.json({status:400,message:"Invalid token"});
    }
};


exports.index = async function(req,res) {
    try
    {
        var user = await User.findOne({_id:token.verifyToken(req.body.token,'access').user});
        if(user.user_type == 0)
            res.json({status:400,message:"You have no permission for this request"});
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
    catch
    {
        res.json({status:400,message:"Invalid token"});
    }
}


exports.whoami = async function(req,res) {
    try {
        var user = await User.findOne({_id:token.verifyToken(req.body.token,'access').user});
        res.json(user);
    }
    catch(e)
    {
        res.json({status:400,message:"Invalid token"});
    }
}




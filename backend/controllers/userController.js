var User = require('../models/userModel');
var token = require('../utility/token');
var pw = require('../utility/password');
var aqp = require('api-query-params');


exports.login =  function  (req,res) {
    if(req.body.email == null || req.body.password == null)
    {
        res.json({status:400,message:"No credientals"});
        return;
    }
    User.findOne({email:req.body.email.toLowerCase()}, async function (err,user) {
        if(err)
            res.json({status:400,message:err});
        if(user == null)
        {
            res.json({status:400,message:"Invalid login"});
            return;
        }
        var isvalid = await pw.isValid(req.body.password,user.password); /* kontrol edene kadar bekle */
        if(isvalid)
        {
            var user_found = await User.findById(user._id);
            res.json({
                status:200,
                access_token:token.generateToken({user:user._id},'access'),
                refresh_token:token.generateToken({user:user._id},'refresh'),
                name:user_found.name,
                surname:user_found.surname,
                email:user_found.email,
                user_type:user_found.user_type
            });
        }
        else
            res.json({
                status:400,
                message:'Invalid login'
            })
    });
}


exports.register = async function (req,res) {
    try 
    {
        var user = await User.findOne({_id:token.verifyToken(req.body.token,'access').user});
        if(user.user_type == 0 || (user.user_type == 1 && req.body.user_type == 2)) /* çalışan kullanıcı oluşturamaz ve admin superadmin oluşturamaz */
        {
            res.json({status:401,message:'You have no permission for this request'});
            return;
        }
        var newuser = new User();
        newuser.email = req.body.email;
        newuser.password = pw.hash(req.body.password);
        newuser.name = req.body.name;
        newuser.surname = req.body.surname;
        newuser.created_date = Date.now();
        newuser.user_type = req.body.user_type;
        newuser.save((err) => {
            if(err)
            {
                res.json({status:400,message:err});
                return;
            }
            res.json({status:200,message:"User created"});
        })
    }
    catch(err)
    {
        res.json({status:400,message:"Invalid token"});
    }
};


exports.index = async function(req,res) {

    const { filter, skip, limit, sort, projection, population } = aqp(req.query);
    console.log(filter);
    try
    {
        var user = await User.findOne({_id:token.verifyToken(req.query.token,'access').user});
        if(user.user_type == 0)
            res.json({status:400,message:"You have no permission for this request"});
        User.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select(projection)
        .populate(population)
        .exec(function (err,users) {
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


exports.edit = async function(req,res) {
    try
    {
        var user = await User.findOne({_id:token.verifyToken(req.body.token,'access').user});
        if(user.user_type == 0)
            res.json({status:400,message:"You have no permission for this request"});
        try
        {
            User.findById(req.params.user_id,function (err,usertoedit) {
                if(usertoedit.user_type == 2 && user.user_type == 1)
                {
                    res.json({status:400,message:"You have no permission for this request"});
                    return;
                }
                usertoedit.name = req.body.name || usertoedit.name;
                usertoedit.surname = req.body.surname || usertoedit.surname;
                usertoedit.password = pw.hash(req.body.name) || usertoedit.name;
                usertoedit.user_type = req.body.user_type || usertoedit.user_type;
                usertoedit.email = req.body.email || usertoedit.email;

                usertoedit.save((err) => { if(err) {res.json({status:400,message:"An error occured"})} res.json({status:200,message:"User has edited"})});
            })
        }
        catch
        {
            res.json({status:400,message:"User could not found"});
        }
    }
    catch
    {
        res.json({status:400,message:"Invalid Token"});
    }
} 


exports.delete = async function(req,res) {
    try
    {
        var user = await User.findOne({_id:token.verifyToken(req.body.token,'access').user});
        try
        {
            var user_to_delete = await User.findOne({_id:req.params.user_id});
        }
        catch
        {
            res.json({status:400,message:"User could not found"});
        }
        if(user.user_type == 0 || (user.user_type == 1 && user_to_delete.user_type == 2))
            res.json({status:400,message:"You have no permission for this request"});
        User.deleteOne({_id:req.params.user_id},(err) => { if(err) {res.json({status:400,message:"An error occured"})} res.json({status:200,message:"User has been deleted"})});
    }
    catch
    {
        res.json({status:400,message:"Invalid Token"});
    }
} 


exports.view = async function(req,res) {
    try
    {
        var user = await User.findOne({_id:token.verifyToken(req.query.token,'access').user});
        try
        {
            var user_to_view = await User.findOne({_id:req.params.user_id});
        }
        catch
        {
            res.json({status:400,message:"User could not found"});
        }
        if(user.user_type == 0 || (user.user_type == 1 && user_to_view.user_type == 2))
            res.json({status:400,message:"You have no permission for this request"});
        res.json({status:200,data:user_to_view});
    }
    catch
    {
        res.json({status:400,message:"Invalid Token"});
    }
} 
/**
 * Created by fuzhihong on 16/11/28.
 */
var User=require('../models/user');

exports.signup=function(req,res){
    //signup
        var _user=req.body.user;

        User.findByCondition({name:_user.name},function(err,result){
            if(err){console.log(err)}
            if(result){
                return res.redirect('/signin')
            }else{
                var user=new User(_user);
                user.save(function(err,user){
                    if(err){console.log('添加用户,'+err)}
                    res.redirect('/user/userlist')
                })
            }
        })
};

//signin
exports.signin=function(req,res){
        var _user=req.body.user;
        var name=_user.name
        var password=_user.password;
        User.findByCondition({name:name},function(err,result){
            if(!result){
                return res.redirect('/signup')
            }
            result.comparePassword(password,function(err,isMatch){
                if(err){console.log(err)}
                if(isMatch){
                    req.session.user=result
                    return res.redirect('/signin')
                }else{
                    console.log('Password is not matched')
                }
            })
        })
    };

//user list

exports.userlist=function(req,res){
        User.fetch(function(err, users) {
            if (err) {
                console.log(err)
            }
            console.log(users)
            res.render('userlist', {
                title: '小电影 用户列表页',
                users: users
            })
        })
    };

//logout
exports.logout=function(req,res){
        delete req.session.user;
        //delete app.locals.user;
        res.redirect('/')
    };
//showSignin showSignup
exports.showSignup = function(req, res) {
    res.render('signup', {
        title: '注册页面'
    })
}

exports.showSignin = function(req, res) {
    res.render('signin', {
        title: '登录页面'
    })
}


//db.users.update({"_id" : ObjectId("583d0174cb787e87e1895cf7")},{$set:{role:51}})
//midware for user

exports.signinRequired=function(req,res,next){
   var user=req.session.user;
    if(!user){
        return res.redirect('/signin')
    }
    next();
};

exports.adminRequired=function(req,res,next){
    var user=req.session.user;
    if(user.role<=10){
        return res.redirect('/signin')
    }
    next()
}

exports.saveUrl=function(req,res,next){
   req.savedUrl=req.url;
   next()
};
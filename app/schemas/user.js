/**
 * Created by fuzhihong on 16/11/23.
 */
var mongoose=require('mongoose');
var bcryptjs=require('bcryptjs');
var SALT_WORK_FACTORY=10;

var UserSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    //default user
    //admin
    //super admin
    //or
    //0: normal user
    //1: verified user
    //2: professional user

    //>10:admin
    //>50:super admin
    role:{
        type:Number,
        default:0
    },
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});

UserSchema.pre('save',function(next){
    var user=this;
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now()
    }else{
        this.meta.updateAt=Date.now()
    }

    bcryptjs.genSalt(SALT_WORK_FACTORY, function(err, salt) {
        if (err) return next(err);

        bcryptjs.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next()
        })
    })
});


//实例方法
UserSchema.methods={
   comparePassword:function(password,cb){
      bcryptjs.compare(password,this.password,function(err,isMatch){
          if(err){console.log(err)}
          console.log(isMatch);
          cb(null,isMatch)
      })
  }
}

//模型方法
UserSchema.statics = {
    fetch:function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)

    },
    findByCondition:function(arg,cb){
        return this.findOne(arg).exec(cb)
    }
}

module.exports = UserSchema
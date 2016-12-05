/**
 * Created by fuzhihong on 16/11/29.
 */
/**
 * Created by fuzhihong on 16/11/19.
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;

var CatetorySchema=new mongoose.Schema({
    name:String,
    movies:[{type:ObjectId,ref:'Movie'}],
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

CatetorySchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now()
    }else{
        this.meta.updateAt=Date.now()
    }
    next()
});
CatetorySchema.statics={
    fetch:function(cb){
        return this.find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findByCondition:function(arg,cb){
        return this.findOne(arg).exec(cb)
    }

};
module.exports=CatetorySchema